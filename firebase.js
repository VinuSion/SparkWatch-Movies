// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCzOfKJ5gKm5_fTc3gRSUSOKfoBuacptUs",
  authDomain: "sparkwatch-movies.firebaseapp.com",
  projectId: "sparkwatch-movies",
  storageBucket: "sparkwatch-movies.appspot.com",
  messagingSenderId: "16457134234",
  appId: "1:16457134234:web:2ca442beaaa559e8522f23",
  measurementId: "G-VKFWYFV0LK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);