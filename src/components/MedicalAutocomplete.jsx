import { useState, useEffect, useRef, useCallback } from 'react';
import { FiX, FiSearch } from 'react-icons/fi';
import './MedicalAutocomplete.css';

export default function MedicalAutocomplete({ 
  type,
  placeholder,
  selectedItems = [],
  onAdd,
  onRemove,
  searchFunction
}) {
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [dropdownStyle, setDropdownStyle] = useState({});
  
  const wrapperRef = useRef(null);
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);

  // Calculate dropdown position
  const updateDropdownPosition = useCallback(() => {
    if (wrapperRef.current && showSuggestions) {
      const rect = wrapperRef.current.getBoundingClientRect();
      setDropdownStyle({
        position: 'fixed',
        top: `${rect.bottom + 4}px`,
        left: `${rect.left}px`,
        width: `${rect.width}px`,
        zIndex: 10000  // Cao hơn modal-dialog (1001)
      });
    }
  }, [showSuggestions]);

  // Update position when showing or on scroll/resize
  useEffect(() => {
    if (showSuggestions) {
      updateDropdownPosition();
      window.addEventListener('scroll', updateDropdownPosition, true);
      window.addEventListener('resize', updateDropdownPosition);
      
      return () => {
        window.removeEventListener('scroll', updateDropdownPosition, true);
        window.removeEventListener('resize', updateDropdownPosition);
      };
    }
  }, [showSuggestions, updateDropdownPosition]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        wrapperRef.current && 
        !wrapperRef.current.contains(event.target) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setShowSuggestions(false);
      }
    };

    if (showSuggestions) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showSuggestions]);

  // Search when input changes
  useEffect(() => {
    if (input.trim() === '') {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const results = searchFunction(input);
    const filtered = results.filter(item => 
      !selectedItems.includes(item.name)
    );
    
    setSuggestions(filtered);
    setShowSuggestions(filtered.length > 0);
    setFocusedIndex(-1);
  }, [input, searchFunction, selectedItems]);

  const handleSelectItem = useCallback((item) => {
    onAdd(item.name);
    setInput('');
    setSuggestions([]);
    setShowSuggestions(false);
    inputRef.current?.focus();
  }, [onAdd]);

  const handleKeyDown = useCallback((e) => {
    if (!showSuggestions) return;

    switch (e.key) {
      case 'Enter':
        e.preventDefault();
        if (focusedIndex >= 0 && focusedIndex < suggestions.length) {
          handleSelectItem(suggestions[focusedIndex]);
        } else if (input.trim() && suggestions.length === 0) {
          onAdd(input.trim());
          setInput('');
        }
        break;
      
      case 'ArrowDown':
        e.preventDefault();
        setFocusedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      
      case 'ArrowUp':
        e.preventDefault();
        setFocusedIndex(prev => prev > 0 ? prev - 1 : 0);
        break;
      
      case 'Escape':
        setShowSuggestions(false);
        setFocusedIndex(-1);
        break;
      
      default:
        break;
    }
  }, [showSuggestions, focusedIndex, suggestions, handleSelectItem, input, onAdd]);

  const getSeverityBadge = (severity) => {
    const badges = {
      high: { text: 'Cao', class: 'severity-high' },
      medium: { text: 'TB', class: 'severity-medium' },
      low: { text: 'Thấp', class: 'severity-low' }
    };
    return badges[severity] || null;
  };

  return (
    <>
      <div className="medical-autocomplete" ref={wrapperRef}>
        <div className="autocomplete-input-wrapper">
          <FiSearch className="input-icon" />
          <input
            ref={inputRef}
            type="text"
            className="form-input autocomplete-input"
            placeholder={placeholder}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => {
              if (suggestions.length > 0 && input.trim()) {
                setShowSuggestions(true);
              }
            }}
          />
        </div>

        {/* Selected items */}
        {selectedItems.length > 0 && (
          <div className="tag-list">
            {selectedItems.map((item, index) => (
              <span 
                key={index} 
                className={`badge tag-item ${type === 'allergy' ? 'badge-danger' : 'badge-warning'}`}
              >
                {item}
                <button 
                  type="button" 
                  onClick={() => onRemove(index)} 
                  className="tag-remove"
                  aria-label={`Remove ${item}`}
                >
                  <FiX />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Dropdown - rendered at root level with fixed position */}
      {showSuggestions && suggestions.length > 0 && (
        <div 
          ref={dropdownRef}
          className="autocomplete-dropdown"
          style={dropdownStyle}
        >
          {suggestions.map((item, index) => (
            <div
              key={item.id}
              className={`autocomplete-item ${index === focusedIndex ? 'focused' : ''}`}
              onClick={() => handleSelectItem(item)}
              onMouseEnter={() => setFocusedIndex(index)}
            >
              <div className="autocomplete-item-main">
                <span className="autocomplete-item-name">{item.name}</span>
                {item.severity && (
                  <span className={`severity-badge ${getSeverityBadge(item.severity)?.class}`}>
                    {getSeverityBadge(item.severity)?.text}
                  </span>
                )}
              </div>
              <div className="autocomplete-item-meta">
                <span className="autocomplete-item-category">{item.category}</span>
                {item.icd10 && (
                  <span className="autocomplete-item-icd">ICD-10: {item.icd10}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
