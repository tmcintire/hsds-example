var React = require('react');
import {Link, IndexLink} from 'react-router';
import EventsAPI from 'EventsAPI';

var Expense = React.createClass({
  getInitialState: function() {
    return {
      checked: this.props.paid
    }
  },
  changeCheckBox: function(expenseID) {
    var paid = !this.state.checked;
    this.setState({
      checked: paid
    });
    var {eventId} = this.props;
    EventsAPI.markPaid(eventId, expenseID, paid)
  },
  render: function () {
    var {name, id, type, category, notes, cost, percent, eventId} = this.props;
    var {checked} = this.state;
    return (
        <tr>
          <td><Link to={"events/" + eventId + "/editexpense/" + id}>{type}</Link></td>
          <td>{category}</td>
          <td>{notes}</td>
          <td>{percent}%</td>
          <td><input type="checkbox" onChange={() => this.changeCheckBox(id)} checked={checked}/></td>
          <td>${cost}</td>
        </tr>
    )
  }
});

module.exports = Expense;
