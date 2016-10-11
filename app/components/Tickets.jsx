var React = require('react');
import {Link, IndexLink} from 'react-router';
import { changeTicket } from "../actions/eventActions";

export default class Tickets extends React.Component{
  handleModifyTicket(edit) {
    var {eventId, typeId, count, price} = this.props;
    this.props.modifyTicket(eventId, typeId, count, price, edit);
  }
  render() {
    return (
        <tr>
          <td>{this.props.type}</td>
          <td>${this.props.price}</td>
          <td><button onClick={() => this.handleModifyTicket('add')}className="button success">Add</button></td>
          <td><button disabled={this.props.count === 0 } onClick={() => this.handleModifyTicket('remove')}className="button alert">Remove</button></td>
          <td>{this.props.count}</td>
          <td>${this.props.price * this.props.count}</td>
        </tr>
    )
  }
}
