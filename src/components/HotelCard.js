import { useState } from "react";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import { GoStarFill } from "react-icons/go";

import "../styles/HotelCard.scss";

const HotelCard = ({ hotel, flight, bookingDetails }) => {
  const [showOverview, setShowOverview] = useState(false);

  const renderOpenedOverview = () => {
    return (
      <>
        <p>
          <b>Read less</b> about this hotel
        </p>
        <FaChevronDown />
      </>
    );
  };

  const renderClosedOverview = () => {
    return (
      <>
        <p>
          <b>Read more</b> about this hotel
        </p>
        <FaChevronRight />
      </>
    );
  };

  const displayHotelOcupation = ({ adults, children, infants }) => {
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
  };

  const displayPrice = (amount, currency) => {
    return amount.toLocaleString("en-GB", {
      style: "currency",
      currency: currency,
    });
  };

  function displayDate(dateString) {
    const date = new Date(dateString);

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
  }

  return (
    <article className="hotel">
      <div
        className="hotel__image"
        style={{ backgroundImage: `url(${hotel?.image?.url})` }}
      >
        <button
          className="hotel__show_overview"
          onClick={() => setShowOverview(!showOverview)}
        >
          {showOverview ? renderOpenedOverview() : renderClosedOverview()}
        </button>
      </div>
      <div className="hotel__info">
        <h1>{hotel.name}</h1>
        <span>{hotel.countryName}</span>
        <p>
          {Array.from({ length: hotel.starRating }, (_, index) => (
            <GoStarFill color="#FEDC07" />
          ))}
        </p>
        <div className="hotel__info__details">
          <p>{displayHotelOcupation(bookingDetails.party)}</p>
          <p>
            <b>{displayDate(flight.departureDate)}</b> for{" "}
            <b>{bookingDetails.lengthOfStay} days</b>
          </p>
          <p>
            departing from <b>{flight.departureAirport}</b>
          </p>
        </div>
        <button className="hotel__book_now">
          <p>Book Now</p>
          <h1>
            {displayPrice(
              bookingDetails.price.amount,
              bookingDetails.price.currency
            )}
          </h1>
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
