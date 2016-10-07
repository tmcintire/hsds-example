var React = require('react');
import {Link, IndexLink} from 'react-router';
import uuid from 'node-uuid';
import {connect} from 'react-redux';
import {addTicket} from "../actions/eventActions";

@connect((store) => {
  return {
    events: store.events
  };
})
export default class AddTicket extends React.Component{
  handleSubmit(dispatch) {
    var {id} = this.props.params;
    var type = this.refs.ticketType.value;
    var price = this.refs.ticketPrice.value;
    this.props.dispatch(addTicket(id,type, price));
    window.location = '#/events/'+ id;
  }
  render() {

    return (
        <form>
          <input type="text" ref="ticketType" placeholder="Ticket description..." autoFocus/>
          <input type="text" ref="ticketPrice" placeholder="Price..." />
          <button className="button" onClick={this.handleSubmit.bind(this)} type="button">Submit</button>
        </form>
    )
  }
}
