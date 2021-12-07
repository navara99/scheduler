import React from "react";
import "components/InterviewerList";

export default function InterviewerList({ interviewers, setInterviewer, interviewer }) {



  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list"></ul>
    </section>
  )
}