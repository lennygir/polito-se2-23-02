import {
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import Title from "./Title";

const users = [
  { id: 1, name: "Alice", address: "some text...", role: "Officer" },
  { id: 2, name: "Bob", address: "some text...", role: "Officer" },
  { id: 3, name: "Chuck", address: "some text...", role: "Officer" },
  { id: 4, name: "Dillon", address: "some text...", role: "Admin" },
];

export default function UsersTable(props) {
  return (
    <Grid container spacing={3} sx={{ pt: 13, pl: 35, pr: 5 }}>
      <Grid item xs={15}>
        <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
          <Title text="Users" />
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell width="15%">Name</TableCell>
                <TableCell>Address</TableCell>
                <TableCell align="right">Role</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.address}</TableCell>
                  <TableCell align="right">{user.role}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Grid>
    </Grid>
  );
}
