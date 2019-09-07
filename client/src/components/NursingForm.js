import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {
  Form,
  FormElement,
  FormHeader,
  FormContent,
  FormSubmit,
  Label,
  Toggle,
  IconToggle,
  DatePicker
} from './Form';
import unknownIcon from '../icons/unknown.svg';
import { positions } from '../pages/NursingPage';

const PositionName = styled.span`
  margin: 8px;
  color: grey;
  font-size: 1rem;
  font-weight: bold;
  text-align: center;
`;

function NursingForm({ onChange, values }) {
  const { date, end, breastLeft, breastPosition } = values;

  function handleDateChange(date) {
    onChange({ ...values, date });
  }

  function handleEndChange(end) {
    onChange({ ...values, end });
  }

  function setBreastLeft(breastLeft) {
    onChange({ ...values, breastLeft });
  }

  function setBreastPosition(breastPosition) {
    onChange({ ...values, breastPosition });
  }

  const position = positions[breastPosition];
  const name = position ? position.name : '?';

  return (
    <FormContent>
      <FormElement>
        <Label>Seite</Label>
        <Toggle
          onClick={() => setBreastLeft(true)}
          active={breastLeft}
          type="button"
        >
          Links
        </Toggle>
        <Toggle
          onClick={() => setBreastLeft(false)}
          active={!breastLeft}
          type="button"
        >
          Rechts
        </Toggle>
      </FormElement>
      <FormElement>
        <Label>Position</Label>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <PositionName>{name}</PositionName>
          <div>
            {positions.map(p => (
              <IconToggle
                key={p.id}
                src={p.img}
                onClick={() => setBreastPosition(p.id)}
                active={breastPosition === p.id}
                type="button"
              ></IconToggle>
            ))}
            <IconToggle
              src={unknownIcon}
              onClick={() => setBreastPosition(null)}
              active={breastPosition === null}
              type="button"
            />
          </div>
        </div>
      </FormElement>
      <FormElement>
        <Label>Start</Label>
        <DatePicker
          showTimeSelect
          timeIntervals={5}
          timeFormat="HH:mm"
          timeCaption="Uhrzeit"
          name="date"
          withPortal
          selected={date}
          onChange={handleDateChange}
          timeInputLabel="Time:"
          dateFormat="dd.MM.yyyy HH:mm"
        />
      </FormElement>
      <FormElement>
        <Label>Ende</Label>
        <DatePicker
          showTimeSelect
          timeIntervals={5}
          timeFormat="HH:mm"
          timeCaption="Uhrzeit"
          name="end"
          withPortal
          selected={end}
          onChange={handleEndChange}
          timeInputLabel="Time:"
          dateFormat="dd.MM.yyyy HH:mm"
        />
      </FormElement>
    </FormContent>
  );
}

NursingForm.propTypes = {
  onChange: PropTypes.func,
  values: PropTypes.object
};

NursingForm.defaultProps = {
  onChange: () => {},
  values: {
    date: new Date(),
    end: new Date(),
    breastLeft: false,
    breastPosition: null
  }
};

export default NursingForm;
