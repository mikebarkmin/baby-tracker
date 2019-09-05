import React from 'react';
import SleepEntry from '../components/SleepEntry';
import SleepForm from '../components/SleepForm';
import EventsPage from './EventsPage';

function SleepPage() {
  return (
    <EventsPage
      EntryComponent={SleepEntry}
      FormComponent={SleepForm}
      socketPrefix="sleep"
    />
  );
}

SleepPage.propTypes = {};

export default SleepPage;
