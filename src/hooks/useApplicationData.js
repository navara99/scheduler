import axios from "axios";
import { useState, useEffect } from "react";

const useApplicationData = () => {
  const [state, setState] = useState({ day: "Monday", days: [], appointments: {}, interviewers: {} });

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
        setState((prev) => ({ ...prev, days, appointments, interviewers }));
      })
      .catch((err) => console.error(err.message));
  }, []);

  const setDay = (day) => setState((prev) => ({ ...prev, day }));

  const bookInterview = async (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    try {
      await axios.put(`/api/appointments/${id}`, appointment);
    } catch (e) {
      throw new Error(e)
    }

    setState((prev) => ({ ...prev, appointments: { ...appointments } }));
  }

  const cancelInterview = async (id) => {

    try {
      await axios.delete(`/api/appointments/${id}`);
    } catch (e) {
      throw new Error(e)
    }

    const stateCopy = { ...state };
    stateCopy.appointments[id].interview = null;
    setState(stateCopy);
  }

  return { state, setDay, bookInterview, cancelInterview }
}

export default useApplicationData;