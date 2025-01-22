import { Outlet } from "react-router-dom";
import Menu from "./common/Menu";

const Layout = () => {
  return (
    <>
      <Outlet />
      <Menu />
    </>
  );
};

export default Layout;
