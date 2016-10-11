var React = require('react');
import {Link, IndexLink} from 'react-router';
var DatePicker = require('react-datepicker');
var moment = require('moment');
import { connect } from 'react-redux';
import { newEvent } from "../actions/eventActions";


@connect((store) => {
  return {
    events: store.events
  };
})
export default class AddEvent extends React.Component{
  constructor() {
    super();
    this.state = {
      startDate: moment()
    }
  }
  handleChange(date) {
    this.setState({
      startDate: date
    });
  }
  handleSubmit(dispatch) {
    var name = this.refs.name.value;
    var date = this.state.startDate.format('L');
    var time = this.refs.time.value;
    var fee = this.refs.fee.value;
    var max_fee = this.refs.max_fee.value;
    var band_minimum = this.refs.band_minimum.value;
    var cash = parseInt(this.refs.cash.value);

    this.props.dispatch(newEvent(name, date, time, fee, max_fee, band_minimum, cash));
    window.location = '#/events/';
  }
  render() {
    console.log(moment().format('L') > this.state.startDate.format('L'));
    var {id, name, date, time} = this.props;

    return (
      <form className="custom-form">
        <input type="text" ref="name" placeholder="Event name..."></input>
          <DatePicker
          ref = "date"
          selected={this.state.startDate}
          onChange={this.handleChange.bind(this)}
          placeholderText="Click to select a date"  />
        <input type="text" ref="time" placeholder="Time..."></input>
        <input type="text" ref="fee" placeholder="Administrative Fee..."></input>
        <input type="text" ref="max_fee" placeholder="Maximum Administrative Fee..."></input>
        <input type="text" ref="band_minimum" placeholder="Band Minimum..."></input>
        <input type="text" ref="cash" placeholder="Starting Cashbox Amount..."></input>
        <button type="button" className="button" onClick={this.handleSubmit.bind(this)}>Submit</button>
      </form>

    )
  }
}

module.exports = AddEvent;
