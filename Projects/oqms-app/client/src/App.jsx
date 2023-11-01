import CssBaseline from "@mui/material/CssBaseline";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminPage from "./routes/AdminPage";
import ClientPage from "./routes/ClientPage";
import ErrorPage from "./routes/ErrorPage";
import LandingPage from "./routes/LandingPage";
import OfficerPage from "./routes/OfficerPage";
import RootPage from "./routes/RootPage";
import TicketPage from "./routes/TicketPage";
import CountersTable from "./components/CountersTable";
import CountersForm from "./components/CountersForm";
import ServicesTable from "./components/ServicesTable";
import API from "./API";

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
  const [services, setServices] = useState([]);
  const [counters, setCounters] = useState([]);
  const [dirty, setDirty] = useState(true);

  useEffect(() => {
    if (dirty) {
      API.getCountersServices()
        .then((counters) => setCounters(counters))
        .catch((err) => console.log(err));

      API.getServices()
        .then((services) => setServices(services))
        .catch((err) => console.log(err));

      setDirty(false);
    }
  }, [dirty]);

  return (
    <Routes>
      {/* prettier-ignore */}
      <Route path="/" element={<RootPage user={user} setUser={setUser} />}>
        <Route index element={<LandingPage setUser={setUser} />} />
        <Route path="admin" element={<AdminPage setUser={setUser} />}>
          <Route index path="counters" element={<CountersTable counters={counters}/>} />
          <Route path="edit-counters/:counterId" element={<CountersForm services={services} setDirty={setDirty}/>}/>
          <Route path="services" element={<ServicesTable services={services}/>}/>
        </Route>
        <Route path="officer" element={<OfficerPage counters={counters}/>} />
        <Route path="client" element={<ClientPage services={services} setDirty={setDirty} />} />
        <Route path="client/:serviceName/ticket/:ticketNumber" element={<TicketPage services={services} counters={counters} />} />
        <Route path="*" element={<ErrorPage setUser={setUser} />} />
      </Route>
    </Routes>
  );
}

export default App;
