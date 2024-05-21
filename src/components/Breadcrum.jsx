import { CaretRight, HouseLine } from "phosphor-react";
import { Link } from "react-router-dom";
import React from "react";

export default function Breadcrum({ tab }) {
  return (
    <div className="container py-4 flex justify-between">
      <div className="flex gap-3 items-center">
        <Link to={"/"} className="text-primary text-base">
          <HouseLine size={26} weight="bold" />
        </Link>
        <span className="text-sm text-gray-400">
          <CaretRight size={24} weight="bold" />
        </span>
        <p className="text-gray-600 font-medium">{tab}</p>
      </div>
    </div>
  );
}
