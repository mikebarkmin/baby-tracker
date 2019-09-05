import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Summary from '../components/Summary';
import { InputDatetime } from '../components/Form';
import useSocket from '../hooks/useSocket';
import useRouter from '../hooks/useRouter';
import EventList from '../components/EventList';
import FoodEntry from '../components/FoodEntry';
import NursingEntry from '../components/NursingEntry';
import SleepEntry from '../components/SleepEntry';
import DiaperEntry from '../components/DiaperEntry';
import diaperIcon from '../icons/diaper.svg';
import nursingIcon from '../icons/nursing.svg';
import foodIcon from '../icons/food.svg';
import sleepIcon from '../icons/sleep.svg';
import { sortEvents } from './EventsPage';

const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const DateButtonStyled = styled.button`
  border: none;
  background: none;
  font-size: 1.5rem;
  cursor: pointer;
`;

class DateButton extends React.Component {
  render() {
    const { value, onClick } = this.props;
    return <DateButtonStyled onClick={onClick}>{value}</DateButtonStyled>;
  }
}

const Summaries = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 40px 0;
`;

const useSummary = (socketPrefix, start, end) => {
  const [summary, setSummary] = useState({
    number: 0,
    last: {
      date: new Date()
    },
    events: []
  });
  const socket = useSocket();
  useEffect(() => {
    socket.emit(`${socketPrefix}/summary`, start, end, d => {
      if (d.msg === 'success') {
        setSummary(d.summary);
      }
    });
  }, [socket, start, end, socketPrefix]);

  return summary;
};

function DashboardPage() {
  const sday = new Date();
  sday.setHours(0, 0, 0, 0);
  const eday = new Date();
  eday.setHours(23, 59, 59);
  const [start, setStart] = useState(sday);
  const [end, setEnd] = useState(eday);
  const diaperSummary = useSummary('diaper', start, end);
  const foodSummary = useSummary('food', start, end);
  const nursingSummary = useSummary('nursing', start, end);
  const sleepSummary = useSummary('sleep', start, end);
  const router = useRouter();

  let events = [];
  diaperSummary.events.forEach(e => {
    e._type = 'diaper';
    events.push(e);
  });
  foodSummary.events.forEach(e => {
    e._type = 'food';
    events.push(e);
  });
  nursingSummary.events.forEach(e => {
    e._type = 'nursing';
    events.push(e);
  });
  sleepSummary.events.forEach(e => {
    e._type = 'sleep';
    events.push(e);
  });

  function to(path) {
    router.history.push(path);
  }
  events = sortEvents(events);

  return (
    <Root>
      <InputDatetime
        withPortal
        selected={start}
        onChange={date => {
          const start = new Date(date);
          start.setHours(0, 0, 0, 0);
          const end = new Date(date);
          end.setHours(23, 59, 59, 0);
          setStart(start);
          setEnd(end);
        }}
        customInput={<DateButton />}
        todayButton="Heute"
        maxDate={new Date()}
        dateFormat="dd.MM.yyyy"
      />
      <Summaries>
        <Summary
          name="Windel"
          onClick={() => to('/diaper')}
          icon={diaperIcon}
          summary={diaperSummary}
        />
        <Summary
          name="Stillen"
          onClick={() => to('/nursing')}
          icon={nursingIcon}
          summary={nursingSummary}
        />
        <Summary
          name="Schlaf"
          onClick={() => to('/sleep')}
          icon={sleepIcon}
          summary={sleepSummary}
        />
        <Summary
          name="Essen"
          onClick={() => to('/food')}
          icon={foodIcon}
          summary={foodSummary}
        />
      </Summaries>
      <EventList>
        {events.map(e => {
          switch (e._type) {
            case 'diaper':
              return <DiaperEntry key={e._id} {...e} />;
            case 'food':
              return <FoodEntry key={e._id} {...e} />;
            case 'sleep':
              return <SleepEntry key={e._id} {...e} />;
            case 'nursing':
              return <NursingEntry key={e._id} {...e} />;
            default:
              return null;
          }
        })}
      </EventList>
    </Root>
  );
}

export default DashboardPage;
