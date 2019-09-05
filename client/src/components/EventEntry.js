import React from 'react';
import styled from 'styled-components';
import { formatRelative } from 'date-fns';
import { de } from 'date-fns/locale';
import { lighten } from 'polished';
import Button, { IconButton } from './Button';
import deleteIcon from '../icons/delete.svg';
import editIcon from '../icons/edit.svg';

export const EventEntry = styled.div`
  display: flex;
  padding: 12px 8px;
  align-items: center;
  border-radius: 4px;

  &:hover {
    background: ${props => lighten(0.4, props.theme.secondary)};
  }
`;

export const EventContent = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

export const EventIcon = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 4px;
  margin-right: 8px;
`;

export const EventDetails = styled.div``;

export const EventEdit = props => (
  <IconButton {...props}>
    <img alt="edit" src={editIcon} />
  </IconButton>
);

export const EventDelete = props => (
  <IconButton {...props}>
    <img alt="Delete" src={deleteIcon} />
  </IconButton>
);

export const EventCreate = props => <Button {...props}>Erstellen</Button>;

const EventDateContainer = styled.div`
  font-size: 0.9rem;
  color: grey;
`;

export const EventDate = ({ date }) => (
  <EventDateContainer>
    {formatRelative(new Date(date), new Date(), { locale: de })}
  </EventDateContainer>
);
export default EventEntry;
