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
  where
} from 'firebase/firestore';
import { db } from '../firebase/config';

const COLLECTION_NAME = 'patients';

export const usePatients = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Realtime listener cho patients collection
  useEffect(() => {
    setLoading(true);
    
    const q = query(
      collection(db, COLLECTION_NAME),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const patientsData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          // Convert Firestore Timestamp to Date
          createdAt: doc.data().createdAt?.toDate(),
          updatedAt: doc.data().updatedAt?.toDate(),
          dateOfBirth: doc.data().dateOfBirth // Keep as string
        }));
        
        setPatients(patientsData);
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
  }, []);

  // Thêm bệnh nhân mới
  const addPatient = async (patientData) => {
    try {
      const docRef = await addDoc(collection(db, COLLECTION_NAME), {
        ...patientData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      
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

  // Search bệnh nhân (client-side search vì Firestore không hỗ trợ full-text search)
  const searchPatients = (searchTerm) => {
    if (!searchTerm) return patients;
    
    const term = searchTerm.toLowerCase();
    return patients.filter(patient => 
      patient.name?.toLowerCase().includes(term) ||
      patient.idNumber?.toLowerCase().includes(term) ||
      patient.phoneNumber?.includes(term) ||
      patient.emergencyContact?.toLowerCase().includes(term) ||
      (patient.conditions && patient.conditions.some(c => c.toLowerCase().includes(term))) ||
      (patient.allergies && patient.allergies.some(a => a.toLowerCase().includes(term)))
    );
  };

  return {
    patients,
    loading,
    error,
    addPatient,
    updatePatient,
    deletePatient,
    getPatientById,
    searchPatients
  };
};
