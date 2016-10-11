var React = require('react');
import {Link, IndexLink} from 'react-router';
var moment = require('moment');
import ExpenseContainer from '../expenses/ExpenseContainer';

export default class Expenses extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      expenses: this.props.expenses
    }
  }
  handleClick(e) {
    if (this.props.disabled === true) {
        e.preventDefault();
    }
  }
  render() {
    var {expenses, eventId} = this.props;
    var renderExpenses = () => {
      if (expenses !== undefined) {
        return Object.keys(expenses).map((expense) => {
          var expenseInfo = expenses[expense];
          return (
              <ExpenseContainer key={expense} eventId={eventId} expenseId={expense}{...this.props} {...expenseInfo}/>
          );
        });
      }
    };
    return (
          <div>
          <h1 className="text-center">Expenses</h1>
          <Link onClick={(e) => this.handleClick(e)} to={"events/" + eventId + "/addexpense"}>Add Expense</Link>
          <table className="table-styles">
            <thead>
            <tr>
                <th>Type</th>
                <th>Notes</th>
                <th>Percent</th>
                <th>Paid</th>
                <th>Cost</th>
              </tr>
            </thead>
            <tbody>
              {renderExpenses()}
            </tbody>

          </table>
        </div>
    )
  }
}
