import Product from "./Product";
import Slider from "react-slick";
import { NextBtn, PreviousBtn } from "../Banner/Banner";
import { Link } from "react-router-dom";
import { offerProducts } from "../../../utils/constants";
import { getRandomProducts } from "../../../utils/functions";

export const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 6,
  slidesToScroll: 6,
  initialSlide: 1,
  swipe: false,
  prevArrow: <PreviousBtn />,
  nextArrow: <NextBtn />,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

const DealSlider = ({ title }) => {
  return (
    <section className="bg-white w-full shadow overflow-hidden">
      <div className="flex px-6 py-3 justify-between items-center">
        <h1 className="text-xl font-medium">{title}</h1>
        <Link
          to="/products"
          className="bg-black text-xs font-medium text-white px-5 py-2.5 rounded-sm shadow-lg"
        >
          SEE MORE
        </Link>
      </div>
      <hr />

      <Slider {...settings}>
        {getRandomProducts(offerProducts, 12).map((item, i) => (
          <Product {...item} key={i} />
        ))}
      </Slider>
    </section>
  );
};

export default DealSlider;
