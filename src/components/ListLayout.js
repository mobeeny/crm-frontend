import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListSubheader from "@mui/material/ListSubheader";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import Avatar from "@mui/material/Avatar";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { Button, Container, Grid, Stack } from "@mui/material";
import database from "../firebaseConfig";
import { useState, useEffect } from "react";
import { ref, set } from "firebase/database";

export default function ListLayout() {
  const [data, setData] = useState(null);
  // useEffect(() => {

  // }, []);
  const setFData = async () => {
    set(ref(database, "tenco/users/" + 1), {
      username: "Mobeen",
      email: "Email@hlc.com",
    });
  };
  return (
    <>
      <Grid container direction="column" maxWidth={360}>
        <Grid item sx={{ textAlign: "right", margin: 2 }}>
          <Button variant="contained" onClick={setFData}>
            Add User
          </Button>
        </Grid>
        <Grid
          item
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        >
          <List
            subheader={
              <ListSubheader component="div" id="nested-list-subheader">
                Users/Projects
              </ListSubheader>
            }
          >
            <ListItemButton>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <BeachAccessIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="User Name" secondary="July 20, 2014" />
              </ListItem>
            </ListItemButton>
            <Divider component="li" />
            <ListItemButton>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <BeachAccessIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="User Name" secondary="July 20, 2014" />
              </ListItem>
            </ListItemButton>

            <Divider component="li" />
            <ListItemButton>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <BeachAccessIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="User Name" secondary="July 20, 2014" />
              </ListItem>
            </ListItemButton>
          </List>
        </Grid>
      </Grid>
    </>
  );
}
