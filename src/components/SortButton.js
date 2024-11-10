import { MdSortByAlpha } from "react-icons/md";
import { AiFillPoundCircle } from "react-icons/ai";
import { FaStar } from "react-icons/fa";

import "../styles/SortButton.scss";

const SortButton = ({ active, clickHandler, SortBy }) => {
  // Handle click events on the sort button. This was extracted from the return so we could add more functionalities in the future
  const handleClick = () => {
    clickHandler(SortBy);
  };

  // Map the SortBy value to the corresponding icon and we set a class based on the active state
  const getIcon = (SortBy, active) => {
    switch (SortBy) {
      case "Name":
        return (
          <MdSortByAlpha
            className={active ? "activeSortIcon" : "inactiveSortIcon"}
          />
        );
      case "Price":
        return (
          <AiFillPoundCircle
            className={active ? "activeSortIcon" : "inactiveSortIcon"}
          />
        );
      case "Star Rating":
        return (
          <FaStar className={active ? "activeSortIcon" : "inactiveSortIcon"} />
        );
      default:
        return null;
    }
  };

  return (
    <div
      className={active ? "sort__button sort__button__active" : "sort__button"}
      onClick={handleClick} // Attach click handler to the button
    >
      <p>
        Sort by <span>{SortBy}</span>
      </p>
      {getIcon(SortBy)}
    </div>
  );
};

export default SortButton;
