var React = require('react');
import {Link, IndexLink} from 'react-router';
import {connect} from 'react-redux';
import {addExpense} from "../actions/eventActions";

@connect((store) => {
  return {
    events: store.events
  };
})
export default class AddExpense extends React.Component{
  handleSubmit(dispatch) {
    var {id} = this.props.params;
    var type = this.refs.type.value;
    var category = this.refs.category.value;
    var notes = this.refs.notes.value;
    var percent = this.refs.percent.value;
    var paid = this.refs.paid.checked;
    var cost = this.refs.cost.value;
    this.props.dispatch(addExpense(id, type, category, notes, percent, paid, cost));
    window.location = '#/events/'+ id;
  }
  render() {

    return (
        <form>
          <input type="text" ref="type" placeholder="Expense description..." />
          <input type="text" ref="category" placeholder="Category..." />
          <input type="text" ref="notes" placeholder="Notes..." />
          <input type="text" ref="percent" placeholder="Percent..." />
          <input type="checkbox" ref="paid"/>
          <input type="text" ref="cost" placeholder="Cost..." />
          <button className="button" onClick={this.handleSubmit.bind(this)} type="button">Submit</button>
        </form>
    )
  }
}
