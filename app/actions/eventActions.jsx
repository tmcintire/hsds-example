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

export function requestExpense() {
  return {
    type: 'REQUEST_EXPENSE'
  }
}

export function fetchExpenseDetails(eventId, expenseId) {
  return function(dispatch) {
    dispatch(requestExpense());
    var eventsRef = firebaseRef.child("events");
    var eventRef = eventsRef.child(eventId);
    var expensesRef = eventRef.child('expenses');
    var expenseRef = expensesRef.child(expenseId);
    expenseRef.on("value", snapshot => {
      var expense = snapshot.val() || {};
      dispatch({
        type:"RECEIVED_EXPENSE",
        payload: expense,
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

export function addExpense(id, type, category, notes, percent, paid, cost) {
  return function(dispatch) {
    var eventsRef = firebaseRef.child("events");
    var eventRef = eventsRef.child(id);
    var ticketRef = eventRef.child('expenses');
    ticketRef.push().set({
      type,
      category,
      notes,
      percent,
      paid,
      cost
    })
  }
}

export function changeTicket(eventId, typeId, newCount, ticketTotal) {
  return function(dispatch) {
    var eventsRef = firebaseRef.child("events");
    var eventRef = eventsRef.child(eventId);
    var ticketsRef = eventRef.child('tickets');
    var ticketRef = ticketsRef.child(typeId);
    ticketRef.update({
      count: newCount,
      total: ticketTotal
    })
    dispatch({
      type: 'CHANGE_TICKET',
      count: newCount,
      total: ticketTotal
    })
  }
}

export function updateEventTotals(eventId, totalRevenue, totalCount) {
  return function(dispatch) {
    var eventsRef = firebaseRef.child("events");
    var eventRef = eventsRef.child(eventId);
    eventRef.update({
      totalRevenue,
      totalCount
    })
    dispatch({
      type: 'UPDATE_TOTALS',
      totalRevenue,
      totalCount
    })
  }
}
