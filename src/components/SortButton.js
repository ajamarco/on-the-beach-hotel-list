import "../styles/SortButton.scss";

const SortButton = ({ active, clickHandler }) => {
  const handleClick = () => {
    if (!active) clickHandler(SortBy);
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
