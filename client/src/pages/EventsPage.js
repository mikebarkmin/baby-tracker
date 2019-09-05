import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import useSocket from '../hooks/useSocket';
import EventList from '../components/EventList';

function sortEvents(events) {
  const newEvents = [...events];
  newEvents.sort((a, b) => a.date < b.date);
  return newEvents;
}

function EventsPage({ FormComponent, EntryComponent, socketPrefix }) {
  const [events, setEvents] = useState([]);

  const socket = useSocket();
  useEffect(() => {
    socket.emit(`${socketPrefix}/get`, d => {
      setEvents(d.events || []);
    });
  }, [socket, socketPrefix]);

  useSocket(`${socketPrefix}/created`, d => {
    const newEvents = [d.event, ...events];
    setEvents(sortEvents(newEvents));
  });

  useSocket(`${socketPrefix}/updated`, d => {
    const index = events.findIndex(e => e._id === d._id);
    events[index] = d;
    setEvents(sortEvents(events));
  });

  useSocket(`${socketPrefix}/deleted`, d => {
    setEvents(events.filter(e => e._id !== d.id));
  });

  function handleCreate(event) {
    socket.emit(`${socketPrefix}/create`, event, d => {
      const newEvents = [d.event, ...events];
      setEvents(sortEvents(newEvents));
    });
  }

  function handleUpdate(id, event) {
    socket.emit(`${socketPrefix}/update`, id, event, d => {
      if (d.msg === 'success') {
        const index = events.findIndex(f => f._id === d.event._id);
        events[index] = d.event;
        setEvents(sortEvents(events));
      }
    });
  }

  function handleDelete(id) {
    socket.emit(`${socketPrefix}/delete`, id, function() {
      setEvents(events.filter(e => e._id !== id));
    });
  }

  return (
    <div>
      <EventList>
        {events.map(e => (
          <EntryComponent
            key={e._id}
            {...e}
            onDelete={() => handleDelete(e._id)}
            onUpdate={values => handleUpdate(e._id, values)}
          />
        ))}
      </EventList>
      <FormComponent onSubmit={handleCreate} />
    </div>
  );
}

EventsPage.propTypes = {
  EntryComponent: PropTypes.elementType.isRequired,
  FormComponent: PropTypes.elementType.isRequired,
  socketPrefix: PropTypes.string.isRequired
};

export default EventsPage;
