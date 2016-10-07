var React = require('react');
import {Link, IndexLink} from 'react-router';
import EventsAPI from 'EventsAPI';

var EditExpense = React.createClass({
  getInitialState: function() {
    return {
      type: '',
      category: '',
      notes: '',
      cost: '',
      percent: '',
      paid: '',
      disabled: false
    }
  },
  componentDidMount: function() {
		var {id, expenseid} = this.props.params;
    var that = this;
    var edit = '';
    EventsAPI.editExpense(id, expenseid, edit).then(function(data) {
      var cost, percent;
      if (data.cost === null) {
        cost = undefined;
      } else {
        cost = data.cost;
      }
      if (data.percent === null) {
        percent = undefined;
      } else {
        percent = data.percent;
      }

      if (data.percent > 0) {
        that.setState({
          disabled: true
        })
      }
      that.setState({
        type: data.type,
        category: data.category,
        notes: data.notes,
        cost: cost,
        percent: percent,
        paid: data.paid,
      })
    });
	},
  handleSubmit: function(edit) {
    var edit = edit;
    var type = this.refs.type.value;
    var category = this.refs.category.value;
    var notes = this.refs.notes.value;
    var cost = this.refs.cost.value;
    var percent = this.refs.percent.value;
    var paid = this.refs.paid.checked;
    var {id, expenseid} = this.props.params;
    EventsAPI.editExpenseFields(expenseid, type, category, notes, cost, percent, paid, edit);
    window.location = '#/events/' + id ;
  },
  handleChange: function(field) {
    if (field==='paid') {
      this.setState({
        paid: this.refs.paid.checked
      })
    } else {
      this.setState({
        [field]: event.target.value
      })
    }
    if (this.refs.percent.value > 0) {
      this.setState({
        disabled: true
      })
    } else {
      this.setState({
        disabled: false
      })
    }
  },
  render: function () {
    var {type, cost, notes, category, paid, percent, disabled} = this.state;
    var {id} = this.props.params;
    var edit = "edit"
    return (
        <form>
            <label htmlFor="type">Type</label>
            <input type="text" name="type" ref="type" onChange={() => this.handleChange('type')} value={type}></input>
            <label htmlFor="category">Category</label>
            <input type="text" name="category" ref="category" onChange={() => this.handleChange('category')} value={category}></input>
            <label htmlFor="notes">Notes</label>
            <input type="text" name="notes" ref="notes" onChange={() => this.handleChange('notes')} value={notes}></input>
            <label htmlFor="cost">Cost</label>
            <input type="text" name="cost" ref="cost" disabled={disabled} onChange={() => this.handleChange('cost')} value={cost}></input>
            <label htmlFor="percent">Percent</label>
            <input type="text" name="percent" ref="percent" onChange={() => this.handleChange('percent')} value={percent}></input>
            <label htmlFor="paid">Paid</label>
            <input type="checkbox" name="paid" ref="paid" onChange={() => this.handleChange('paid')} checked={paid}></input><br />
            <button type="button" onClick={() => this.handleSubmit(edit)} className="button">Submit</button>
            <Link to={"events/" + id}><button type="button" className="button">Cancel</button></Link>
        </form>
    )
  }
});

module.exports = EditExpense;
