import MKBox from "components/MKBox";
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import { authListener } from "hooks";
import { routes, routeLoc } from "routes";

function NavbarDark() {
  const signin = {
    type: "internal",
    route: routeLoc.SIGN_IN,
    label: "Sign In",
    color: "info",
  };

  const dashboard = {
    type: "internal",
    route: routeLoc.DASHBOARD,
    label: "Dashboard",
    color: "info",
  };

  return (
    <MKBox variant="gradient" bgColor="dark" shadow="sm" py={0.25}>
      <DefaultNavbar
        routes={routes}
        action={authListener(dashboard, signin)}
        transparent
        relative
        light
        center
      />
    </MKBox>
  );
}

export default NavbarDark;
