import { Outlet } from "react-router-dom";
import Header from "./Header";

// const Layout = ({ children }) => {
const Layout = () => {
  return (
    <div className="min-h-screen">
      <Header />
      {/* <div className="mx-auto px-2 sm:px-4 lg-px-6 py-6">{children}</div> */}
      <Outlet />
    </div>
  );
};

export default Layout;
