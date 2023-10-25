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
import Title from "./Title";
import { useState } from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useNavigate } from "react-router-dom";

export default function EditCounterForm(props) {
  const navigate = useNavigate();
  const [counter, setCounter] = useState(undefined);

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
          <Title text={"Select services for Counter 1"} />
          <Box sx={{ display: "flex" }}>
            <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
              <FormLabel component="legend">
                You can select one or more services
              </FormLabel>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox checked={true} name="gilad" />}
                  label="Radiologia"
                />
                <FormControlLabel
                  control={<Checkbox checked={false} name="jason" />}
                  label="Emergenze"
                />
                <FormControlLabel
                  control={<Checkbox checked={true} name="antoine" />}
                  label="Maternità"
                />
              </FormGroup>
              <FormHelperText>
                *At least one service must be selected
              </FormHelperText>
              <Button variant="contained" sx={{ marginTop: 3 }}>
                Save
              </Button>
            </FormControl>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
}
