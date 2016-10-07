var React = require('react');
import {Link, IndexLink} from 'react-router';
import EventsAPI from 'EventsAPI';

var EditIncome = React.createClass({
  getInitialState: function() {
    return {
      amount: '',
      notes: '',
      type: '',
    }
  },
  componentDidMount: function() {
		var {id, incomeid} = this.props.params;
    var that = this;
    var edit = null;
    EventsAPI.editIncome(id, incomeid, edit).then(function(data) {
      that.setState({
        amount: data.amount,
        notes: data.notes,
        type: data.type,
      })
    });
	},
  handleSubmit: function(edit) {
    var edit = edit;
    var amount = this.refs.amount.value;
    var notes = this.refs.notes.value;
    var type = this.refs.type.value;
    var {id, incomeid} = this.props.params;
    EventsAPI.editIncomeFields(incomeid, amount, notes, type, edit);
    window.location = '#/events/' + id ;
  },
  handleChange: function(field) {
    this.setState({
      [field]: event.target.value
    })
  },
  render: function () {
    var {type, amount, notes} = this.state;
    var {id} = this.props.params;
    var edit = "edit"
    return (
        <form>
            <label htmlFor="amount">Type</label>
            <input type="text" name="amount" ref="type" onChange={() => this.handleChange('type')} value={type}></input>
            <label htmlFor="amount">Notes</label>
            <input type="text" name="amount" ref="notes" onChange={() => this.handleChange('notes')} value={notes}></input>
            <label htmlFor="amount">Amount</label>
            <input type="text" name="amount" ref="amount" onChange={() => this.handleChange('amount')} value={amount}></input>
            <button type="button" onClick={() => this.handleSubmit(edit)} className="button">Submit</button>
            <Link to={"events/" + id}><button type="button" className="button">Cancel</button></Link>
        </form>
    )
  }
});

module.exports = EditIncome;
