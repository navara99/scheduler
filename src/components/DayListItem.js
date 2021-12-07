import React from "react";
import classNames from "classnames";
import "components/DayListItem.scss";

export default function DayListItem(props) {
  const { name, spots, setDay, selected } = props;
  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": selected,
    "day-list__item--full": spots === 0
  });

  const formatSpots = () => spots ? "1 spot remaining" : "no spots remaining";

  return (
    <li onClick={() => setDay(name)} className={dayClass}>
      <h2 className="text--regular">{name}</h2>
      <h3 className="text--light">{spots === 0 || spots === 1 ? formatSpots(spots) : `${spots} spots remaining`}</h3>
    </li>
  );
}