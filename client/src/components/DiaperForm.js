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
  InputDatetime
} from './Form';
import { colors } from '../pages/DiaperPage';

import peeIcon from '../icons/pee.svg';
import poopIcon from '../icons/poop.svg';
import unknownIcon from '../icons/unknown.svg';

const PeeButton = styled.button`
  background-image: url(${peeIcon});
  width: 50px;
  height: 50px;
  border: 2px solid lightgrey;
  margin-right: 10px;
  border-radius: 4px;
  background-color: white;

  background-color: ${props => (props.active ? props.theme.primary : null)};
`;

const UnknownButton = styled.button`
  height: 50px;
  width: 50px;
  border: 2px solid lightgrey;
  margin-left: 10px;
  border-radius: 4px;
  background-color: white;
  background-image: url(${unknownIcon});

  background-color: ${props => (props.active ? props.theme.primary : null)};
`;

const PoopButton = styled.button`
  background-image: url(${poopIcon});
  width: 50px;
  height: 50px;
  border: 2px solid lightgrey;
  border-radius: 4px;
  background-color: white;

  background-color: ${props => (props.active ? props.theme.primary : null)};
`;

const PoopColorButton = styled.button`
  width: 50px;
  height: 50px;
  border-width: 2px;
  border-style: solid;
  border-color: lightgrey;
  border-radius: 4px;
  background-color: ${props => props.color};
  position: relative;
  margin-left: 10px;

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

function DiaperForm({ onSubmit, submitLabel, header, initalValues }) {
  const [date, setDate] = useState(initalValues.date);
  const [pee, setPee] = useState(initalValues.pee);
  const [poop, setPoop] = useState(initalValues.poop);
  const [poopColor, setPoopColor] = useState(initalValues.poopColor);

  function handleDateChange(date) {
    setDate(date);
  }

  function togglePee(e) {
    e.preventDefault();
    setPee(!pee);
  }

  function togglePoop(e) {
    e.preventDefault();
    setPoop(!poop);
    if (!poop) {
      setPoopColor(null);
    }
  }

  function handlePoopColor(e, color) {
    e.preventDefault();
    setPoopColor(color);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit({
      pee,
      poop,
      poopColor,
      date
    });
  }

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <FormHeader>{header}</FormHeader>
        <FormContent>
          <FormElement>
            <Label>Art</Label>
            <PeeButton onClick={togglePee} active={pee} type="button" />
            <PoopButton onClick={togglePoop} active={poop} type="button" />
          </FormElement>
          {poop && (
            <FormElement>
              <Label>Kacka Farbe</Label>
              {Object.keys(colors).map(color => (
                <PoopColorButton
                  key={color}
                  color={colors[color]}
                  active={poopColor === color}
                  onClick={e => handlePoopColor(e, color)}
                  type="button"
                />
              ))}
              <UnknownButton
                active={poopColor == null}
                onClick={e => handlePoopColor(e, null)}
                type="button"
              />
            </FormElement>
          )}
          <FormElement>
            <Label>Zeitpunkt</Label>
            <InputDatetime
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
        <FormSubmit type="submit" onClick={handleSubmit}>
          {submitLabel}
        </FormSubmit>
      </Form>
    </>
  );
}

DiaperForm.propTypes = {
  onSubmit: PropTypes.func,
  submitLabel: PropTypes.string,
  header: PropTypes.string,
  initalValues: PropTypes.object
};

DiaperForm.defaultProps = {
  onSubmit: () => {},
  submitLabel: 'Erstellen',
  header: 'Neuer Windeleintrag',
  initalValues: {
    date: new Date(),
    pee: false,
    poop: false,
    poopColor: null
  }
};

export default DiaperForm;

