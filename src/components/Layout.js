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
import Tooltip from "@mui/material/Tooltip";
import ClientIcon from "@mui/icons-material/PeopleAlt";
import SettingsIcon from "@mui/icons-material/Settings";
import UpdateIcon from "@mui/icons-material/Update";
import AboutIcon from "@mui/icons-material/Info";
import DescriptionIcon from '@mui/icons-material/Description';
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import Grid from "@mui/material/Grid";
import ListLayout from "./ListLayout";
import DetailsLayout from "./DetailsLayout";
import MenuItem from "@mui/material/MenuItem";
import { auth, db } from "../config/firebase";
import { useSelector, useDispatch } from "react-redux";
// import { resetState } from "../redux/reducers/config";
import { Link } from "react-router-dom";

const drawerWidth = 150;

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

const settings = ["Logout"];

export default function Layout() {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const dispatch = useDispatch();

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
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    const handleSignOut = () => {
        auth.signOut();
        // dispatch(resetState());
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <AppBar open={open}>
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
                    <Typography variant="h6" noWrap component="div"></Typography>
                    <Box sx={{ flexGrow: 0, marginLeft: "auto" }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar></Avatar>
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: "45px" }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            <MenuItem key="logout" onClick={handleSignOut}>
                                <Typography textAlign="center">Logout</Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open}>
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        <ChevronLeftIcon />
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                <ListItem key={"dashboard"} disablePadding sx={sx_ListItem}>
                        <ListItemButton component={Link} to={`/dashboard`} sx={sx_ListItemButton}>
                            <ListItemIcon sx={sx_ListItemIcon}>
                             <DescriptionIcon/>
                            </ListItemIcon>
                            <ListItemText primary={"dashboard"} sx={sx_ListItemText} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem key={"main"} disablePadding sx={sx_ListItem}>
                        <ListItemButton component={Link} to={`/main`} sx={sx_ListItemButton}>
                            <ListItemIcon sx={sx_ListItemIcon}>
                                <ClientIcon />
                            </ListItemIcon>
                            <ListItemText primary={"Client"} sx={sx_ListItemText} />
                        </ListItemButton>
                    </ListItem>
                </List>
                <Divider />
                <List>
                    <ListItem key={"Settings"} disablePadding sx={sx_ListItem}>
                        <ListItemButton component={Link} to={`/settings`} sx={sx_ListItemButton}>
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
            {/* <ListLayout /> */}
            {/* <Divider orientation="vertical" variant="middle" flexItem /> */}

            {/* <DetailsLayout /> */}
        </Box>
    );
}
