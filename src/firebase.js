import firebase from 'firebase';

//! aşağıdaki değerleri firebase project-settings'den alıyoruz
const firebaseConfig = {
  apiKey: 'AIzaSyC-uXVJ5Amduz09ETxeY-cUTN4yRQmbtzw',
  authDomain: 'facebook-messenger-clone-7edc4.firebaseapp.com',
  projectId: 'facebook-messenger-clone-7edc4',
  storageBucket: 'facebook-messenger-clone-7edc4.appspot.com',
  messagingSenderId: '552089063122',
  appId: '1:552089063122:web:42bff2e6e112ea953b670b'
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
// console.log(db);

export default db;
