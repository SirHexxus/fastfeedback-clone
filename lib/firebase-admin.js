import admin from 'firebase-admin';

if (admin.apps.length < 1) {
  admin.initializeApp({
    credential: admin.credential.cert({
      client_email: process.env.FIREBASE_CLIENT_EMAIL,
      private_key: process.env.FIREBASE_PRIVATE_KEY, //.replace(/\\n/g, '\n'),
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
    }) //,
    // databaseURL: ''
  });
}

const auth = admin.auth();
const db = admin.firestore();
export { auth, db };
