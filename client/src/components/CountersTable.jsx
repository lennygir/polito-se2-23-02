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

const rows = [
  {
    id: 1,
    date: "24/10/2023",
    services: [{ id: 2, name: "Radiologia", color: "info" }],
  },
  {
    id: 2,
    date: "25/10/2023",
    services: [
      { id: 1, name: "Emergenze", color: "error" },
      { id: 3, name: "Maternità", color: "secondary" },
    ],
  },
  {
    id: 3,
    date: "26/10/2023",
    services: [
      { id: 1, name: "Emergenze", color: "error" },
      { id: 2, name: "Radiologia", color: "info" },
      { id: 3, name: "Maternità", color: "secondary" },
    ],
  },
];

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
              {rows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={2}>
                      {row.services.map((service) => (
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
                    <IconButton aria-label="edit">
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
