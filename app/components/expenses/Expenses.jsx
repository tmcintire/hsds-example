var React = require('react');
import {Link, IndexLink} from 'react-router';
import EventsAPI from 'EventsAPI';
import Expense from '../expenses/Expense';

var Expenses = React.createClass({
  getInitialState: function() {
    return {
      expenses: this.props.expenses
    }
  },

  render: function () {
    var {expenses, id} = this.props;
    var renderExpenses = () => {
        if (expenses !== undefined) {
            for (var i=0; i < expenses.length; i++) {
            return expenses.map((expense) => {
              return (
                  <Expense key={expense.id} {...expense} eventId={id}/>
              );
            });
          }
        }
    };

    return (
          <div>
          <h1 className="text-center">Expenses</h1>
          <table className="table-styles">
            <thead>
            <tr>
                <th>Type</th>
                <th>Category</th>
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
});

module.exports = Expenses;
