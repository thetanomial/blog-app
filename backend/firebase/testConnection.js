// index.js
import firebaseApp from './firebase.js'; // Import firebase app
import { getAuth } from 'firebase/auth'; // Import Firebase Auth

// Function to check if Firebase is connected
export function testFirebaseConnection() {
  const auth = getAuth(firebaseApp);

  auth.onAuthStateChanged((user) => {
    if (user) {
      console.log('Firebase connected successfully. User is logged in:', user.email);
    } else {
      console.log('Firebase connected successfully, but no user is logged in.');
    }
  });
}


