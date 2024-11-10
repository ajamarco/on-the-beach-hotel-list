import { useState, useMemo, useCallback } from "react";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import { GoStarFill } from "react-icons/go";

import "../styles/HotelCard.scss";

const renderOpenedOverview = () => (
  <>
    <p>
      <b>Read less</b> about this hotel
    </p>
    <FaChevronDown />
  </>
);

const renderClosedOverview = () => (
  <>
    <p>
      <b>Read more</b> about this hotel
    </p>
    <FaChevronRight />
  </>
);

const HotelCard = ({ hotel, flight, bookingDetails }) => {
  const [showOverview, setShowOverview] = useState(false);

  const toggleOverview = useCallback(() => {
    setShowOverview((prev) => !prev);
  }, []);

  const displayHotelOcupation = useMemo(() => {
    const { adults, children, infants } = bookingDetails.party;
    const adultsText = `${adults} adult${adults !== 1 ? "s" : ""}`;
    const childrenText = children
      ? `${children} child${children !== 1 ? "ren" : ""}`
      : "";
    const infantsText = infants
      ? ` and ${infants} infant${infants !== 1 ? "s" : ""}`
      : "";

    if (!children && !infants) {
      return `${adultsText}`;
    }

    return `${adultsText} ${
      infants ? "," : "and"
    } ${childrenText} ${infantsText}`;
  }, [bookingDetails.party]);

  const displayPrice = useMemo(() => {
    return bookingDetails.price.amount.toLocaleString("en-GB", {
      style: "currency",
      currency: bookingDetails.price.currency,
    });
  }, [bookingDetails.price]);

  const displayDate = useMemo(() => {
    const date = new Date(flight.departureDate);

    const day = date.getUTCDate();
    const month = date.toLocaleString("en-GB", { month: "long" });
    const year = date.getUTCFullYear();

    const suffix =
      day % 10 === 1 && day !== 11
        ? "st"
        : day % 10 === 2 && day !== 12
        ? "nd"
        : day % 10 === 3 && day !== 13
        ? "rd"
        : "th";

    return `${day}${suffix} ${month} ${year}`;
  }, [flight.departureDate]);

  return (
    <article className="hotel">
      <div
        className="hotel__image"
        style={{ backgroundImage: `url(${hotel?.image?.url})` }}
      >
        <button className="hotel__show_overview" onClick={toggleOverview}>
          {showOverview ? renderOpenedOverview() : renderClosedOverview()}
        </button>
      </div>
      <div className="hotel__info">
        <h1>{hotel.name}</h1>
        <span>{hotel.countryName}</span>
        <p>
          {Array.from({ length: hotel.starRating }, (_, index) => (
            <GoStarFill key={index} color="#FEDC07" />
          ))}
        </p>
        <div className="hotel__info__details">
          <p>{displayHotelOcupation}</p>
          <p>
            <b>{displayDate}</b> for <b>{bookingDetails.lengthOfStay} days</b>
          </p>
          <p>
            departing from <b>{flight.departureAirport}</b>
          </p>
        </div>
        <button className="hotel__book_now">
          <p>Book Now</p>
          <h1>{displayPrice}</h1>
        </button>
      </div>
      <div
        className={`hotel__overview ${
          showOverview ? "hotel__more_info" : "hotel__more_info hide"
        }`}
      >
        <p>{hotel.overview}</p>
      </div>
    </article>
  );
};

export default HotelCard;
