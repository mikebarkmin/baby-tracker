import React, { useState, useEffect } from 'react';
import { I18n } from '@lingui/react';
import { Trans, t } from '@lingui/macro';
import PropTypes from 'prop-types';
import Autosuggest from 'react-autosuggest';
import { FormElement, FormContent, Input, Label, DatePicker } from './Form';
import useSocket from '../hooks/useSocket';

const getSuggestionValue = suggestion => suggestion;

const renderSuggestion = suggestion => <span>{suggestion}</span>;

const renderInputComponent = inputProps => <Input {...inputProps} />;

function FoodForm({ onChange, values }) {
  const { date, type, amount } = values;
  const [types, setTypes] = useState([]);
  const socket = useSocket();

  useEffect(() => {
    socket.emit('food/getTypes', d => {
      setTypes(d.types);
    });
  }, [socket, type]);

  function handleDateChange(date) {
    onChange({ ...values, date });
  }

  function handleTypeChange(e, { newValue: type }) {
    onChange({ ...values, type });
  }

  function handleAmountChange(e) {
    const amount = e.target.value;
    onChange({ ...values, amount });
  }

  return (
    <FormContent>
      <FormElement>
        <Label>
          <Trans>Type</Trans>
        </Label>
        <Autosuggest
          suggestions={types}
          onSuggestionsFetchRequested={() => {}}
          onSuggestionsClearRequested={() => {}}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          renderInputComponent={renderInputComponent}
          inputProps={{
            value: type,
            onChange: handleTypeChange
          }}
        />
      </FormElement>
      <FormElement>
        <Label>
          <Trans>Amount in ml</Trans>
        </Label>
        <I18n>
          {({ i18n }) => (
            <Input
              type="number"
              value={amount}
              name="amount"
              placeholder={`${i18n._(t`Amount in ml`)}...`}
              onChange={handleAmountChange}
            />
          )}
        </I18n>
      </FormElement>
      <FormElement>
        <Label>
          <Trans>Timestamp</Trans>
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
    </FormContent>
  );
}

FoodForm.propTypes = {
  onChange: PropTypes.func.isRequired,
  values: PropTypes.object
};

FoodForm.defaultProps = {
  values: {
    date: new Date(),
    amount: 0,
    type: ''
  }
};

export default FoodForm;
