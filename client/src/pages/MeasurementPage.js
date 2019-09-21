import React from 'react';
import MeasurementEntry from '../components/MeasurementEntry';
import MeasurementForm from '../components/MeasurementForm';
import EventsPage from './EventsPage';

function MeasurementPage() {
  return (
    <EventsPage
      EntryComponent={MeasurementEntry}
      FormComponent={MeasurementForm}
      socketPrefix="measurement"
    />
  );
}

MeasurementPage.propTypes = {};

export default MeasurementPage;

