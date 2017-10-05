const admin = require('firebase-admin');
const bible = require('./biblion-nvi.json');

const serviceAccount = require('./Biblion-ce90b568ecb4.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
const writeBatch = db.batch();

bible.forEach(bookData => {
  writeBatch.create(db.collection('bible').doc(), bookData);
});

writeBatch.commit()
  .then(() => console.log('Data imported'))
  .catch(err => console.error(err));
