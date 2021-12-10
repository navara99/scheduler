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

const getInterviewersForDay = ({ days, interviewers }, selectedName) => {
  const selectedInterviewersArr = [];

  days.forEach((day) => {
    const { name, interviewers: interviewersArr } = day;
    if (name !== selectedName) return;
    interviewersArr.forEach((interviewerId) => {
      selectedInterviewersArr.push(interviewers[interviewerId])
    });
  });

  return selectedInterviewersArr;
};

const getInterview = (state, interview) => {
  if (!interview) return null;
  const { interviewer } = interview
  const { interviewers } = state;
  return { ...interview, interviewer: interviewers[interviewer] }
}

export { getAppointmentsForDay, getInterview, getInterviewersForDay };

