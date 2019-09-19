import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { formatDistanceStrict } from 'date-fns';
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
import SleepForm from './SleepForm';
import sleepIcon from '../icons/sleep.svg';
import useLocale from '../hooks/useLocale';

const Duration = styled.span`
  font-weight: bold;
  margin-right: 4px;
`;

function SleepEntry({ wakeup, date, onDelete, onUpdate }) {
  const [edit, setEdit] = useState(false);
  const { dateLocale } = useLocale();

  function handleEdit() {
    setEdit(!edit);
  }

  function handleUpdate(values) {
    setEdit(false);
    onUpdate(values);
  }

  function getDuration() {
    try {
      return formatDistanceStrict(new Date(wakeup), new Date(date), {
        unit: 'minute',
        locale: dateLocale
      });
    } catch (e) {
      return '';
    }
  }

  return (
    <>
      <EventEntry>
        <EventIcon src={sleepIcon} />
        <EventContent>
          <EventDetails>
            <Duration>{getDuration()}</Duration>
          </EventDetails>
          <EventDate date={date} />
        </EventContent>
        {onUpdate && <EventEdit onClick={handleEdit} />}
        {onDelete && <EventDelete onClick={onDelete} />}
      </EventEntry>
      {edit && (
        <EventInlineForm
          onSubmit={handleUpdate}
          FormContent={SleepForm}
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
