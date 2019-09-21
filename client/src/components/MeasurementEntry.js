import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
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
import MeasurementForm from './MeasurementForm';
import measurementIcon from '../icons/measurement.svg';
import heightIcon from '../icons/height.svg';
import weightIcon from '../icons/weight.svg';
import headCircumferenceIcon from '../icons/headCircumference.svg';

const Number = styled.span`
  font-weight: bold;
  margin-right: 12px;

  &:before {
    content: '';
    display: inline-block;
    background: url(${props => props.icon}) no-repeat;
    width: 12px;
    height: 12px;
  }
`;

function MeasurementEntry({
  weight,
  height,
  headCircumference,
  date,
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

  return (
    <>
      <EventEntry>
        <EventIcon src={measurementIcon} />
        <EventContent>
          <EventDetails>
            <Number icon={heightIcon}>{height}cm</Number>
            <Number icon={weightIcon}>{weight}g</Number>
            <Number icon={headCircumferenceIcon}>{headCircumference}cm</Number>
          </EventDetails>
          <EventDate date={date} />
        </EventContent>
        {onUpdate && <EventEdit onClick={handleEdit} />}
        {onDelete && <EventDelete onClick={onDelete} />}
      </EventEntry>
      {edit && (
        <EventInlineForm
          onSubmit={handleUpdate}
          FormContent={MeasurementForm}
          initalValues={{
            height,
            weight,
            headCircumference,
            date: new Date(date)
          }}
        />
      )}
    </>
  );
}

MeasurementEntry.propTypes = {
  weight: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  headCircumference: PropTypes.number.isRequired,
  date: PropTypes.string.isRequired
};

export default MeasurementEntry;
