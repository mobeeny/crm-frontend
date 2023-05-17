import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { Alert, Grid } from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import ProfileIcon from "@mui/icons-material/Person2";
import CompanyIcon from "@mui/icons-material/Business";
import ProjectIcon from "@mui/icons-material/AccountTree";
import QuoteIcon from "@mui/icons-material/RequestQuote";
import InvoiceIcon from "@mui/icons-material/Receipt";
import PaymentsIcon from "@mui/icons-material/Paid";
import Counter from "./Counter";
import SampleFirebaseComponent from 
export default function DetailsLayout() {
  const [value, setValue] = React.useState(2);

  // const handleChange = (event: React.SyntheticEvent, newValue: number) => {
  //     setValue(newValue);
  // };

  return (
    <>
      <Grid container direction="column">
        <Grid item sx={{ textAlign: "left", margin: 2 }}>
          <Alert severity="success">
            This is a success alert — check it out!
          </Alert>
        </Grid>
        <Grid item textAlign="center" width="100%">
          <Tabs
            value={value}
            // onChange={handleChange}
            variant="fullWidth"
            aria-label="icon label tabs example"
          >
            <Tab icon={<ProfileIcon />} label="Profile" />
            <Tab icon={<CompanyIcon />} label="Company" />
            <Tab icon={<ProjectIcon />} label="Projects" />
            <Tab icon={<QuoteIcon />} label="Quotes" />
            <Tab icon={<InvoiceIcon />} label="Invoices" />
            <Tab icon={<PaymentsIcon />} label="Payments" />
          </Tabs>
          Form for New User
          <input type="date" id="birthdate" name="birthdate" />
        </Grid>
        <Counter />
        <SampleFirebaseComponent/>
      </Grid>
    </>
  );
}
