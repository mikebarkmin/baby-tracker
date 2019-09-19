import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import { ThemeProvider } from 'styled-components';
import { t } from '@lingui/macro';
import HookedRouter from './components/HookedRouter';
import Navigation from './components/Navigation';
import DashboardPage from './pages/DashboardPage';
import NursingPage from './pages/NursingPage';
import DiaperPage from './pages/DiaperPage';
import SleepPage from './pages/SleepPage';
import FoodPage from './pages/FoodPage';
import HomePage from './pages/HomePage';
import { I18nProvider } from '@lingui/react';
import SocketProvider from './components/SocketProvider';
import useLocalStorage from './hooks/useLocalStorage';
import useSocket from './hooks/useSocket';
import theme from './theme';
import GlobalStyle from './GlobalStyle';
import Footer from './components/Footer';

import dashboardIcon from './icons/dashboard.svg';
import nursingIcon from './icons/nursing.svg';
import diaperIcon from './icons/diaper.svg';
import sleepIcon from './icons/sleep.svg';
import foodIcon from './icons/food.svg';

import useLocale from './hooks/useLocale';
import catalogs from './locales/catalogs';

const links = [
  {
    name: t`Dashboard`,
    url: '/',
    icon: dashboardIcon
  },
  {
    name: t`Nursing`,
    url: '/nursing',
    icon: nursingIcon
  },
  {
    name: t`Diaper`,
    url: '/diaper',
    icon: diaperIcon
  },
  {
    name: t`Sleep`,
    url: '/sleep',
    icon: sleepIcon
  },
  {
    name: t`Food`,
    url: '/food',
    icon: foodIcon
  }
];

function BabyJoin() {
  const [baby, setBaby] = useLocalStorage('baby', null);
  const socket = useSocket();
  useEffect(() => {
    if (baby !== null) {
      socket.emit('baby/join', baby.shortId, d => {
        if (d.msg === 'baby not found') {
          setBaby(null);
        }
      });
    }
  }, [baby, setBaby, socket]);

  return null;
}

const Root = styled.div`
  position: absolute;
  top: 80px;
  bottom: 30px;
  left: 0;
  right: 0;
  overflow-y: auto;

  @media (max-width: ${props => props.theme.mobileWidth}px) {
    top: 52px;
  }
`;

const Main = styled.main`
  position: relative;
  display: block;
  padding: 24px;
  max-width: 1024px;
  margin-left: auto;
  margin-right: auto;
`;

function App() {
  const [baby] = useLocalStorage('baby', null);
  const { locale } = useLocale();
  return (
    <I18nProvider language={locale} catalogs={catalogs}>
      <ThemeProvider theme={theme}>
        <HookedRouter>
          <GlobalStyle />
          <Root>
            <SocketProvider url={process.env.REACT_APP_SERVER}>
              {baby !== null ? (
                <>
                  <BabyJoin />
                  <Navigation links={links} />
                  <Main>
                    <Switch>
                      <Route exact path="/" component={DashboardPage} />
                      <Route exact path="/nursing" component={NursingPage} />
                      <Route exact path="/diaper" component={DiaperPage} />
                      <Route exact path="/sleep" component={SleepPage} />
                      <Route exact path="/food" component={FoodPage} />
                    </Switch>
                  </Main>
                </>
              ) : (
                <HomePage />
              )}
              <Footer />
            </SocketProvider>
          </Root>
        </HookedRouter>
      </ThemeProvider>
    </I18nProvider>
  );
}

export default App;
