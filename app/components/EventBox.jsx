var React = require('react');
import {Link, IndexLink} from 'react-router';

var EventBox = React.createClass({
  render: function () {
    var {id, name, date, time} = this.props;
    
    return (
      <Link to={"events/"+ id} className="event-box-link">
        <div className="event-box">
          <p>{name}</p>
          <p>{date}</p>
          <p>{time}</p>
        
        </div>
      </Link>

    )
  }
});

module.exports = EventBox;
