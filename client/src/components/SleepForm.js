import React, { useState } from 'react';
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

function SleepForm({ onSubmit, submitLabel, header, initalValues }) {
  const [date, setDate] = useState(initalValues.date);
  const [wakeup, setWakeup] = useState(initalValues.wakeup);

  function handleDateChange(date) {
    setDate(date);
  }

  function handleWakeupChange(date) {
    setWakeup(date);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit({
      wakeup,
      date
    });
  }

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <FormHeader>{header}</FormHeader>
        <FormContent>
          <FormElement>
            <Label>Eingeschlafen</Label>
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
            <Label>Aufgewacht</Label>
            <InputDatetime
              showTimeSelect
              timeIntervals={5}
              timeFormat="HH:mm"
              timeCaption="Uhrzeit"
              name="wakeup"
              withPortal
              selected={wakeup}
              onChange={handleWakeupChange}
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

SleepForm.propTypes = {
  onSubmit: PropTypes.func,
  submitLabel: PropTypes.string,
  header: PropTypes.string,
  initalValues: PropTypes.object
};

SleepForm.defaultProps = {
  onSubmit: () => {},
  submitLabel: 'Erstellen',
  header: 'Neuer Schlafeintrag',
  initalValues: {
    date: new Date(),
    wakeup: new Date()
  }
};

export default SleepForm;
