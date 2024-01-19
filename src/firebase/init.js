import firebase from 'firebase'
import firestore from 'firebase/firestore'

// Initialize Firebase
 var config = {
  
 };

 const firebaseApp = firebase.initializeApp(config);
 firebaseApp.firestore().settings({ timestampsInSnapshots:true})

 export default firebaseApp.firestore()
