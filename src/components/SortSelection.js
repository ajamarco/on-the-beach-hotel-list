import { MdSortByAlpha } from "react-icons/md";
import { AiFillPoundCircle } from "react-icons/ai";
import { FaStar } from "react-icons/fa";

import "../styles/SortSelection.scss";
import SortButton from "./SortButton";

const SortSelection = ({ activeSort, handleSortChange }) => {
  // Define the available sort options
  const sortOptions = ["Name", "Price", "Star Rating"];

  // create an object to store the icons for each sort option
  const sortIcons = {
    Name: <MdSortByAlpha />,
    Price: <AiFillPoundCircle />,
    "Star Rating": <FaStar />,
  };

  // Handle click events on sort buttons
  const clickHandler = (sortBy) => {
    handleSortChange(sortBy);
  };

  return (
    <aside className="sort_selection">
      {/* Render a SortButton for each sort option */}
      {sortOptions.map((option, index) => (
        <SortButton
          SortBy={option}
          key={index}
          active={option === activeSort}
          clickHandler={clickHandler}
          icon={sortIcons[option]}
        />
      ))}
    </aside>
  );
};

export default SortSelection;
