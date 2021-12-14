import axios from "axios";
import { useEffect, useReducer } from "react";
import { getAppointmentsForDay } from "helpers/selectors";

const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";

function reducer(state, action) {
  const { day, days, appointments, interviewers, id, interview } = action;
  const dateIdMap = {
    "Monday": 0,
    "Tuesday": 1,
    "Wednesday": 2,
    "Thursday": 3,
    "Friday": 4
  };

  switch (action.type) {
    case SET_DAY:
      return { ...state, day };
    case SET_APPLICATION_DATA:
      return { ...state, days, appointments, interviewers };
    case SET_INTERVIEW: {
      const appointment = { ...state.appointments[id], interview };
      const appointments = { ...state.appointments, [id]: appointment };
      const stateCopy = { ...state, appointments };
      const appointmentsForDay = getAppointmentsForDay(stateCopy, state.day);
      stateCopy.days[dateIdMap[stateCopy.day]].spots = appointmentsForDay.filter((appointment) => !appointment.interview).length;
      return { ...stateCopy, appointments: { ...appointments } };
    }
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }

}

const useApplicationData = () => {
  const [state, dispatch] = useReducer(reducer, { day: "Monday", days: [], appointments: {}, interviewers: {} })

  useEffect(() => {
    const ws = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);
    ws.onopen = () => {

      ws.onmessage = (e) => {
        const { type, id, interview } = JSON.parse(e.data);
        dispatch({ type, id, interview });
      }
    }

    return () => ws.close();

  }, []);

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
        dispatch({ type: SET_APPLICATION_DATA, days, appointments, interviewers });
      })
      .catch((err) => console.error(err.message));
  }, []);

  const setDay = (day) => dispatch({ type: SET_DAY, day });

  const bookInterview = async (id, interview) => {

    try {
      await axios.put(`/api/appointments/${id}`, { ...state.appointments[id], interview: { ...interview } });
    } catch (e) {
      throw new Error(e)
    }

    dispatch({ type: SET_INTERVIEW, id, interview });
  }

  const cancelInterview = async (id) => {

    try {
      await axios.delete(`/api/appointments/${id}`);
    } catch (e) {
      throw new Error(e)
    }

    dispatch({ type: SET_INTERVIEW, id, interview: null })
  }

  return { state, setDay, bookInterview, cancelInterview }
}

export default useApplicationData;