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

export {reducer, SET_APPLICATION_DATA, SET_DAY, SET_INTERVIEW};