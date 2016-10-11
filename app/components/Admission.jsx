var React = require('react');
import {Link, IndexLink} from 'react-router';
var moment = require('moment');
import Tickets from 'Tickets';

export default class Admission extends React.Component{
  handleClick(e) {
    if (this.props.disabled === true) {
        e.preventDefault();
    }
  }
  render() {
    var {tickets, eventId} = this.props;
    var renderTickets = () => {
      if (tickets !== undefined) {
        return Object.keys(tickets).map((ticket) => {
          var ticketInfo = tickets[ticket];
          return (
            <Tickets key={ticket} typeId={ticket} {...this.props} {...ticketInfo}/>
          );
        });
      }
    };

    return (
      <div>
        <Link onClick={(e) => this.handleClick(e)} to={"events/" + eventId + "/addticket"}>Add Tickets</Link>
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
              <td>{this.props.totalCount}</td>
              <td>${this.props.totalRevenue}</td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}
