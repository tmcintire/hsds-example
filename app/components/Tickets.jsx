var React = require('react');
import {Link, IndexLink} from 'react-router';
import EventsAPI from 'EventsAPI';

var Tickets = React.createClass({
  getInitialState: function() {
    return {
      new_count: this.props.count,
      total_revenue: this.props.count * this.props.price
    }
  },
  handleAddTicket: function(id, event_id) {
  	var that = this;
  	EventsAPI.addTicket(event_id, id).then(function(data) {
      that.setState({
        new_count: data.count,
        total_revenue: data.count * data.price
      })
    });
  },
  handleRemoveTicket: function(id, event_id) {
  	if (this.state.new_count === 0) {
  		alert("You cannot go below 0");
  	} else {
	  	var that = this;
	  	EventsAPI.removeTicket(event_id, id).then(function(data) {
	      that.setState({
	        new_count: data.count,
	        total_revenue: data.count * data.price
	      })
	    });
	  }
	},
  render: function () {
    var {type, price, count, id, event_id} = this.props;
    var {new_count, total_revenue} = this.state;
    
    return (
        <tr>
          <td>{type}</td>
          <td>${price}</td>
          <td><button onClick={() => this.handleAddTicket(id, event_id)} className="button">Add</button></td>
          <td><button disabled={this.state.new_count === 0} onClick={() => this.handleRemoveTicket(id, event_id)} className="button">Remove</button></td>
          <td>{new_count}</td>
          <td>${total_revenue}</td>
          
        </tr>
    )
  }
});

module.exports = Tickets;
