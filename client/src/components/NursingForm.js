import React from 'react';
import { Trans } from '@lingui/macro';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {
  FormElement,
  FormContent,
  Label,
  Toggle,
  IconToggle,
  DatePicker,
} from './Form';
import Flex from './Flex';
import unknownIcon from '../icons/unknown.svg';
import { positions } from '../pages/NursingPage';

const PositionName = styled.span`
  margin: 8px;
  color: grey;
  font-size: 1rem;
  font-weight: bold;
  text-align: center;
`;

function NursingForm({ onChange, values }) {
  const { date, end, breast, breastPosition } = values;

  function handleDateChange(date) {
    onChange({ ...values, date });
  }

  function handleEndChange(end) {
    onChange({ ...values, end });
  }

  function setBreast(breast) {
    onChange({ ...values, breast });
  }

  function setBreastPosition(breastPosition) {
    onChange({ ...values, breastPosition });
  }

  const position = positions[breastPosition];
  const name = position ? position.name : '?';

  return (
    <FormContent>
      <FormElement>
        <Label>
          <Trans>Side</Trans>
        </Label>
        <Flex wrap="wrap" justifyContent="flex-end" spacing={5}>
          <Toggle
            onClick={() => setBreast('left')}
            active={breast === 'left'}
            type="button"
          >
            <Trans>Left</Trans>
          </Toggle>
          <Toggle
            onClick={() => setBreast('right')}
            active={breast === 'right'}
            type="button"
          >
            <Trans>Right</Trans>
          </Toggle>
          <Toggle
            onClick={() => setBreast('both')}
            active={breast === 'both'}
            type="button"
          >
            <Trans>Both</Trans>
          </Toggle>
        </Flex>
      </FormElement>
      <FormElement>
        <Label>
          <Trans>Position</Trans>
        </Label>
        <Flex direction="column">
          <PositionName>
            <Trans id={name} />
          </PositionName>
          <Flex wrap="wrap" justifyContent="flex-end" spacing={5}>
            {positions.map((p) => (
              <IconToggle
                key={p.id}
                src={p.img}
                onClick={() => setBreastPosition(p.id)}
                active={breastPosition === p.id}
                type="button"
              ></IconToggle>
            ))}
            <IconToggle
              src={unknownIcon}
              onClick={() => setBreastPosition(null)}
              active={breastPosition === null}
              type="button"
            />
          </Flex>
        </Flex>
      </FormElement>
      <FormElement>
        <Label>
          <Trans>Start</Trans>
        </Label>
        <DatePicker
          showTimeSelect
          timeIntervals={5}
          timeFormat="HH:mm"
          timeCaption={<Trans>Time</Trans>}
          name="date"
          withPortal
          selected={date}
          onChange={handleDateChange}
          dateFormat="dd.MM.yyyy HH:mm"
        />
      </FormElement>
      <FormElement>
        <Label>
          <Trans>End</Trans>
        </Label>
        <DatePicker
          showTimeSelect
          timeIntervals={5}
          timeFormat="HH:mm"
          timeCaption={<Trans>Time</Trans>}
          name="end"
          withPortal
          selected={end}
          onChange={handleEndChange}
          dateFormat="dd.MM.yyyy HH:mm"
        />
      </FormElement>
    </FormContent>
  );
}

NursingForm.propTypes = {
  onChange: PropTypes.func,
  values: PropTypes.object,
};

NursingForm.defaultProps = {
  onChange: () => {},
  values: {
    date: new Date(),
    end: new Date(),
    breastLeft: false,
    breastPosition: null,
  },
};

export default NursingForm;
