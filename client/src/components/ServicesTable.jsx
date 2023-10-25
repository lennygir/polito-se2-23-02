import {
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import Title from "./Title";

const services = [
  { id: 1, name: "Emergenze", description: "some text...", color: "error" },
  { id: 2, name: "Radiologia", description: "some text...", color: "info" },
  { id: 3, name: "Maternità", description: "some text...", color: "secondary" },
];

export default function ServicesTable(props) {
  return (
    <Grid container spacing={3} sx={{ pt: 13, pl: 35, pr: 5 }}>
      <Grid item xs={15}>
        <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
          <Title text="Services" />
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell width="15%">ID Number</TableCell>
                <TableCell width="15%">Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell align="right">Color</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {services.map((service) => (
                <TableRow key={service.id}>
                  <TableCell>{service.id}</TableCell>
                  <TableCell>{service.name}</TableCell>
                  <TableCell>{service.description}</TableCell>
                  <TableCell align="right">
                    <CircleIcon color={service.color} />
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
