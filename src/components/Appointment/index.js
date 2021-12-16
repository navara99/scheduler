import React, { useEffect } from "react";
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";
import useVisualMode from "hooks/useVisualMode";

export default function Appointment({ time, interview, interviewers, bookInterview, id, cancelInterview }) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  const { transition, back, mode } = useVisualMode(interview ? SHOW : EMPTY);

  useEffect(() => {
    if (mode === EMPTY && interview) transition(SHOW);
    if (mode === SHOW && !interview) transition(EMPTY);
  }, [interview, mode, transition]);

  const save = async (name, interviewer) => {

    const interview = {
      student: name,
      interviewer
    };

    try {
      transition(SAVING);
      await bookInterview(id, interview);
      transition(SHOW);
    } catch (e) {
      transition(ERROR_SAVE, true);
    };

  };

  const deleteInterview = async () => {

    try {
      transition(DELETING, true);
      await cancelInterview();
      transition(EMPTY);
    } catch (e) {
      transition(ERROR_DELETE, true);
    };

  };

  return (
    <article className="appointment" data-testid="appointment">
      <Header time={time} />
      {mode === SHOW && interview && (< Show
        student={interview.student}
        interviewer={interview.interviewer.name}
        time={time}
        onDelete={() => transition(CONFIRM)}
        onEdit={() => transition(EDIT)}
      />)}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === CREATE && <Form onSave={save} interviewers={interviewers} onCancel={() => back()} />}
      {mode === EDIT && <Form
        onSave={save}
        onCancel={() => back()}
        interviewers={interviewers}
        interviewer={interview.interviewer.id}
        student={interview.student}
      />}
      {mode === SAVING && <Status message="Saving" />}
      {mode === DELETING && <Status message="Deleting" />}
      {mode === CONFIRM && <Confirm
        message="Are you sure you would like to delete?"
        onConfirm={deleteInterview}
        onCancel={() => back()}
      />}
      {mode === ERROR_SAVE && <Error message="Could not save appointment." onClose={() => back()} />}
      {mode === ERROR_DELETE && <Error message="Could not cancel appointment." onClose={() => back()} />}
    </article>
  );

};