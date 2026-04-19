import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, addDoc, getDocs, query, where, orderBy, serverTimestamp, doc, setDoc, onSnapshot } from 'firebase/firestore';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
export const messaging = getMessaging(app);

// ── FCM Helpers ────────────────────────────────────────────────
export const requestNotificationPermission = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      const token = await getToken(messaging, {
        vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY
      });
      return token;
    }
  } catch (error) {
    console.error('FCM permission error:', error);
  }
};

// ── Auth Helpers ────────────────────────────────────────────────

export const signInWithGoogle = async () => {
  const result = await signInWithPopup(auth, googleProvider);
  return result.user;
};

export const logOut = async () => {
  await signOut(auth);
};

export const onAuthChange = (callback) => onAuthStateChanged(auth, callback);

// ── Firestore Helpers ───────────────────────────────────────────

export const saveEntry = async (userId, eventId = 'default', seat = '') => {
  try {
    await addDoc(collection(db, 'entries'), {
      userId, eventId, seat,
      timestamp: serverTimestamp(),
      status: 'checked_in'
    });
  } catch (err) {
    console.error('[Firestore] saveEntry error:', err.message);
  }
};

export const saveFood = async (userId, eventId = 'default') => {
  try {
    await addDoc(collection(db, 'food_collections'), {
      userId, eventId,
      timestamp: serverTimestamp(),
      status: 'collected'
    });
  } catch (err) {
    console.error('[Firestore] saveFood error:', err.message);
  }
};

export const getEntries = async (eventId = 'default') => {
  try {
    const q = query(
      collection(db, 'entries'),
      where('eventId', '==', eventId),
      orderBy('timestamp', 'desc')
    );
    const snap = await getDocs(q);
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
  } catch (err) {
    console.error('[Firestore] getEntries error:', err.message);
    return [];
  }
};

// Real-time attendance listener
export const listenToAttendance = (eventId, callback) => {
  const attendanceRef = collection(db, 'events', eventId, 'attendance');
  return onSnapshot(attendanceRef, (snapshot) => {
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    callback(data);
  });
};

// Save attendance to Firestore
export const markAttendanceFirestore = async (eventId, userId, studentData) => {
  const ref = doc(db, 'events', eventId, 'attendance', userId);
  await setDoc(ref, {
    ...studentData,
    markedAt: new Date().toISOString(),
    status: 'present'
  });
};

export default app;
