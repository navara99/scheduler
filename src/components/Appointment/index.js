import React from "react";
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import useVisualMode from "hooks/useVisualMode";

export default function Appointment({ time, interview, interviewers, bookInterview, id, cancelInterview }) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
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

  const deleteInterview = async () => {

    try {
      transition("DELETING");
      await cancelInterview();
      transition("EMPTY");
    } catch (e) {
      console.error(e);
    }

  }

  return (
    <article className="appointment">
      <Header time={time} />
      {mode === SHOW && < Show
        student={interview.student}
        interviewer={interview.interviewer.name}
        time={time}
        onDelete={() => transition("CONFIRM")}
        onEdit={() => transition("EDIT")}
      />}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === CREATE && <Form onSave={save} interviewers={interviewers} onCancel={() => back()} />}
      {mode === EDIT && <Form
        onSave={save}
        onCancel={() => back()}
        interviewers={interviewers}
        interviewer={interview.interviewer}
        student={interview.student}
      />}
      {mode === SAVING && <Status message="Saving" />}
      {mode === DELETING && <Status message="Deleting" />}
      {mode === CONFIRM && <Confirm
        message="Are you sure you would like to delete?"
        onConfirm={deleteInterview}
        onCancel={() => back()}
      />}
    </article>
  )

}