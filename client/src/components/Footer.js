import React, { useState } from 'react';
import styled from 'styled-components';
import { lighten } from 'polished';
import packageJSON from '../../package.json';
import useLocalStorage from '../hooks/useLocalStorage';
import useSocket from '../hooks/useSocket';

const Flex = styled.div`
  display: flex;
  align-items: center;
  margin: 0 4px;
`;

const Root = styled.footer`
  position: fixed;
  display: flex;
  justify-content: flex-end;
  left: 0;
  bottom: 0px;
  height: 30px;
  right: 10px;
  background-color: ${props => lighten(0.5, props.theme.secondary)};
  align-items: center;
  font-size: 0.8rem;
  color: grey;
`;

const OnlineIcon = styled.div`
  width: 10px;
  height: 10px;
  margin: 8px;
  border-radius: 50%;
  background-color: ${props =>
    props.online ? props.theme.success : props.theme.error};
`;

function OnlineStatus() {
  const [online, setOnline] = useState(false);
  const socket = useSocket();

  socket.on('connect', () => {
    setOnline(socket.connected);
  });

  socket.on('disconnect', () => {
    setOnline(socket.connected);
  });
  return (
    <Flex>
      <OnlineIcon online={online} /> {online ? 'Online' : 'Offline'}{' '}
    </Flex>
  );
}

function Version() {
  return <Flex>v{packageJSON.version}</Flex>;
}

function BabyId() {
  const [baby] = useLocalStorage('baby', null);
  if (baby) {
    return <Flex>{baby.shortId}</Flex>;
  }
  return null;
}

function Footer() {
  return (
    <Root>
      <BabyId />
      <OnlineStatus />
      <Version />
    </Root>
  );
}

Footer.propTypes = {};

export default Footer;
