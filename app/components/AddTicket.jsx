var React = require('react');
import {Link, IndexLink} from 'react-router';
import uuid from 'node-uuid';
import {connect} from 'react-redux';
import {addTicket} from "../actions/eventActions";

@connect((store) => {
  return {
    events: store.events,
    message: '',
    successMessage: '',
  };
})
export default class AddTicket extends React.Component{
  constructor() {
    super();
    this.state = {
      message: ''
    }
  }
  addPregeneratedTicket(ticketType) {
    var {id} = this.props.params;
    switch (ticketType) {
      case "general10":
        this.props.dispatch(addTicket(id, 'General', 10))
        this.setState({successMessage: 'General - $10 Added!'})
        break;
      case "general5":
        this.props.dispatch(addTicket(id, 'General', 5))
        this.setState({successMessage: 'General - $5 Added!'})
        break;
      case "student7":
        this.props.dispatch(addTicket(id, 'Student', 7))
        this.setState({successMessage: 'Student - $7 Added!'})
        break;
      case "military7":
        this.props.dispatch(addTicket(id, 'Military', 7))
        this.setState({successMessage: 'Military - $7 Added!'})
        break;
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
      this.refs.ticketType.focus();
    }
  }

  render() {
    var submit = "Submit";
    var addAnother = "Add";
    var {message, successMessage} = this.state;
    var {id} = this.props.params;

    return (
        <div>
          <Link to={"events/" + id}><button className="button">Back to Event</button></Link>
          <div className="row">
            <div className="large-6 column">
              <h1 className="text-center">Create New Ticket</h1>
              <form className="custom-form">
                <input type="text" ref="ticketType" placeholder="Ticket type..."/>
                <input type="text" ref="ticketPrice" placeholder="Price..." />
                <button className="button" onClick={() => this.handleSubmit(submit)} type="button">Save</button>
                <button className="button" onClick={() => this.handleSubmit(addAnother)} type="button">Save and Add</button>
                <Link to={"events/" + id}><button type="button" className="button alert">Cancel</button></Link>
                <br />
                {message}
              </form>
            </div>
            <div className="large-5 column quick-add">
              <h1 className="text-center">Quick Add</h1>
              <button className="button" onClick={() => this.addPregeneratedTicket('general10')}>General - $10</button>
              <button className="button" onClick={() => this.addPregeneratedTicket('general5')}>General - $5</button>
              <button className="button" onClick={() => this.addPregeneratedTicket('student7')}>Student - $7</button>
              <button className="button" onClick={() => this.addPregeneratedTicket('military7')}>Military - $7</button>
              <br />
              {successMessage}
            </div>
          </div>
        </div>
    )
  }
}
