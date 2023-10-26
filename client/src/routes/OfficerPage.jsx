import {
  Alert,
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { useState } from "react";
import API from "../API";

export default function OfficerPage(props) {
  const [selectedCounter, setSelectedCounter] = useState("");
  const [clientToServe, setClientToServe] = useState(undefined);
  const [message, setMessage] = useState("");

  const handleChange = (event) => {
    setSelectedCounter(event.target.value);
  };

  const callNextClient = () => {
    if (selectedCounter !== "") {
      API.getNextClient(selectedCounter)
        .then((client) => {
          setClientToServe(client);
        })
        .catch((err) => setMessage("The queue is empty at the moment."));
    }
  };

  return (
    <div id="officer-page">
      <Container
        disableGutters
        maxWidth="sm"
        component="main"
        sx={{ pt: 20, pb: 6 }}
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
            Select your counter
          </Typography>
          <FormControl fullWidth>
            <InputLabel>Counter ID</InputLabel>
            <Select
              value={selectedCounter}
              onChange={handleChange}
              label="Counter ID"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {props.counters.map((counter) => (
                <MenuItem key={counter.id} value={counter.id}>
                  Counter number {counter.id}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Box marginTop={4}>
            <Button
              disabled={selectedCounter === ""}
              variant="contained"
              onClick={callNextClient}
            >
              Call next client
            </Button>
          </Box>
          {message !== "" && (
            <Box marginTop={4} width="inherit">
              <Alert severity="warning" onClose={() => setMessage("")}>
                {message}
              </Alert>
            </Box>
          )}
          {clientToServe && (
            <Box marginTop={4} width="inherit">
              <Alert
                severity="info"
                onClose={() => setClientToServe(undefined)}
              >
                Next client in line is: {clientToServe}
              </Alert>
            </Box>
          )}
        </Grid>
      </Container>
    </div>
  );
}
