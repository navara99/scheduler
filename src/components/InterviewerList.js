import React from "react";
import "components/InterviewerList.scss";
import InterviewListItem from "./InterviewListItem";

export default function InterviewerList({ interviewers, setInterviewer, interviewer }) {
  const interviewerItems = interviewers.map((interviewerItem) => {
    const { id, name, avatar } = interviewerItem;
    return <InterviewListItem
      key={id}
      id={id}
      name={name}
      avatar={avatar}
      selected={id === interviewer}
      setInterviewer={setInterviewer}
    />
  });

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewerItems}</ul>
    </section>
  )
}