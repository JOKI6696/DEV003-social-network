import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyDfverbOj1mwqSwJtiZG_lI13n7N9CltEU',
  authDomain: 'fems-social-network-2023.firebaseapp.com',
  projectId: 'fems-social-network-2023',
  storageBucket: 'fems-social-network-2023.appspot.com',
  messagingSenderId: '677179954852',
  appId: '1:677179954852:web:c6d1035e8cb8e03540b831',
};

// Inicicializando Firebase
export const app = initializeApp(firebaseConfig);
