import { Box, Card, Grid, IconButton, Typography } from "@mui/material";
import { useState } from "react";
import { styled } from "@mui/system";
import ProposalSettings from "./PropsalSettings";
import InvoiceSettings from "./InvoiceSettings";
import ProductsServicesSettings from "./ProductsServicesSettings";
import GeneralSettings from "./GeneralSettings";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";

const StyledCard = styled(Card)`
    width: 250px;
    height: 200px;
    margin: 16px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s, box-shadow 0.2s;

    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
        transform: translateY(-4px);
        box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.15);
        cursor: pointer;
    }
`;

const renderView = (view) => {
    switch (view) {
        case "General":
            return <GeneralSettings />;

        case "Products & services":
            return <ProductsServicesSettings />;

        case "Proposal Settings":
            return <ProposalSettings />;

        case "Invoice Settings":
            return <InvoiceSettings />;

        default:
            break;
    }
};

const viewOptions = (changeView) => {
    return (
        <Grid container direction="row">
            <StyledCard onClick={() => changeView("General")}>
                General
            </StyledCard>
            <StyledCard onClick={() => changeView("Products & services")}>
                <Typography>Products & services</Typography>
            </StyledCard>
            <StyledCard onClick={() => changeView("Proposal Settings")}>
                <Typography>Proposal Settings</Typography>
            </StyledCard>
            <StyledCard onClick={() => changeView("Invoice Settings")}>
                <Typography>Invoice Settings</Typography>
            </StyledCard>
        </Grid>
    );
};

const Settings = () => {
    const [view, setView] = useState("main");
    console.log("here is view", view);

    function changeView(view) {
        setView(view);
    }

    return (
        <Grid container direction="column" spacing={4}>
            <Grid item mt={3}>
                <Typography variant="h5">Settings</Typography>
                {view !== "main" ? (
                    <Box display="flex" direction="column" alignItems="center">
                        <IconButton onClick={() => changeView("main")}>
                            <ArrowBackRoundedIcon />
                        </IconButton>
                        <Typography>{view}</Typography>
                    </Box>
                ) : null}
            </Grid>
            <Grid item>
                {view === "main" ? viewOptions(changeView) : renderView(view)}
            </Grid>
        </Grid>
    );
};

export default Settings;
