import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
// import { FirebaseContext } from "../context/firebase";

export default function useAuthListener() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("authUser")));
  //   const { firebase } = useContext(FirebaseContext);

  useEffect(() => {
    const auth = getAuth();
    const listener = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        localStorage.setItem("authUser", JSON.stringify(authUser));
        setUser(authUser);
      } else {
        localStorage.removeItem("authUser");
        setUser(null);
      }
    });

    return () => listener();
  }, []);

  return { user };
}

export function authListener(option1, option2) {
  const auth = useAuthListener().user;
  return auth ? option1 : option2;
}
