import React from "react";
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import useVisualMode from "hooks/useVisualMode";

export default function Appointment({ time, interview, interviewers, bookInterview, id }) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const { transition, back, mode } = useVisualMode(interview ? SHOW : EMPTY);

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    }
    bookInterview(id, interview);
    transition("SHOW");
  };

  return (
    <article className="appointment">
      <Header time={time} />
      {mode === SHOW && < Show student={interview.student} interviewer={interview.interviewer.name} time={time} />}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === CREATE && <Form onSave={save} interviewers={interviewers} onCancel={() => back()} />}
    </article>
  )

}