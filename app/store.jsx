import * as redux from 'redux';
import { applyMiddleware, createStore } from 'redux';

import thunk from 'redux-thunk';

import reducer from 'reducers';

const middleware = applyMiddleware(thunk);

const store = createStore(
  reducer,
  redux.compose(
    middleware,
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
)

export default store;
