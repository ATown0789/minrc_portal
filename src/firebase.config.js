// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  setPersistence,
  browserSessionPersistence,
  onAuthStateChanged,
  confirmPasswordReset,
} from "firebase/auth";

import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
  setDoc,
  updateDoc,
  doc,
  getDoc,
  deleteDoc,
} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: `${process.env.REACT_APP_API_KEY}`,
  authDomain: `${process.env.REACT_APP_AUTH_DOMAIN}`,
  projectId: `${process.env.REACT_APP_PROJECT_ID}`,
  storageBucket: `${process.env.REACT_APP_STORAGE_BUCKET}`,
  messagingSenderId: `${process.env.REACT_APP_MESSAGING_SENDER_ID}`,
  appId: `${process.env.REACT_APP_APP_ID}`,
  measurementId: `${process.env.REACT_APP_MEASUREMENT_ID}`,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const secondaryApp = initializeApp(firebaseConfig, "secondary");
const db = getFirestore(app);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const auth2 = getAuth(secondaryApp);

export default app;

const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async (
  fName = "",
  lName = "",
  minrcYear = "",
  education = "",
  skills = [],
  stateSel = "",
  interests = [],
  summary = [],
  authType = "",
  agency = "default"
) => {
  setPersistence(auth, browserSessionPersistence);
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        dispName: user.displayName,
        authProvider: "google",
        email: user.email,
        fName,
        lName,
        minrcYear,
        education,
        skills,
        stateSel,
        interests,
        summary,
        agency,
      });
    }
    return user;
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logInWithEmailAndPassword = async (auth, email, password) => {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    const user = res.user;
    return user;
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const registerNewUser = async (registrant) => {
  try {
    const res = await createUserWithEmailAndPassword(
      auth2,
      registrant.email,
      registrant.password
    );

    const user = res.user;
    const docRef = await addDoc(collection(db, "users"), {
      uid: user.uid,
      ...registrant,
      password: null,
    });
    // console.log("Document written with ID: ", docRef.id);
    await updateDoc(doc(db, "users", docRef.id), {
      docId: docRef.id,
    });
    return true;
  } catch (err) {
    console.error(err);
    return err.message;
  }
};

const registerWithEmailAndPassword = async (registrant) => {
  try {
    const res = await createUserWithEmailAndPassword(
      auth,
      registrant.email,
      registrant.password
    );

    const user = res.user;
    const docRef = await addDoc(collection(db, "users"), {
      uid: user.uid,
      ...registrant,
      password: null,
    });
    // console.log("Document written with ID: ", docRef.id);
    await updateDoc(doc(db, "users", docRef.id), {
      docId: docRef.id,
    });
    return true;
  } catch (err) {
    console.error(err);
    return err.message;
  }
};

const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email, {
      url: `http://minrcportal.com/`,
    });
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const resetPassword = async (oobCode, newpassword) => {
  return confirmPasswordReset(auth, oobCode, newpassword);
};

const logout = async () => {
  // console.log("signOut");
  signOut(auth);
  try {
    const q = query(
      collection(db, "users"),
      where("uid", "==", auth.currentUser.uid)
    );
    const doc = await getDocs(q);
  } catch (err) {
    return false;
  }
};

const addJobPosting = async (job) => {
  try {
    const docRef = await addDoc(collection(db, "jobs"), {
      ...job,
    });
    // console.log("Document written with ID: ", docRef.id);
    await updateDoc(doc(db, "jobs", docRef.id), {
      id: docRef.id,
    });
    return docRef.id;
  } catch (e) {
    console.error("Error adding document", e);
  }
};

const deleteJob = async (job) => {
  try {
    const docRef = doc(db, "jobs", job);
    await deleteDoc(docRef);
  } catch (e) {
    console.error("Error deleting document", e);
  }
};

const updateJob = async (job) => {
  try {
    await updateDoc(doc(db, "jobs", job.id), {
      ...job,
    });
    // console.log("Document updated");
  } catch (e) {
    console.error("Error adding document", e);
  }
};

const updateUser = async (user) => {
  // console.log(user);
  try {
    await updateDoc(doc(db, "users", user.docId), {
      ...user,
    });
    // console.log("Document updated");
  } catch (e) {
    console.error("Error adding document", e);
  }
};

export {
  auth,
  db,
  signInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
  addJobPosting,
  deleteJob,
  updateJob,
  updateUser,
  resetPassword,
  registerNewUser,
  auth2,
};
