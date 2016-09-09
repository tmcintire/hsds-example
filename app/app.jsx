import React from 'react';
import ReactDOM from 'react-dom';
// ****** This is using DESTRUCTURING from ES6 *******
import { Route, Router, IndexRoute, hashHistory } from 'react-router';

import Main from 'Main';
import EventsList from 'EventsList';
import EventDetail from 'EventDetail';
import AddTicket from 'AddTicket';

// Load foundation
$(document).foundation();

// App css
require('style!css!sass!applicationStyles')

ReactDOM.render(
  <Router history={hashHistory}>
  	<Route path="/" component={Main}>
      <IndexRoute component={EventsList}/>
  		<Route path="events" component={EventsList}/>
      <Route path="events/:id" component={EventDetail}/>
      <Route path="events/:id/addticket" component={AddTicket}/>
  	</Route>


  </Router>,
  document.getElementById('app')
);