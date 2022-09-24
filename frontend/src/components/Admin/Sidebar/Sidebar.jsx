import { Link, useNavigate } from "react-router-dom";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import GroupIcon from "@mui/icons-material/Group";
import LogoutIcon from "@mui/icons-material/Logout";
import CloseIcon from "@mui/icons-material/Close";
import Avatar from "@mui/material/Avatar";
import { useDispatch, useSelector } from "react-redux";
import "./Sidebar.css";
import { useSnackbar } from "notistack";
import { logoutUser } from "../../../actions/userAction";
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import CategoryIcon from "@mui/icons-material/Category";
import LocalMallIcon from "@mui/icons-material/LocalMall";
const navMenu = [
  {
    icon: <DashboardCustomizeIcon />,
    label: "Dashboard",
    ref: "/admin/dashboard",
  },
  {
    icon: <ShoppingBagIcon />,
    label: "Orders History",
    ref: "/admin/orders",
  },
  {
    icon: <CategoryIcon />,
    label: "My Products",
    ref: "/admin/products",
  },
  {
    icon: <LocalMallIcon />,
    label: "Add Product",
    ref: "/admin/new_product",
  },
  {
    icon: <GroupIcon />,
    label: "Users",
    ref: "/admin/users",
  },
  // {
  //   icon: <FeedbackIcon />,
  //   label: "Feedbacks",
  //   ref: "/admin/reviews",
  // },
  {
    icon: <InsertEmoticonIcon />,
    label: "My Profile",
    ref: "/account",
  },
  {
    icon: <LogoutIcon />,
    label: "Logout",
  },
];

const Sidebar = ({ activeTab, setToggleSidebar }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const { user } = useSelector((state) => state.user);

  const handleLogout = () => {
    dispatch(logoutUser());
    enqueueSnackbar("Logout Successfully", { variant: "success" });
    navigate("/login");
  };

  return (
    <aside className="sidebar z-10 sm:z-0 block min-h-screen fixed left-0 pb-14 max-h-screen w-3/4 sm:w-1/5 bg-primary-lightblue text-white overflow-x-hidden border-r">
      <div className="flex items-center gap-3 bg-black p-2 rounded-lg shadow-lg my-4 mx-3.5">
        <Avatar alt="Avatar" src={user.avatar.url} />
        <div className="flex flex-col gap-0">
          <span className="font-medium text-lg">{user.name}</span>
          <span className="text-gray-300 text-sm">{user.email}</span>
        </div>
        <button
          onClick={() => setToggleSidebar(false)}
          className="sm:hidden bg-gray-800 ml-auto rounded-full w-10 h-10 flex items-center justify-center"
        >
          <CloseIcon />
        </button>
      </div>

      <div className="flex flex-col bg-white text-black w-full gap-0 my-8">
        {navMenu.map((item, index) => {
          const { icon, label, ref } = item;
          return (
            <>
              {label === "Logout" ? (
                <button
                  onClick={handleLogout}
                  className="hover:bg-primary-green flex gap-3 items-center py-3 px-4 font-medium"
                >
                  <span>{icon}</span>
                  <span>{label}</span>
                </button>
              ) : (
                <Link
                  to={ref}
                  className={`${
                    activeTab === index
                      ? "bg-primary-blue"
                      : "hover:bg-primary-blue"
                  } flex gap-3 items-center py-3 px-4 font-medium`}
                >
                  <span>{icon}</span>
                  <span>{label}</span>
                </Link>
              )}
            </>
          );
        })}
      </div>
    </aside>
  );
};

export default Sidebar;
