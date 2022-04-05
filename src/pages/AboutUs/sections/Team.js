// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";

// Material Kit 2 React examples
import HorizontalTeamCard from "examples/Cards/TeamCards/HorizontalTeamCard";
import team1 from "assets/images/tomide.png";
import team2 from "assets/images/timi.png";
import team3 from "assets/images/temidayo.png";
import team4 from "assets/images/rachel.png";
import team5 from "assets/images/mubaarak.png";
import { Link } from "react-router-dom";
// import { routeLoc } from "routes";
import Bio from "pages/Bio";

function Team() {
  return (
    <MKBox
      component="section"
      variant="gradient"
      bgColor="dark"
      position="relative"
      py={6}
      px={{ xs: 2, lg: 0 }}
      mx={-2}
    >
      <Container>
        <Grid container>
          <Grid item xs={12} md={8} sx={{ mb: 6 }}>
            <MKTypography variant="h3" color="white">
              The Team
            </MKTypography>
            <MKTypography variant="body2" color="white" opacity={0.8}>
              If everyone is moving forward together, then success takes care of itself. – Henry
              Ford
            </MKTypography>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={6}>
            <MKBox mb={1}>
              <Link to={<Bio />}>
                <HorizontalTeamCard
                  image={team1}
                  name="Tomide Adeoye"
                  position={{ color: "info", label: "Software Engineer" }}
                  description="Bachelor of Laws (LLB) Software Developer Smart Contract Researcher."
                />
              </Link>
            </MKBox>
          </Grid>

          <Grid item xs={12} lg={6}>
            <MKBox mb={1}>
              <HorizontalTeamCard
                image={team2}
                name="Timileyin Idowu"
                position={{ color: "info", label: "Growth Manager" }}
                description="BSc. Economics Financial Advisory Fundraise lead and Data Analyst."
              />
            </MKBox>
          </Grid>
          <Grid item xs={12} lg={6}>
            <MKBox mb={{ xs: 1, lg: 0 }}>
              <HorizontalTeamCard
                image={team3}
                name="Temidayo Akinyelure"
                position={{ color: "info", label: "Product Manager" }}
                description="BSc. Architecture, Masters in Environmental Design Architect/Product Manager."
              />
            </MKBox>
          </Grid>
          <Grid item xs={12} lg={6}>
            <MKBox mb={{ xs: 1, lg: 0 }}>
              <HorizontalTeamCard
                image={team4}
                name="Rachel Magaji"
                position={{ color: "info", label: "Product Designer" }}
                description="BSc. Environmental Sciences Marketing Consultant Product Designer."
              />
            </MKBox>
          </Grid>
          <Grid item xs={12} lg={6}>
            <MKBox mb={{ xs: 1, lg: 0 }}>
              <HorizontalTeamCard
                image={team5}
                name="Mubaarak AbdulHameed"
                position={{ color: "info", label: "Civil Engineer" }}
                description="BSc. Civil Engineering Quality Control/Site Engineer Member ASCE, NICE."
              />
            </MKBox>
          </Grid>
        </Grid>
      </Container>
    </MKBox>
  );
}

export default Team;
