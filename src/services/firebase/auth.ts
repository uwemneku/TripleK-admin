import { getAuth } from "firebase/auth";
import firebaseApp from ".";

const firebaseAuth = getAuth(firebaseApp);

export default firebaseAuth;
