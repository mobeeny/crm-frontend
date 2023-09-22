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
import { setCompanyContacts } from '../redux/reducers/clients';
import { useDispatch } from 'react-redux';


export default function D_ClientRole(props) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [maxWidth, setMaxWidth] = React.useState('sm');
  const [fullWidth, setFullWidth] = React.useState(true);
  const [title, setTitle] = React.useState('')
  const [remarks, setRemarks] = React.useState('')
  const [checked, setChecked] = React.useState(true);

  const handleClose = () => {
    props.setShowDialog(false)
  };
  const handleSave = () =>{
    dispatch(setCompanyContacts({ id: props.client.id, title:title,remarks:remarks,status:checked }))
    props.setShowDialog(false)

  }
  const dispatch = useDispatch()

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
        <DialogTitle style={{ marginLeft: '0' }}>Enter Role for {props.client.name}</DialogTitle>

        <div style={{ margin: '3%', marginTop: 0 }}>
          <TextField
            style={{ width: '100%', marginBottom: '20px' }}
            id="ntn"
            label="Title"
            type="name"
            variant="standard"
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            style={{ width: '100%', marginBottom: '20px' }}
            id="inc"
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
