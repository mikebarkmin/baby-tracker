import React, { useState } from 'react';
import styled from 'styled-components';
import { lighten } from 'polished';
import packageJSON from '../../package.json';
import useLocalStorage from '../hooks/useLocalStorage';
import useSocket from '../hooks/useSocket';
import { Trans } from '@lingui/macro';
import Button from './Button';

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
  right: 0px;
  background-color: ${(props) => lighten(0.5, props.theme.secondary)};
  align-items: center;
  font-size: 0.8rem;
  color: grey;
`;

const OnlineIcon = styled.div`
  width: 10px;
  height: 10px;
  margin: 8px;
  border-radius: 50%;
  background-color: ${(props) =>
    props.online ? props.theme.success : props.theme.error};
`;

function OnlineStatus() {
  const [online, setOnline] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [baby] = useLocalStorage('baby', null);
  const socket = useSocket();

  socket.on('connect', () => {
    setOnline(socket.connected);
  });

  socket.on('disconnect', () => {
    setOnline(socket.connected);
  });

  function exportData() {
    if (!exporting) {
      setExporting(true);
      socket.emit('baby/export', (d) => {
        if (d.data) {
          const blob1 = new Blob([JSON.stringify(d.data, null, 2)], {
            type: 'text/plain;charset=utf-8',
          });
          const url = window.URL || window.webkitURL;
          const link = url.createObjectURL(blob1);
          const a = document.createElement('a');
          const now = new Date();
          a.download = `${
            baby.shortId
          }-${now.getFullYear()}${now.getMonth()}${now.getDate()}.json`;
          a.href = link;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        }
        setExporting(false);
      });
    }
  }

  return (
    <Flex>
      <OnlineIcon online={online} /> {online ? 'Online' : 'Offline'}{' '}
      <Button
        onClick={exportData}
        disabled={exporting}
        style={{ padding: 1, borderWidth: 1, fontWeight: 500 }}
      >
        <Trans>export</Trans>
      </Button>
    </Flex>
  );
}

function Version() {
  function update() {
    if (window.sw) {
      window.sw.update();
    }
  }
  return <Flex onClick={update}>v{packageJSON.version}</Flex>;
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
