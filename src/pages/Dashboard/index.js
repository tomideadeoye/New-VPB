import React, { useEffect, useState } from "react";
import { auth, collection, getDocs, database } from "lib/firebase.prod";
import MKBox from "components/MKBox";
import { Grid } from "@mui/material";
// Sections components
import BaseLayout from "layouts/sections/components/BaseLayout";
import View from "layouts/sections/components/View";

// Stats page components code
import tabsSimpleCode from "layouts/sections/navigation/nav-tabs/components/TabsSimple/code";
import { routes, routeLoc } from "routes";
import MKTypography from "components/MKTypography";
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import SearchForm from "./SearchForm";
import TimelineProgress from "./TimelineProgress";

function Dashboard() {
  const [yourOrders, setYourOrders] = useState([]);

  useEffect(() => {
    const getSearches = async () => {
      const newData = [];

      const querySnapshot = await getDocs(collection(database, "orders"));
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (auth.currentUser.uid !== null && data.uid === auth.currentUser.uid) newData.push(data);
      });

      setYourOrders(newData);
    };
    getSearches();
  }, []);

  const previousSearches = () => (
    <>
      <MKTypography variant="h3" mb={2} mt={5}>
        Your Previous Searches
      </MKTypography>
      {yourOrders.map((i) => (
        <View title={`File NO: ${i.fileNo}`} mapDetails={tabsSimpleCode}>
          <MKBox bgColor="white" py={6}>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
              <Grid item xs={6}>
                <MKTypography variant="body1" mb={2}>
                  <div>Order Placed By: {i.userName}</div>
                  <div>Document Number: {i.fileNo}</div>
                  <div> State: {i.state}</div>
                  <div> Local Government Area: {i.lga}</div>
                  <div> Location: {i.location}</div>
                  <img src={i.file} alt="chdk" width="120px" height="120px" />
                  {/* <div>Search Received on: {String(i.time.toLocaleDateString())}</div> */}
                  <div> Report Url: {i.reportUrl}</div>
                </MKTypography>
              </Grid>

              <Grid item xs={6}>
                <TimelineProgress />
              </Grid>
            </Grid>
          </MKBox>
        </View>
      ))}
    </>
  );

  return (
    <MKBox display="flex" flexDirection="column" bgColor="white" minHeight="100vh">
      {/* NAVBAR */}
      <MKBox bgColor="white" shadow="sm" py={0.25}>
        <DefaultNavbar
          routes={routes}
          action={{
            type: "external",
            route: "/search",
            label: "New Search",
            color: "info",
          }}
          transparent
          relative
        />
      </MKBox>

      {/* NEW SEARCH */}

      {/* PREVIOUS SEARCHES */}
      <BaseLayout
        //   title="Dashboard"
        breadcrumb={[{ label: "Home", route: routeLoc.HOME }, { label: "Dashboard" }]}
      >
        {" "}
        <SearchForm />
        {yourOrders.length > 0 && previousSearches()}
      </BaseLayout>
    </MKBox>
  );
}

export default Dashboard;
