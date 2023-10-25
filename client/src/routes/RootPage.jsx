import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";

export default function RootPage(props) {
  return (
    <div id="root-page">
      <NavBar user={props.user} setUser={props.setUser} />
      <Outlet />
    </div>
  );
}
