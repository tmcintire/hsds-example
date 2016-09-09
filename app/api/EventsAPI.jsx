var axios = require('axios');

const eventsURL = "https://agile-waters-79208.herokuapp.com/api/events/";
const djangoAPI = "https://agile-waters-79208.herokuapp.com/event/";

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
      .post(djangoAPI+ eventID + '/addticket/' + typeId + '/')
      .then((res) => res.data)
  },

  removeTicket(eventID, typeId) {
    return axios
      .post(djangAPI + eventID + '/removeticket/' + typeId + '/')
      .then((res) => res.data)
  }
}