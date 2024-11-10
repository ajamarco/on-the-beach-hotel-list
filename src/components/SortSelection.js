import "../styles/SortSelection.scss";
import SortButton from "./SortButton";

const SortSelection = ({ activeSort, handleSortChange }) => {
  // Define the available sort options
  const sortOptions = ["Name", "Price", "Star Rating"];

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
        />
      ))}
    </aside>
  );
};

export default SortSelection;
