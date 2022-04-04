import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MKBox from "components/MKBox";
import MKBadge from "components/MKBadge";
import MKTypography from "components/MKTypography";
// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

const faqsData = [
  {
    id: 1,
    header: "What is VerifyProp?",
    body: "Verify Pro is building a real-time database of property transactions and ownership in Nigeria. We leverage geo-spatial data to provide effictive visualisation of property ownersip. Our goal it to curb real-estate fraud on the continent.!",
  },
  {
    id: 2,
    header: "How much does VerifyPro cost?",
    body: "30% Cost saving compared to exiting solutions because of our technology adoption and government partnership. Subscription Based (200k), One off Payment (30k)",
  },
  {
    id: 3,
    header: "How long does it take to verify?",
    body: "Our solution reduces the time taken in the validation of title from 180 days to 10 working days owing to our government partnership ",
  },
  {
    id: 4,
    header: "What documents do I need to verify?",
    body: "Our solution reduces the time taken in the validation of title from 180 days to 10 working days owing to our government partnership ",
  },
  {
    id: 5,
    header: "How do I pay?",
    body: "After filling an application for a property. You will get a charge in your email and a link though which you can pay.",
  },
];

export default function Accordions() {
  return (
    <MKBox component="section" py={6} my={6}>
      <Container>
        <Grid
          container
          item
          xs={12}
          lg={6}
          flexDirection="column"
          alignItems="center"
          sx={{ textAlign: "center", my: 6, mx: "auto", px: 0.75 }}
        >
          <MKBadge
            variant="contained"
            color="info"
            badgeContent="Questions?"
            container
            sx={{ mb: 2 }}
          />
          <MKTypography variant="h2" fontWeight="bold">
            Faqs
          </MKTypography>
          <MKTypography variant="body1" color="text">
            We have created a list of the most commonly asked questions below. We hope you find them
            helpful.
          </MKTypography>
        </Grid>
      </Container>
      <Container>
        {faqsData.map((item) => (
          <Accordion key={item.id}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>{item.header}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{item.body}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}{" "}
      </Container>
    </MKBox>
  );
}
