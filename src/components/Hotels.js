import React, { useMemo } from "react";
import HotelCard from "./HotelCard";

const Hotels = ({ hotels }) => {
  const renderHotelCards = useMemo(() => {
    return hotels.map((hotel) => (
      <HotelCard
        hotel={hotel.resort}
        id={hotel.resort.id}
        flight={hotel.flightDetails}
        bookingDetails={hotel.bookingDetails}
        key={hotel.resort.id}
      />
    ));
  }, [hotels]);

  return <section className="trips">{renderHotelCards}</section>;
};

export default Hotels;
