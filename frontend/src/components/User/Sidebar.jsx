import { useDispatch, useSelector } from "react-redux";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Link, useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { logoutUser } from "../../actions/userAction";
import LogoutIcon from "@mui/icons-material/Logout";
import ViewListIcon from "@mui/icons-material/ViewList";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import FavoriteIcon from "@mui/icons-material/Favorite";

const Sidebar = ({ activeTab }) => {
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
    <div className="hidden sm:flex flex-col gap-4 w-1/4 px-1">
      <div className="flex items-center gap-4 p-3 bg-black text-white rounded-sm shadow">
        <div className="w-12 h-12 rounded-full">
          <img
            draggable="false"
            className="h-full w-full object-cover rounded-full"
            src={user.avatar.url}
            alt="Avatar"
          />
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-xs">Welcome </p>
          <h2 className="font-medium">{user.name}</h2>
        </div>
      </div>
      <div className="flex flex-col bg-black text-white rounded-sm shadow">
        <div className="flex items-center gap-5 px-4 py-4 border-b">
          <span className="text-primary-blue">
            <ViewListIcon />
          </span>
          <Link
            className="flex w-full justify-between font-medium text-white hover:text-primary-green"
            to="/orders"
          >
            Purchase History
            <span>
              <ChevronRightIcon />
            </span>
          </Link>
        </div>
        <div className="flex items-center gap-5 px-4 py-4">
          <span className="text-primary-blue">
            <InsertEmoticonIcon />
          </span>
          <p className="flex w-full justify-between font-medium text-white">
            Your Profile
          </p>
        </div>
        <div className="flex flex-col pb-3 border-b text-sm bg-black">
          <Link
            to="/account"
            className={`${
              activeTab === "profile"
                ? "bg-black text-white font-medium"
                : "hover:bg-white hover:text-black"
            } p-3 pl-14`}
          >
            My Profile
          </Link>
        </div>

        <div className="flex items-center gap-5 px-4 py-4">
          <span className="text-primary-blue">
            <FavoriteIcon />
          </span>
          <p className="flex w-full justify-between font-medium text-white">
            WishList
          </p>
        </div>
        <div className="flex flex-col pb-3 border-b text-sm">
          <Link
            to="/wishlist"
            className={`${
              activeTab === "wishlist"
                ? "bg-black text-whitefont-medium"
                : "hover:bg-white hover:text-black"
            } p-3 pl-14`}
          >
            My Wishlist
          </Link>
        </div>

        <div className="flex items-center gap-5 px-4 py-4 border-b">
          <span className="text-primary-blue">
            <LogoutIcon />
          </span>
          <div
            className="flex w-full justify-between font-medium text-white hover:text-primary-green cursor-pointer"
            onClick={handleLogout}
          >
            Logout
            <span>
              <ChevronRightIcon />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
