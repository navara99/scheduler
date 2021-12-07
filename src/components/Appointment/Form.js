import React, { useState } from "react";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";


export default function Form({ student, interviewer, interviewers, onSave, onCancel }) {
  const [currentStudent, setCurrentStudent] = useState(student || "");
  const [currentInterviewer, setCurrentInterviewer] = useState(interviewer || null);

  const reset = () => {
    setCurrentInterviewer("");
    setCurrentStudent("");
  };

  const cancel = () => {
    onCancel();
    reset();
  };

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={(e) => e.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={currentStudent}
            onChange={(e) => setCurrentStudent(e.target.value)}
          />
        </form>
        <InterviewerList
          value={currentInterviewer}
          interviewers={interviewers}
          onChange={setCurrentInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={() => onSave(currentStudent, currentInterviewer)}>Save</Button>
        </section>
      </section>
    </main>
  )
}