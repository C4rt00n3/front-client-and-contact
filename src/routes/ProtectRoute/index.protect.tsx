import { useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { AuthContext } from "../../context/authContext/index.context";
import Home from "../../pages/home/index.home";
import Loading from "../../pages/Loading/index.load";

const Protect = () => {
  const [protect, setProtect] = useState(false);
  const { get } = useContext(AuthContext);

  useEffect(() => {
    const protect = async () => {
      const newGet = await get();
      if (newGet) {
        return setProtect(true);
      }
      return false;
    };

    protect();
  }, []);

  return (
    <>
      {!protect ? (
        <>
          <Loading />
          <Outlet />
        </>
      ) : (
        <>
          <Home />
          <Outlet />
        </>
      )}
    </>
  );
};

export default Protect;
