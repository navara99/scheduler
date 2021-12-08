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
}

export default getAppointmentsForDay;

