import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';

/**
 * Hook để fetch và cache dữ liệu y tế từ Firestore
 * @returns {Object} { allergies, conditions, loading, error }
 */
export function useMedicalData() {
  const [allergies, setAllergies] = useState([]);
  const [conditions, setConditions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchMedicalData() {
      try {
        setLoading(true);
        setError(null);

        // Fetch allergies
        const allergiesSnapshot = await getDocs(collection(db, 'medical_allergies'));
        const allergiesData = allergiesSnapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id
        }));

        // Fetch conditions
        const conditionsSnapshot = await getDocs(collection(db, 'medical_conditions'));
        const conditionsData = conditionsSnapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id
        }));

        if (isMounted) {
          setAllergies(allergiesData);
          setConditions(conditionsData);
          setLoading(false);
        }
      } catch (err) {
        console.error('Error fetching medical data:', err);
        if (isMounted) {
          setError(err.message);
          setLoading(false);
        }
      }
    }

    fetchMedicalData();

    return () => {
      isMounted = false;
    };
  }, []);

  // Search functions
  const searchAllergies = (query) => {
    if (!query || query.trim() === '') return [];
    const lowerQuery = query.toLowerCase();
    return allergies.filter(allergy => 
      allergy.name.toLowerCase().includes(lowerQuery) ||
      allergy.category.toLowerCase().includes(lowerQuery)
    );
  };

  const searchConditions = (query) => {
    if (!query || query.trim() === '') return [];
    const lowerQuery = query.toLowerCase();
    return conditions.filter(condition => 
      condition.name.toLowerCase().includes(lowerQuery) ||
      condition.category.toLowerCase().includes(lowerQuery) ||
      (condition.icd10 && condition.icd10.toLowerCase().includes(lowerQuery))
    );
  };

  return {
    allergies,
    conditions,
    loading,
    error,
    searchAllergies,
    searchConditions
  };
}
