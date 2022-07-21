import { getFirestore } from "firebase/firestore";
import firebase from "./firebase";

export const firestore = getFirestore(firebase);