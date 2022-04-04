import { initializeApp } from "firebase/app";
import { getFirestore, query, getDocs, collection, where, addDoc } from "firebase/firestore";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";

// 1) when seeding the database you'll have to uncomment this!
// import { seedDatabase } from "../seed";

const config = {
  apiKey: "AIzaSyCtdYLuh2ZpWq7yBRPZdfqoByTwqh1o5uE",
  authDomain: "vpro-c5391.firebaseapp.com",
  projectId: "vpro-c5391",
  storageBucket: "vpro-c5391.appspot.com",
  messagingSenderId: "248825948288",
  appId: "1:248825948288:web:2dae56b3dee8ea717a9e65",
  measurementId: "G-RY7HKRHVY1",
};

// const firebase = Firebase.initializeApp(config);
const firebase = initializeApp(config);
const auth = getAuth(firebase);
const database = getFirestore(firebase);
const googleProvider = new GoogleAuthProvider();

// const addProp = async () => {
//   try {
//     const docRef = await addDoc(collection(database, "property"), {
//       id: 1,
//       name: "Tomide Adeoye",
//       address: "land mark village",
//       date: "20-10-30",
//       position: { lat: 6.4442257453669285, lng: 3.427244093254078 },
//       ownedArea: [
//         { lat: 6.4442257453669285, lng: 3.427244093254078 },
//         { lat: 6.444281715859478, lng: 3.4271032772807963 },
//         { lat: 6.444378997891362, lng: 3.42706974966811 },
//         { lat: 6.444464619390302, lng: 3.427058937013019 },
//         { lat: 6.444544077461007, lng: 3.4270528601332195 },
//         { lat: 6.444612874480723, lng: 3.4270870163886435 },
//         { lat: 6.444674508606699, lng: 3.42712984791385 },
//         { lat: 6.444717485911716, lng: 3.4272048659472354 },
//         { lat: 6.444710822763866, lng: 3.427365463212002 },
//         { lat: 6.444618871314924, lng: 3.4275314248947986 },
//         { lat: 6.444506264083019, lng: 3.427582219228018 },
//         { lat: 6.44438999209244, lng: 3.427563359945882 },
//         { lat: 6.444311616759975, lng: 3.427523105855901 },
//         { lat: 6.444246567723529, lng: 3.42746675851183 },
//         { lat: 6.44422070635654, lng: 3.4274198093766906 },
//         { lat: 6.444213501820881, lng: 3.4273540847784467 },
//       ],
//       image:
//         "https://media-exp1.licdn.com/dms/image/C4D03AQENUoFq3rdr4w/profile-displayphoto-shrink_200_200/0/1641711630692?e=1652313600&v=beta&t=3OKJ_E7pRqEgrsNc6TzoNbZycRbX3b1TJOMuaVsQAQo",
//       status: "sold",
//       litigation: "free",
//       estimatedValue: "4000000",
//       lastTransfer: "20-10-2014",
//       contact: "08181927251",
//       onChainAddress: "xddvai720e23ee32",
//       verifyingInstitution: "Lagos Land Bureau",
//     });

//     console.log("Document written with ID: ", docRef.id);
//   } catch (e) {
//     console.error("Error adding document: ", e);
//   }
// };

// addProp();

// 2) when seeding the database you'll have to uncomment this!
// seedDatabase(firebase);
// 3) once you have populated the database (only run once!), re-comment this so you don't get duplicate data

const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const { user } = res;
    const q = query(collection(database, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(database, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

// eslint-disable-next-line consistent-return
const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const { user } = res;
    await addDoc(collection(database, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
    return err;
  }
};
const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
const logout = () => {
  signOut(auth);
};
export {
  database,
  getDocs,
  collection,
  addDoc,
  signInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
  auth,
};

// // Get a list of cities from your database
// async function getCities(db) {
// 	const citiesCol = collection(db, "cities");
// 	const citySnapshot = await getDocs(citiesCol);
// 	const cityList = citySnapshot.docs.map((doc) => doc.data());
// 	return cityList;
// }
