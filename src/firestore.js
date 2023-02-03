import {
  getFirestore, collection, addDoc, getDocs, onSnapshot, deleteDoc, doc,
} from 'firebase/firestore';
import { app as firebase } from './firebase-config.js';

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(firebase);
export const savePost = (post) => {
  addDoc(collection(db, 'posts'), { post });
};

export const getPosts = () => getDocs(collection(db, 'posts'));

export const onGetPosts = (callback) => onSnapshot(collection(db, 'posts'), callback);

export const deletePost = (id) => deleteDoc(doc(db, 'posts', id));
