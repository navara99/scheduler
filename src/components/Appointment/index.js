import React from "react";
import "components/Appointment/styles.scss"

export default function Appointment({ time }) {
  return (
    <article className="appointment">
      {time ? `Appointment at ${time}` : "No Appointments"}
    </article>
  )

}