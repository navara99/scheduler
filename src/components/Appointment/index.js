import React from "react";
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";

export default function Appointment({ time, interview, id }) {


  return (
    <article className="appointment">
      <Header time={time} />
      {interview ? <Show student={interview.student} interviewer={interview.interviewer.name} time={time} /> : <Empty />}
    </article>
  )

}