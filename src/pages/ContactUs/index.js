// Material Kit 2 React components
import MKBox from "components/MKBox";
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import { DefaultFooter } from "pages/Footer";

import { routes, routeLoc, footerRoutes } from "routes";
import Waitlist from "pages/Home/sections/Waitlist";
import newsletter from "assets/images/newsletter.png";

function ContactUs() {
  return (
    <>
      <MKBox position="fixed" top="0.5rem" width="100%">
        <DefaultNavbar
          routes={routes}
          action={{
            type: "external",
            route: routeLoc.DASHBOARD,
            label: "Dasboard",
            color: "info",
          }}
        />
      </MKBox>
      <Waitlist image={newsletter} />
      <MKBox pt={6} px={1} mt={6}>
        <DefaultFooter content={footerRoutes} />
      </MKBox>
    </>
  );
}

export default ContactUs;
