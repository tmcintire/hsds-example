var React = require('react');

export default class Cashbox extends React.Component{
  render() {
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
}
