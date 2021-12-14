import React, { useState } from "react";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";


export default function Form({ student, interviewer, interviewers, onSave, onCancel, interviewerId }) {
  const [currentStudent, setCurrentStudent] = useState(student || "");
  const [currentInterviewer, setCurrentInterviewer] = useState(interviewer || null);
  const [error, setError] = useState("");

  const reset = () => {
    setCurrentInterviewer(null);
    setCurrentStudent("");
  };

  const cancel = () => {
    onCancel();
    reset();
  };

  const validate = () => {
    if (!currentStudent) return setError("Student name cannot be blank");
    setError("");
    onSave(currentStudent, currentInterviewer);
  };

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={(e) => e.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            data-testid="student-name-input"
            placeholder="Enter Student Name"
            value={currentStudent}
            onChange={(e) => setCurrentStudent(e.target.value)}
          />
          <section className="appointment__validation">{error}</section>
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
          <Button confirm onClick={() => validate()}>Save</Button>
        </section>
      </section>
    </main>
  )
}