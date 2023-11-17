import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import showDialogOpen from './SearchClientsCompanyForm'
import { TextField } from '@mui/material';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCompanyContacts, setCreateContactId } from '../redux/reducers/companyCrud';


export default function D_ContactRole(props) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [maxWidth, setMaxWidth] = React.useState('sm');
  const [fullWidth, setFullWidth] = React.useState(true);
  const [title, setTitle] = React.useState('')
  const [remarks, setRemarks] = React.useState('')
  const [checked, setChecked] = React.useState(true);
  const [name, setName] = useState("")

  const companyContacts = useSelector((state) => state.companyCrud.companyContacts) || [];
  const createContactId = useSelector((state) => state.companyCrud.createContactId);

  const handleClose = () => {
    props.setShowDialog(false)
  };
  const handleSave = () => {

    const contact = props.contact.id < 100 ? { id: props.contact.id, title: title, remarks: remarks, name: name, status: checked } : { id: props.contact.id, title: title, remarks: remarks, name: props.contact.name, status: checked }
    const updatedCompanyContacts = [...companyContacts, contact];
    console.log(updatedCompanyContacts)
    dispatch(setCompanyContacts(updatedCompanyContacts))
    dispatch(setCreateContactId(Number(createContactId)+1))
    props.setShowDialog(false)

  }
  const dispatch = useDispatch()

  console.log("ID",props.contact.id)
  return (
    <div>
      <Dialog
        maxWidth={maxWidth}
        fullWidth={fullWidth}
        fullScreen={fullScreen}
        open={props.open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle style={{ marginLeft: '0' }}>Enter Role for {props.contact.id == 0 ? "New Person" : props.contact.name}</DialogTitle>

        <div style={{ margin: '3%', marginTop: 0 }}>
          {props.contact.id <100 ?
            <TextField
              style={{ width: '100%', marginBottom: '20px' }}
              id="name"
              label="Name "
              type="name"
              variant="standard"
              onChange={(e) => setName(e.target.value)}
            /> : null}
          <TextField
            style={{ width: '100%', marginBottom: '20px' }}
            id="title"
            label="Title"
            type="name"
            variant="standard"
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            style={{ width: '100%', marginBottom: '20px' }}
            id="remarks"
            label="Remarks/Info"
            type="name"
            variant="standard"
            onChange={(e) => setRemarks(e.target.value)}
          />
          <DialogActions>
            <FormControlLabel
              onChange={(e) => setChecked(e.target.checked)}
              control={<Switch defaultChecked />} label="Active" />
            <Button
              onClick={handleSave}
              style={{ backgroundColor: '#1976D2', color: 'white' }}
              autoFocus
            >
              Save
            </Button>
          </DialogActions>
        </div>
      </Dialog>

    </div>
  );
}
