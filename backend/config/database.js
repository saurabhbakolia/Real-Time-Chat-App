// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");
const { getAnalytics } = require("firebase/analytics");
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDkiBe8x_Qb_WvAX2ERWoPuCGZEy9cXw0s",
    authDomain: "real-time-chat-app-b66cc.firebaseapp.com",
    databaseURL: 'https://real-time-chat-app-b66cc-default-rtdb.asia-southeast1.firebasedatabase.app',
    projectId: "real-time-chat-app-b66cc",
    storageBucket: "real-time-chat-app-b66cc.appspot.com",
    messagingSenderId: "553867627970",
    appId: "1:553867627970:web:c20f9262a0f9ad15541a5b",
    measurementId: "G-97KL5KXX0F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

module.exports = {app};