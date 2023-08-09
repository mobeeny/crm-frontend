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
import Profile from "./Detail_Profile";
import DataLoader from "./DataLoader";
import DetailCompany from "./Detail_Company";

export default function DetailsLayout() {
    const [selectedTab, setSelectedTab] = React.useState(0);

    const handleTabChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    return (
        <>
            <Grid container direction="column">
                <Grid item sx={{ textAlign: "left", marginTop: 8 }}>
                    {/* <Alert severity="success">This is a success alert — check it out!</Alert> */}
                </Grid>
                <Grid item textAlign="center" width="100%">
                    <Tabs
                        value={selectedTab}
                        onChange={handleTabChange}
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
                </Grid>
                {/* <Counter /> */}
                {/* <DataLoader /> */}
                {/* <SampleFirebaseComponent /> */}
                <Grid item textAlign="center" width="100%" sx={{ textAlign: "left", padding: 1 }}>
                    {selectedTab == 0 ? (
                        <Profile sx={{ textAlign: "left", margin: 2 }} />
                    ) : selectedTab == 1 ? (
                        <DetailCompany sx={{ textAlign: "left", margin: 2 }} />
                    ) : selectedTab == 2 ? (
                        <>Projects</>
                    ) : selectedTab == 3 ? (
                        <>Quotes</>
                    ) : selectedTab == 4 ? (
                        <>Invoices</>
                    ) : (
                        <>Payments</>
                    )}
                </Grid>
            </Grid>
        </>
    );
}
