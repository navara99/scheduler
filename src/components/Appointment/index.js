import React from "react";
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import useVisualMode from "hooks/useVisualMode";

export default function Appointment({ time, interview, interviewers, bookInterview, id }) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const { transition, back, mode } = useVisualMode(interview ? SHOW : EMPTY);

  const save = async (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    }
    transition("SAVING");
    try {
      await bookInterview(id, interview);
      transition("SHOW");
    } catch (e) {
      console.log(e.message);
    }

  };

  return (
    <article className="appointment">
      <Header time={time} />
      {mode === SHOW && < Show student={interview.student} interviewer={interview.interviewer.name} time={time} />}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === CREATE && <Form onSave={save} interviewers={interviewers} onCancel={() => back()} />}
      {mode === SAVING && <Status />}
    </article>
  )

}