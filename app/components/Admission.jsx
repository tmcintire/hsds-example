var React = require('react');
import {Link, IndexLink} from 'react-router';
import EventsAPI from 'EventsAPI';
import Tickets from 'Tickets';
import AddTicket from 'AddTicket';
import Income from 'income/Income';
import $ from 'jQuery';

var Admission = React.createClass({
  render: function () {
    var {tickets, eventId} = this.props;
    var renderTickets = () => {
      if (tickets !== undefined) {
        return Object.keys(tickets).map((ticket) => {
          var ticketInfo = tickets[ticket];
          return (
              <Tickets key={ticket} typeId={ticket} eventId={eventId} updateTicket={this.props.updateTicket} {...ticketInfo}/>
          );
        });
      }
    };
    // Make sure there are tickets to list
    if (tickets !== undefined) {
      var ticketsTotal = () => {
        return Object.keys(tickets).map((ticket) => {
          var ticketTotal = (tickets[ticket].count * tickets[ticket].price);
          return ticketTotal;
        });
      }
      var ticketsTotal = ticketsTotal().reduce(function(a, b) {
        return a + b;
      });
      var countTotal = () => {
        return Object.keys(tickets).map((ticket) => {
          var countTotal = tickets[ticket].count;
          return countTotal;
        });
      }
      var countTotal = countTotal().reduce(function(a, b) {
        return a + b;
      });
    }


    return (
      <table className="table-styles">
        <thead>
        <tr>
            <th>Type</th>
            <th>Price</th>
            <th>Add</th>
            <th>Remove</th>
            <th>Count</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody id="tickets-table-body">
          {renderTickets()}
          <tr>
            <td colSpan="4">Total</td>
            <td>{0 || countTotal}</td>
            <td>${0 || ticketsTotal}</td>
          </tr>
        </tbody>
      </table>
    )
  }
});

module.exports = Admission;
