import React from 'react';
import AppointmentsCalendar from '../appointments/AppointmentsCalendar';
import { useUser } from '../../auth/userContext';

const DentistSchedule = () => {
  const { user } = useUser();

  return <AppointmentsCalendar searchBar={false} proId={user?.profesionalId} />;
};

export default DentistSchedule;
