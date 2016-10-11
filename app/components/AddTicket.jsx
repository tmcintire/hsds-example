var React = require('react');
import {Link, IndexLink} from 'react-router';
import uuid from 'node-uuid';
import {connect} from 'react-redux';
import {addTicket} from "../actions/eventActions";

@connect((store) => {
  return {
    events: store.events,
    message: '',
  };
})
export default class AddTicket extends React.Component{
  constructor() {
    super();
    this.state = {
      message: ''
    }
  }
  handleSubmit(button, dispatch) {
    var {id} = this.props.params;
    var type = this.refs.ticketType.value;
    var price = this.refs.ticketPrice.value;
    if (button === 'Submit') {
      this.props.dispatch(addTicket(id,type, price));
      window.location = '#/events/'+ id;
    } else if(button === 'Add') {
      this.props.dispatch(addTicket(id,type, price));
      this.setState({
        message: 'Ticket Added!'
      });
      this.refs.ticketType.value = '';
      this.refs.ticketPrice.value = '';
      this.refs.ticketType.focus()
    }
  }

  render() {
    var submit = "Submit";
    var addAnother = "Add";
    var {message} = this.state;
    var {id} = this.props.params;

    return (
        <div>
          <Link to={"events/" + id}><button className="button">Back to Event</button></Link>
          <h1 className="text-center">Create New Ticket</h1>
          <form className="custom-form">
            <input type="text" ref="ticketType" placeholder="Ticket description..." autoFocus/>
            <input type="text" ref="ticketPrice" placeholder="Price..." />
            <button className="button" onClick={() => this.handleSubmit(submit)} type="button">Save</button>
            <button className="button" onClick={() => this.handleSubmit(addAnother)} type="button">Save and Add</button>
            <Link to={"events/" + id}><button type="button" className="button alert">Cancel</button></Link>
            <br />
            {message}
          </form>
        </div>
    )
  }
}
