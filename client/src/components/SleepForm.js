import React from 'react';
import PropTypes from 'prop-types';
import { FormElement, FormContent, Label, DatePicker } from './Form';

function SleepForm({ onChange, values }) {
  const { date, wakeup } = values;

  function handleDateChange(date) {
    onChange({ ...values, date });
  }

  function handleWakeupChange(wakeup) {
    onChange({ ...values, wakeup });
  }

  return (
    <FormContent>
      <FormElement>
        <Label>Eingeschlafen</Label>
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
        <Label>Aufgewacht</Label>
        <DatePicker
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
  );
}

SleepForm.propTypes = {
  values: PropTypes.object
};

SleepForm.defaultProps = {
  values: {
    date: new Date(),
    wakeup: new Date()
  }
};

export default SleepForm;
