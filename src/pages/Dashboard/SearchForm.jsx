import { useState } from "react";

// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Switch from "@mui/material/Switch";
import MKButton from "components/MKButton";
import MKTypography from "components/MKTypography";
import { MenuItem, TextField, Box, FormControl, InputLabel, Input } from "@mui/material";

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
];

function SearchForm() {
  const [checked, setChecked] = useState(true);
  const [values, setValues] = useState({
    state: "",
    fileNo: "",
    fileNoType: "",
    lga: "",
    selectedDocument: { file: null },
    selectedFile: null,
  });

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

  return (
    <Container>
      <Grid container item justifyContent="center" xs={10} lg={7} mx="auto" textAlign="center">
        <MKTypography variant="h3" mb={1}>
          Make a Search
        </MKTypography>
      </Grid>
      <Grid container item xs={12} lg={7} sx={{ mx: "auto" }}>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          {/* <Grid item xs={12}> */}
          <div>
            {/* FILE NUMBER */}
            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
              <InputLabel htmlFor="standard-adornment-amount">File No</InputLabel>
              <Input
                id="standard-adornment-amount"
                value={values.fileNo}
                onChange={handleChange("fileNo")}
              />
            </FormControl>

            {/* FILE TYPE */}
            <TextField
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
            {/* SELECT STATE */}
            <TextField
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
            {/* SELECT LOCAL GOVERNMENT */}
            <TextField
              id="lga"
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
          </div>
          {/* </Grid> */}
          <Grid item xs={12}>
            <TextField variant="standard" label="More Details" multiline fullWidth rows={6} />
          </Grid>

          <Grid item xs={12} alignItems="center" ml={-1}>
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
            <Grid item xs={4}>
              <MKButton variant="gradient" color="info" component="label" fullWidth>
                Upload File
                <input type="file" name="upload" onChange={handleChange("selectedDocument")} />
              </MKButton>
            </Grid>
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
