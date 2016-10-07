var React = require('react');
import {Link, IndexLink} from 'react-router';
import EventsAPI from 'EventsAPI';

var Income = React.createClass({
  render: function () {
    var {type, notes, amount, id, event_id} = this.props;
    return (
        <tr>
          <td><Link to={"events/" + event_id + "/editincome/" + id}>{type}</Link></td>
          <td>{notes}</td>
          <td>${amount}</td>
        </tr>
    )
  }
});

module.exports = Income;
