import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";
import firebaseApp from ".";

// Pass your reCAPTCHA v3 site key (public key) to activate(). Make sure this
// key is the counterpart to the secret key you set in the Firebase console.
const firebaseAppCheck = initializeAppCheck(firebaseApp, {
  provider: new ReCaptchaV3Provider("6LeBgckpAAAAAOn-uCVeEfeW2I3xWyIpkATbNXCO"),

  // Optional argument. If true, the SDK automatically refreshes App Check
  // tokens as needed.
  isTokenAutoRefreshEnabled: true,
});
console.log({ firebaseAppCheck });

export default firebaseAppCheck;
