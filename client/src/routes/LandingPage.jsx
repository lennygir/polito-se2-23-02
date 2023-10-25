import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  Grid,
  Typography,
} from "@mui/material";

import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import LocalPoliceIcon from "@mui/icons-material/LocalPolice";
import SettingsIcon from "@mui/icons-material/Settings";
import { Link } from "react-router-dom";

const roles = [
  {
    name: "Officer",
    buttonText: "Get Started",
    buttonVariant: "outlined",
    route: "/officer",
    icon: <LocalPoliceIcon sx={{ height: 60, width: 60 }} />,
  },
  {
    name: "Client",
    buttonText: "Get Started",
    buttonVariant: "contained",
    route: "/client",
    icon: <PersonAddAlt1Icon sx={{ height: 60, width: 60 }} />,
  },
  {
    name: "Admin",
    buttonText: "Get Started",
    buttonVariant: "outlined",
    route: "/admin/counters",
    icon: <SettingsIcon sx={{ height: 60, width: 60 }} />,
  },
];

export default function LandingPage(props) {
  return (
    <div id="landing-page">
      <Container
        disableGutters
        maxWidth="sm"
        component="main"
        sx={{ pt: 20, pb: 6 }}
      >
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
          Welcome to the PoliTO Medical Center
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="text.secondary"
          component="p"
        >
          Select your type of user to start using the app.
        </Typography>
      </Container>
      {/* End hero unit */}
      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          {roles.map((role) => (
            <Grid item key={role.name} xs={12} md={4}>
              <Card>
                <CardHeader
                  title={role.name}
                  titleTypographyProps={{ align: "center" }}
                  sx={{
                    backgroundColor: (theme) =>
                      theme.palette.mode === "light"
                        ? theme.palette.grey[200]
                        : theme.palette.grey[700],
                  }}
                />
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {role.icon}
                  </Box>
                </CardContent>
                <CardActions>
                  <Button
                    component={Link}
                    to={role.route}
                    fullWidth
                    variant={role.buttonVariant}
                    onClick={() => props.setUser(role.name)}
                  >
                    {role.buttonText}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}
