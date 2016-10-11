var React = require('react');
import {Link, IndexLink} from 'react-router';

export default class AdminFee extends React.Component{
  render() {
    return (
      <div>
        <h1 className="text-center">Administrative Fee</h1>
        <table className="table-styles">
          <tbody>
            <tr>
              <td colSpan="5">Admin Fee</td>
              <td>${this.props.fee}</td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}
