import {
  getFirestore, collection, addDoc, onSnapshot, deleteDoc, doc,
  getDoc, updateDoc, setDoc, serverTimestamp, query, orderBy, arrayUnion, arrayRemove,
} from 'firebase/firestore';
import { auth } from './auth.js';
import { app as firebase } from './firebase-config.js';

// constante que inicializa a firesotre (db = data base)
export const db = getFirestore(firebase);

const collectionPost = collection(db, 'posts');
export const q = query(collectionPost, orderBy('createdAt', 'desc'));

// addDoc fx desde firestore que nos permite guardar los post
export const savePost = (post) => {
  const userId = auth.currentUser;
  addDoc(collectionPost, {
    post,
    userUid: userId.uid,
    user: userId.displayName,
    userEmail: userId.email,
    createdAt: serverTimestamp(),
    // Time stamp, ordenar posts
    like: [],
  });
};

// agregar y quitar like

export const addLikePost = (id, uidCurrentUser) => {
  updateDoc(doc(db, 'posts', id), { like: arrayUnion(uidCurrentUser) });
};

export const removeLikePost = (id, uidCurrentUser) => {
  updateDoc(doc(db, 'posts', id), { like: arrayRemove(uidCurrentUser) });
};

// no sabemos por qué esta aquí...
// export const getPosts = () => getDocs(collection(db, 'posts'));

// onSnapShot fx desde firestore
// onSnapshot = devuelve la actualizacion de la coleccion de documentos en tiempo real
// Se maneja los eventos de manera asincrona con el callback y se ejecuta al final.
export const onGetPosts = (callback) => onSnapshot(q, callback);

export const deletePost = (id) => deleteDoc(doc(db, 'posts', id));

export const getPost = (id) => getDoc(doc(db, 'posts', id));

// fx desde firetore que nos permite actualizar el post a traves de su ID.
// NewField -> el texto actualizado en el input
export const updatePost = (id, newFields) => updateDoc(doc(db, 'posts', id), newFields);

// 08/02 guardando usuario (con google: welcome 48-50)
export const saveUser = (user, fullName, userName) => {
  setDoc(doc(db, 'users', user.uid), {
    id: user.uid,
    email: user.email,
    name: fullName,
    userUser: userName,
  });
};
