var axios = require('axios');

const eventsURL = "https://agile-waters-79208.herokuapp.com/api/events/";
const eventURL = "https://hsds-e1401.firebaseio.com/events/";

module.exports = {
	getEvents: function () {
		return axios
				.get(eventsURL)
				.then((res) => res.data)
	},
  getEventDetails: function(id) {
    return axios
      .get(eventsURL + id)
      .then((res) => res.data)
  },

  modifyTicket(eventID, type, count) {
    return axios
      .patch(eventURL + eventID + "/tickets/" + type + '.json', { count: count })
  },

  addTicket(eventID, typeId) {
    return axios
      .post('http://127.0.0.1:8000/event/' + eventID + '/addticket/' + typeId + '/')
      .then((res) => res.data)
  },
  
  removeTicket(eventID, typeId) {
    return axios
      .post('http://127.0.0.1:8000/event/' + eventID + '/removeticket/' + typeId + '/')
      .then((res) => res.data)
  }
}