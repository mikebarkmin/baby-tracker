import React, { useState } from 'react';
import styled from 'styled-components';
import {
  EventEntry,
  EventIcon,
  EventDate,
  EventContent,
  EventEdit,
  EventDelete,
  EventDetails
} from './EventEntry';
import EventInlineForm from './EventInlineForm';
import DiaperForm from './DiaperForm';
import { colors } from '../pages/DiaperPage';
import diaperIcon from '../icons/diaper.svg';

const Kind = styled.span`
  font-weight: bold;
  margin-right: 4px;
`;

function DiaperEntry({ date, pee, poop, poopColor, onDelete, onUpdate }) {
  const [edit, setEdit] = useState(false);

  function handleEdit() {
    setEdit(!edit);
  }

  function handleUpdate(values) {
    setEdit(false);
    onUpdate(values);
  }

  const kind = [];

  if (pee) {
    kind.push('Pipi');
  }

  if (poop) {
    kind.push('Kacka');
  }

  return (
    <>
      <EventEntry>
        <EventIcon
          src={diaperIcon}
          style={{
            backgroundColor: poop ? colors[poopColor] : null,
            borderLeftWidth: 8,
            borderLeftColor: 'powderblue',
            borderLeftStyle: pee ? 'solid' : null
          }}
        />
        <EventContent>
          <EventDetails>
            <Kind>{kind.join(' und ')}</Kind>
          </EventDetails>
          <EventDate date={date} />
        </EventContent>
        {onUpdate && <EventEdit onClick={handleEdit} />}
        {onDelete && <EventDelete onClick={onDelete} />}
      </EventEntry>
      {edit && (
        <EventInlineForm
          onSubmit={handleUpdate}
          FormContent={DiaperForm}
          initalValues={{
            date: new Date(date),
            pee,
            poop,
            poopColor
          }}
        />
      )}
    </>
  );
}

DiaperEntry.propTypes = {};

export default DiaperEntry;
