var React = require('react');
import {Link, IndexLink} from 'react-router';
import EventsAPI from 'EventsAPI';

export default class Expense extends React.Component{
  changeCheckBox(expenseId) {
    //update checkbox
    console.log(expenseId);
  }
  render() {
    var {name, expenseId, type, category, notes, cost, percent, eventId} = this.props;
    return (
        <tr>
          <td><Link to={"events/" + eventId + "/editexpense/" + expenseId}>{type}</Link></td>
          <td>{category}</td>
          <td>{notes}</td>
          <td>{percent}%</td>
          <td><input type="checkbox" onChange={() => this.changeCheckBox(expenseId)}/></td>
          <td>${cost}</td>
        </tr>
    )
  }
}

module.exports = Expense;
