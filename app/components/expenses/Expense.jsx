var React = require('react');
import {Link} from 'react-router';
import { changeCheckBox } from "../../actions/eventActions";

export default class Expense extends React.Component{
  changeCheckBox(expenseId) {
    //update checkbox
    var checked = this.refs.checkbox.checked;
    var {eventId} = this.props;
    this.props.dispatch(changeCheckBox(eventId, expenseId, checked));
  }
  render() {
    var {name, expenseId, type, category, notes, cost, percent, eventId, paid} = this.props;
    return (
        <tr>
          <td><Link to={"events/" + eventId + "/editexpense/" + expenseId}>{type}</Link></td>
          <td>{notes}</td>
          <td>{percent}%</td>
          <td><input ref="checkbox" checked={paid} type="checkbox" onChange={() => this.changeCheckBox(expenseId)}/></td>
          <td>${cost}</td>
        </tr>
    )
  }
}

module.exports = Expense;
