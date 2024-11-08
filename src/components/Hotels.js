import React from "react";
import HotelCard from "./HotelCard";

const Hotels = ({ hotels }) => {
  const renderHotelCards = () => {
    return hotels.map((hotel) => (
      <HotelCard
        hotel={hotel?.resort}
        id={hotel?.resort.id}
        flight={hotel?.flightDetails}
        bookingDetails={hotel?.bookingDetails}
      />
    ));
  };

  return <section className="trips">{renderHotelCards()}</section>;
};

export default Hotels;
