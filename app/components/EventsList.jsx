import React from 'react';
import {Link, IndexLink} from 'react-router';
import EventBox from 'EventBox';
import getEvents from 'EventsAPI';

var EventsList = React.createClass({
  getInitialState: function() {
   return {
      eventsData: [],
    };
  },
  componentDidMount: function() {
		var that = this;
		getEvents.getEvents().then(function(data) {
			that.setState({
				eventsData: data,
			});
		});

	},

  render: function() {
    var {eventsData} = this.state;
    console.log(eventsData);
    var renderEvents = () => {
      return eventsData.map((event) => {
          return (
            <EventBox key={event.id} {...event}/>
          )
      });
    }

    return(
      <div>
        {renderEvents()}
      </div>
    )
  }
});

module.exports = EventsList;