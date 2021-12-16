import axios from "axios";
import { useEffect, useReducer } from "react";
import { reducer, SET_APPLICATION_DATA, SET_DAY, SET_INTERVIEW } from "reducers/application";

const useApplicationData = () => {
  const [state, dispatch] = useReducer(reducer, { day: "Monday", days: [], appointments: {}, interviewers: {} });

  useEffect(() => {
    const ws = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL || "ws://localhost:8001");
    ws.onopen = () => {

      ws.onmessage = (e) => {
        const { type, id, interview } = JSON.parse(e.data);
        dispatch({ type, id, interview });
      };
    };

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
      throw new Error(e);
    };

    dispatch({ type: SET_INTERVIEW, id, interview });
  };

  const cancelInterview = async (id) => {

    try {
      await axios.delete(`/api/appointments/${id}`);
    } catch (e) {
      throw new Error(e);
    };

    dispatch({ type: SET_INTERVIEW, id, interview: null });
  };

  return { state, setDay, bookInterview, cancelInterview };
};

export default useApplicationData;