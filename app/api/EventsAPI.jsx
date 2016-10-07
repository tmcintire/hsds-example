var axios = require('axios');

const eventsURL = 'http://127.0.0.1:8000/api/events/';
const djangoAPI = 'http://127.0.0.1:8000/event/';
const expenseURL = 'http://127.0.0.1:8000/api/expenses/';
//const eventsURL = "https://agile-waters-79208.herokuapp.com/api/events/";
//const djangoAPI = "https://agile-waters-79208.herokuapp.com/event/";

module.exports = {
	getEvents: function () {
		return axios
				.get(eventsURL)
				.then((res) => res.data)
	},
  getEventDetails: function(id) {
    return axios
      .get(eventsURL + id + '/')
      .then((res) => res.data)
  },

	getIncomes: function(id) {
		return axios
			.post(djangoAPI + 'getincome/', { event_id: id })
			.then((res) => res.data)
	},

	getExpenses: function(id) {
    return axios
      .get(expenseURL)
      .then((res) => res.data)
  },

  getTicketsTotal(eventID) {
    return axios
      .get(djangoAPI + eventID + "/totalincome/")
      .then((res) => res.data)

  },

  modifyTicket(eventID, typeID, changeType) {
    return axios
      .post(djangoAPI + 'modifyticket/', { event_id: eventID, type_id: typeID, change_type: changeType })
			.then((res) => res.data)
  },

	markPaid(eventID, expenseID, checked) {
    return axios
      .post(djangoAPI + 'change_paid_status/', { event_id: eventID, expense_id: expenseID, checked:checked })
			.then((res) => res.data)
  },

	editIncome(eventID, incomeID, edit) {
		return axios
			.post(djangoAPI + 'editincome/', {event_id: eventID, income_id: incomeID, edit: edit})
			.then((res) => res.data)
	},

	editIncomeFields(incomeID, amount, notes, type, edit) {
		return axios
			.post(djangoAPI + 'editincome/', {income_id: incomeID, amount: amount, notes: notes, type:type, edit: edit})
	},

	editExpense(eventID, expenseID, edit) {
		return axios
			.post(djangoAPI + 'editexpense/', {event_id: eventID, expense_id: expenseID, edit: edit})
			.then((res) => res.data)
	},

	editExpenseFields(expenseid, type, category, notes, cost, percent, paid, edit) {
		return axios
			.post(djangoAPI + 'editexpense/',
				{
					expense_id: expenseid,
					type: type,
					category: category,
					notes: notes,
					cost: cost,
					percent: percent,
					paid: paid,
					edit: edit
				})
	},




	addTicket(id, description, price) {
		return axios
			.post(djangoAPI + 'addticket/', {event_id: id, description: description, price: price})
	}

}
