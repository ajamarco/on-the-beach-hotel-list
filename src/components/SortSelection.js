import { MdSortByAlpha } from "react-icons/md";
import { AiFillPoundCircle } from "react-icons/ai";
import { FaStar } from "react-icons/fa";

import "../styles/SortSelection.scss";
import SortButton from "./SortButton";

const SortSelection = ({ activeSort, handleSortChange }) => {
  const sortOptions = ["Name", "Price", "Star Rating"];

  const sortIcons = {
    Name: <MdSortByAlpha />,
    Price: <AiFillPoundCircle />,
    "Star Rating": <FaStar />,
  };

  const clickHandler = (sortBy) => {
    handleSortChange(sortBy);
  };

  return (
    <aside className="sort_selection">
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
