import { useState, useEffect } from "react";
import hotelData from "./hotelData";
import Hotels from "./components/Hotels";
import SortSelection from "./components/SortSelection";

const App = () => {
  const [hotels, setHotels] = useState([]);
  const [sortMethod, setSortMethod] = useState("price");

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

  const handleSortChange = (sortBy) => {
    setSortMethod(sortBy);
  };

  return (
    <div>
      <SortSelection
        activeSort={sortMethod}
        handleSortChange={handleSortChange}
      />
      <Hotels hotels={hotels} />
    </div>
  );
};

export default App;
