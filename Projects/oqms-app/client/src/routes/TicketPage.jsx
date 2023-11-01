import {
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Box,
} from "@mui/material";
import { Link, useParams } from "react-router-dom";
import Title from "../components/Title";

export default function TicketPage(props) {
  const { ticketNumber, serviceName } = useParams();

  const service = props.services.find((s) => s.name === serviceName);

  return (
    <div id="ticket-page">
      <Container
        disableGutters
        maxWidth="xs"
        component="main"
        sx={{ pt: 20, pb: 6 }}
      >
        <Card>
          <CardContent>
            <Title text="Ticket Details" />
            <Typography variant="subtitle1">
              <span style={{ fontWeight: "bold" }}>Service:</span>{" "}
              {service.name}
            </Typography>
            <Typography variant="subtitle1">
              <span style={{ fontWeight: "bold" }}>Ticket Number:</span>{" "}
              {ticketNumber}
            </Typography>
            <Typography variant="subtitle1">
              <span style={{ fontWeight: "bold" }}>Expected Service Time:</span>{" "}
              {service.serviceTime} minutes
            </Typography>
          </CardContent>
        </Card>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          marginTop={4}
        >
          <Link to="/">
            <Button variant="contained" onClick={() => "/"}>
              Home
            </Button>
          </Link>
        </Box>
      </Container>
    </div>
  );
}
