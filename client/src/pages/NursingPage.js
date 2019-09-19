import React from 'react';
import { t } from '@lingui/macro';
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
    name: t`Cradle hold`,
    img: wiegePos
  },
  {
    id: 1,
    name: t`Lying`,
    img: liegePos
  },
  {
    id: 2,
    name: t`Laid-back`,
    img: zurueckPos
  },
  {
    id: 3,
    name: t`Rugby ball hold`,
    img: footballPos
  },
  {
    id: 4,
    name: t`Cross Cradle hold`,
    img: kreuzPos
  },
  {
    id: 5,
    name: t`Koala hold`,
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
