require("dotenv").config()
const { initializeApp } = require("firebase/compat/app")
require('firebase/compat/database')
const { storeWords, extractRandom } = require("./dbInit")
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID ,
  databaseURL: process.env.DATABASE_URL,
};


const db = initializeApp(firebaseConfig);
const firebaseApp = db.database()

function initializeDatabase() {
    // storeWords(firebaseApp)
    console.log(extractRandom(firebaseApp))
}


module.exports = {
    initializeDatabase ,
    firebaseApp 

}
