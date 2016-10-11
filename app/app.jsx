import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Route, Router, IndexRoute, hashHistory } from 'react-router';
import { routes } from 'app/routes';
import store from './store';
import Main from 'Main';
import EventsList from 'EventsList';
import EditEventContainer from 'EditEventContainer';
import PastEvents from 'PastEvents';
import EventDetailContainer from 'EventDetailContainer';
import AddTicket from 'AddTicket';
import EditTicketContainer from 'EditTicketContainer';
import AddExpense from 'AddExpense';
import EditIncome from 'income/EditIncome';
import EditExpenseContainer from 'expenses/EditExpenseContainer';
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
      <Route path="/past" component={PastEvents}/>
      <Route path="events/:id" component={EventDetailContainer}/>
      <Route path="events/:id/addticket" component={AddTicket}/>
      <Route path="events/:id/addexpense" component={AddExpense}/>
      <Route path="events/:id/editincome/:incomeid" component={EditIncome}/>
      <Route path="events/:id/editexpense/:expenseid" component={EditExpenseContainer}/>
      <Route path="events/:id/editticket/:ticketid" component={EditTicketContainer}/>
      <Route path="events/:id/edit" component={EditEventContainer}/>
    </Route>
  </Router>
</Provider>,
  document.getElementById('app')
);
