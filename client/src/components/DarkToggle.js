import React from 'react';
import lightIcon from '../icons/light.svg';
import darkIcon from '../icons/dark.svg';
import useDark from '../hooks/useDark';

function DarkToggle({ ...props }) {
  const [dark, setDark] = useDark();

  function toggle() {
    setDark((d) => !d);
  }

  return (
    <img
      {...props}
      alt="Dark Mode"
      src={dark ? darkIcon : lightIcon}
      width={32}
      height={32}
      onClick={toggle}
      style={{
        position: 'fixed',
        top: 10,
        right: 10,
        zIndex: 9999,
      }}
    />
  );
}

export default DarkToggle;
