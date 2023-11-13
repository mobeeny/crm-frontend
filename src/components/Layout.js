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
import Backdrop from '@mui/material/Backdrop';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import ProfileIcon from "@mui/icons-material/Person2";
import CompanyIcon from "@mui/icons-material/Business";
import AddClientDialog from "./D_NewClient";
import { setClientDialog, setCompanyDialog, setProjectDialog, setQuotationDialog, setInvoiceDialog, setPaymentDialog } from "../redux/reducers/dialogFlags";
import AddCompanyDialog from "./D_NewCompany";
import TaskIcon from "@mui/icons-material/TaskAlt";
import AddProjectDialog from "./D_NewProjects";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import AddQuotationDialog from './D_NewQuotations'
import AddInvoiceDialog from "./D_NewInvoices";
import ReceiptIcon from "@mui/icons-material/Receipt";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import AddPaymentDialog from "./D_NewPayments";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useState } from "react";
import { Popover } from "@mui/material";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import AddQuotaionDialog from "./D_NewQuotations";
import { setSpeedDialDialog } from "../redux/reducers/dialogFlags";



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

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const speedDialDialogOpen = useSelector((state) => state.dialogs.speedDialDialogOpen);

    // const [showClientDialog, setShowClientDialog] = React.useState(false)
    // const [, setShowDialog]clientDialogOpen = React.useState(false); // State to control dialog visibility






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

    const handleMouseEnterSpeedDial = () => {
        dispatch(setSpeedDialDialog(true));
    };

    // Handle SpeedDial close on mouse leave
    const handleMouseLeaveSpeedDial = () => {
        dispatch(setSpeedDialDialog(false));
    };

    // const handleClientDialoge = () => {
    //     setShowClientDialog(true);
    // }



    const [anchorClient, setAnchorClient] = useState(null);
    const [anchorCompany, setAnchorCompany] = useState(null);
    const [anchorProject, setAnchorProject] = useState(null);
    const [anchorQuotation, setAnchorQuotation] = useState(null);







    const handleCloseMenu = () => {
        setAnchorClient(null);
    };

    const openMenu = Boolean(anchorClient);
    const openMenu1 = Boolean(anchorCompany);
    const openMenu2 = Boolean(anchorProject);
    const openMenu3 = Boolean(anchorQuotation);



    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <AppBar open={open}>
                <Toolbar>
                    <img src="./logo.png" style={{ maxWidth: "120px", marginRight: "5ch", marginLeft: "2ch" }} />
                    <Typography variant="h6" noWrap component="div"></Typography>
                    <div>
                        <Tabs centered>
                            <Tab
                                onClick={(event) => setAnchorClient(event.currentTarget)}
                                style={{
                                    textTransform: 'none',
                                    color: 'white',
                                    fontSize: '16px',
                                    fontWeight: 'bold',
                                    padding: '10px',
                                    fontFamily: 'Roboto, sans-serif',

                                    alignItems: 'center', // Vertically center the content
                                    flexDirection: "row"
                                }}
                                label={
                                    <>
                                        Clients
                                        <ArrowDropDownIcon />
                                    </>
                                }
                            />
                            <Tab
                                onClick={(event) => setAnchorCompany(event.currentTarget)}
                                style={{
                                    textTransform: 'none',
                                    color: 'white',
                                    fontSize: '16px',
                                    fontWeight: 'bold',
                                    padding: '10px',
                                    fontFamily: 'Roboto, sans-serif',
                                    alignItems: 'center', // Vertically center the content
                                    flexDirection: "row"
                                }}
                                label={
                                    <>
                                        Companies
                                        <ArrowDropDownIcon />
                                    </>
                                }
                            />
                            <Tab
                                onClick={(event) => setAnchorProject(event.currentTarget)}

                                style={{
                                    textTransform: 'none',
                                    color: 'white',
                                    fontSize: '16px',
                                    fontWeight: 'bold',
                                    padding: '10px',
                                    fontFamily: 'Roboto, sans-serif',
                                    alignItems: 'center', // Vertically center the content
                                    flexDirection: "row"
                                }}
                                label={
                                    <>
                                        Projects
                                        <ArrowDropDownIcon />
                                    </>
                                }
                            />
                            <Tab
                                onClick={(event) => setAnchorQuotation(event.currentTarget)}

                                style={{
                                    textTransform: 'none',
                                    color: 'white',
                                    fontSize: '16px',
                                    fontWeight: 'bold',
                                    padding: '10px',
                                    fontFamily: 'Roboto, sans-serif',
                                    alignItems: 'center', // Vertically center the content
                                    flexDirection: "row"
                                }}
                                label={
                                    <>
                                        Quotation
                                        <ArrowDropDownIcon />
                                    </>
                                }
                            />
                        </Tabs>

                        <Popover
                            open={openMenu}
                            anchorEl={anchorClient}
                            onClose={() => setAnchorClient(null)}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'center',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'center',
                            }}
                        >
                            <ListItemButton to={`/clients`}>All clients </ListItemButton>

                        </Popover>

                        <Popover
                            open={openMenu1}
                            anchorEl={anchorCompany}
                            onClose={() => setAnchorCompany(null)}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'center',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'center',
                            }}
                        >
                            <ListItemButton to={`/company`}>All Companies </ListItemButton>

                        </Popover>

                        <Popover
                            open={openMenu2}
                            anchorEl={anchorProject}
                            onClose={() => setAnchorProject(null)}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'center',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'center',
                            }}
                        >
                            <MenuItem onClick={handleCloseMenu}>All projects</MenuItem>

                        </Popover>
                        <Popover
                            open={openMenu3}
                            anchorEl={anchorQuotation}
                            onClose={() => setAnchorQuotation(null)}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'center',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'center',
                            }}
                        >
                            <ListItemButton to={`/quotaion`}>All Quotations </ListItemButton>
                            <ListItemButton onClick={() => dispatch(setQuotationDialog(true))}>Create New Quotation </ListItemButton>
                            <AddQuotationDialog /> {/* Add this line if you want to render the dialog immediately */}
                        </Popover>
                    </div>


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
            <Drawer variant="permanent" open={open} sx={{ marginRight: 0, paddingRight: 0 }}>
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        <ChevronLeftIcon />
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>

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


            <div onMouseEnter={handleMouseEnterSpeedDial}
                onMouseLeave={handleMouseLeaveSpeedDial}>
                <SpeedDial
                    ariaLabel="SpeedDial tooltip example"
                    sx={{ position: 'absolute', bottom: 16, right: 16 }}
                    icon={<SpeedDialIcon />}
                    style={{ margin: "3%" }}
                    open={speedDialDialogOpen}
                >

                    <SpeedDialAction
                        key={"client"}
                        icon={<ProfileIcon />}
                        tooltipTitle={"Client"}
                        tooltipOpen
                        onClick={() => dispatch(setClientDialog(true))}
                    />
                    <AddClientDialog />


                    <SpeedDialAction
                        key={"project"}
                        icon={<TaskIcon />}
                        tooltipTitle={"Project"}
                        tooltipOpen
                        onClick={() => dispatch(setProjectDialog(true))}
                    />
                    <AddProjectDialog />



                    <SpeedDialAction
                        key={"invoice"}
                        icon={<ReceiptIcon />}
                        tooltipTitle={"Invoice"}
                        tooltipOpen
                        onClick={() => dispatch(setInvoiceDialog(true))}
                    />
                    <AddInvoiceDialog />

                    <SpeedDialAction
                        key={"payment"}
                        icon={<AttachMoneyIcon />}
                        tooltipTitle={"Payment"}
                        tooltipOpen
                        onClick={() => dispatch(setPaymentDialog(true))}
                    />
                    <AddPaymentDialog />

                    <SpeedDialAction
                        key={"company"}
                        icon={<CompanyIcon />}
                        tooltipTitle={"Company"}
                        tooltipOpen
                        onClick={() => dispatch(setCompanyDialog(true))}
                    />
                    <AddCompanyDialog />

                    <SpeedDialAction
                        key={"Quotation"}
                        icon={<FormatQuoteIcon />}
                        tooltipTitle={"Quotation"}
                        tooltipOpen
                        onClick={() => dispatch(setQuotationDialog(true))}
                    />
                    <AddQuotationDialog />

                </SpeedDial>


            </div>
            {/* <ListLayout /> */}
            {/* <Divider orientation="vertical" variant="middle" flexItem /> */}

            {/* <DetailsLayout /> */}
        </Box>
    );
}
