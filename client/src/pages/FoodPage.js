import React from 'react';
import FoodEntry from '../components/FoodEntry';
import FoodForm from '../components/FoodForm';
import EventsPage from './EventsPage';

function FoodPage() {
  return (
    <EventsPage
      EntryComponent={FoodEntry}
      FormComponent={FoodForm}
      socketPrefix="food"
    />
  );
}

FoodPage.propTypes = {};

export default FoodPage;
