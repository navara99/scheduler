import React from "react";
import DayListItem from "./DayListItem";

export default function DayList({ days, value, onChange }) {

  const dayListItems = days.map((days) => {
    const { id, name, spots } = days;
    return <DayListItem
      key={id}
      selected={name === value}
      setDay={onChange}
      spots={spots}
      name={name} />
  })


  return (
    <ul>
      {dayListItems}
    </ul>
  )

}
