import React from 'react';
import { Route, IndexRoute } from 'react-router';

import Main from 'Main';
import EventsList from 'EventsList';
import EventDetail from 'EventDetail';
import AddTicket from 'AddTicket';
import EditIncome from 'income/EditIncome';
import EditExpense from 'expenses/EditExpense';

export default (
  <Route path="/" component={Main}>
    <IndexRoute component={EventsList}/>
    <Route path="/events" component={EventsList}/>
    <Route path="events/:id" component={EventDetail}/>
    <Route path="events/:id/addticket" component={AddTicket}/>
    <Route path="events/:id/editincome/:incomeid" component={EditIncome}/>
    <Route path="events/:id/editexpense/:expenseid" component={EditExpense}/>
  </Route>
)
