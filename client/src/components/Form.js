import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { darken } from 'polished';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  background: whitesmoke;
  border-radius: 4px;
  margin-top: 8px;
`;

export const FormElement = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin: 8px 0;
`;

export const FormContent = styled.div`
  padding: 8px;
`;

export const FormHeader = styled.h2`
  font-size: 1rem;
  background: lightgrey;
  margin: 0;
  border-radius: 4px 4px 0 0;
  padding: 8px;
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
  flex: 4;
  border-radius: 4px;
  padding: 0 25px;
  height: 55px;
  outline: none;
  border: 1px solid lightgrey;
  width: 100%;
  line-height: 1.2;
`;

export const Label = styled.label`
  font-weight: bold;
  flex: 1;
`;

export const InputDatetime = DatePicker;
