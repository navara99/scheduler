const getAppointmentsForDay = ({ days, appointments }, selectedName) => {
  const selectedAppointmentArr = [];

  days.forEach((day) => {
    const { name, appointments: appointsmentsArr } = day;
    if (name !== selectedName) return;
    appointsmentsArr.forEach((appointmentId) => {
      selectedAppointmentArr.push(appointments[appointmentId])
    });
  });

  return selectedAppointmentArr;
};

const getInterview = (state, interview) => {
  if (!interview) return null;
  const { interviewer } = interview
  const { interviewers } = state;
  return { ...interview, interviewer: interviewers[interviewer] }
}

export { getAppointmentsForDay, getInterview };

