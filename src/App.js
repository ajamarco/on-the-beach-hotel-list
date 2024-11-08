import { useState, useEffect, lazy, useMemo, useCallback } from "react";
import hotelData from "./hotelData";
import SortSelection from "./components/SortSelection";

import "./App.scss";
import Loading from "./components/Loading";

const Hotels = lazy(() => import("./components/Hotels"));

const App = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortConfig, setSortConfig] = useState({
    method: "",
    direction: "asc",
  });

  useEffect(() => {
    async function fetchHotels() {
      try {
        const data = await new Promise((resolve) => {
          setTimeout(() => {
            resolve(hotelData);
          }, 5000);
        });
        setHotels(data);
      } catch (error) {
        console.error("error fetching hotel data", error);
      } finally {
        setLoading(false);
      }
    }
    fetchHotels();
  }, []);

  const sortedHotels = useMemo(() => {
    if (!sortConfig.method) return hotels;

    const sorted = [...hotels].sort((a, b) => {
      if (sortConfig.method === "Name") {
        return sortConfig.direction === "asc"
          ? a.resort.name.localeCompare(b.resort.name)
          : b.resort.name.localeCompare(a.resort.name);
      }
      if (sortConfig.method === "Price") {
        return sortConfig.direction === "asc"
          ? a.bookingDetails.price.amount - b.bookingDetails.price.amount
          : b.bookingDetails.price.amount - a.bookingDetails.price.amount;
      }
      if (sortConfig.method === "Star Rating") {
        return sortConfig.direction === "asc"
          ? a.resort.starRating - b.resort.starRating
          : b.resort.starRating - a.resort.starRating;
      }
      return 0;
    });

    return sorted;
  }, [hotels, sortConfig]);

  const handleSortChange = useCallback((sortBy) => {
    setSortConfig((prevConfig) => ({
      method: sortBy,
      direction:
        prevConfig.method === sortBy && prevConfig.direction === "asc"
          ? "desc"
          : "asc",
    }));
  }, []);

  return (
    <main className="container">
      <SortSelection
        activeSort={sortConfig.method}
        handleSortChange={handleSortChange}
      />
      {loading ? <Loading /> : <Hotels hotels={sortedHotels} />}
    </main>
  );
};

export default App;
