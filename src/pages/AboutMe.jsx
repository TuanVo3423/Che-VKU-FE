import { GithubLogo, InstagramLogo, TwitterLogo } from "phosphor-react";
import React from "react";

const data = [
  {
    name: "VO VAN TUAN",
    role: "FullStack Web Developer",
    des: "I am an organized person and always focused on creating results. While setting goals I am always very realistic, I am always working to develop ways to get things done efficiently and often even more than I expect.",
    github: "https://github.com/TuanVo3423",
    twitter: "https://twitter.com",
    instagram: "https://instagram.com",
    img: "https://titus-portfolio.vercel.app/_next/image?url=%2Favt02.png&w=128&q=75",
  },
  {
    name: "HA CANH HONG PHUC",
    role: "Web Developer",
    des: "As part of the GenZ generation, I believe that there are not any impossible goals that go unrecognized. If we are consistent enough, the future is ours.",
    github: "https://github.com/LilPhusc",
    twitter: "https://twitter.com",
    instagram: "https://instagram.com",
    img: "https://bwd2022.vercel.app/assets/member-2.jpg",
  },
];
export default function AboutMe() {
  return (
    <div>
      <div className="container flex justify-center mx-auto pt-16">
        <div>
          <p className="text-gray-500 text-lg text-center font-normal pb-3">
            ĐỘI NGŨ XÂY DỰNG
          </p>
          <h1 className="xl:text-4xl text-3xl text-center text-gray-800 font-extrabold pb-6 sm:w-4/6 w-5/6 mx-auto">
            Những con người đăng sau dự án Chè-VKU
          </h1>
        </div>
      </div>
      <div className="w-full bg-gray-100 px-10 pt-10">
        <div className="container mx-auto">
          <div className="lg:flex md:flex sm:flex items-center xl:justify-between flex-wrap md:justify-around sm:justify-around lg:justify-around">
            {data.map((item, index) => (
              <div
                key={index}
                className="md:w-[48%] w-full relative mt-16 mb-32 sm:mb-24"
              >
                <div className="rounded overflow-hidden shadow-md bg-white">
                  <div className="absolute -mt-20 w-full flex justify-center">
                    <div className="h-32 w-32">
                      <img
                        src={item.img}
                        alt="img"
                        className="rounded-full object-cover h-full w-full shadow-md"
                      />
                    </div>
                  </div>
                  <div className="px-6 mt-16">
                    <div className="font-bold text-[28px] text-center pb-1">
                      {item.name}
                    </div>
                    <p className="text-gray-800 text-sm text-center">
                      {item.role}
                    </p>
                    <p className="text-center text-gray-600 text-base pt-3 font-normal line-clamp-2">
                      {item.des}
                    </p>
                    <div className="w-full flex justify-center pt-5 pb-5">
                      <GithubLogo size={32} weight="bold" className="mx-5" />
                      <TwitterLogo size={32} weight="bold" className="mx-5" />
                      <InstagramLogo size={32} weight="bold" className="mx-5" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
