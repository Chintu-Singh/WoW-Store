import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Footer = () => {
  const location = useLocation();
  const [adminRoute, setAdminRoute] = useState(false);

  useEffect(() => {
    setAdminRoute(location.pathname.split("/", 2).includes("admin"));
  }, [location]);

  return (
    <>
      {!adminRoute && (
        <>
          <footer></footer>
          <div className="py-4 w-full bg-black text-center text-white">
            <span>&copy; Copyright {new Date().getFullYear()}- WoW Store</span>
          </div>
        </>
      )}
    </>
  );
};

export default Footer;
