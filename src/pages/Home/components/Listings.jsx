/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Box, Grid } from "@mui/material";
import MKBox from "components/MKBox";
// Sections components

import View from "layouts/sections/components/View";

// Stats page components code
import tabsSimpleCode from "layouts/sections/navigation/nav-tabs/components/TabsSimple/code";
import MKTypography from "components/MKTypography";
// eslint-disable-next-line import/extensions
import propertyProData from "./propertyproData.js";

export default function Listings() {
  const [newprodata, setNewprodata] = useState(propertyProData.slice(1, 3));

  return (
    <>
      <Grid container item justifyContent="center" xs={10} lg={7} mx="auto" textAlign="center">
        <MKTypography variant="h3" mb={1} mt={16}>
          Looking for a Property?
        </MKTypography>
      </Grid>

      {newprodata.map((i) => (
        <View title={i.listingTitile} mapDetails={tabsSimpleCode}>
          <MKBox bgColor="white" py={6}>
            <Grid item xs={12}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-around",
                }}
              >
                <Box>
                  <MKTypography variant="body1" mb={2}>
                    <div>Price: N{i.price}</div>
                    <div>Bathrooms: {i.bathrooms}</div>
                    <div>Beds: {i.beds}</div>
                    <div>Toilets: {i.toilets}</div>
                    <div>Location: {`${i.street} ${i.city} ${i.state}`}</div>
                    <div>Status: {i.status}</div>
                    <div>Agent Contact: {i.agentContact}</div>
                    <div>Date Posted: {i.dateUpdated}</div>{" "}
                  </MKTypography>
                </Box>
                <Box>
                  <iframe
                    title={i.listingTitile}
                    src={i.listingURL}
                    width="100%"
                    height="400"
                    frameBorder="2"
                  />
                </Box>
              </Box>
            </Grid>
          </MKBox>
        </View>
      ))}
    </>
  );
}
