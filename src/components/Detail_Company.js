//This is a Sample Redux Component
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getDocs, query, where } from "firebase/firestore";
import { increment, decrement } from "../redux/reducers/counter";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { setCompanyPrimaryClient } from "../redux/reducers/companyCrud";
import {
  Alert,
  Box,
  FormControl,
  InputLabel,
  Snackbar,
  TextField,
} from "@mui/material";
import {
  setSelectedCompany,
  setSelectedCompanyId,
} from "../redux/reducers/selectedCompany";
import { db, instancesRef, auth } from "../config/firebase";
import { collection, doc, updateDoc, getDoc } from "firebase/firestore";
import { current } from "@reduxjs/toolkit";
import SaveIcon from "@mui/icons-material/Save";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { setChangeCompanyOwnershipDialog } from "../redux/reducers/dialogFlags";
import SelectClientComponent from "./SelectClientComponent";
import { useNavigate } from "react-router-dom";

function DetailCompany() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState("sm");

  const navigate = useNavigate();

  const selectedCompany = useSelector(
    (state) => state.selectedCompany.selectedCompany
  );
  const selectedCompanyId = useSelector(
    (state) => state.selectedCompany.selectedCompanyId
  );
  const selectedClientId = useSelector(
    (state) => state.selectedClient.selectedClientId
  );
  const [companyList, setCompanyList] = useState([]);
  let currentCompany = selectedCompany || {};

  useEffect(() => {
    currentCompany = selectedCompany || {};
    console.log("CHANGED CURRENT COMPANY: ", currentCompany);
  }, [selectedCompany]);

  const changeCompanyOwnershipDialogOpen = useSelector(
    (state) => state.dialogs.changeCompanyOwnershipDialogOpen
  );

  const companyPrimaryClient = useSelector(
    (state) => state.companyCrud.companyPrimaryClient
  );

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const getCompaniesList = async () => {
    try {
      const companysRef = collection(
        db,
        instancesRef + auth.currentUser.uid + "/company"
      );

      // const companiesListData = await getDocs(companysRef);
      const q = query(
        companysRef,
        where("primaryClientId", "==", selectedClientId)
      );
      const companiesListData = await getDocs(q);

      const companies = companiesListData.docs.map((doc) => {
        return {
          id: doc.id,
          sid: doc.data().companySid,
          title: doc.data().name,
          ...doc.data()
        };
      });
      //Set All companies for Dropdown
      setCompanyList(companies);
      //Set First company for default
      dispatch(setSelectedCompanyId(companies[0].id))
      console.log("Debug: companysRef", companies);

    } catch (err) {}
  };



  useEffect(() => {
    getCompaniesList();
  }, []);

  // const username = useSelector((state) => state.config.username);

  const dispatch = useDispatch();
  const [toastOpen, setToastOpen] = useState(false);

  const methodOwnershipChange = () => {
    currentCompany = {
      ...currentCompany,
      primaryClientId: companyPrimaryClient.id,
    };
    dispatch(setSelectedCompany(currentCompany));
  };

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    currentCompany = {
      ...currentCompany,
      [id]: value,
    };
    //Update the Value in Store
    console.log("Change: ", currentCompany);
    dispatch(setSelectedCompany(currentCompany));
    console.log("CURRENT COMPANY UPDATED:", currentCompany);
  };

  const handleDropDownChange = (e) => {
    dispatch(setSelectedCompanyId(e.target.value));
  };

  const updateCompanyProfile = async (id) => {
    const companyDoc = doc(
      db,
      instancesRef + auth.currentUser.uid + "/company",
      id
    );
    console.log("UPDATE COMPANY: ", companyDoc);
    await updateDoc(companyDoc, currentCompany);
    // dispatch(setUpdatedClient());
    setToastOpen(true);
    dispatch(setChangeCompanyOwnershipDialog(false));
    navigate("/company");
  };

  const getCompanyData = async () => {
    try {
      const companyCollectionRef = collection(
        db,
        instancesRef + auth.currentUser.uid + "/company"
      );
      const companyDocRef = doc(companyCollectionRef, selectedCompanyId);
      const docSnapShot = await getDoc(companyDocRef);
      if (docSnapShot.exists()) {
        dispatch(setSelectedCompany(docSnapShot.data()));
      }
    } catch (err) {
      console.log("error", err);
    }
  };

  useEffect(() => {
    getCompanyData();
  }, [selectedCompanyId]);

  useEffect(() => {
    methodOwnershipChange();
  }, [companyPrimaryClient]);

  return (
    <div>
      <Card width="100%">
        <CardMedia
          sx={{ height: 40 }}
          image="/static/images/banner1.jpg"
          title=""
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}>
          <FormControl
            variant="filled"
            sx={{ ml: 2, mt: 1, minWidth: 320 }}>
            <InputLabel id="demo-simple-select-standard-label">
              Companies
            </InputLabel>
            <Select
              value={selectedCompanyId}
              defaultValue={selectedCompanyId}
              onChange={handleDropDownChange} //={dispatch(setSelectedCompanyId(company.id))}
              label="Companies for selected client">
              {companyList.map((company) => (
                <MenuItem value={company.id}>
                  {company.title + " - #" + company.sid}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <div>
            <Dialog
              open={changeCompanyOwnershipDialogOpen}
              onClose={(event, reason) => {
                if (reason !== "backdropClick") {
                  handleClose();
                }
              }}
              disableEscapeKeyDown
              fullWidth={fullWidth}
              maxWidth={maxWidth}>
              <DialogTitle>Change Company Ownership</DialogTitle>
              <DialogContent>
                <Box
                  component="form"
                  sx={{
                    "& .MuiTextField-root": { m: 1, width: "28ch" },
                  }}
                  noValidate
                  autoComplete="off">
                  {/* <TextField
                    autoFocus
                    id="client"
                    label="Client"
                    type="name"
                    variant="standard"
                    // onChange={(e) => setClient(e.target.value)}
                  /> */}
                  <SelectClientComponent
                    dispatchAction={setCompanyPrimaryClient}
                  />
                </Box>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button
                  variant="contained"
                  onClick={() => updateCompanyProfile(selectedCompanyId)}>
                  Change Client
                </Button>
              </DialogActions>
            </Dialog>
          </div>
          <div>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              style={{ marginLeft: "auto" }}
              color="inherit">
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}>
              <MenuItem
                onClick={() => dispatch(setChangeCompanyOwnershipDialog(true))}>
                Transfer Ownership
              </MenuItem>
              <MenuItem onClick={handleClose}>Delete - TBD</MenuItem>
            </Menu>
          </div>
        </div>

        {/* <TransferCompanyOwnershipDialog /> */}
        <CardContent>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "35ch" },
            }}
            noValidate
            autoComplete="off">
            <TextField
              autoFocus
              id="companySid"
              label="Company Id"
              variant="standard"
              value={currentCompany.companySid}
              onChange={handleInputChange}
              InputLabelProps={{
                // shrink: !!currentUser.name
                shrink: true,
              }}
            />
            <TextField
              autoFocus
              id="name"
              label="Company Name"
              type="name"
              variant="standard"
              value={currentCompany.name}
              onChange={handleInputChange}
              InputLabelProps={{
                // shrink: !!currentUser.name
                shrink: true,
              }}
            />
            <TextField
              id="email"
              label="Company Email"
              type="email"
              variant="standard"
              value={currentCompany.email}
              onChange={handleInputChange}
              InputLabelProps={{
                // shrink: !!currentUser.name
                shrink: true,
              }}
            />
            <TextField
              id="ntn"
              label="NTN #"
              type="name"
              value={currentCompany.ntn}
              onChange={handleInputChange}
              variant="standard"
              InputLabelProps={{
                // shrink: !!currentUser.name
                shrink: true,
              }}
            />
            <TextField
              id="inc"
              label="Inc #"
              type="name"
              value={currentCompany.inc}
              onChange={handleInputChange}
              variant="standard"
              InputLabelProps={{
                // shrink: !!currentUser.name
                shrink: true,
              }}
            />
            <TextField
              id="gst"
              label="GST #"
              fullWidth
              variant="standard"
              value={currentCompany.gst}
              onChange={handleInputChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              id="phone"
              label="Company Phone #"
              type="phone"
              variant="standard"
              value={currentCompany.phone}
              onChange={handleInputChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              id="rto"
              label="RTO City"
              type="name"
              variant="standard"
              value={currentCompany.city}
              onChange={handleInputChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              id="electricity"
              label="Electricity Ref. #"
              type="name"
              variant="standard"
              value={currentCompany.electricity}
              onChange={handleInputChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              id="pAcctivity"
              label="Principal Activity"
              type="name"
              variant="standard"
              value={currentCompany.pactivity}
              onChange={handleInputChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              id="address"
              label="Company Address"
              type="name"
              variant="standard"
              value={currentCompany.address}
              onChange={handleInputChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              id="bankName"
              label="Bank Name"
              type="name"
              variant="standard"
              value={currentCompany.bankName}
              onChange={handleInputChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              id="bankAcc"
              label="Account No"
              type="name"
              variant="standard"
              value={currentCompany.bankAccountNo}
              onChange={handleInputChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              id="bankCode"
              label="Branch Code"
              type="name"
              variant="standard"
              value={currentCompany.branchCode}
              onChange={handleInputChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              id="contactDate"
              label="Contact Date"
              type="date"
              variant="standard"
              value={currentCompany.cDate}
              onChange={handleInputChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              id="notes"
              label="Notes"
              type="textarea"
              variant="standard"
              value={currentCompany.notes}
              onChange={handleInputChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              id="regDate"
              label="Comp. Reg Date"
              type="date"
              variant="standard"
              value={currentCompany.rDate}
              onChange={handleInputChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              id="gstDate"
              label="GST Date"
              type="date"
              variant="standard"
              value={currentCompany.gDate}
              onChange={handleInputChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              id="source"
              label="Source"
              type="name"
              variant="standard"
              value={currentCompany.source}
              onChange={handleInputChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Box>
        </CardContent>
        <CardActions>
          <Box
            sx={{
              m: 2,
            }}>
            <Button
              variant="contained"
              onClick={() => updateCompanyProfile(selectedCompanyId)}
              startIcon={<SaveIcon />}>
              Save
            </Button>
          </Box>
        </CardActions>
      </Card>
      <Snackbar
        autoHideDuration={2000}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        open={toastOpen}
        onClose={() => setToastOpen(false)}
        key={{ vertical: "bottom", horizontal: "left" }}>
        <Alert
          onClose={() => setToastOpen(false)}
          severity="success"
          sx={{ width: "100%" }}>
          Changes Saved Successfully
        </Alert>
      </Snackbar>
    </div>
  );
}

export default DetailCompany;
