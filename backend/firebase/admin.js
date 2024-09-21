import admin from 'firebase-admin';
import keyfile from './keyfile.js';
// Initialize Firebase Admin SDK
import dotenv from 'dotenv'
dotenv.config()
const firebaseAdmin = admin.initializeApp({
  credential: admin.credential.cert(keyfile),
  storageBucket: process.env.FIREBASE_STORAGE_GS_LINK 
});

console.log(Object.keys(firebaseAdmin.storage))

export default firebaseAdmin;
