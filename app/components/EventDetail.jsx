var React = require('react');
import {Link, IndexLink} from 'react-router';
import EventsAPI from 'EventsAPI';
import Tickets from 'Tickets';
import AddTicket from 'AddTicket';
import $ from 'jQuery';

var EventDetail = React.createClass({
  getInitialState: function() {
    return {
      eventData: [],
    }
  },
  componentDidMount: function() {
		var {id} = this.props.params;
    var that = this;
    EventsAPI.getEventDetails(id).then(function(data) {
      that.setState({
        eventData: data
      })
    });
    
	},
  render: function () {
    var {name, date, time, tickets} = this.state.eventData;
    var {id} = this.props.params;
    var renderTickets = () => {
      if (tickets !== undefined) {
          for (var i=0; i < this.state.eventData.tickets.length; i++) {
          return tickets.map((ticket) => {
            return (
                <Tickets key={ticket.id} {...ticket}/>
            );
          });
        }
      } 
      
    };
    return (
      <div>
          <h1 className="text-center">{name}</h1>
          <Link to={"events/" + id + "/addticket"}>Add Tickets</Link>
          <table>
            <thead>
            <tr>
                <th>Type</th>
                <th>Price</th>
                <th>Add</th>
                <th>Remove</th>
                <th>Count</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody id="tickets-table-body">
              {renderTickets()}

            </tbody>

          </table>
        </div>
    )
  }
});

module.exports = EventDetail;
