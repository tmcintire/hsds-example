var React = require('react');
import {Link, IndexLink} from 'react-router';

var EventBox = React.createClass({
  deleteEvent: function() {
    this.getConfirmation();
  },
  getConfirmation: function(){
     var retVal = confirm("Are you sure you want to delete this event?");
     if( retVal == true ){
       this.props.deleteEvent(this.props.eventKey);
     }
  },
  render: function () {
    var {eventKey, id, name, date, time, totalRevenue, totalExpenses, net} = this.props;

    return (
      <div className="event-box">
        <span onClick={this.getConfirmation} className="delete-x">X</span>
        <Link to={"events/"+ eventKey} className="event-box-link">
          <div className="row">
            <div className="large-6 columns">
              <p><strong>{name}</strong></p>
              <p>{date}</p>
              <p>{time}</p>
            </div>
            <div className="large-6 columns">
              <p>Revenue: ${totalRevenue}</p>
              <p>Expenses: ${totalExpenses}</p>
              <p>Net: ${net}</p>
            </div>
          </div>

        </Link>
      </div>

    )
  }
});

module.exports = EventBox;
