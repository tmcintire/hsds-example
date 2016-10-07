var React = require('react');
import {Link, IndexLink} from 'react-router';
import EventsAPI from 'EventsAPI';
import Income from '../income/Income';

var Incomes = React.createClass({
  getInitialState: function() {
    return {
      tickets_total: 0
    }
  },
  componentDidMount: function() {
    var {id} = this.props;
    var that = this;
    EventsAPI.getTicketsTotal(id).then(function(data) {
      that.setState({
        tickets_total: data.tickets_total
      })
    });

  },

  render: function () {
    var {id, ticketsTotal, adminFee, incomes, allIncome} = this.props;
    var renderIncomes = () => {
        if (incomes !== undefined) {
            for (var i=0; i < incomes.length; i++) {
            return incomes.map((income) => {
              return (
                  <Income key={income.id} {...income} eventId={id}/>
              );
            });
          }
        }
    };
    return (
          <div>
          <h1 className="text-center">Income</h1>
          <table className="table-styles">
            <thead>
            <tr>
                <th>Type</th>
                <th>Notes</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody id="tickets-table-body">
              <tr>
                <td colSpan="2">Income from Admission</td>
                <td>${ticketsTotal}</td>
              </tr>
                {renderIncomes()}
              <tr>
                <td colSpan="2">Total Income</td>
                <td>${allIncome}</td>
              </tr>


            </tbody>

          </table>
        </div>
    )
  }
});

module.exports = Incomes;
