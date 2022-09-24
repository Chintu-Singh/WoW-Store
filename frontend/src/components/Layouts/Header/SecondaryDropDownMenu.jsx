import SellIcon from "@mui/icons-material/Sell";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";

const SecondaryDropDownMenu = () => {
  const navs = [
    {
      title: "Become Seller",
      icon: <SellIcon sx={{ fontSize: "18px", color: "black" }} />,
      redirect: "",
    },
    {
      title: "Customer Care",
      icon: <ContactSupportIcon sx={{ fontSize: "18px", color: "black" }} />,
      redirect: "",
    },
    {
      title: "Donate",
      icon: <VolunteerActivismIcon sx={{ fontSize: "18px", color: "black" }} />,
      redirect: "",
    },
  ];

  return (
    <div className="absolute w-60 -right-2 top-9 bg-white shadow-2xl rounded flex-col text-sm">
      {navs.map((item, i) => {
        const { title, icon, redirect } = item;

        return (
          <a
            className="pl-3 py-3.5 border-b flex gap-3 items-center hover:bg-gray-50 rounded-t"
            href={redirect}
            key={i}
          >
            <span className="text-primary-blue">{icon}</span>
            {title}
          </a>
        );
      })}

      <div className="absolute right-1/2 -top-2.5">
        <div className="arrow_down"></div>
      </div>
    </div>
  );
};

export default SecondaryDropDownMenu;
