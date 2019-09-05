import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import useSocket from '../hooks/useSocket';

function DiaperSummery() {
  const [summery, setSummery] = useState({});

  useEffect(() => {
    useSocket('diaper/summery', d => {
      if (d.msg === 'success') {
        setSummery(d.summery);
      }
    });
  }, []);

  return <div></div>;
}

DiaperSummery.propTypes = {};

export default DiaperSummery;
