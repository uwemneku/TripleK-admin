import { getStorage } from "firebase/storage";
import firebaseApp from ".";

// Create a root reference
const fireBaseStorage = getStorage(firebaseApp);

export default fireBaseStorage;
