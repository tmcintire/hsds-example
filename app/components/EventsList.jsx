import React from 'react';
import {Link, IndexLink} from 'react-router';
import { connect } from 'react-redux';
import { fetchEvents } from "../actions/eventActions";
import EventBox from 'EventBox';
import getEvents from 'EventsAPI';

@connect((store) => {
  return {
    events: store.events
  };
})
export default class EventsList extends React.Component{
  componentDidMount() {
    this.props.dispatch(fetchEvents());
	}

  render() {
    var {events} = this.props;
    var renderEvents = () => {
      return Object.keys(events).map((event) => {
        var eachEvent = events[event];
        return <EventBox key={event} eventKey={event} {...eachEvent}/>;
      })
    }

    return(
      <div>
        {renderEvents()}
      </div>
    )
  }
}
