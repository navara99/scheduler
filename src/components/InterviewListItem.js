import React from "react";
import classNames from "classnames";
import "components/InterviewListItem.scss";

export default function InterviewListItem({ id, name, avatar, selected, setInterviewer }) {
  const interviewListItemClass = classNames("interviewers__item", {
    "interviewers__item--selected": selected
  });

  return (
    <li className={interviewListItemClass} onClick={() => setInterviewer(id)}>
      <img
        className="interviewers__item-image"
        src={avatar}
        alt={name}
      />
      {selected && name}
    </li>
  )
}