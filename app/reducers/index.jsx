import { combineReducers } from 'redux';

import {eventReducer, eventsReducer} from './eventReducer';

export default combineReducers({
  event: eventReducer,
  events: eventsReducer,
});
