import firebase from './firebase';

const db = firebase.firestore();

export function createUser(uid, data) {
  // console.log({ uid, data });
  return db
    .collection('users')
    .doc(uid)
    .set({ uid, ...data }, { merge: true });
}

export function createSite(data) {
  const site = db.collection('sites').doc();
  site.set(data);
  return site;
}

export function createFeedback(data) {
  return db.collection('feedback').add(data);
}

export function deleteFeedback(id) {
  return db.collection('feedback').doc(id).delete();
}
