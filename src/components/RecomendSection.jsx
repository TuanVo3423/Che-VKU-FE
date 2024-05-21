import React from "react";
import CardProduct from "./CardProduct";
import Slider from "react-slick";
import { CaretLeft, CaretRight } from "phosphor-react";
import ProductHot from "./ProductHot";
import { useViewport } from "../hooks/useViewPort";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { ProductSelector } from "../redux/Selectors/Product";
import { inViewDropupShow } from "../utils/type";
const data = [1, 2];

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      // initial={{ opacity: 0, x: 20, y: 0 }}
      // whileInView={{ opacity: 1, x: 0, y: 0 }}
      //  transition={{ type: 'spring', duration: 1.5, bounce: 0.3 }}
      className={className}
      style={{
        ...style,
        display: "block",
        right: "4%",
        top: "-50px",
        transform: "translateX(-50%)",
      }}
      onClick={onClick}
    >
      <CaretRight
        size={45}
        weight="bold"
        className="text-primary p-2 rounded-full  border border-blue-300 bg-white hover:bg-primary hover:text-white"
      />
    </div>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      // initial={{ opacity: 0, x: -20, y: 0 }}
      // whileInView={{ opacity: 1, x: 0, y: 0 }}
      //  transition={{ type: 'spring', duration: 1.5, bounce: 0.3 }}
      className={className}
      style={{
        ...style,
        display: "block",
        left: "92%",
        top: "-50px",
        transform: "translateX(-50%)",
      }}
      onClick={onClick}
    >
      <CaretLeft
        size={45}
        weight="bold"
        className="text-primary p-2  rounded-full  border border-blue-300 bg-white hover:bg-primary hover:text-white"
      />
    </div>
  );
}

export default function RecomendSection() {
  const { data } = useSelector(ProductSelector);
  const dataLaptop = data.filter((item, index) => {
    return item.category === "laptop";
  });
  const number1 = dataLaptop.length;
  // console.log(number1);
  const arr = [];
  const number = [1, 2];
  for (var i = 0; i < number1; i += 5) {
    arr.push(dataLaptop.slice(i, i + 5));
  }
  // console.log(arr);

  // const test = dataLaptop
  const { isDesktop } = useViewport();
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: isDesktop && <SampleNextArrow />,
    prevArrow: isDesktop && <SamplePrevArrow />,
  };
  return (
    <div className="relative container mb-24">
      <div className="pb-5">
        <h2 className="inline relative text-2xl md:text-3xl font-medium text-gray-800 uppercase mb-6 after:content-[''] after:block after:absolute after:-right-1/4 after:top-1/2 after:w-[50px] after:h-[4px] after:bg-primary">
          TOP NEW LAPTOP{" "}
        </h2>
      </div>
      <motion.div
        variants={inViewDropupShow}
        initial={"hidden"}
        whileInView={"visible"}
        viewport={{ once: true }}
      >
        <Slider {...settings}>
          {arr.map((item, index) => {
            return (
              <div key={item}>
                {/* [1,2,3,4] */}
                <div className="grid lg:grid-cols-4 grid-cols-1 gap-6">
                  <>
                    <div className="col-span-2 row-span-2 h-full">
                      <ProductHot
                        name={item[0]?.name}
                        _id={item[0]?._id}
                        price={item[0]?.price}
                        img={item[0]?.attachment}
                        likecount={item[0]?.likeCount}
                        category={item[0]?.category}
                      />
                    </div>
                    <div className="col-span-2 lg:col-span-1 row-span-1">
                      <CardProduct
                        name={item[1]?.name}
                        _id={item[1]?._id}
                        price={item[1]?.price}
                        img={item[1]?.attachment}
                        likecount={item[1]?.likeCount}
                        category={item[1]?.category}
                      />
                    </div>
                    <div className="col-span-2 lg:col-span-1 row-span-1">
                      <CardProduct
                        name={item[2]?.name}
                        _id={item[2]?._id}
                        price={item[2]?.price}
                        img={item[2]?.attachment}
                        likecount={item[2]?.likeCount}
                        category={item[2]?.category}
                      />
                    </div>
                    <div className="col-span-2 lg:col-span-1 row-span-1">
                      <CardProduct
                        name={item[3]?.name}
                        _id={item[3]?._id}
                        price={item[3]?.price}
                        img={item[3]?.attachment}
                        likecount={item[3]?.likeCount}
                        category={item[3]?.category}
                      />
                    </div>
                    <div className="col-span-2 lg:col-span-1 row-span-1">
                      <CardProduct
                        name={item[4]?.name}
                        _id={item[4]?._id}
                        price={item[4]?.price}
                        img={item[4]?.attachment}
                        likecount={item[4]?.likeCount}
                        category={item[4]?.category}
                      />
                    </div>
                  </>
                </div>
              </div>
            );
          })}
        </Slider>
      </motion.div>
    </div>
  );
}
