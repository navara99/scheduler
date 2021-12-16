import React from "react";
import DayListItem from "./DayListItem";

export default function DayList({ days, value, onChange }) {

  const dayListItems = days.map((day) => {
    const { id, name, spots } = day;
    return <DayListItem
      key={id}
      selected={name === value}
      setDay={() => onChange(name)}
      spots={spots}
      name={name} />
  })

  return (
    <ul>
      {dayListItems}
    </ul>
  );

};
