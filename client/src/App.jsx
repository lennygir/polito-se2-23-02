import CssBaseline from "@mui/material/CssBaseline";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminPage from "./routes/AdminPage";
import ClientPage from "./routes/ClientPage";
import ErrorPage from "./routes/ErrorPage";
import LandingPage from "./routes/LandingPage";
import OfficerPage from "./routes/OfficerPage";
import RootPage from "./routes/RootPage";
import CountersTable from "./components/CountersTable";

function App() {
  return (
    <BrowserRouter>
      <CssBaseline />
      <Main />
    </BrowserRouter>
  );
}

function Main() {
  const [user, setUser] = useState("");

  return (
    <Routes>
      <Route path="/" element={<RootPage user={user} setUser={setUser} />}>
        <Route index element={<LandingPage setUser={setUser} />} />
        <Route path="admin" element={<AdminPage setUser={setUser} />}>
          <Route index path="counters" element={<CountersTable />} />
          <Route path="services" />
          <Route path="users" />
        </Route>
        <Route path="officer/:officerId" element={<OfficerPage />} />
        <Route path="client" element={<ClientPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
  );
}

export default App;
