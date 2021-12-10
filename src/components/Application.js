import React, { useState, useEffect } from "react";
import DayList from "./DayList";
import Appointment from "./Appointment";
import axios from "axios";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";
import "components/Application.scss";

export default function Application(props) {
  const [state, setState] = useState({ days: [], appointments: {}, interviewers: {} })
  const [day, setDay] = useState("Monday");

  useEffect(() => {
    const daysEndpoint = "/api/days";
    const appointmentsEndpoint = "/api/appointments";
    const interviewersEndpoint = "/api/interviewers";
    Promise.all(
      [
        axios.get(daysEndpoint),
        axios.get(appointmentsEndpoint),
        axios.get(interviewersEndpoint)
      ]
    )
      .then(([{ data: days }, { data: appointments }, { data: interviewers }]) => {
        setState(({ days, appointments, interviewers }));
      })
      .catch((err) => console.error(err.message));
  }, []);

  const interviewersForDay = getInterviewersForDay(state, day);
  
  const appointmentList = getAppointmentsForDay(state, day).map((appointment) => {
    const transformedInterview = getInterview(state, appointment.interview);

    return <Appointment
      key={appointment.id}
      time={appointment.time}
      interviewers={interviewersForDay}
      interview={transformedInterview} />
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
            value={day}
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
}
