import { logout, auth } from "lib/firebase.prod";
import { Navigate } from "react-router-dom";
import { routeLoc } from "routes";

function SignOut() {
  logout(auth);
  return <Navigate to={routeLoc.HOME} />;
}

export default SignOut;
