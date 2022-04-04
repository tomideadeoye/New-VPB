// @mui material components
import Container from "@mui/material/Container";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";
import PsychologyIcon from "@mui/icons-material/Psychology";
import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
import Grid from "@mui/material/Grid";

// Material Kit 2 React components
import MKBox from "components/MKBox";

// Material Kit 2 React examples
import DefaultInfoCard from "examples/Cards/InfoCards/DefaultInfoCard";
import CenteredBlogCard from "examples/Cards/BlogCards/CenteredBlogCard";
import { routeLoc } from "routes";
import insightsImage from "assets/images/propertyin.jpg";

function Information() {
  return (
    <MKBox component="section" py={12}>
      <Container>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} lg={6}>
            <Grid container justifyContent="flex-start">
              <Grid item xs={12} md={6}>
                <MKBox mb={5}>
                  <DefaultInfoCard
                    icon={<TrackChangesIcon fontSize="large" />}
                    title="Mission"
                    description="Our mission is to enable easy verification of property rights in Africa.
                   "
                  />
                </MKBox>
              </Grid>
              <Grid item xs={12} md={6}>
                <MKBox mb={5}>
                  <DefaultInfoCard
                    icon={<PsychologyIcon fontSize="large" />}
                    title="Creativity"
                    description="we challenge each other to build useful product"
                  />
                </MKBox>
              </Grid>
              <Grid item xs={12} md={6}>
                <MKBox mb={{ xs: 5, md: 0 }}>
                  <DefaultInfoCard
                    icon={<AccessibilityNewIcon fontSize="large" />}
                    title="Meaning"
                    description="We create solutions that make real impact in people's lives
                    "
                  />
                </MKBox>
              </Grid>
              <Grid item xs={12} md={6}>
                <MKBox mb={{ xs: 5, md: 0 }}>
                  <DefaultInfoCard
                    icon={<PrecisionManufacturingIcon fontSize="large" />}
                    title="Innovation"
                    description="We believe the future is created by those who invent today"
                  />
                </MKBox>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} lg={4} sx={{ ml: "auto", mt: { xs: 3, lg: 0 } }}>
            <CenteredBlogCard
              image={insightsImage}
              title="Get property insights now"
              description="Your dashboard includes your previous searches, the timeline for delivery and a form for starting a new search."
              action={{
                type: "internal",
                route: routeLoc.DASHBOARD,
                color: "info",
                label: "Your Dashboard",
              }}
            />
          </Grid>
        </Grid>
      </Container>
    </MKBox>
  );
}

export default Information;
