import React, { createContext, useState, useContext } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const NotificationContext = createContext();

const NotificationSnackbar = ({ children }) => {
  const [notification, setNotification] = useState({
    open: false,
    severity: '',
    message: '',
  });

  const handleClose = () => {
    setNotification({ ...notification, open: false });
  };

  const showNotification = (severity, message) => {
    setNotification({
      open: true,
      severity: severity,
      message: message,
    });
  };

  return (
    <NotificationContext.Provider value={showNotification}>
      <Snackbar open={notification.open} autoHideDuration={6000} onClose={handleClose}>
        <div>
        <Alert onClose={handleClose} severity={notification.severity}>
          {notification.message}
        </Alert>
        </div>
      </Snackbar>
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationSnackbar;
export { NotificationContext };


