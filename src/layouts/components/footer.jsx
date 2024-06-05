import {
  FacebookLogo,
  GoogleLogo,
  InstagramLogo,
  TwitterLogo,
  MapPin,
} from "phosphor-react";
import React from "react";

const Footer = () => {
  return (
    <footer className="text-center text-white bg-primary">
      <div className="container pt-9">
        <div className="flex gap-x-10 justify-center mb-9">
          <FacebookLogo
            cursor="pointer"
            onClick={() =>
              window.open(
                "https://www.facebook.com/profile.php?id=61560765143462&locale=vi_VN"
              )
            }
            size={28}
            weight="fill"
          />
          <TwitterLogo
            cursor="pointer"
            onClick={() =>
              window.open(
                "https://www.facebook.com/profile.php?id=61560765143462&locale=vi_VN"
              )
            }
            size={28}
            weight="fill"
          />
          <InstagramLogo
            cursor="pointer"
            onClick={() =>
              window.open(
                "https://www.facebook.com/profile.php?id=61560765143462&locale=vi_VN"
              )
            }
            size={28}
            weight="fill"
          />
          <GoogleLogo
            cursor="pointer"
            onClick={() =>
              window.open(
                "https://www.facebook.com/profile.php?id=61560765143462&locale=vi_VN"
              )
            }
            size={28}
            weight="fill"
          />
        </div>
      </div>
      <div
        className="text-center font-bold text-lg text-white p-4"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
      >
        {/* © 2022 Copyright:
          <a className="text-white uppercase" href="https://tailwind-elements.com/"> AQUA-VKU</a> */}
        <div>
          <div>
            <p>Địa chỉ: 450 Trần Đại Nghĩa, Ngũ Hành Sơn, Đà Nẵng</p>
          </div>
          <p>Điện thoại: 0987654321</p>
          <p>Email: chevku@gmail.com</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
