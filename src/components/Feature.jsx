import React from "react";

const data = [
  {
    id: 1,
    line1: "ƯU ĐÃI MUA 3 TẶNG 1",

    line2: "MỪNG ĐẠI LỄ 30/4-1/5",
  },
  {
    id: 2,
    line1: "GIẢM GIÁ 10% ĐỐI VỚI SINH VIÊN",
    line2: "KHUYẾN MÃI SINH VIÊN",
  },
  {
    id: 3,
    line1: "GIẢM GIÁ 5%",
    line2: "SUPER SUNDAY!",
  },
];
export default function Feature2() {
  const [isHover, setIsHover] = React.useState(1);
  const handleHover = React.useCallback((index) => {
    setIsHover(index);
  }, []);
  return (
    <div>
      <div className="container py-16">
        <div className="lg:w-10/12 grid md:grid-cols-3 gap-3 lg:gap-6 mx-auto justify-center">
          {data.map((item, index) => {
            return (
              <div
                key={item.id}
                onMouseOver={() => handleHover(index)}
                className={`${
                  index === isHover
                    ? "bg-primary text-white border-primary"
                    : "bg-white text-primary border-primary"
                } transition-all duration-500 flex flex-col items-center px-6 py-9 justify-center gap-y-1 text-base font-normal border-[1px] rounded-3xl cursor-pointer`}
              >
                <p>{item.line1}</p>
                <p>{item.line2}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
