import firebase from "firebase/app";


const firebaseConfig = {
    apiKey: "AIzaSyBzx_JrqQNVGzEUd5sq2GrmctjifD94H0o",
    authDomain: "restapp-1a255.firebaseapp.com",
    databaseURL: "https://restapp-1a255.firebaseio.com",
    projectId: "restapp-1a255",
    storageBucket: "restapp-1a255.appspot.com",
    messagingSenderId: "649435310812",
    appId: "1:649435310812:web:bb10f66226e845c6282219"
  };

export const firebaseapp = firebase.initializeApp(firebaseConfig);
