// Node.js snippet (server-side) to read all user profiles using Firebase Admin SDK.
// USAGE: Keep this file out of source control if you include a service account JSON. Run on a secure server.

/*
npm install firebase-admin

Then create a `serviceAccountKey.json` from the Firebase Console (Project Settings -> Service accounts -> Generate new private key) and keep it private.
*/

const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json'); // DO NOT commit this file to the repo

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function dumpAllUsers(){
  const usersRef = db.collection('users');
  const snapshot = await usersRef.get();
  const rows = [];
  snapshot.forEach(doc => rows.push({ id: doc.id, data: doc.data() }));
  console.log('Found', rows.length, 'users');
  console.log(JSON.stringify(rows, null, 2));
}

dumpAllUsers().catch(err => console.error(err));
