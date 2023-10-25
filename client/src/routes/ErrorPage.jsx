import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function ErrorPage() {
  return (
    <div id="error-page">
      <Container
        disableGutters
        maxWidth="sm"
        component="main"
        sx={{ pt: 8, pb: 6 }}
      >
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="text.primary"
            gutterBottom
          >
            Oops...
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="text.secondary"
            component="p"
          >
            This is not the route you're looking for.
          </Typography>
          <Box marginTop={4}>
            <Link to="/">
              <Button variant="contained">Go back</Button>
            </Link>
          </Box>
        </Grid>
      </Container>
    </div>
  );
}
