import React from 'react';
import styled from 'styled-components';
import RDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { darken } from 'polished';
import Flex from './Flex';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  background: whitesmoke;
  border-radius: 4px;
  margin-top: 8px;
`;

export const FormElement = styled.div`
  display: flex;
  align-items: center;
  margin: 8px 0;
`;

export const FormContent = styled.div`
  padding: 8px;
`;

export const FormHeader = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 8px;
  background: lightgrey;
  border-radius: 4px 4px 0 0;
`;

export const FormHeaderTitle = styled.h2`
  font-size: 1rem;
  margin: 0;
  flex: 1;
`;

export const FormHeaderIcon = styled.img`
  width: 30px;
  height: 30px;
`;

export const FormSubmit = styled.button`
  border: 0;
  outline: 0;
  background: ${props => props.theme.primary};
  border-radius: 0 0 4px 4px;
  padding: 8px;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background: ${props => darken(0.1, props.theme.primary)};
  }
`;

export const Input = styled.input`
  border-radius: 4px;
  padding: 0 25px;
  height: 55px;
  outline: none;
  border: 2px solid lightgrey;
  font-weight: bold;
  color: grey;
  line-height: 1.2;
  box-sizing: border-box;
`;

export const Toggle = styled.button`
  height: 50px;
  cursor: pointer;
  border: 2px solid lightgrey;
  text-transform: uppercase;
  font-weight: bold;
  color: grey;
  border-radius: 4px;
  background-color: white;

  background-color: ${props => (props.active ? props.theme.primary : null)};
`;

export const IconToggle = styled(Toggle)`
  background-image: url(${props => props.src});
  background-size: cover;
  background-position: center;
  width: 50px;
  background-color: ${props => (props.active ? props.theme.primary : null)};
`;

export const Label = styled.label`
  font-weight: bold;
  flex: 1;
`;

class CustomInput extends React.Component {
  render() {
    const { value, onClick } = this.props;
    return (
      <Toggle type="button" onClick={onClick}>
        {value}
      </Toggle>
    );
  }
}

export const DatePicker = ({ onChange, ...props }) => {
  return (
    <Flex wrap="wrap" justifyContent="flex-end" spacing={5}>
      <Toggle
        onClick={() => {
          onChange(new Date());
        }}
        type="button"
      >
        Jetzt
      </Toggle>
      <RDatePicker
        {...props}
        onChange={onChange}
        customInput={<CustomInput />}
      />
    </Flex>
  );
};

export const InputDatetime = RDatePicker;
