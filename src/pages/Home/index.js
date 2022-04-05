// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import MKSocialButton from "components/MKSocialButton";

import { DefaultFooter } from "pages/Footer";
import FilledInfoCard from "examples/Cards/InfoCards/FilledInfoCard";

// Presentation page sections
import Information from "pages/Home/sections/Information";
// import DesignBlocks from "pages/Home/sections/DesignBlocks";
// import Pages from "pages/Home/sections/Pages";
import Testimonials from "pages/Home/sections/Testimonials";
// import Download from "pages/Home/sections/Download";
import Faqs from "pages/Home/sections/Faqs";

// Home page components
import BuiltByDevelopers from "pages/Home/components/BuiltByDevelopers";

// import routes from "routes";
import { routeLoc, footerRoutes } from "routes";

// Images
import bgImage from "assets/images/bg-presentation.jpg";
import NavbarDark from "components/CustomComponents/NavbarDark";
import GoogleMapComponent from "components/CustomComponents/GoogleMapComponent";

function Home() {
  return (
    <>
      <NavbarDark />
      <MKBox
        minHeight="75vh"
        width="100%"
        sx={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "top",
          display: "grid",
          placeItems: "center",
        }}
      >
        <Container>
          <Grid container item xs={12} lg={7} justifyContent="center" textAlign="center" mx="auto">
            <MKTypography
              variant="h1"
              color="white"
              mt={-6}
              mb={1}
              sx={({ breakpoints, typography: { size } }) => ({
                [breakpoints.down("md")]: {
                  fontSize: size["3xl"],
                },
              })}
            >
              Tittle Searches at the Speed of Light.{" "}
            </MKTypography>
            <MKTypography
              variant="body1"
              color="white"
              textAlign="center"
              px={{ xs: 6, lg: 12 }}
              mt={1}
            >
              Do you want to confirm who owns a property before you buy? We help you verify your
              property
            </MKTypography>
          </Grid>
        </Container>
      </MKBox>
      <Card
        sx={{
          p: 2,
          mx: { xs: 2, lg: 3 },
          mt: -8,
          mb: 4,
          backgroundColor: ({ palette: { white }, functions: { rgba } }) => rgba(white.main, 0.8),
          backdropFilter: "saturate(200%) blur(30px)",
          boxShadow: ({ boxShadows: { xxl } }) => xxl,
        }}
      >
        <Information />
        <Faqs />
        {/* <DesignBlocks /> */}
        {/* <Pages /> */}
        <Container sx={{ mt: 6 }}>
          <BuiltByDevelopers />
        </Container>
        <Container sx={{ mt: 6, bgcolor: "background.paper", boxShadow: 0.3, borderRadius: 2 }}>
          <GoogleMapComponent />
        </Container>

        <Container>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={4}>
              <FilledInfoCard
                variant="gradient"
                color="info"
                icon="search"
                title="Search Tittle Documents"
                description="Enter the relecant no for the title document you are looking to validate."
                action={{
                  type: "external",
                  route: routeLoc.DASHBOARD,
                  label: "Let's start",
                }}
              />
            </Grid>
            <Grid item xs={12} lg={4}>
              <FilledInfoCard
                color="info"
                icon="map"
                title="Find on Map"
                description="The map section on your dasboard contains visualizes your searched coordinates"
                action={{
                  type: "external",
                  route: routeLoc.DASHBOARD,
                  label: "Read more",
                }}
              />
            </Grid>
            <Grid item xs={12} lg={4}>
              <FilledInfoCard
                color="info"
                icon="public"
                title="Check Public Records"
                description="We partner with public institutions to provide additional records about Lagos State."
                action={{
                  type: "external",
                  route: routeLoc.RECORDS,
                  label: "Read more",
                }}
              />
            </Grid>
          </Grid>
        </Container>

        <Testimonials />
        {/* <Download /> */}
        <MKBox pt={18} pb={6}>
          <Container>
            <Grid container spacing={3}>
              <Grid item xs={12} lg={5} ml="auto" sx={{ textAlign: { xs: "center", lg: "left" } }}>
                <MKTypography variant="h4" fontWeight="bold" mb={0.5}>
                  Thank you for your support!
                </MKTypography>
                <MKTypography variant="body1" color="text">
                  Accuracy is our pride.
                </MKTypography>
              </Grid>
              <Grid
                item
                xs={12}
                lg={5}
                my={{ xs: 5, lg: "auto" }}
                mr={{ xs: 0, lg: "auto" }}
                sx={{ textAlign: { xs: "center", lg: "right" } }}
              >
                <MKSocialButton
                  component="a"
                  href="https://twitter.com/intent/tweet?text=Check%20VerifyPro%20to%20avoid%20being%20defrauded%20%40on%20%23webdesign%20%23designsystem%20%23mui5&amp;url=https%3A%2F%2Fwww.creative-tim.com%2Fproduct%2Fmaterial-kit-react"
                  target="_blank"
                  color="twitter"
                  sx={{ mr: 1 }}
                >
                  <i className="fab fa-twitter" />
                  &nbsp;Tweet
                </MKSocialButton>
                <MKSocialButton
                  component="a"
                  href="https://www.facebook.com/sharer/sharer.php?u=https://www.creative-tim.com/product/material-kit-react"
                  target="_blank"
                  color="facebook"
                  sx={{ mr: 1 }}
                >
                  <i className="fab fa-facebook" />
                  &nbsp;Share
                </MKSocialButton>
                <MKSocialButton
                  component="a"
                  href="https://www.pinterest.com/pin/create/button/?url=https://www.creative-tim.com/product/material-kit-react"
                  target="_blank"
                  color="pinterest"
                >
                  <i className="fab fa-pinterest" />
                  &nbsp;Pin it
                </MKSocialButton>
              </Grid>
            </Grid>
          </Container>
        </MKBox>
      </Card>
      <MKBox pt={6} px={1} mt={6}>
        <DefaultFooter content={footerRoutes} />
      </MKBox>
    </>
  );
}

export default Home;
