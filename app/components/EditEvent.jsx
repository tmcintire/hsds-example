var React = require('react');
import {Link, IndexLink} from 'react-router';
var DatePicker = require('react-datepicker');
var moment = require('moment');
import { connect } from 'react-redux';
import { fetchEventDetails, editEventDetails, deleteEvent  } from "../actions/eventActions";

export default class EditEvent extends React.Component{
  constructor(props) {
    super(props);
    var {id} = this.props.params;
    this.props.dispatch(fetchEventDetails(id));
    this.state = {
      startDate: moment()
    }
  }
  handleChange(date) {
    this.setState({
      startDate: date,
      error: false
    });
  }
  handleSubmit(e) {
    if (this.refs.date.value === undefined) {
      e.preventDefault();
      this.setState({
        error: true
      })
    } else {
      var name = this.refs.name.value;
      var date = this.state.startDate.format('L');
      var time = this.refs.time.value;
      var fee = this.refs.fee.value;
      var max_fee = this.refs.max_fee.value;
      var band_minimum = this.refs.band_minimum.value;
      var cash = parseInt(this.refs.cash.value);
      var {id} = this.props.params;
      this.props.dispatch(editEventDetails(id, name, date, time, fee, max_fee, band_minimum, cash));
      window.location = '#/events/' + id;
    }
  }
  handleRemove() {
    var {id} = this.props.params;
    this.props.dispatch(deleteEvent(id));
    window.location = '#/events/';
  }
  render() {
    var errorMessage = () => {
      if (this.state.error) {
        return (
          <p className="error-message">You must enter a date</p>
        )
      }
    }
    var renderForm = () => {
      if (this.props.event.loading === false) {
        var {name, date, time, fee, max_fee, band_minimum, cash} = this.props.event[0];
        var {id} = this.props.params;
        var edit = "edit"
        return (
          <div>
            <Link to={"events/" + id}><button className="button">Back to Event</button></Link>
            <h1 className="text-center">Modify Event</h1>
            <form className="custom-form">
                <label htmlFor="type">Name</label>
                <input type="text" name="type" ref="name" defaultValue={name}></input>
                  <DatePicker
                  ref="date"
                  selected={this.state.startDate}
                  onChange={this.handleChange.bind(this)}
                  placeholderText="Click to select a date"  />
                <label htmlFor="cost">Tim</label>
                <input type="text" name="cost" ref="time" defaultValue={time}></input>
                <label htmlFor="percent">Fee</label>
                <input type="text" name="percent" ref="fee" defaultValue={fee}></input>
                <label htmlFor="percent">Max Fee</label>
                <input type="text" name="percent" ref="max_fee" defaultValue={max_fee}></input>
                <label htmlFor="percent">Band Minimum</label>
                <input type="text" name="percent" ref="band_minimum" defaultValue={band_minimum}></input>
                <label htmlFor="percent">Cash</label>
                <input type="text" name="percent" ref="cash" defaultValue={cash}></input>
                <button type="button" onClick={(e) => this.handleSubmit(e)} className="button">Submit</button>
                <Link to={"events/" + id}><button type="button" className="button">Cancel</button></Link>
                <button type="button" onClick={() => this.handleRemove()} className="button alert">Remove</button>
                <br />
                {errorMessage()}
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
