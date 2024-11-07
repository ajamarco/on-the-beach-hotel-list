import React from "react";
import HotelCard from "./HotelCard";

const Hotels = ({ hotels }) => {
  return hotels.map((hotel) => <HotelCard hotel={hotel} />);
};

export default Hotels;
