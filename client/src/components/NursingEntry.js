import React, { useState } from 'react';
import styled from 'styled-components';
import { formatDistanceStrict } from 'date-fns';
import { de } from 'date-fns/locale';
import {
  EventEntry,
  EventIcon,
  EventDate,
  EventContent,
  EventEdit,
  EventDelete,
  EventDetails
} from './EventEntry';
import NursingForm from './NursingForm';
import nursingIcon from '../icons/nursing.svg';
import { positions } from '../pages/NursingPage';

console.log(positions);

const Type = styled.span`
  font-weight: bold;
  margin-right: 4px;
`;

function NursingEntry({
  breastPosition,
  breastLeft,
  date,
  end,
  onDelete,
  onUpdate
}) {
  const [edit, setEdit] = useState(false);

  function handleEdit() {
    setEdit(!edit);
  }

  function handleUpdate(values) {
    setEdit(false);
    onUpdate(values);
  }

  const position = positions.find(p => p.id === breastPosition) || {};
  const name = position.name || '?';

  return (
    <>
      <EventEntry>
        <EventIcon src={nursingIcon} />
        <EventContent>
          <EventDetails>
            <Type>
              {name} {breastLeft ? '(Links)' : '(Rechts)'} für{' '}
              {formatDistanceStrict(new Date(end), new Date(date), {
                unit: 'minute',
                locale: de
              })}
            </Type>
          </EventDetails>
          <EventDate date={date} />
        </EventContent>
        {onUpdate && <EventEdit onClick={handleEdit} />}
        {onDelete && <EventDelete onClick={onDelete} />}
      </EventEntry>
      {edit && (
        <NursingForm
          header="Bearbeiten"
          submitLabel="Speichern"
          onSubmit={handleUpdate}
          initalValues={{
            end: new Date(end),
            breastLeft,
            breastPosition,
            date: new Date(date)
          }}
        />
      )}
    </>
  );
}

NursingEntry.propTypes = {};

export default NursingEntry;
