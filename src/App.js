import { useState, useEffect, lazy } from "react";
import hotelData from "./hotelData";
import SortSelection from "./components/SortSelection";

import "./App.scss";
import Loading from "./components/Loading";

const Hotels = lazy(() => import("./components/Hotels"));

const App = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortMethod, setSortMethod] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");

  useEffect(() => {
    async function fetchHotels() {
      try {
        const data = await new Promise((resolve) => {
          setTimeout(() => {
            resolve(hotelData);
          }, 5000);
        });
        console.log(data);
        setHotels(data);
      } catch (error) {
        console.error("error fetching hotel data", error);
      } finally {
        setLoading(false);
      }
    }
    fetchHotels();
  }, []);

  useEffect(() => {
    console.log("sort method changed", sortMethod);
    if (sortMethod === "Name") {
      //based on the sort direction, sort the hotels by name
      setHotels(
        [...hotels].sort((a, b) => {
          if (sortDirection === "asc") {
            return a.resort.name.localeCompare(b.resort.name);
          } else {
            return b.resort.name.localeCompare(a.resort.name);
          }
        })
      );
    }
    if (sortMethod === "Price") {
      //based on the sort direction, sort the hotels by price
      setHotels(
        [...hotels].sort((a, b) => {
          if (sortDirection === "asc") {
            return (
              a.bookingDetails.price.amount - b.bookingDetails.price.amount
            );
          } else {
            return (
              b.bookingDetails.price.amount - a.bookingDetails.price.amount
            );
          }
        })
      );
    }
    if (sortMethod === "Star Rating") {
      //based on the sort direction, sort the hotels by star rating
      setHotels(
        [...hotels].sort((a, b) => {
          if (sortDirection === "asc") {
            return a.resort.starRating - b.resort.starRating;
          } else {
            return b.resort.starRating - a.resort.starRating;
          }
        })
      );
    }
    console.log("hotels", hotels);
  }, [sortMethod, sortDirection]);

  const handleSortChange = (sortBy) => {
    setSortMethod(sortBy);
    //if the current sortBy is the same as the previous one, change the sort direction
    if (sortBy === sortMethod) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    }
  };

  return (
    <main className="container">
      <SortSelection
        activeSort={sortMethod}
        handleSortChange={handleSortChange}
      />
      {loading ? <Loading /> : <Hotels hotels={hotels} />}
    </main>
  );
};

export default App;
