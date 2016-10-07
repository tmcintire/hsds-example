import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Route, Router, IndexRoute, hashHistory } from 'react-router';
import { routes } from 'app/routes';
import store from './store';
import Main from 'Main';
import EventsList from 'EventsList';
import EventDetail from 'EventDetail';
import AddTicket from 'AddTicket';
import EditIncome from 'income/EditIncome';
import EditExpense from 'expenses/EditExpense';
import AddEvent from 'AddEvent';
// Load foundation
$(document).foundation();

// App css
require('style!css!sass!applicationStyles')

ReactDOM.render(
<Provider store={store}>
  <Router history={hashHistory}>
    <Route path="/" component={Main}>
      <IndexRoute component={EventsList}/>
      <Route path="/events" component={EventsList}/>
      <Route path="/new" component={AddEvent}/>
      <Route path="events/:id" component={EventDetail}/>
      <Route path="events/:id/addticket" component={AddTicket}/>
      <Route path="events/:id/editincome/:incomeid" component={EditIncome}/>
      <Route path="events/:id/editexpense/:expenseid" component={EditExpense}/>
    </Route>
  </Router>
</Provider>,
  document.getElementById('app')
);
