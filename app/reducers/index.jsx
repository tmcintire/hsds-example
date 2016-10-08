import { combineReducers } from 'redux';

import {eventReducer, eventsReducer, expenseReducer} from './eventReducer';

export default combineReducers({
  event: eventReducer,
  events: eventsReducer,
  expense: expenseReducer,
});
