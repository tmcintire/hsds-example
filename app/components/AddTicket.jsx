var React = require('react');
import {Link, IndexLink} from 'react-router';
import addTicket from 'EventsAPI';
import uuid from 'node-uuid';
import getEventDetails from 'EventsAPI';

var AddTicket = React.createClass({
  getInitialState: function() {
    return {
      numTickets: 0,
    }
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var {id} = this.props.params;
    var that = this;
    getEventDetails.getEventDetails(id).then(function(data) {
      var ticketArray = [];
      for (var ticket in data.tickets) {
        ticketArray.push(data.tickets[ticket]);
      }
      console.log(ticketArray.length);
      that.setState({
        numTickets: ticketArray.length
      })
    });
    
    var type = this.refs.ticketType.value;
    var price = this.refs.ticketPrice.value;
    var count = 0;
    
    addTicket.addTicket(id, type, price, count);
    
    this.refs.ticketType.value = "";
    this.refs.ticketPrice.value = "";
  },
  render: function () {
    
    return (
        <form onSubmit={this.handleSubmit}>
          <input type="text" ref="ticketType" placeholder="Ticket type..." />
          <input type="text" ref="ticketPrice" placeholder="Price..." />
          <button className="button" type="submit">Submit</button>
        </form>
    )
  }
});

module.exports = AddTicket;
