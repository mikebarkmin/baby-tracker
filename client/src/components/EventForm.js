import React, { useState } from 'react';
import {
  Form,
  FormHeader,
  FormHeaderIcon,
  FormHeaderTitle,
  FormSubmit
} from './Form';
import addIcon from '../icons/add.svg';
import removeIcon from '../icons/remove.svg';

function EventForm({ onSubmit, header, submitLabel, FormContent }) {
  const [values, setValues] = useState(undefined);
  const [open, setOpen] = useState(false);

  function handleChange(newValues) {
    if (values === undefined) {
      setValues({ ...newValues });
    } else {
      setValues({ ...values, ...newValues });
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    setOpen(false);
    onSubmit(values);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormHeader onClick={() => setOpen(!open)}>
        <FormHeaderTitle>{header}</FormHeaderTitle>
        <FormHeaderIcon src={open ? removeIcon : addIcon} />
      </FormHeader>
      {open && (
        <>
          <FormContent onChange={handleChange} values={values} />
          <FormSubmit type="submit" onClick={handleSubmit}>
            {submitLabel}
          </FormSubmit>
        </>
      )}
    </Form>
  );
}

EventForm.defaultProps = {
  header: 'Neuer Eintrag',
  submitLabel: 'Anlegen'
};

export default EventForm;
