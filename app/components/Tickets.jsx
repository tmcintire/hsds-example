var React = require('react');
import {Link, IndexLink} from 'react-router';
import { connect } from 'react-redux';
import { changeTicket } from "../actions/eventActions";

export default class Tickets extends React.Component{

  handleChangeTicket(eventId, typeId, newCount, ticketTotal) {
    this.props.updateTicket(eventId, typeId, newCount, ticketTotal); // ALL ACTIONS MUST HAPPEN AFTER THIS ONE
    setTimeout(() => {
      console.log('hi');
      this.props.updateTicketTotals(); // function defined in Admission to update event totals after new ticket is submitted
    }, 10);
  }
  render() {
    var {eventId, typeId, type, count, price} = this.props;
    var ticketTotal = count * price;
    var newCountAdd = count + 1;
    var newCountRemove = count - 1;
    var ticketTotalAdd = newCountAdd * price;
    var ticketTotalRemove = newCountRemove * price;
    return (
        <tr>
          <td>{type}</td>
          <td>${price}</td>
          <td><button onClick={() => this.handleChangeTicket(eventId, typeId, newCountAdd, ticketTotalAdd)}className="button">Add</button></td>
          <td><button disabled={newCountRemove < 0 } onClick={() => this.handleChangeTicket(eventId, typeId, newCountRemove, ticketTotalRemove)}className="button">Remove</button></td>
          <td>{count}</td>
          <td>${ticketTotal}</td>
        </tr>
    )
  }
}
