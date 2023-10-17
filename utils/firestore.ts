import { getFirestore } from "firebase/firestore";
import FirebaseApp from "./firebase";


const Firestore = getFirestore(FirebaseApp);

export default Firestore