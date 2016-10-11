import { combineReducers } from 'redux';

import {eventReducer, eventsReducer, expenseReducer, ticketReducer} from './eventReducer';

export default combineReducers({
  event: eventReducer,
  events: eventsReducer,
  expense: expenseReducer,
  ticket: ticketReducer,
});
