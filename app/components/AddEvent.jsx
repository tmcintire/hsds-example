var React = require('react');
import {Link, IndexLink} from 'react-router';
import { connect } from 'react-redux';
import { newEvent } from "../actions/eventActions";

@connect((store) => {
  return {
    events: store.events
  };
})
export default class AddEvent extends React.Component{
  handleSubmit(dispatch) {
    var name = this.refs.name.value;
    var date = this.refs.date.value;
    var time = this.refs.time.value;
    var fee = this.refs.fee.value;
    var max_fee = this.refs.max_fee.value;
    var band_minimum = this.refs.band_minimum.value;
    var cash = this.refs.cash.value

    this.props.dispatch(newEvent(name, date, time, fee, max_fee, band_minimum, cash));
    window.location = '#/events/';
  }
  render() {
    var {id, name, date, time} = this.props;

    return (
      <form>
        <input type="text" ref="name" placeholder="Event name..."></input>
        <input type="text" ref="date" placeholder="Date..."></input>
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
