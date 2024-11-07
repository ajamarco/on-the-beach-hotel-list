import { useState, useEffect } from "react";
import hotelData from "./hotelData";

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

  return <div>App</div>;
};

export default App;
