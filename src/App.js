import { useState, useEffect } from "react";
import hotelData from "./hotelData";
import Hotels from "./components/Hotels";
import SortSelection from "./components/SortSelection";

import "./App.scss";

const App = () => {
  const [hotels, setHotels] = useState([]);
  const [sortMethod, setSortMethod] = useState("");

  useEffect(() => {
    async function fetchHotels() {
      try {
        const data = hotelData;
        console.log(data);
        setHotels(data);
      } catch (error) {
        console.error("error fetching hotel data", error);
      }
    }
    fetchHotels();
  }, []);

  useEffect(() => {
    console.log("sort method changed", sortMethod);
    if (sortMethod === "Name") {
      setHotels(
        [...hotels].sort((a, b) => a.resort.name.localeCompare(b.resort.name))
      );
    }
    if (sortMethod === "Price") {
      setHotels(
        [...hotels].sort(
          (a, b) =>
            a.bookingDetails.price.amount - b.bookingDetails.price.amount
        )
      );
    }
    if (sortMethod === "Star Rating") {
      setHotels(
        [...hotels].sort((a, b) => b.resort.starRating - a.resort.starRating)
      );
    }
    console.log("hotels", hotels);
  }, [sortMethod]);

  const handleSortChange = (sortBy) => {
    setSortMethod(sortBy);
  };

  return (
    <main className="container">
      <SortSelection
        activeSort={sortMethod}
        handleSortChange={handleSortChange}
      />
      <Hotels hotels={hotels} />
    </main>
  );
};

export default App;
