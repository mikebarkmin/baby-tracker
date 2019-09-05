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
import unknownIcon from '../icons/unknown.svg';
import { positions } from '../pages/NursingPage';

const BreastButton = styled.button`
  height: 50px;
  border: 2px solid lightgrey;
  margin-left: 10px;
  border-radius: 4px;
  background-color: white;

  background-color: ${props => (props.active ? props.theme.primary : null)};
`;

const BreastPositionButton = styled.button`
  position: relative;
  background-image: url(${props => props.src});
  padding: 4px;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  width: 120px;
  height: 120px;
  margin: 10px;
  border: 2px solid lightgrey;
  border-radius: 4px;
  background-color: white;
  padding-top: 80px;

  background-color: ${props => (props.active ? props.theme.primary : null)};
`;

function NursingForm({ onSubmit, submitLabel, header, initalValues }) {
  const [date, setDate] = useState(initalValues.date);
  const [end, setEnd] = useState(initalValues.end);
  const [breastLeft, setBreastLeft] = useState(initalValues.breastLeft);
  const [breastPosition, setBreastPosition] = useState(
    initalValues.breastPosition
  );

  function handleDateChange(date) {
    setDate(date);
  }

  function handleEndChange(date) {
    setEnd(date);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit({
      breastLeft,
      breastPosition,
      end,
      date
    });
  }

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <FormHeader>{header}</FormHeader>
        <FormContent>
          <FormElement>
            <Label>Seite</Label>
            <BreastButton
              onClick={() => setBreastLeft(true)}
              active={breastLeft}
              type="button"
            >
              Links
            </BreastButton>
            <BreastButton
              onClick={() => setBreastLeft(false)}
              active={!breastLeft}
              type="button"
            >
              Rechts
            </BreastButton>
          </FormElement>
          <FormElement>
            <Label>Position</Label>
            <div>
              {positions.map(p => (
                <BreastPositionButton
                  key={p.id}
                  style={{
                    width: 200
                  }}
                  src={p.img}
                  onClick={() => setBreastPosition(p.id)}
                  active={breastPosition === p.id}
                  type="button"
                >
                  <span>{p.name}</span>
                </BreastPositionButton>
              ))}
              <BreastPositionButton
                src={unknownIcon}
                onClick={() => setBreastPosition(null)}
                active={breastPosition === null}
                type="button"
              />
            </div>
          </FormElement>
          <FormElement>
            <Label>Start</Label>
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
          <FormElement>
            <Label>Ende</Label>
            <InputDatetime
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
        <FormSubmit type="submit" onClick={handleSubmit}>
          {submitLabel}
        </FormSubmit>
      </Form>
    </>
  );
}

NursingForm.propTypes = {
  onSubmit: PropTypes.func,
  submitLabel: PropTypes.string,
  header: PropTypes.string,
  initalValues: PropTypes.object
};

NursingForm.defaultProps = {
  onSubmit: () => {},
  submitLabel: 'Erstellen',
  header: 'Neuer Stilleintrag',
  initalValues: {
    date: new Date(),
    end: new Date(),
    breastLeft: false,
    breastPosition: null
  }
};

export default NursingForm;

