import styled from 'styled-components';

const Button = styled.button`
  display: flex;
  font-size: 1em;
  margin: 0.25em;
  padding: 0.5em 1em;
  border-radius: 3px;
  cursor: pointer;
  justify-content: center;
  font-weight: bold;

  border-style: solid;
  border-width: 2px;
  color: ${props => props.theme.neutral};
  border-color: ${props => props.theme.neutral};

  & > img {
    height: 25px;
    width: 25px;
  }

  &:hover {
    opacity: 0.8;
  }
`;

export const IconButton = styled(Button)`
  border-radius: 50%;
  padding: 0.25em;
`;

export const PrimaryButton = styled(Button)`
  color: ${props => props.theme.primary};
  border-color: ${props => props.theme.primary};
`;

export const SecondaryButton = styled(Button)`
  color: ${props => props.theme.secondary};
  border-color: ${props => props.theme.secondary};
`;

export const SuccessButton = styled(Button)`
  color: ${props => props.theme.success};
  border-color: ${props => props.theme.success};
`;

export const WarningButton = styled(Button)`
  color: ${props => props.theme.warning};
  border-color: ${props => props.theme.warning};
`;

export const ErrorButton = styled(Button)`
  color: ${props => props.theme.error};
  border-color: ${props => props.theme.error};
`;

export default Button;
