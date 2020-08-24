import firebase from "firebase";

const firebaseConfig = {
	apiKey: "AIzaSyAXwE-mpdQjCiMFGTXj5ZcCmQfevaE6lkQ",
	authDomain: "whatsapp-clone-4ffe5.firebaseapp.com",
	databaseURL: "https://whatsapp-clone-4ffe5.firebaseio.com",
	projectId: "whatsapp-clone-4ffe5",
	storageBucket: "whatsapp-clone-4ffe5.appspot.com",
	messagingSenderId: "965506140475",
	appId: "1:965506140475:web:6be76ce367170b3a6d4f1e",
	measurementId: "G-KT7F3BRPL0",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
