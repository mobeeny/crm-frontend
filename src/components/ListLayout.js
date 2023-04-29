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

export default function ListLayout() {
  return (
    <>
      <Grid container direction="column" maxWidth={360}>
        <Grid item sx={{ textAlign: "right", margin: 2 }}>
          <Button variant="contained">Add User</Button>
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
