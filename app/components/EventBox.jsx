var React = require('react');
import {Link, IndexLink} from 'react-router';

var EventBox = React.createClass({
  deleteEvent: function() {
    this.props.deleteEvent(this.props.eventKey);
  },
  render: function () {
    var {eventKey, id, name, date, time} = this.props;

    return (
      <div className="event-box">
        <span onClick={this.deleteEvent} className="delete-x">X</span>
        <Link to={"events/"+ eventKey} className="event-box-link">
            <p>{name}</p>
            <p>{date}</p>
            <p>{time}</p>
        </Link>
      </div>

    )
  }
});

module.exports = EventBox;
