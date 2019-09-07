import styled from 'styled-components';

const Flex = styled.div`
  display: flex;
  flex-wrap: ${props => props.wrap};
  flex-direction: ${props => props.direction};
  align-items: ${props => props.alignItems};
  justify-content: ${props => props.justifyContent};
  align-content: ${props => props.alignContent};
  justify-items: ${props => props.justifyItems};

  & > div,
  & > button,
  & > img {
    margin: ${props => props.spacing}px;
  }
`;

export default Flex;
