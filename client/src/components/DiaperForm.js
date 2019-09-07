import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {
  FormElement,
  FormContent,
  Label,
  DatePicker,
  IconToggle
} from './Form';
import Flex from './Flex';
import { colors } from '../pages/DiaperPage';

import peeIcon from '../icons/pee.svg';
import poopIcon from '../icons/poop.svg';
import unknownIcon from '../icons/unknown.svg';

const PoopColorToggle = styled(IconToggle)`
  position: relative;
  background-color: ${props => props.color};

  &::after {
    content: '';
    position: absolute;
    top: 0;
    opacity: ${props => (props.active ? 1 : 0.3)};
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url(${poopIcon});
  }
`;

function DiaperForm({ onChange, values }) {
  const { pee, poop, date, poopColor } = values;

  function handleDateChange(date) {
    onChange({ ...values, date });
  }

  function togglePee(e) {
    e.preventDefault();
    onChange({ ...values, pee: !pee });
  }

  function togglePoop(e) {
    e.preventDefault();
    if (!poop) {
      onChange({ ...values, poop: !poop, poopColor: null });
    } else {
      onChange({ ...values, poop: !poop });
    }
  }

  function handlePoopColor(e, poopColor) {
    e.preventDefault();
    onChange({ poopColor });
  }

  return (
    <FormContent>
      <FormElement>
        <Label>Art</Label>
        <Flex wrap="wrap" justifyContent="flex-end" spacing={5}>
          <IconToggle
            onClick={togglePee}
            src={peeIcon}
            active={pee}
            type="button"
          />
          <IconToggle
            onClick={togglePoop}
            src={poopIcon}
            active={poop}
            type="button"
          />
        </Flex>
      </FormElement>
      {poop && (
        <FormElement>
          <Label>Kacka Farbe</Label>
          <Flex wrap="wrap" justifyContent="flex-end" spacing={5}>
            {Object.keys(colors).map(color => (
              <PoopColorToggle
                key={color}
                color={colors[color]}
                active={poopColor === Number(color)}
                onClick={e => handlePoopColor(e, Number(color))}
                type="button"
              />
            ))}
            <IconToggle
              active={poopColor == null}
              src={unknownIcon}
              onClick={e => handlePoopColor(e, null)}
              type="button"
            />
          </Flex>
        </FormElement>
      )}
      <FormElement>
        <Label>Zeitpunkt</Label>
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
    </FormContent>
  );
}

DiaperForm.propTypes = {
  onChange: PropTypes.func.isRequired,
  values: PropTypes.object
};

DiaperForm.defaultProps = {
  values: {
    date: new Date(),
    pee: false,
    poop: false,
    poopColor: null
  }
};

export default DiaperForm;
