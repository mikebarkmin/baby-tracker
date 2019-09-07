import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, FormSubmit } from './Form';

function EventInlineForm({ onSubmit, submitLabel, FormContent, initalValues }) {
  const [values, setValues] = useState(initalValues);

  function handleChange(newValues) {
    if (values === undefined) {
      setValues({ ...newValues });
    } else {
      setValues({ ...values, ...newValues });
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(values);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormContent onChange={handleChange} values={values} />
      <FormSubmit type="submit" onClick={handleSubmit}>
        {submitLabel}
      </FormSubmit>
    </Form>
  );
}

EventInlineForm.propTypes = {
  initalValues: PropTypes.object.isRequired,
  FormContent: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};

EventInlineForm.defaultProps = {
  submitLabel: 'Speichern'
};

export default EventInlineForm;
