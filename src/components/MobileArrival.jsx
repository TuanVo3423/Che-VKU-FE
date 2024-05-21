import React from "react";
import { ArrowRight } from "phosphor-react";
import CardProduct from "./CardProduct";
import { useSelector } from "react-redux";
import { ProductSelector } from "../redux/Selectors/Product";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { inViewFromLeftShow, inViewScaleParentShow } from "../utils/type";
import { Link } from "react-router-dom";

export default function MobileArrival() {
  const { inView, ref } = useInView({
    threshold: 0.2,
  });
  const { data } = useSelector(ProductSelector);
  // console.log("data", data);
  const dataCellphone = data.filter((item, index) => {
    return item.isNew === true;
  });
  return (
    <div className="container pb-16 mt-20 flex flex-col gap-y-10">
      <div className="pb-5">
        <h2 className="inline relative text-2xl md:text-3xl font-medium text-gray-800 uppercase mb-6 after:content-[''] after:block after:absolute after:-right-[20%] after:top-1/2 after:w-[50px] after:h-[4px] after:bg-primary">
          Các món sắp có trong thời gian tới
        </h2>
      </div>
      <motion.div
        ref={ref}
        variants={inViewFromLeftShow}
        initial={"hidden"}
        animate={inView && "visible"}
        viewport={{ once: true }}
        className="grid lg:grid-cols-4 grid-cols-1 gap-6"
      >
        {dataCellphone.map((item, index) => {
          if (index < 4) {
            return (
              <CardProduct
                _id={item?._id}
                key={index}
                name={item?.name}
                price={item?.price}
                img={item?.attachment}
                likecount={item?.likeCount}
                category={item?.category}
              />
            );
          }
        })}
      </motion.div>
      <div className="text-center flex items-center justify-center gap-x-1">
        <Link
          to={"/shop"}
          className="text-primary font-semibold underline cursor-pointer flex items-center justify-center"
        >
          Xem thêm
        </Link>
        <div className="flex justify-center translate-y-[2px] hover:translate-x-[10px] transition-all duration-700">
          <ArrowRight size={20} weight="bold" className="text-primary" />
        </div>
      </div>
    </div>
  );
}
