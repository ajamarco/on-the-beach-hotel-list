import "../styles/SortButton.scss";

const SortButton = ({ active, clickHandler, SortBy, icon }) => {
  const handleClick = () => {
    clickHandler(SortBy);
  };

  return (
    <div
      className={active ? "sort__button sort__button__active" : "sort__button"}
      onClick={handleClick}
    >
      <p>
        Sort by <span>{SortBy}</span>
      </p>
      {icon}
    </div>
  );
};

export default SortButton;
