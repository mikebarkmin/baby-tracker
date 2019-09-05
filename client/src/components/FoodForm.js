import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Autosuggest from 'react-autosuggest';
import {
  Form,
  FormElement,
  FormHeader,
  FormContent,
  FormSubmit,
  Input,
  Label,
  InputDatetime
} from './Form';
import useSocket from '../hooks/useSocket';

const getSuggestionValue = suggestion => suggestion;

const renderSuggestion = suggestion => <span>{suggestion}</span>;

function FoodForm({ onSubmit, submitLabel, header, initalValues }) {
  const [date, setDate] = useState(initalValues.date);
  const [types, setTypes] = useState(['Pre Nahrung']);
  const [type, setType] = useState(initalValues.type);
  const [amount, setAmount] = useState(initalValues.amount);
  const socket = useSocket();

  useEffect(() => {
    socket.emit('food/getTypes', d => {
      setTypes(d.types);
      if (type === '' && d.types.length > 0) {
        setType(d.types[0]);
      }
    });
  }, [socket, type]);

  function handleDateChange(date) {
    setDate(date);
  }

  function handleTypeChange(e, { newValue }) {
    setType(newValue);
  }

  function handleAmountChange(e) {
    setAmount(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit({
      amount,
      date,
      type
    });
  }

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <FormHeader>{header}</FormHeader>
        <FormContent>
          <FormElement>
            <Label>Art</Label>
            <Autosuggest
              suggestions={types}
              onSuggestionsFetchRequested={() => {}}
              onSuggestionsClearRequested={() => {}}
              getSuggestionValue={getSuggestionValue}
              renderSuggestion={renderSuggestion}
              inputProps={{
                value: type,
                onChange: handleTypeChange
              }}
            />
          </FormElement>
          <FormElement>
            <Label>Menge in ml</Label>
            <Input
              type="number"
              value={amount}
              name="amount"
              placeholder="Menge in ml..."
              onChange={handleAmountChange}
            />
          </FormElement>
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

FoodForm.propTypes = {
  onSubmit: PropTypes.func,
  submitLabel: PropTypes.string,
  header: PropTypes.string,
  initalValues: PropTypes.object
};

FoodForm.defaultProps = {
  onSubmit: () => {},
  submitLabel: 'Erstellen',
  header: 'Neuer Essenseintrag',
  initalValues: {
    date: new Date(),
    amount: 0,
    type: ''
  }
};

export default FoodForm;
