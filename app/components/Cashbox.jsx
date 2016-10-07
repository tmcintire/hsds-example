var React = require('react');
import {Link, IndexLink} from 'react-router';
import EventsAPI from 'EventsAPI';

var Cashbox = React.createClass({
  getInitialState: function() {
    return {
      cash: 0
    }
  },

  render: function () {
    var {cash, endingCash, net} = this.props;
    return (
          <div>
          <h1 className="text-center">Cashbox</h1>
          <table className="table-styles">
            <thead>
            <tr>
                <th>Beginning</th>
                <th>Ending</th>
                <th>Net</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>${cash}</td>
                <td>${endingCash}</td>
                <td>${net}</td>
              </tr>
            </tbody>

          </table>
        </div>
    )
  }
});

module.exports = Cashbox;
