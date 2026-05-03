import { Outlet } from "react-router-dom";

import "./index.css";

const RootLayout = () => {
  return (
    <>
      {/* <Navbar /> */}
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default RootLayout;
