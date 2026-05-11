import { Outlet } from "react-router-dom";
import Navbar from "./Components/Landing/Navbar";

const ServiceLayout = () => {
  return (
    <>
    <Navbar/>
        <Outlet />
    </>
  );
};

export default ServiceLayout;
