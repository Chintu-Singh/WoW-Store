import React from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import { logoutUser } from "../../../actions/userAction";
import FlutterDashIcon from "@mui/icons-material/FlutterDash";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import LogoutIcon from "@mui/icons-material/Logout";

const PrimaryDropDownMenu = ({ setTogglePrimaryDropDown, user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const { wishlistItems } = useSelector((state) => state.wishlist);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
    enqueueSnackbar("Logout Successfully", { variant: "success" });
    setTogglePrimaryDropDown(false);
  };

  const navs = [
    {
      title: "Wishlist",
      icon: (
        <FavoriteIcon style={{ color: "black" }} sx={{ fontSize: "18px" }} />
      ),
      redirect: "/wishlist",
    },
    {
      title: "Orders",
      icon: (
        <BusinessCenterIcon
          style={{ color: "black" }}
          sx={{ fontSize: "18px" }}
        />
      ),
      redirect: "/orders",
    },
  ];

  return (
    <div className="absolute w-60 -left-24 ml-2 top-9 bg-white shadow-2xl rounded flex-col text-sm">
      {user.role === "admin" && (
        <Link
          className="pl-3 py-3.5 border-b flex gap-3 items-center hover:bg-gray-50 rounded-t"
          to="/admin/dashboard"
        >
          <span className="text-primary-blue">
            <AdminPanelSettingsIcon
              style={{ color: "black" }}
              sx={{ fontSize: "18px" }}
            />
          </span>
          Admin Dashboard
        </Link>
      )}

      <Link
        className="pl-3 py-3.5 border-b flex gap-3 items-center hover:bg-gray-50 rounded-t"
        to="/account"
      >
        <span className="text-primary-blue">
          <FlutterDashIcon
            style={{ color: "black" }}
            sx={{ fontSize: "18px" }}
          />
        </span>
        My Profile
      </Link>

      {navs.map((item, i) => {
        const { title, icon, redirect } = item;

        return (
          <>
            {title === "Wishlist" ? (
              <Link
                className="pl-3 py-3.5 border-b flex gap-3 items-center hover:bg-gray-50"
                to={redirect}
                key={i}
              >
                <span className="text-primary-blue">{icon}</span>
                {title}
                <span className="ml-auto mr-3 bg-gray-100 p-0.5 px-2 text-gray-600 rounded">
                  {wishlistItems.length}
                </span>
              </Link>
            ) : (
              <Link
                className="pl-3 py-3.5 border-b flex gap-3 items-center hover:bg-gray-50"
                to={redirect}
                key={i}
              >
                <span className="text-primary-blue">{icon}</span>
                {title}
              </Link>
            )}
          </>
        );
      })}

      <div
        className="pl-3 py-3.5 flex gap-3 items-center hover:bg-gray-50 rounded-b cursor-pointer"
        onClick={handleLogout}
      >
        <span className="text-primary-blue">
          <LogoutIcon style={{ color: "black" }} sx={{ fontSize: "18px" }} />
        </span>
        Logout
      </div>

      <div className="absolute right-1/2 -top-2.5">
        <div className="arrow_down"></div>
      </div>
    </div>
  );
};

export default PrimaryDropDownMenu;
