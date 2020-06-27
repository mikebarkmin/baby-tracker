import React, { useState } from 'react';
import Autosuggest from 'react-autosuggest';
import styled from 'styled-components';
import { I18n } from '@lingui/react';
import { Trans, t } from '@lingui/macro';
import useSocket from '../hooks/useSocket';
import useLocalStorage from '../hooks/useLocalStorage';
import {
  Input,
  Form,
  FormHeader,
  FormContent,
  FormHeaderTitle,
  FormSubmit,
} from '../components/Form';
import logoIcon from '../icons/logo.svg';

const Root = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: ${(props) => props.theme.background};
`;

const getSuggestionValue = (suggestion) => suggestion;

const renderSuggestion = (suggestion) => <span>{suggestion}</span>;

const renderInputComponent = (inputProps) => <Input {...inputProps} />;

function HomePage() {
  const [shortId, setShortId] = useState('');
  const [name, setName] = useState('');
  const socket = useSocket();
  const [, setBaby] = useLocalStorage('baby', null);
  const [recent, setRecent] = useLocalStorage('recent', []);

  function handleJoinBaby() {
    socket.emit('baby/join', shortId, function (res) {
      if (res.msg === 'success') {
        setBaby(res.baby);
        if (recent.indexOf(shortId) === -1) {
          setRecent([shortId, ...recent]);
        }
      }
    });
  }

  function handleCreateBaby() {
    socket.emit('baby/create', name, function (res) {
      if (res.msg === 'success') {
        setShortId(res.baby.shortId);
      }
    });
  }

  function handleShortIdChange(e, { newValue }) {
    setShortId(newValue);
  }

  function handleNameChange(e) {
    setName(e.target.value);
  }

  return (
    <Root>
      <img alt="logo" width={200} src={logoIcon} />
      <br />
      <div>
        <Form>
          <FormHeader>
            <FormHeaderTitle>
              <Trans>Track Baby</Trans>
            </FormHeaderTitle>
          </FormHeader>
          <FormContent>
            <I18n>
              {({ i18n }) => (
                <Autosuggest
                  suggestions={recent}
                  onSuggestionsFetchRequested={() => {}}
                  onSuggestionsClearRequested={() => {}}
                  getSuggestionValue={getSuggestionValue}
                  shouldRenderSuggestions={() => true}
                  renderSuggestion={renderSuggestion}
                  renderInputComponent={renderInputComponent}
                  inputProps={{
                    value: shortId,
                    onChange: handleShortIdChange,
                    placeholder: `${i18n._(t`ID`)}...`,
                  }}
                />
              )}
            </I18n>
          </FormContent>
          <FormSubmit type="button" onClick={handleJoinBaby}>
            <Trans>Open</Trans>
          </FormSubmit>
        </Form>
        <br />
        <Form>
          <FormHeader>
            <FormHeaderTitle>
              <Trans>New Baby</Trans>
            </FormHeaderTitle>
          </FormHeader>
          <FormContent>
            <I18n>
              {({ i18n }) => (
                <Input
                  name="new-baby"
                  value={name}
                  onChange={handleNameChange}
                  placeholder={`${i18n._(t`Name`)}...`}
                />
              )}
            </I18n>
          </FormContent>
          <FormSubmit type="button" onClick={handleCreateBaby}>
            <Trans>Create</Trans>
          </FormSubmit>
        </Form>
      </div>
    </Root>
  );
}

HomePage.propTypes = {};

export default HomePage;
