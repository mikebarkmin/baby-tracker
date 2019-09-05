import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
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
import SleepForm from './SleepForm';
import sleepIcon from '../icons/sleep.svg';

const Duration = styled.span`
  font-weight: bold;
  margin-right: 4px;
`;

function SleepEntry({ wakeup, date, onDelete, onUpdate }) {
  const [edit, setEdit] = useState(false);

  function handleEdit() {
    setEdit(!edit);
  }

  function handleUpdate(values) {
    setEdit(false);
    onUpdate(values);
  }

  return (
    <>
      <EventEntry>
        <EventIcon src={sleepIcon} />
        <EventContent>
          <EventDetails>
            <Duration>
              {formatDistanceStrict(new Date(wakeup), new Date(date), {
                unit: 'minute',
                locale: de
              })}
            </Duration>
          </EventDetails>
          <EventDate date={date} />
        </EventContent>
        {onUpdate && <EventEdit onClick={handleEdit} />}
        {onDelete && <EventDelete onClick={onDelete} />}
      </EventEntry>
      {edit && (
        <SleepForm
          header="Bearbeiten"
          submitLabel="Speichern"
          onSubmit={handleUpdate}
          initalValues={{ wakeup: new Date(wakeup), date: new Date(date) }}
        />
      )}
    </>
  );
}

SleepEntry.propTypes = {
  wakeup: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired
};

export default SleepEntry;

