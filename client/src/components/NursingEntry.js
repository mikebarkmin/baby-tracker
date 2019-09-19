import React, { useState } from 'react';
import styled from 'styled-components';
import { Trans } from '@lingui/macro';
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
import NursingForm from './NursingForm';
import EventInlineForm from './EventInlineForm';
import nursingIcon from '../icons/nursing.svg';
import { positions } from '../pages/NursingPage';
import useLocale from '../hooks/useLocale';

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
  const { dateLocale } = useLocale();

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
              <Trans id={name} /> (
              {breastLeft ? <Trans>Left</Trans> : <Trans>Right</Trans>}){' '}
              <Trans>for</Trans>{' '}
              {formatDistanceStrict(new Date(end), new Date(date), {
                unit: 'minute',
                locale: dateLocale
              })}
            </Type>
          </EventDetails>
          <EventDate date={date} />
        </EventContent>
        {onUpdate && <EventEdit onClick={handleEdit} />}
        {onDelete && <EventDelete onClick={onDelete} />}
      </EventEntry>
      {edit && (
        <EventInlineForm
          onSubmit={handleUpdate}
          FormContent={NursingForm}
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
