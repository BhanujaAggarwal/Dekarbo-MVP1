import firebase from 'firebase';

var firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDyUE6KTsvpnU7HPsjx7RMlJu9eS4qIXEA",
    authDomain: "mvp-dps.firebaseapp.com",
    databaseURL: "https://mvp-dps.firebaseio.com",
    projectId: "mvp-dps",
    storageBucket: "mvp-dps.appspot.com",
    messagingSenderId: "686766600709",
    appId: "1:686766600709:web:2178219585faa6c781626c",
    measurementId: "G-X98BN3QZMQ"
});

var db = firebaseApp.firestore();

export { db };