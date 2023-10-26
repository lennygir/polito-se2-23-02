import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  Grid,
  Paper,
} from "@mui/material";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import Title from "./Title";
import API from "../API";

export default function EditCounterForm(props) {
  const location = useLocation();
  const navigate = useNavigate();

  const services = props.services;
  const counter = location.state?.counter;

  const initialServices = counter ? counter.services.map((s) => s.id) : [];

  const [selectedServices, setSelectedServices] = useState(initialServices);

  const handleCheckboxChange = (serviceId) => {
    if (selectedServices.includes(serviceId)) {
      setSelectedServices(
        selectedServices.filter((item) => item !== serviceId)
      );
    } else {
      setSelectedServices([...selectedServices, serviceId]);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      selectedServices.length > 0 &&
      selectedServices.length <= services.length
    ) {
      const newCounter = {
        ...counter,
        services: selectedServices,
      };
      API.updateCounter(newCounter)
        .then(() => {
          props.setDirty(true);
          navigate("/admin/counters");
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <Grid container spacing={3} sx={{ pt: 13, pl: 35, pr: 5 }}>
      <Grid item xs={15}>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIosNewIcon />}
          sx={{ marginBottom: 3, paddingX: 1 }}
          onClick={() => navigate("/admin/counters")}
        >
          Back
        </Button>
        <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
          <Title text={"Select services for Counter " + counter.id} />
          <Box sx={{ display: "flex" }}>
            <form onSubmit={handleSubmit}>
              <FormControl
                sx={{ m: 3 }}
                component="fieldset"
                variant="standard"
              >
                <FormLabel component="legend">
                  You can select one or more services
                </FormLabel>
                <FormGroup>
                  {services.map((service) => (
                    <FormControlLabel
                      key={service.id}
                      control={
                        <Checkbox
                          name={service.name}
                          checked={selectedServices.includes(service.id)}
                          onChange={() => handleCheckboxChange(service.id)}
                        />
                      }
                      label={service.name}
                    />
                  ))}
                </FormGroup>
                <FormHelperText>
                  *At least one service must be selected
                </FormHelperText>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={selectedServices.length === 0}
                  sx={{ marginTop: 3 }}
                >
                  Save
                </Button>
              </FormControl>
            </form>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
}
