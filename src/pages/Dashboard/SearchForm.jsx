import { useState, useRef } from "react";

// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Switch from "@mui/material/Switch";
import MKButton from "components/MKButton";
import MKTypography from "components/MKTypography";
import { MenuItem, TextField, Box, FormControl, InputLabel, Input } from "@mui/material";
import { auth, collection, database, addDoc, getAuth } from "lib/firebase.prod";

const lgaArray = [
  "Alimosho",
  "Ajeromi-Ifelodun",
  "Kosofe",
  "Mushin",
  "Oshodi-Isolo",
  "Ojo",
  "Ikorodu",
  "Surulere",
  "Agege",
  "Ifako-Ijaiye",
  "Somolu",
  "Amuwo-Odofin",
  "Lagos Mainland",
  "Ikeja",
  "Eti-Osa",
  "Badagry",
  "Apapa",
  "Lagos Island",
  "Epe",
  "Ibeju-Lekki",
];
const stateArray = ["Lagos"];

const fileNoTypeArray = [
  "File No",
  "Deed Reg No",
  "Consent No",
  "CofO No",
  "Excision No",
  "Gazette No",
  "Tittle No (court)",
  "Survey Plan No",
  "Others",
];

function SearchForm() {
  const [checked, setChecked] = useState(true);
  const [values, setValues] = useState({
    state: "",
    fileNo: "",
    fileNoType: "",
    moreDetails: "",
    lga: "",
    selectedDocument: { file: null },
    selectedFile: null,
  });
  const formRef = useRef(null);

  const handleChange = (prop) => (event) => {
    if (prop === "selectedDocument") {
      setValues({
        ...values,
        selectedDocument: { file: event.target.files[0] },
        selectedFile: event.target.files[0],
      });
    } else {
      setValues({ ...values, [prop]: event.target.value });
    }
  };
  const handleChecked = () => setChecked(!checked);

  const handleReset = () => {
    formRef.current.reset();
    // setValidated(false);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    // const form = event.currentTarget;
    // if (form.checkValidity() === false) event.stopPropagation();
    // setValidated(true);

    // const data = new FormData(event.target);
    // const value = Object.fromEntries(data.entries());
    // const formJSON = JSON.stringify(values);
    const userName = auth.currentUser.displayName;
    const userEmail = auth.currentUser.email;
    const { uid } = auth.currentUser;
    const fireData = {
      userName,
      userEmail,
      uid,
      time: new Date(),
      propertyOnwership: "unconfirmed",
      reportUrl: "unavailable",
    };

    const metaData = Object.assign(fireData, values);
    console.log(metaData);

    // add to orders and users collections
    async function addToFirebase() {
      // eslint-disable-next-line no-unused-vars
      const docRef = await addDoc(collection(database, "orders"), metaData).catch((error) => {
        console.log(error);
      });

      const updates = { docID: docRef.id, orderData: values };
      getAuth()
        .updateUser(uid, {
          userOrders: [updates],
        })
        .then((userRecord) => {
          console.log("Successfully updated user", userRecord.toJSON());
        })
        .catch((error) => {
          console.log("Error updating user:", error);
        });
    }
    addToFirebase();

    // eslint-disable-next-line no-alert
    alert("Your order has been placed. Please await an email from us");
    // setValidated(true);
    handleReset();
  };

  return (
    <Container sx={{ m: 3 }}>
      <Grid container item justifyContent="center" xs={10} lg={7} mx="auto" textAlign="center">
        <MKTypography variant="h3" mb={1}>
          Make a Search
        </MKTypography>
      </Grid>

      {/* Box width */}
      <Grid container item xs={12} lg={7} sx={{ mx: "auto" }}>
        <Box
          component="form"
          ref={formRef}
          // sx={{
          //   "& .MuiTextField-root": { m: 1, width: "25ch" },
          // }}
          sx={{ width: "100%" }}
          noValidate
          autoComplete="off"
          onSubmit={(e) => handleSubmit(e)}
        >
          {/* =========================FILE NUMBER=========================== */}
          <FormControl fullWidth sx={{ m: 1 }} variant="standard">
            <InputLabel htmlFor="standard-adornment-amount">File No</InputLabel>
            <Input
              id="standard-adornment-amount"
              value={values.fileNo}
              onChange={handleChange("fileNo")}
            />
          </FormControl>
          {/* ==================================================== */}

          {/* =========================SELECTS=========================== */}

          {/* ===========FILE NUMBER TYPE============= */}
          <FormControl fullWidth variant="standard" sx={{ m: 1 }}>
            <TextField
              fullWidth
              id="state"
              select
              label="Select File No Type"
              value={values.fileNoType}
              onChange={handleChange("fileNoType")}
              variant="standard"
            >
              {fileNoTypeArray.map((i) => (
                <MenuItem key={i} value={i}>
                  {i}
                </MenuItem>
              ))}
            </TextField>
          </FormControl>
          {/* SELECT STATE  */}
          <FormControl fullWidth variant="standard" sx={{ m: 1 }}>
            <TextField
              fullWidth
              id="state"
              select
              label="Select Property State"
              value={values.state}
              onChange={handleChange("state")}
              variant="standard"
            >
              {stateArray.map((i) => (
                <MenuItem key={i} value={i}>
                  {i}
                </MenuItem>
              ))}
            </TextField>
          </FormControl>
          {/* SELECT LOCAL GOVERNMENT */}
          <FormControl fullWidth variant="standard" sx={{ m: 1 }}>
            <TextField
              id="lga"
              fullWidth
              select
              label="Select Property LGA"
              value={values.lga}
              onChange={handleChange("lga")}
              variant="standard"
            >
              {lgaArray.map((i) => (
                <MenuItem key={i} value={i}>
                  {i}
                </MenuItem>
              ))}
            </TextField>
          </FormControl>

          {/* ==================================================== */}

          {/* =========================MORE DETAILS=========================== */}
          <FormControl fullWidth sx={{ m: 1 }} variant="standard">
            <InputLabel htmlFor="more-details">More Details (optional)</InputLabel>
            <Input
              id="more-details"
              value={values.moreDetails}
              onChange={handleChange("moreDetails")}
            />
          </FormControl>
          {/* ==================================================== */}

          <Grid item xs={12} alignItems="center" m={0}>
            <Switch checked={checked} onChange={handleChecked} />
            <MKTypography
              variant="button"
              fontWeight="regular"
              color="text"
              ml={-1}
              sx={{ cursor: "pointer", userSelect: "none" }}
              onClick={handleChecked}
            >
              &nbsp;&nbsp;I agree the&nbsp;
            </MKTypography>
            <MKTypography component="a" href="#" variant="button" fontWeight="regular" color="dark">
              Terms and Conditions
            </MKTypography>
          </Grid>
          {/* </Grid> */}
          <Grid container item justifyContent="center" xs={12} my={2} spacing={2}>
            {/* UPLOAD ADD GRID BESIDE SEARCH */}
            {/* <Grid item xs={4}>
              <MKButton variant="gradient" color="info" component="label" fullWidth>
                Upload File
                <input type="file" name="upload" onChange={handleChange("selectedDocument")} />
              </MKButton>
            </Grid> */}
            <Grid item xs={8}>
              <MKButton type="submit" variant="gradient" color="dark" fullWidth>
                Search
              </MKButton>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Container>
  );
}

export default SearchForm;
