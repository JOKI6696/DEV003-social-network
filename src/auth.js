import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from 'firebase/auth';
import { app as firebase } from './firebase-config.js';

export const auth = getAuth(firebase);
auth.languageCode = 'es';

export function loginWithGoogle() {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
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

export function registerNewUser(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}

// export function informationUser() {
//   const user = auth.currentUser;
//   if (user !== null) {
//     // The user object has basic properties such as display name, email, etc.
//     const displayName = user.displayName;
//     // const email = user.email;
//     // const photoURL = user.photoURL;
//     return displayName;
//   }
// }

// export const updateUserProfile = (user, displayName, userPhoto) => {
//   const userProperties = {
//     displayName,
//     photoURL: userPhoto,
//   };
//   return updateProfile(user, userProperties);
// };
