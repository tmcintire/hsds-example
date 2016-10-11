var React = require('react');
import {Link, IndexLink} from 'react-router';
import { connect } from 'react-redux';
import { fetchExpenseDetails, editExpenseDetails, removeExpense } from "../../actions/eventActions";

export default class EditExpense extends React.Component{
  componentDidMount() {
    var {expenseid, id} = this.props.params;
    this.props.dispatch(fetchExpenseDetails(id, expenseid));
  }
  handleSubmit(edit) {
    var edit = edit;
    var type = this.refs.type.value;
    var notes = this.refs.notes.value;
    var cost = parseInt(this.refs.cost.value);
    var percent = this.refs.percent.value;
    var paid = this.refs.paid.checked;
    var {id, expenseid} = this.props.params;
    this.props.dispatch(editExpenseDetails(id, expenseid, type, notes, cost, percent, paid, edit));
    window.location = '#/events/' + id;
  }
  handleRemove() {
    var {expenseid, id} = this.props.params;
    this.props.dispatch(removeExpense(id, expenseid));
    window.location = '#/events/' + id;
  }
  render() {
    var renderForm = () => {
      var {loading} = this.props.expense;
      if (loading === false) {
        var {type, cost, notes, paid, percent} = this.props.expense;
        var {id} = this.props.params;
        var edit = "edit"
        return (
          <div>
            <Link to={"events/" + id}><button className="button">Back to Event</button></Link>
            <h1 className="text-center">Modify Expense</h1>
            <form className="custom-form">
                <label htmlFor="type">Type</label>
                <input type="text" name="type" ref="type" defaultValue={type}></input>
                <label htmlFor="notes">Notes</label>
                <input type="text" name="notes" ref="notes" defaultValue={notes}></input>
                <label htmlFor="cost">Cost</label>
                <input type="text" name="cost" ref="cost" defaultValue={cost}></input>
                <label htmlFor="percent">Percent</label>
                <input type="text" name="percent" ref="percent" defaultValue={percent}></input>
                <label htmlFor="paid">Paid</label>
                <input type="checkbox" name="paid" ref="paid" onChange={() => this.handleChange('paid')} checked={paid}></input><br />
                <button type="button" onClick={() => this.handleSubmit(edit)} className="button">Submit</button>
                <Link to={"events/" + id}><button type="button" className="button">Cancel</button></Link>
                <button type="button" onClick={() => this.handleRemove()} className="button alert">Remove</button>
            </form>
          </div>
        )
      }
    }
    return (
      <div>
        {renderForm()}
      </div>
    )
  }
}
