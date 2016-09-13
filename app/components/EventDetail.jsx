var React = require('react');
import {Link, IndexLink} from 'react-router';
import EventsAPI from 'EventsAPI';
import Tickets from 'Tickets';
import AddTicket from 'AddTicket';
import Income from 'Income';
import $ from 'jQuery';

var EventDetail = React.createClass({
  getInitialState: function() {
    return {
      eventData: [],
      loading: true,
      tickets_total: 0
    }
  },
  componentDidMount: function() {
		var {id} = this.props.params;
    var that = this;
    EventsAPI.getEventDetails(id).then(function(data) {
      that.setState({
        eventData: data,
        loading: false
      })
    });
    EventsAPI.getTicketsTotal(id).then(function(data) {
      that.setState({
        tickets_total: data.tickets_total
      })
    });
    
	},
  handleAddTicket: function() {
    var {id} = this.props.params;
    var that = this;
  },

  render: function () {
    var {name, date, time, tickets} = this.state.eventData;
    var {id} = this.props.params;
    var {tickets_total} = this.state;

    var renderTickets = () => {
        if (tickets !== undefined) {
            for (var i=0; i < this.state.eventData.tickets.length; i++) {
            return tickets.map((ticket) => {
              return (
                  <Tickets key={ticket.id} {...ticket} onAddTicket={this.handleAddTicket}/>
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
              <tr>
                <td colSpan="5">Total</td>
                <td>${tickets_total}</td>
              </tr>
            </tbody>
          </table>
        </div>
    )
  }
});

module.exports = EventDetail;
