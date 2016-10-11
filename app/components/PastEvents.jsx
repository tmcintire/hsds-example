import React from 'react';
import {Link, IndexLink} from 'react-router';
import { connect } from 'react-redux';
import { deleteEvent, fetchPastEvents } from "../actions/eventActions";
import EventBox from 'EventBox';
import getEvents from 'EventsAPI';

@connect((store) => {
  return {
    events: store.events
  };
})
export default class PastEvents extends React.Component{
  componentDidMount() {
    this.props.dispatch(fetchPastEvents());
	}
  deleteEvent(eventId) {
    this.props.dispatch(deleteEvent(eventId));
  }

  render() {
    var {events} = this.props;
    var renderEvents = () => {
      return Object.keys(events).map((event) => {
        var eachEvent = events[event];
        return (
          <EventBox
            key={event}
            eventKey={event}
            deleteEvent={this.deleteEvent.bind(this)}
            {...eachEvent}/>
          )
      })
    }

    return(
      <div>
        {renderEvents()}
      </div>
    )
  }
}
