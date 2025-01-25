import { Outlet } from "react-router-dom";
import Menu from "./common/Menu";

const Layout = () => {
  return (
    <>
      <div className="max-w-[600px] mx-auto min-h-[800px]">
        <Outlet />
      </div>
      <Menu />
    </>
  );
};

export default Layout;
