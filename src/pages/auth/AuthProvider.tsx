import firebaseAuth from "@/services/firebase/auth";
import { PropsWithChildren, useEffect, useState } from "react";
import LoginPage from "./Login";
interface Props {}
function AuthProvider({ children }: PropsWithChildren<Props>) {
  const [authState, setAuthState] = useState<
    "loading" | "loggedOut" | "signedIn"
  >("loading");
  useEffect(() => {
    firebaseAuth.onAuthStateChanged((user) => {
      const isLoggedIn = Boolean(user?.email);
      setAuthState(isLoggedIn ? "signedIn" : "loggedOut");
    });
  }, []);

  switch (authState) {
    case "loading":
      <div className="w-full h-full animate-pulse bg-gray-700"></div>;
      break;
    case "loggedOut":
      return <LoginPage />;
      break;
    case "signedIn":
      return children;
      break;

    default:
      break;
  }
}

export default AuthProvider;
