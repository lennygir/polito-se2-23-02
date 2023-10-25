import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";

export default function NavBar(props) {
  return (
    <div id="navbar-page">
      <AppBar
        position="fixed"
        color="default"
        elevation={0}
        sx={{
          borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar sx={{ flexWrap: "wrap" }}>
          <Link to={"/"}>
            <IconButton
              color="primary"
              disableRipple
              disableFocusRipple
              disableTouchRipple
              onClick={() => props.setUser("")}
            >
              <LocalHospitalIcon fontSize="large" />
            </IconButton>
          </Link>
          <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
            PoliTO Medical Center
          </Typography>
          <Typography variant="h6" color="text.secondary">
            {props.user !== "" ? `Logged in as ${props.user}` : null}
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}
