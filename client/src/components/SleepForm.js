import React from 'react';
import PropTypes from 'prop-types';
import { Trans } from '@lingui/macro';
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
        <Label>
          <Trans>Fallen asleep</Trans>
        </Label>
        <DatePicker
          showTimeSelect
          timeIntervals={5}
          timeFormat="HH:mm"
          timeCaption={<Trans>Time</Trans>}
          name="date"
          withPortal
          selected={date}
          onChange={handleDateChange}
          dateFormat="dd.MM.yyyy HH:mm"
        />
      </FormElement>
      <FormElement>
        <Label>
          <Trans>Wake Up</Trans>
        </Label>
        <DatePicker
          showTimeSelect
          timeIntervals={5}
          timeFormat="HH:mm"
          timeCaption={<Trans>Time</Trans>}
          name="wakeup"
          withPortal
          selected={wakeup}
          onChange={handleWakeupChange}
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
