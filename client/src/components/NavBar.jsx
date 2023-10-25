import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <div id="navbar-page">
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
      >
        <Toolbar sx={{ flexWrap: "wrap" }}>
          <Link to={"/"}>
            <IconButton
              color="primary"
              disableRipple
              disableFocusRipple
              disableTouchRipple
            >
              <LocalHospitalIcon fontSize="large" />
            </IconButton>
          </Link>
          <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
            PoliTO Medical Center
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}
