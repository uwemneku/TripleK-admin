import firebaseApp from ".";
import { getFirestore } from "firebase/firestore";

const firebaseStorage = getFirestore(firebaseApp);

export default firebaseStorage;
