/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable no-alert */
import { useState, useRef } from "react";
import { authListener } from "hooks";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Switch from "@mui/material/Switch";
import MKButton from "components/MKButton";
import MKTypography from "components/MKTypography";
import { MenuItem, TextField, Box, FormControl, InputLabel, Input } from "@mui/material";
import { auth, collection, database, addDoc, uploadToFireBase } from "lib/firebase.prod";
import { getAuth } from "firebase/auth";

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
    file: "",
    name: "",
    email: "",
  });
  const [progresspercent, setProgresspercent] = useState(0);
  const formRef = useRef(null);

  const handleChange = async (e, prop) => {
    const handleUrl = (url) => {
      setValues({ ...values, file: url });
    };

    e.preventDefault();
    if (prop === "file") {
      await uploadToFireBase(e.target.files[0], handleUrl, setProgresspercent);
    } else {
      setValues({ ...values, [prop]: e.target.value });
    }
  };
  // const handleChecked = () => setChecked(!checked);

  const handleReset = () => formRef.current.reset();

  // setValidated(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
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
    // add to orders and users collections
    async function addToFirebase() {
      const docRef = await addDoc(collection(database, "orders"), metaData).catch((error) => {
        console.log(error);
      });

      // await updateProfile(nauth.currentUser, {
      //   displayName: "Jane Q. User",
      //   photoURL: "https://example.com/jane-q-user/profile.jpg",
      //   userOrders: [docRef.id],
      // })
      //   .then(() => {
      //     console.log("Successfully updated user");
      //     handleReset();
      //   })
      //   .catch((error) => {
      //     console.log("Error updating user:", error);
      //   });
      // const q = await collection(database, "users")
      //   .where("uid", "==", uid)
      //   .get()
      //   .then((snapshot) => {
      //     snapshot.forEach((doc) => {
      //       console.log(doc.data());
      //       const userOrders = doc.data().userOrders;
      //       userOrders.push(docRef.id);
      //       updateDoc(collection(database, "users"), doc.id, { userOrders });
      //     });
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //   });

      //   // console.log(q.id);
      //   // const docs = await getDocs(q);
      //   // console.log(docs.id);
      //   // await updateDoc(docs, {
      //   //   capital: true,
      //   //   userOrders: [docRef.id],
      //   // });

      //   // await addDoc(collection(database, "users"), {
      //   //   userOrders: [docRef.id],
      //   // });
      //   // database
      //   //   .collection("users")
      //   //   .doc(nauth.currentUser)
      //   //   .update({
      //   //     // userOrders: firebase.firestore.FieldValue.arrayUnion(docRef.id),
      //   //     userOrders: [docRef.id],
      //   //   });
    }
    addToFirebase();

    alert("Your order has been placed. Please await an email from us");
    handleReset();
    // setValidated(true);
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
          {/* IF USER NOT AUTHENTICATED, COLLECT NAME AND EMAIL AND SIGNUP */}
          {authListener(
            null,
            <div>
              <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                <InputLabel htmlFor="standard-adornment-amount">Full Name</InputLabel>
                <Input
                  id="standard-adornment-amount"
                  value={values.name}
                  onChange={(e) => handleChange(e, "name")}
                />
              </FormControl>
              <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                <InputLabel htmlFor="standard-adornment-amount">Email Address</InputLabel>
                <Input
                  id="standard-adornment-amount"
                  value={values.email}
                  onChange={(e) => handleChange(e, "email")}
                />
              </FormControl>
            </div>
          )}
          {/* =========================FILE NUMBER=========================== */}
          <FormControl fullWidth sx={{ m: 1 }} variant="standard">
            <InputLabel htmlFor="standard-adornment-amount">File No</InputLabel>
            <Input
              id="standard-adornment-amount"
              value={values.fileNo}
              onChange={(e) => handleChange(e, "fileNo")}
            />
          </FormControl>
          {/* =========================================================== */}
          {/* =========================SELECTS=========================== */}
          {/* ======================FILE NUMBER TYPE===================== */}
          <FormControl fullWidth variant="standard" sx={{ m: 1 }}>
            <TextField
              fullWidth
              id="state"
              select
              label="Select File No Type"
              value={values.fileNoType}
              onChange={(e) => handleChange(e, "fileNoType")}
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
              onChange={(e) => handleChange(e, "state")}
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
              onChange={(e) => handleChange(e, "lga")}
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
              onChange={(e) => handleChange(e, "moreDetails")}
            />
          </FormControl>
          {/* ===================TERMS AND CONDITIONS=========================== */}

          {/* <Grid item xs={12} alignItems="center" m={0}>
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
          </Grid> */}
          {/* </Grid> */}

          {/* ====================UPLOAD BUTTON ======================== */}
          <Grid container item justifyContent="center" xs={12} my={2} spacing={2}>
            <Grid item xs={4}>
              <MKButton variant="gradient" color="info" component="label" fullWidth>
                <input type="file" name="img" hidden onChange={(e) => handleChange(e, "file")} />
                {progresspercent === 0 ? <p>Upload File</p> : <p> Progress: {progresspercent}%</p>}
              </MKButton>
            </Grid>
            {/*  =======================SUBMIT BUTTON ====================== */}
            <Grid item xs={8}>
              <MKButton type="submit" variant="gradient" color="dark" fullWidth>
                SUBMIT
              </MKButton>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Container>
  );
}

export default SearchForm;
