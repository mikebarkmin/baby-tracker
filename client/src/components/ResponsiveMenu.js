import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import useMedia from '../hooks/useMedia';
import MenuSvg from '../images/menu.svg';
import CloseSvg from '../images/close.svg';

const SmallMenu = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 99;
  text-align: center;
  background: ${props => props.theme.secondary};
  min-height: 52px;
`;

const LargeMenu = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 99;
  display: block;
  text-align: center;
  background: ${props => props.theme.secondary};
  height: 80px;

  transition: all 0.5s ease-in-out;
`;

const MenuIcon = styled.button`
  width: 48px;
  height: 48px;
  background: url(${props => props.icon});
  border: 0;

  transition: all 0.5s ease-in-out;
`;

const ResponsiveMenu = ({ menu, changeMenuOn, onClose, onOpen, show }) => {
  const match = useMedia(`(min-width: ${changeMenuOn})`);

  return (
    <>
      {match ? (
        <LargeMenu>{menu}</LargeMenu>
      ) : (
        <SmallMenu>
          {!show ? (
            <MenuIcon aria-label="Open Menu" onClick={onOpen} icon={MenuSvg} />
          ) : (
            <MenuIcon
              aria-label="Close Menu"
              onClick={onClose}
              icon={CloseSvg}
            />
          )}
          {show ? <div>{menu}</div> : null}
        </SmallMenu>
      )}
    </>
  );
};
ResponsiveMenu.propTypes = {
  menu: PropTypes.node.isRequired,
  changeMenuOn: PropTypes.string.isRequired
};

export default ResponsiveMenu;
