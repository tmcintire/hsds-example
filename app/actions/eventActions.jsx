import firebase, {firebaseRef} from 'app/firebase/';

export function fetchEvents() {
  return function(dispatch) {
    firebaseRef.child("events").on("value", snapshot => {
      dispatch({
        type: 'FETCH_EVENTS',
        payload: snapshot.val()
      });
    });
  }
}

export function requestEvent() {
  return {
    type: 'REQUEST_EVENT'
  }
}

export function fetchEventDetails(id) {
  return function(dispatch) {
    dispatch(requestEvent());
    firebaseRef.child("events").orderByKey().equalTo(id).on("value", snapshot => {
      var events = snapshot.val() || {};
      var parsedEvents = [];

      Object.keys(events).forEach((event) => {
        parsedEvents.push({
          ...events[event]
        });
      });
      dispatch({
        type: 'RECEIVED_EVENT',
        payload: parsedEvents,
      })
    });
  }
}

export function newEvent(name, date, time, fee, max_fee, band_minimum, cash) {
  return function(dispatch) {
    var eventsRef = firebaseRef.child("events");
    eventsRef.push().set({
      name,
      date,
      time,
      fee,
      max_fee,
      band_minimum,
      cash
    });
  }
}

export function addTicket(id, type, price) {
  return function(dispatch) {
    var eventsRef = firebaseRef.child("events");
    var eventRef = eventsRef.child(id);
    var ticketRef = eventRef.child('tickets');
    ticketRef.push().set({
      type,
      price,
      count: 0
    })
  }
}

export function changeTicket(eventId, typeId, newCount) {
  return function(dispatch) {
    var eventsRef = firebaseRef.child("events");
    var eventRef = eventsRef.child(eventId);
    var ticketsRef = eventRef.child('tickets');
    var ticketRef = ticketsRef.child(typeId);
    ticketRef.update({
      count: newCount
    })
  }
}
