import {
  Chip,
  Grid,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import Title from "./Title";
import { Link } from "react-router-dom";

export default function CountersTable(props) {
  return (
    <Grid container spacing={3} sx={{ pt: 13, pl: 35, pr: 5 }}>
      <Grid item xs={15}>
        <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
          <Title text="Counters" />
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell width="15%">ID Number</TableCell>
                <TableCell>Services</TableCell>
                <TableCell align="right">Edit</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.counters.map((counter) => (
                <TableRow key={counter.id}>
                  <TableCell>{counter.id}</TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={2}>
                      {counter.services.map((service) => (
                        <Chip
                          key={service.id}
                          color={service.color}
                          size="small"
                          label={service.name}
                        />
                      ))}
                    </Stack>
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      aria-label="edit"
                      component={Link}
                      to={`/admin/edit-counters/${counter.id}`}
                      state={{ counter: counter }}
                    >
                      <EditIcon fontSize="small" color="primary" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Grid>
    </Grid>
  );
}
