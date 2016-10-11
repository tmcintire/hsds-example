var React = require('react');
import {Link, IndexLink} from 'react-router';
import { connect } from 'react-redux';
import { fetchTicketDetails, editTicketDetails, deleteTicket, requestTicket } from "../actions/eventActions";

export default class EditTicket extends React.Component{
  constructor(props) {
    super(props);
    var {id, ticketid} = this.props.params;
    this.props.dispatch(fetchTicketDetails(id, ticketid));
  }
  handleSubmit(edit) {
    var name = this.refs.name.value;
    var date = this.refs.date.value;
    var time = this.refs.time.value;
    var fee = this.refs.fee.value;
    var max_fee = this.refs.max_fee.value;
    var band_minimum = this.refs.band_minimum.value;
    var cash = this.refs.cash.value;
    var {id} = this.props.params;
    this.props.dispatch(editEventDetails(id, name, date, time, fee, max_fee, band_minimum, cash));
    window.location = '#/events/' + id;
  }
  handleRemove() {
    var {id} = this.props.params;
    this.props.dispatch(deleteEvent(id));
    window.location = '#/events/';
  }
  render() {
    var renderForm = () => {
      console.log(this.props.ticket);
      if (this.props.ticket.loading === true) {
        console.log(this.props);
      } else {
        var {price, type} = this.props.ticket;
        var {id} = this.props.params;
        return (
          <div>
            <Link to={"events/" + id}><button className="button">Back to Event</button></Link>
            <h1 className="text-center">Modify Ticket</h1>
            <form className="custom-form">
                <label htmlFor="type">Type</label>
                <input type="text" name="type" ref="type" defaultValue={type}></input>
                <label htmlFor="notes">Price</label>
                <input type="text" name="notes" ref="Price" defaultValue={price}></input>
                <button type="button" onClick={() => this.handleSubmit()} className="button">Submit</button>
                <Link to={"events/" + id}><button type="button" className="button">Cancel</button></Link>
                <button type="button" onClick={() => this.handleRemove()} className="button alert">Remove</button>
            </form>
          </div>
        )
      }
    }
    return (
      <div>
        {renderForm()}
      </div>
    )
  }
}
