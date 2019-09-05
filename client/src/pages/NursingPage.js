import React from 'react';
import NursingEntry from '../components/NursingEntry';
import NursingForm from '../components/NursingForm';
import EventsPage from './EventsPage';
import wiegePos from '../images/wiegehaltung.png';
import liegePos from '../images/liegen.png';
import zurueckPos from '../images/zurückgelehnt.png';
import footballPos from '../images/footballhaltung.png';
import kreuzPos from '../images/kreuzwiegehaltung.png';
import hoppePos from '../images/hoppe_reiter_haltung.png';

export const positions = [
  {
    id: 0,
    name: 'Wiegehaltung',
    img: wiegePos
  },
  {
    id: 1,
    name: 'Liegen',
    img: liegePos
  },
  {
    id: 2,
    name: 'Zurückgelehnt',
    img: zurueckPos
  },
  {
    id: 3,
    name: 'Footballhaltung',
    img: footballPos
  },
  {
    id: 4,
    name: 'Kreuzwiegehaltung',
    img: kreuzPos
  },
  {
    id: 5,
    name: 'Hoppe-Reiter',
    img: hoppePos
  }
];

function NursingPage() {
  return (
    <EventsPage
      EntryComponent={NursingEntry}
      FormComponent={NursingForm}
      socketPrefix="nursing"
    />
  );
}

NursingPage.propTypes = {};

export default NursingPage;
