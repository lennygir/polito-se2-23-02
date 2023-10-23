import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminPage from "./routes/AdminPage";
import ClientPage from "./routes/ClientPage";
import ErrorPage from "./routes/ErrorPage";
import LandingPage from "./routes/LandingPage";
import OfficerPage from "./routes/OfficerPage";
import RootPage from "./routes/RootPage";

function App() {
  return (
    <BrowserRouter>
      <CssBaseline />
      <Main />
    </BrowserRouter>
  );
}

function Main() {
  return (
    <Routes>
      <Route path="/" element={<RootPage />}>
        <Route index element={<LandingPage />} />
        <Route path="admin" element={<AdminPage />} />
        <Route path="officer/:officerId" element={<OfficerPage />} />
        <Route path="client" element={<ClientPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
  );
}

export default App;
