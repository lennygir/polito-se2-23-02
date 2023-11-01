import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import API from "../API";

export default function ClientPage(props) {
  const navigate = useNavigate();
  const theme = useTheme();
  const [selectedService, setSelectedService] = useState(null);

  const handleServiceSelect = (serviceId) => {
    setSelectedService(serviceId);
  };

  const getClientTicket = () => {
    if (selectedService !== null) {
      const service = props.services.find((s) => s.id === selectedService);
      API.getTicket(selectedService)
        .then((ticket) => {
          navigate(`/client/${service.name}/ticket/${ticket}`);
          props.setDirty(true);
        })
        .catch((err) => console.log(e));
    }
  };

  return (
    <div id="client-page">
      <Container
        disableGutters
        maxWidth="md"
        component="main"
        sx={{ pt: 15, pb: 6 }}
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
            Select one of the services
          </Typography>

          <Grid container justifyContent="center" spacing={2}>
            {props.services.map((service) => (
              <Grid item key={service.id} xs={12} md={4}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Card
                    sx={{
                      width: 230,
                      height: 150,
                      border:
                        selectedService === service.id
                          ? `2px solid ${theme.palette.primary.main}`
                          : "2px solid transparent",
                    }}
                  >
                    <CardActionArea
                      sx={{
                        height: 150,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        justifyContent: "space-between",
                      }}
                      onClick={() => handleServiceSelect(service.id)}
                    >
                      <CardContent
                        sx={{
                          height: "100%",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                        }}
                      >
                        <div>
                          <Typography gutterBottom variant="h5">
                            {service.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {service.description}
                          </Typography>
                        </div>
                        <div>
                          <Typography variant="body2" color="text.primary">
                            Service time: ~ {service.serviceTime} minutes
                          </Typography>
                        </div>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </div>
              </Grid>
            ))}
          </Grid>

          <Button
            variant="contained"
            disabled={selectedService === null}
            color="primary"
            sx={{ marginTop: 4 }}
            onClick={getClientTicket}
          >
            Get Ticket
          </Button>
        </Grid>
      </Container>
    </div>
  );
}
