import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from 'firebase/auth'; // trayendo funciones de Firebase
import { app as firebase } from './firebase-config.js';

export const auth = getAuth(firebase);
auth.languageCode = 'es';

export function loginWithGoogle() {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
}

export function registerNewUser(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}

export function verifyEmail() {
  return sendEmailVerification(auth.currentUser);
}

export function logout() {
  return signOut(auth);
}

export function loginWithEmail(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}
