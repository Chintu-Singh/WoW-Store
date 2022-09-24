import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Banner.css";
// import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
// import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import gadgetSale from "../../../assets/images/Banners/i.jpg";
import kitchenSale from "../../../assets/images/Banners/b.jpg";
import poco from "../../../assets/images/Banners/a.jpg";
import realme from "../../../assets/images/Banners/d.jpg";
import fashionSale from "../../../assets/images/Banners/e.jpg";
import oppo from "../../../assets/images/Banners/f.jpg";
import FastRewindIcon from "@mui/icons-material/FastRewind";
import FastForwardIcon from "@mui/icons-material/FastForward";

export const PreviousBtn = ({ className, onClick }) => {
  return (
    <div
      style={{ backgroundColor: "black" }}
      className={className}
      onClick={onClick}
    >
      <FastRewindIcon style={{ color: "white" }} />
    </div>
  );
};

export const NextBtn = ({ className, onClick }) => {
  return (
    <div
      style={{ backgroundColor: "black" }}
      className={className}
      onClick={onClick}
    >
      <FastForwardIcon style={{ color: "white" }} />
    </div>
  );
};

const Banner = () => {
  const settings = {
    autoplay: true,
    autoplaySpeed: 2000,
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <PreviousBtn />,
    nextArrow: <NextBtn />,
  };

  const banners = [gadgetSale, kitchenSale, poco, fashionSale, realme, oppo];

  return (
    <>
      <section className="h-screen w-full rounded-sm shadow relative overflow-hidden">
        <Slider {...settings}>
          {banners.map((el, i) => (
            <img
              draggable="false"
              className="h-screen w-full object-cover"
              src={el}
              alt="banner"
              key={i}
            />
          ))}
        </Slider>
      </section>
    </>
  );
};

export default Banner;
