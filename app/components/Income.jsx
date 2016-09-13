var React = require('react');
import {Link, IndexLink} from 'react-router';
import EventsAPI from 'EventsAPI';

var Income = React.createClass({
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
    var {tickets_total} = this.state;
    
    return (
          <div>
          <h1 className="text-center"></h1>
          <table>
            <thead>
            <tr>
                <th>Type</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody id="tickets-table-body">
              <td>Income from Admission</td>
              <td>${tickets_total}</td>
              

            </tbody>

          </table>
        </div>
    )
  }
});

module.exports = Income;
