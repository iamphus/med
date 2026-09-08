import { useState, useEffect, useCallback } from 'react';
import { 
  collection, 
  doc,
  getDocs, 
  getDoc,
  addDoc, 
  updateDoc, 
  deleteDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
  where,
  limit,
  startAfter,
  endBefore,
  limitToLast
} from 'firebase/firestore';
import { db } from '../firebase/config';

const COLLECTION_NAME = 'patients';

export const usePatients = (pageSize = 20) => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastVisible, setLastVisible] = useState(null);
  const [firstVisible, setFirstVisible] = useState(null);
  const [pageSnapshots, setPageSnapshots] = useState({}); // Cache cho mỗi page

  // Đếm tổng số bệnh nhân (chỉ chạy 1 lần)
  useEffect(() => {
    const fetchTotalCount = async () => {
      try {
        const q = query(collection(db, COLLECTION_NAME));
        const snapshot = await getDocs(q);
        setTotalCount(snapshot.size);
      } catch (err) {
        console.error('Error counting patients:', err);
      }
    };
    
    fetchTotalCount();
  }, []);

  // Fetch patients với pagination
  useEffect(() => {
    setLoading(true);
    
    let q = query(
      collection(db, COLLECTION_NAME),
      orderBy('createdAt', 'desc'),
      limit(pageSize)
    );

    // Nếu có cache cho page này, dùng startAfter
    if (currentPage > 1 && pageSnapshots[currentPage - 1]) {
      q = query(
        collection(db, COLLECTION_NAME),
        orderBy('createdAt', 'desc'),
        startAfter(pageSnapshots[currentPage - 1]),
        limit(pageSize)
      );
    }

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const patientsData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate(),
          updatedAt: doc.data().updatedAt?.toDate(),
          dateOfBirth: doc.data().dateOfBirth
        }));
        
        setPatients(patientsData);
        
        // Lưu snapshot cuối và đầu của page
        if (snapshot.docs.length > 0) {
          setLastVisible(snapshot.docs[snapshot.docs.length - 1]);
          setFirstVisible(snapshot.docs[0]);
          
          // Cache snapshot cuối của page hiện tại
          setPageSnapshots(prev => ({
            ...prev,
            [currentPage]: snapshot.docs[snapshot.docs.length - 1]
          }));
        }
        
        setLoading(false);
        setError(null);
      },
      (err) => {
        console.error('Error fetching patients:', err);
        setError(err.message);
        setLoading(false);
      }
    );

    return unsubscribe;
  }, [currentPage, pageSize]);

  // Navigation functions
  const goToPage = (page) => {
    setCurrentPage(page);
  };

  const nextPage = () => {
    if (currentPage < Math.ceil(totalCount / pageSize)) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  // Thêm bệnh nhân mới
  const addPatient = async (patientData) => {
    try {
      const docRef = await addDoc(collection(db, COLLECTION_NAME), {
        ...patientData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      
      // Cập nhật total count
      setTotalCount(prev => prev + 1);
      
      return { success: true, id: docRef.id };
    } catch (err) {
      console.error('Error adding patient:', err);
      return { success: false, error: err.message };
    }
  };

  // Cập nhật thông tin bệnh nhân
  const updatePatient = async (id, patientData) => {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      await updateDoc(docRef, {
        ...patientData,
        updatedAt: serverTimestamp()
      });
      
      return { success: true };
    } catch (err) {
      console.error('Error updating patient:', err);
      return { success: false, error: err.message };
    }
  };

  // Xóa bệnh nhân
  const deletePatient = async (id) => {
    try {
      await deleteDoc(doc(db, COLLECTION_NAME, id));
      
      // Cập nhật total count
      setTotalCount(prev => prev - 1);
      
      return { success: true };
    } catch (err) {
      console.error('Error deleting patient:', err);
      return { success: false, error: err.message };
    }
  };

  // Lấy thông tin 1 bệnh nhân theo ID
  const getPatientById = useCallback(async (id) => {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return {
          success: true,
          data: {
            id: docSnap.id,
            ...docSnap.data(),
            createdAt: docSnap.data().createdAt?.toDate(),
            updatedAt: docSnap.data().updatedAt?.toDate(),
            dateOfBirth: docSnap.data().dateOfBirth
          }
        };
      } else {
        return { success: false, error: 'Không tìm thấy bệnh nhân' };
      }
    } catch (err) {
      console.error('Error getting patient:', err);
      return { success: false, error: err.message };
    }
  }, []);

  // Search bệnh nhân (server-side search across all patients)
  const searchPatients = useCallback(async (searchTerm) => {
    if (!searchTerm) {
      return { success: true, results: patients };
    }
    
    try {
      setLoading(true);
      const term = searchTerm.toLowerCase();
      
      // Fetch ALL patients for search (no pagination)
      const q = query(
        collection(db, COLLECTION_NAME),
        orderBy('createdAt', 'desc')
      );
      
      const snapshot = await getDocs(q);
      const allPatients = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate(),
        updatedAt: doc.data().updatedAt?.toDate(),
        dateOfBirth: doc.data().dateOfBirth
      }));
      
      // Filter on client side
      const results = allPatients.filter(patient => 
        patient.name?.toLowerCase().includes(term) ||
        patient.id?.toLowerCase().includes(term) ||
        patient.phoneNumber?.includes(term) ||
        (patient.emergencyContacts && patient.emergencyContacts.some(ec => 
          ec.name?.toLowerCase().includes(term) || ec.phone?.includes(term)
        )) ||
        (patient.conditions && patient.conditions.some(c => c.toLowerCase().includes(term))) ||
        (patient.allergies && patient.allergies.some(a => a.toLowerCase().includes(term)))
      );
      
      setLoading(false);
      return { success: true, results };
    } catch (err) {
      console.error('Error searching patients:', err);
      setLoading(false);
      return { success: false, error: err.message, results: [] };
    }
  }, [patients]);

  const totalPages = Math.ceil(totalCount / pageSize);

  return {
    patients,
    loading,
    error,
    totalCount,
    currentPage,
    totalPages,
    pageSize,
    addPatient,
    updatePatient,
    deletePatient,
    getPatientById,
    searchPatients,
    goToPage,
    nextPage,
    prevPage
  };
};
