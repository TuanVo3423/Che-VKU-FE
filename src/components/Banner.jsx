import { CaretLeft, CaretRight } from "phosphor-react";
import React from "react";
import Slider from "react-slick";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <motion.div
      initial={{ opacity: 0, x: 20, y: 0 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      transition={{ type: "spring", duration: 1.5, bounce: 0.3 }}
      className={className}
      style={{
        ...style,
        display: "block",
        right: "5%",
        top: "45%",
        transform: "translateX(-50%)",
      }}
      onClick={onClick}
    >
      <CaretRight
        size={45}
        weight="bold"
        className="text-primary p-2 rounded-full bg-white hover:bg-primary hover:text-white"
      />
    </motion.div>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <motion.div
      initial={{ opacity: 0, x: -20, y: 0 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      transition={{ type: "spring", duration: 1.5, bounce: 0.3 }}
      className={className}
      style={{
        ...style,
        display: "block",
        left: "5%",
        zIndex: 1,
        top: "45%",
        transform: "translateX(-50%)",
      }}
      onClick={onClick}
    >
      <CaretLeft
        size={45}
        weight="bold"
        className="text-primary p-2 rounded-full bg-white hover:bg-primary hover:text-white"
      />
    </motion.div>
  );
}

export default function Banner() {
  const [isHoverBanner, setIsHoverBanner] = React.useState(false);
  const onHoverBanner = React.useCallback(() => {
    setIsHoverBanner(true);
  }, []);
  const onOutHoverBanner = React.useCallback(() => {
    setIsHoverBanner(false);
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    autoplay: true,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,

    nextArrow: isHoverBanner && <SampleNextArrow />,
    prevArrow: isHoverBanner && <SamplePrevArrow />,
  };
  // url('images/banner.jpg')
  return (
    <div onMouseOver={onHoverBanner} onMouseOut={onOutHoverBanner}>
      <Slider {...settings}>
        <div className="!block bg-cover w-full md:h-[80vh] h-[20vh]  bg-no-repeat bg-center  bg-[url('images/main_banner.jpg')]"></div>
        <div className="!block bg-cover w-full md:h-[80vh] h-[20vh]  bg-no-repeat bg-center  bg-[url('images/main_banner.jpg')]"></div>

        {/* <div className="bg-cover bg-no-repeat bg-center py-36 relative bg-[url('../images/banner-02.png')]">
          <div className="container w-1/2">
            <h1 className="xl:text-6xl md:text-5xl text-4xl text-primary font-medium mb-4">
              YOUR NEW SUPERPOWER.
            </h1>
            <p className="text-lg text-white leading-8 line-clamp-3">
              You have experienced promax iphone 14? It will make you
              modern.Everyone has an equal chance of doing business.
            </p>
            <div className="mt-12">
              <Link
                to={"/shop"}
                className="bg-white border text-primary border-primary px-8 py-3 font-medium rounded-md uppercase hover:bg-primary
               hover:text-white transition"
              >
                Shop now
              </Link>
            </div>
          </div>
        </div> */}
      </Slider>
    </div>
  );
}
