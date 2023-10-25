import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";

export default function RootPage() {
  return (
    <div id="root-page">
      <NavBar />
      <Outlet />
    </div>
  );
}
