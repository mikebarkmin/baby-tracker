import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';
import { de } from 'date-fns/locale';

const Container = styled.div`
  display: flex;
  width: 320px;
  flex-direction: column;
  cursor: pointer;
  background-color: ${props => props.bg};
  padding: 8px;
  border: 2px solid lightgrey;
  border-radius: 4px;
  margin: 10px;
`;

const HeaderIcon = styled.img`
  width: 50px;
  height: 50px;
`;

const Header = styled.h2`
  display: flex;
  margin-top: 0;
  margin-bottom: 10px;
  justify-content: center;
  align-items: center;
`;

const Info = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Last = styled.div``;

function Summary({ name, icon, color, summary, onClick }) {
  return (
    <Container onClick={onClick} bg={color}>
      <Header>
        {summary.number}x
        <HeaderIcon src={icon} />
        {name}
      </Header>
      <Info>
        {summary.last && (
          <Last>
            Zuletzt vor{' '}
            {formatDistanceToNow(new Date(summary.last.date), { locale: de })}
          </Last>
        )}
      </Info>
    </Container>
  );
}

Summary.propTypes = {
  name: PropTypes.string,
  icon: PropTypes.string,
  color: PropTypes.string,
  summary: PropTypes.shape({
    number: PropTypes.number,
    last: PropTypes.object
  })
};

Summary.defaultProps = {
  start: new Date(),
  end: new Date()
};

export default Summary;
