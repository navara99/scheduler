import axios from "axios";
import { useState, useEffect } from "react";

const useApplicationData = () => {
  const [state, setState] = useState({ day: "Monday", days: [], appointments: {}, interviewers: {} });
  const dateIdMap = {
    "Monday": 0,
    "Tuesday": 1,
    "Wednesday": 2,
    "Thursday": 3,
    "Friday": 4
  };

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

  const updateSpots = (addSpot = true) => {
    setState((prev) => {
      const stateCopy = { ...prev };
      const dayId = dateIdMap[stateCopy.day];
      state.days[dayId].spots = addSpot ? state.days[dayId].spots + 1 : state.days[dayId].spots - 1;
      return stateCopy
    });
  }

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

    updateSpots(false);
    setState((prev) => ({ ...prev, appointments: { ...appointments } }));

  }

  const cancelInterview = async (id) => {

    try {
      await axios.delete(`/api/appointments/${id}`);
    } catch (e) {
      throw new Error(e)
    }

    updateSpots();
    setState((prev) => {
      const stateCopy = { ...prev };
      stateCopy.appointments[id].interview = null;
      return stateCopy;
    }
    );

  }

  return { state, setDay, bookInterview, cancelInterview }
}

export default useApplicationData;