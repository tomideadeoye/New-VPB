/* eslint-disable react/prop-types */
import React, { useState } from "react";
import MKBox from "components/MKBox";
import Grid from "@mui/material/Grid";

import MKTypography from "components/MKTypography";
import MKButton from "components/MKButton";
import MKInput from "components/MKInput";
import { contactUs } from "lib/firebase.prod";

function Waitlist({ image }) {
  const [data, setData] = useState({
    email: "",
    name: "",
    content: "",
  });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    contactUs(data);
    setData({
      email: "",
      name: "",
      content: "",
    });
    // USER HAS BEEN SENT
    setSent(true);
  };

  return (
    <Grid container spacing={3} alignItems="center">
      <Grid item xs={12} lg={6} justifyContent="center" alignItems="center">
        <MKBox
          display={{ xs: "none", lg: "flex" }}
          width="calc(100 - 2rem)%"
          height="calc(80vh - 2rem)"
          borderRadius="lg"
          ml={2}
          mt={0}
          sx={{
            backgroundImage: `url(${image})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "contain",
          }}
        />
      </Grid>
      <Grid
        item
        xs={12}
        sm={10}
        md={7}
        lg={6}
        xl={4}
        ml={{ xs: "auto", lg: 6 }}
        mr={{ xs: "auto", lg: 6 }}
      >
        <MKBox
          bgColor="white"
          borderRadius="xl"
          shadow="lg"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          mt={{ xs: 20, sm: 18, md: 20 }}
          mb={{ xs: 20, sm: 18, md: 20 }}
          mx={3}
        >
          <MKBox
            variant="gradient"
            bgColor="info"
            coloredShadow="info"
            borderRadius="lg"
            p={2}
            mx={2}
            mt={-3}
          >
            <Grid container item justifyContent="center" xs={12} mt={1} mb={1}>
              <MKTypography variant="h3" color="white">
                Join our waitlist!
              </MKTypography>
            </Grid>
          </MKBox>
          <MKBox p={3}>
            {!sent ? (
              <>
                <MKTypography variant="body2" color="text" mb={3}>
                  Do you want register for a Certificate of Occupancy or get a certified true copy?
                  Join the wait list below
                </MKTypography>
                <MKBox width="100%" component="form" method="post" onSubmit={handleSubmit}>
                  {/* autocomplete="off" > */}
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <MKInput
                        variant="standard"
                        label="Full Name"
                        InputLabelProps={{ shrink: true }}
                        fullWidth
                        required
                        value={data.name}
                        onChange={(e) => setData({ ...data, name: e.target.value })}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <MKInput
                        type="email"
                        variant="standard"
                        label="Email"
                        InputLabelProps={{ shrink: true }}
                        placeholder="ex: verifypro@gmail.com"
                        fullWidth
                        required
                        value={data.email}
                        onChange={(e) => setData({ ...data, email: e.target.value })}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <MKInput
                        variant="standard"
                        label="How can we help you?"
                        placeholder={`Give us more details about your project \nexample: I have a survey paln but would also like to get a certificate of occupancy. `}
                        InputLabelProps={{ shrink: true }}
                        multiline
                        fullWidth
                        rows={6}
                        required
                        value={data.content}
                        onChange={(e) => setData({ ...data, content: e.target.value })}
                      />
                    </Grid>
                  </Grid>
                </MKBox>
                <Grid container item justifyContent="center" xs={12} mt={5} mb={2}>
                  <MKButton type="submit" variant="gradient" color="info">
                    JOIN WAITLIST
                  </MKButton>
                </Grid>
              </>
            ) : (
              <>
                <MKTypography variant="body2" color="text" mb={3}>
                  Thank you for subsribing to our waitlist!
                </MKTypography>
                <Grid container item justifyContent="center" xs={12} mt={5} mb={2}>
                  <MKButton onClick={() => setSent(false)} variant="gradient" color="info">
                    ENTER ANOTHER EMAIL
                  </MKButton>
                </Grid>
              </>
            )}
          </MKBox>
        </MKBox>
      </Grid>
    </Grid>
  );
}

export default Waitlist;
