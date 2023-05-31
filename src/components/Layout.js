import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";

import UsersIcon from "@mui/icons-material/PeopleAlt";
import SettingsIcon from "@mui/icons-material/Settings";
import UpdateIcon from "@mui/icons-material/Update";
import AboutIcon from "@mui/icons-material/Info";

import Grid from "@mui/material/Grid";
import ListLayout from "./ListLayout";
import DetailsLayout from "./DetailsLayout";

const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up("sm")]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    ...(open && {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": openedMixin(theme),
    }),
    ...(!open && {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme),
    }),
}));

export default function Layout() {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const sx_ListItemButton = {
        minHeight: 48,
        justifyContent: open ? "initial" : "center",
        px: 2.5,
    };
    const sx_ListItemIcon = {
        minWidth: 0,
        mr: open ? 3 : "auto",
        justifyContent: "center",
    };
    const sx_ListItemText = { opacity: open ? 1 : 0 };
    const sx_ListItem = { display: "block" };
    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <AppBar position="fixed" open={open}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{
                            marginRight: 5,
                            ...(open && { display: "none" }),
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        Hosterlink CRM - TENCO
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open}>
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === "rtl" ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                {/* ["Users", "Company", "Projects", "Quotes", "Invoices", "Payments"] */}
                <List>
                    <ListItem key={"Users"} disablePadding sx={sx_ListItem}>
                        <ListItemButton sx={sx_ListItemButton}>
                            <ListItemIcon sx={sx_ListItemIcon}>
                                <UsersIcon />
                            </ListItemIcon>
                            <ListItemText primary={"Users"} sx={sx_ListItemText} />
                        </ListItemButton>
                    </ListItem>
                </List>
                <Divider />
                <List>
                    <ListItem key={"Settings"} disablePadding sx={sx_ListItem}>
                        <ListItemButton sx={sx_ListItemButton}>
                            <ListItemIcon sx={sx_ListItemIcon}>
                                <SettingsIcon />
                            </ListItemIcon>
                            <ListItemText primary={"Settings"} sx={sx_ListItemText} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem key={"Updates"} disablePadding sx={sx_ListItem}>
                        <ListItemButton sx={sx_ListItemButton}>
                            <ListItemIcon sx={sx_ListItemIcon}>
                                <UpdateIcon />
                            </ListItemIcon>
                            <ListItemText primary={"Updates"} sx={sx_ListItemText} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem key={"About"} disablePadding sx={sx_ListItem}>
                        <ListItemButton sx={sx_ListItemButton}>
                            <ListItemIcon sx={sx_ListItemIcon}>
                                <AboutIcon />
                            </ListItemIcon>
                            <ListItemText primary={"About"} sx={sx_ListItemText} />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Drawer>
            <ListLayout />
            <Divider orientation="vertical" variant="middle" flexItem />

            <DetailsLayout />
        </Box>
    );
}
