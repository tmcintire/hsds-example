var React = require('react');
import {Link, IndexLink} from 'react-router';
import EventsAPI from 'EventsAPI';
import Tickets from 'Tickets';
import AddTicket from 'AddTicket';
import Income from 'income/Income';
import $ from 'jQuery';

var Admission = React.createClass({
  componentDidMount() {
    this.updateTicketTotals();
  },
  updateTicketTotals: function() {
    var {tickets, eventId} = this.props;
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
    this.props.updateTotals(eventId, ticketsTotal, countTotal);
  },
  render: function () {
    var {tickets, eventId, totalRevenue, totalCount} = this.props;
    var renderTickets = () => {
      if (tickets !== undefined) {
        return Object.keys(tickets).map((ticket) => {
          var ticketInfo = tickets[ticket];
          return (
              <Tickets key={ticket} updateTicketTotals={this.updateTicketTotals} typeId={ticket}{...this.props} {...ticketInfo}/>
          );
        });
      }
    };

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
            <td colSpan="4">Total Income</td>
            <td>{totalCount}</td>
            <td>${totalRevenue}</td>
          </tr>
        </tbody>
      </table>
    )
  }
});

module.exports = Admission;
