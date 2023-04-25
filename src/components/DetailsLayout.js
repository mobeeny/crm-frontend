import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

export default function DetailsLayout() {
    const [value, setValue] = React.useState(2);

    // const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    //     setValue(newValue);
    // };

    return (
        <>
            <Box>
                <h4>Client Details:</h4>
                <Tabs value={value} aria-label="disabled tabs example" centered>
                    <Tab label="Details" />
                    <Tab label="Company" />
                    <Tab label="Projects" />
                    <Tab label="Quotes" />
                    <Tab label="Invoices" />
                    <Tab label="Payments" />
                </Tabs>
            </Box>
        </>
    );
}
