import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'


var config = {
    apiKey: "AIzaSyDJ38t7id4_VEaHTdAV7ncVshFzMCrWQK0",
    authDomain: "fabrica-256dd.firebaseapp.com",
    databaseURL: "https://fabrica-256dd.firebaseio.com",
    projectId: "fabrica-256dd",
    storageBucket: "fabrica-256dd.appspot.com",
    messagingSenderId: "912491155711",
    appId: "1:912491155711:web:ec111436ade2d5a3117cca",
    measurementId: "G-RPFYNS6YDR"
  };
  // Initialize Firebase
  firebase.initializeApp(config);

  export default firebase;