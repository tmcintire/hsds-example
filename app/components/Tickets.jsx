var React = require('react');
var moment = require('moment');
import {Link, IndexLink} from 'react-router';
import { changeTicket } from "../actions/eventActions";

export default class Tickets extends React.Component{
  handleModifyTicket(edit) {
    var {eventId, typeId, count, price} = this.props;
    this.props.modifyTicket(eventId, typeId, count, price, edit);
  }
  render() {
    var {eventId, typeId} = this.props;
    return (
        <tr>
          <td><Link to={"events/" + eventId + "/editticket/" + typeId}>{this.props.type}</Link></td>
          <td>${this.props.price}</td>
          <td><button disabled={this.props.disabled} onClick={() => this.handleModifyTicket('add')}className="button success large custom-button">Add</button></td>
          <td><button disabled={this.props.count === 0 || this.props.disabled } onClick={() => this.handleModifyTicket('remove')}className="button alert large custom-button">Remove</button></td>
          <td>{this.props.count}</td>
          <td>${this.props.price * this.props.count}</td>
        </tr>
    )
  }
}
