var React = require('react');
import {Link, IndexLink} from 'react-router';
import { connect } from 'react-redux';
import { changeTicket } from "../actions/eventActions";

export default class Tickets extends React.Component{
  handleChangeTicket(eventId, typeId, newCount) {
    this.props.updateTicket(eventId, typeId, newCount);
	}
  render() {
    var {eventId, typeId, type, count, price} = this.props;
    var ticketTotal = count * price;
    var newCountAdd = count + 1;
    var newCountRemove = count - 1;
    return (
        <tr>
          <td>{type}</td>
          <td>${price}</td>
          <td><button onClick={() => this.handleChangeTicket(eventId, typeId, newCountAdd)}className="button">Add</button></td>
          <td><button disabled={newCountRemove < 0 } onClick={() => this.handleChangeTicket(eventId, typeId, newCountRemove)}className="button">Remove</button></td>
          <td>{count}</td>
          <td>${ticketTotal}</td>
        </tr>
    )
  }
}
