import React from "react";
import DayListItem from "./DayListItem";

export default function DayList({ days, day, setDay }) {

  const dayListItems = days.map((days) => {
    const { id, name, spots } = days;

    return <DayListItem key={id} selected={name === day} setDay={setDay} spots={spots} name={name} />
  })


  return (
    <ul>
      {dayListItems}
    </ul>
  )

}
