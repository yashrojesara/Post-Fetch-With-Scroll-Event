import React from "react";
import { useLocation } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

const DisplayPosts: React.FC = () => {
  const { state } = useLocation();
  return (
    <>
      <AppBar position="fixed">
        <Toolbar variant="dense">
          <Typography
            variant="h5"
            color="inherit"
            component="div"
            align="center"
          >
            Post lists
          </Typography>
        </Toolbar>
      </AppBar>
      <br></br>
      <br></br>
      <pre data-testid="post">{JSON.stringify(state, null, 2)}</pre>
    </>
  );
};
export default DisplayPosts;
