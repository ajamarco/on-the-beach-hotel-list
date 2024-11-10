import React, { useMemo } from "react";
import HotelCard from "./HotelCard";

const Hotels = ({ hotels }) => {
  // Memoized function to render hotel cards and return a HotelCard component for each hotel
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

  // Render the section containing all hotel cards
  return <section className="trips">{renderHotelCards}</section>;
};

export default Hotels;
