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
  constructor() {
    super();
    this.state = {
      message: ''
    }
  }
  handleSubmit(button, dispatch) {
    var {id} = this.props.params;
    var expenseType = this.refs.type.value;
    var notes = this.refs.notes.value;
    var percent = this.refs.percent.value;
    var paid = false

    if (this.refs.cost.value.length > 0) {
      var cost = parseInt(this.refs.cost.value);
    } else {
      var cost = 0;
    }

    if (button === 'Submit') {
      this.props.dispatch(addExpense(id, expenseType, notes, percent, paid, cost));
      window.location = '#/events/'+ id;
    } else if(button === 'Add') {
      this.props.dispatch(addExpense(id, expenseType, notes, percent, paid, cost));
      this.setState({
        message: 'Expense Added!'
      });
      this.refs.type.value = '';
      this.refs.notes.value = '';
      this.refs.percent.value = '';
      this.refs.paid.checked = false;
      this.refs.cost.value = '';
      this.refs.type.focus()
    }
  }
  render() {
    var submit = "Submit";
    var addAnother = "Add";
    var {message} = this.state;
    var {id} = this.props.params;
    return (
      <div>
        <Link to={"events/" + id}><button className="button">Back to Event</button></Link>
        <h1 className="text-center">Create New Expense</h1>
        <form className="custom-form">
          <input type="text" ref="type" placeholder="Expense description..." />
          <input type="text" ref="notes" placeholder="Notes..." />
          <input type="text" ref="percent" placeholder="Percent..." />
          <input type="text" ref="cost" placeholder="Cost..." />
          <button className="button" onClick={() => this.handleSubmit(submit)} type="button">Save</button>
          <button className="button" onClick={() => this.handleSubmit(addAnother)} type="button">Save and Add</button>
          <Link to={"events/" + id}><button type="button" className="button alert">Cancel</button></Link>
          <br />
          {message}
        </form>
      </div>
    )
  }
}
