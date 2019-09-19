import React, { useState } from 'react';
import { Trans } from '@lingui/macro';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { darken } from 'polished';
import ResponsiveMenu from './ResponsiveMenu';
import useRouter from '../hooks/useRouter';
import useLocalStorage from '../hooks/useLocalStorage';
import logoutIcon from '../icons/logout.svg';
import theme from '../theme';

const NavUl = styled.ul`
  padding: 0;
  margin: 0;
  max-width: ${props => props.theme.maxWidth}px;
  margin-left: auto;
  margin-right: auto;

  @media (min-width: ${props => props.theme.mobileWidth}px) {
    display: flex;
    padding: 1rem;
    justify-content: center;
  }
`;

const NavLi = styled.li`
  @media (min-width: ${props => props.theme.mobileWidth}px) {
    padding: 0;
    margin: 0 1rem;
  }
  list-style-type: none;
`;

const NavLink = styled(Link)`
  display: flex;
  align-items: center;
  padding: 0.5rem;
  padding-right: 1rem;
  color: white;
  font-weight: bold;
  border-bottom: 1px solid;
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
  text-decoration: none;

  &.active {
    background: ${props => darken(0.2, props.theme.secondary)};
  }

  &:hover {
    background: ${props => darken(0.1, props.theme.secondary)};
  }
`;

const NavIcon = styled.img`
  width: 25px;
  height: 25px;
  margin-right: 6px;
`;

const Navigation = ({ links }) => {
  const {
    location: { pathname }
  } = useRouter();
  const [showMenu, setShowMenu] = useState(false);
  const [, , deleteBaby] = useLocalStorage('baby');

  function logout() {
    deleteBaby();
  }

  return (
    <ResponsiveMenu
      changeMenuOn={`${theme.mobileWidth}px`}
      onClose={() => setShowMenu(false)}
      onOpen={() => setShowMenu(true)}
      show={showMenu}
      menu={
        <NavUl>
          {links.map(({ icon, url, name }) => (
            <NavLi key={url}>
              <NavLink
                to={url}
                onClick={() => setShowMenu(false)}
                className={pathname === url ? 'active' : null}
              >
                <NavIcon src={icon} /> <Trans id={name} />
              </NavLink>
            </NavLi>
          ))}
          <NavLi>
            <NavLink to={'#'} onClick={logout}>
              <NavIcon src={logoutIcon} /> <Trans>Logout</Trans>
            </NavLink>
          </NavLi>
        </NavUl>
      }
    />
  );
};

export default Navigation;
