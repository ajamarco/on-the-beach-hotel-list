import React from "react";
import HotelCard from "./HotelCard";

const Hotels = ({ hotels }) => {
  return hotels.map((hotel) => (
    <HotelCard
      hotel={hotel?.resort}
      id={hotel?.resort.id}
      flight={hotel?.flightDetails}
      bookingDetails={hotel?.bookingDetails}
    />
  ));
};

export default Hotels;
