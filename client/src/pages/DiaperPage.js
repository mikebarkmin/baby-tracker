import React from 'react';
import DiaperEntry from '../components/DiaperEntry';
import DiaperForm from '../components/DiaperForm';
import EventsPage from './EventsPage';

export const colors = {
  0: 'black',
  1: 'peru',
  2: 'olive',
  3: 'orange',
  4: 'khaki',
  5: 'white'
};

function DiaperPage() {
  return (
    <EventsPage
      EntryComponent={DiaperEntry}
      FormComponent={DiaperForm}
      socketPrefix="diaper"
    />
  );
}

DiaperPage.propTypes = {};

export default DiaperPage;
