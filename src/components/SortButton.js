import "../styles/SortButton.scss";

const SortButton = ({ active, clickHandler, SortBy, icon }) => {
  // Handle click events on the sort button. This was extracted from the return so we could add more functionalities in the future
  const handleClick = () => {
    clickHandler(SortBy);
  };

  return (
    <div
      className={active ? "sort__button sort__button__active" : "sort__button"}
      onClick={handleClick} // Attach click handler to the button
    >
      <p>
        Sort by <span>{SortBy}</span>
      </p>
      {icon}
    </div>
  );
};

export default SortButton;
