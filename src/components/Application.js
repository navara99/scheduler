import React from "react";
import DayList from "./DayList";
import Appointment from "./Appointment";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";
import "components/Application.scss";
import useApplicationData from "hooks/useApplicationData";

export default function Application() {
  const { state, setDay, bookInterview, cancelInterview } = useApplicationData();
  const interviewersForDay = getInterviewersForDay(state, state.day);

  const appointmentList = getAppointmentsForDay(state, state.day).map((appointment) => {
    const transformedInterview = getInterview(state, appointment.interview);

    return <Appointment
      key={appointment.id}
      time={appointment.time}
      id={appointment.id}
      cancelInterview={() => cancelInterview(appointment.id)}
      interviewers={interviewersForDay}
      interview={transformedInterview}
      bookInterview={bookInterview}
    />
  }).concat(<Appointment key="last" time="5pm" />);

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            value={state.day}
            onChange={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointmentList}
      </section>
    </main>
  );
};
