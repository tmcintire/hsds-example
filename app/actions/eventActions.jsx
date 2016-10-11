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

export function deleteEvent(eventId) {
  return function(dispatch) {
    var eventsRef = firebaseRef.child("events");
    var eventRef = eventsRef.child(eventId);
    eventRef.remove()
    dispatch({
      type: 'EVENT_REMOVED',
      id: eventId
    })
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

export function editExpenseDetails(eventId, expenseId, expenseType, category, notes, percent, paid, cost) {
  return function(dispatch) {
    dispatch(requestExpense());
    var eventsRef = firebaseRef.child("events");
    var eventRef = eventsRef.child(eventId);
    var expensesRef = eventRef.child('expenses');
    var expenseRef = expensesRef.child(expenseId);
    expenseRef.update({
      expenseType,
      category,
      notes,
      percent,
      paid,
      cost
    })
    dispatch({
      type: 'CHANGE_EXPENSE',
      expenseType,
      category,
      notes,
      percent,
      paid,
      cost
    })
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

export function addExpense(id, type, notes, percent, paid, cost) {
  return function(dispatch) {
    var eventsRef = firebaseRef.child("events");
    var eventRef = eventsRef.child(id);
    var expensesRef = eventRef.child('expenses');
    expensesRef.push().set({
      type,
      notes,
      percent,
      paid,
      cost
    })
  }
}

export function removeExpense(id, expenseId) {
  return function(dispatch) {
    var eventsRef = firebaseRef.child("events");
    var eventRef = eventsRef.child(id);
    var expensesRef = eventRef.child('expenses');
    var expenseRef = expensesRef.child(expenseId)
    expenseRef.remove()
    dispatch({
      type: 'EXPENSE_REMOVED',
      id: expenseId
    })
  }
}

export function editExpenseDetails(id, expenseid, type, notes, cost, percent, paid, edit) {
  return function(dispatch) {
    var eventsRef = firebaseRef.child("events");
    var eventRef = eventsRef.child(id);
    var expensesRef = eventRef.child('expenses');
    var expenseRef = expensesRef.child(expenseid);
    expenseRef.update({
      type,
      notes,
      percent,
      paid,
      cost
    })
    dispatch({
      type: 'EXPENSE_UPDATED',
      type,
      notes,
      percent,
      paid,
      cost
    })

    dispatch(updateCash(id));

  }
}

// Function to modify tickets (increase or decrease)
export function modifyTicket(eventId, typeId, count, price, edit) {
  return function(dispatch) {
    // Set firebase references
    var eventsRef = firebaseRef.child("events");
    var eventRef = eventsRef.child(eventId);
    var ticketsRef = eventRef.child('tickets');
    var ticketRef = ticketsRef.child(typeId);

    if (edit === 'add') { // check if add
      var newCount = count + 1;
    } else if(edit === 'remove') { // check if remove
      var newCount = count - 1;
    }

    // set the new total
    var newTotal = newCount * price;

    //Update the ticket in the database
    ticketRef.update({
      count: newCount,
      total: newTotal
    })
    // dispatch new action to the reducers to set state
    dispatch({
      type: 'TICKET_MODIFIED',
      count: newCount,
      total: newTotal
    })
    dispatch(updateTotals(eventId));
    dispatch(updateExpenses(eventId));
    dispatch(updateCash(eventId));
  }
}

// Function to update event totals when a ticket is modified
export function updateTotals(eventId) {
  return function(dispatch, getState) {
    var eventsRef = firebaseRef.child("events");
    var eventRef = eventsRef.child(eventId);
    const state = getState();
    const event = state.event[0];
    var ticketsTotal = () => {
      return Object.keys(event.tickets).map((ticket) => {
        var ticketTotal = (event.tickets[ticket].count * event.tickets[ticket].price);
        return ticketTotal;
      });
    }
    var totalRevenue = ticketsTotal().reduce(function(a, b) {
      return a + b;
    });
    var countTotal = () => {
      return Object.keys(event.tickets).map((ticket) => {
        var countTotal = event.tickets[ticket].count;
        return countTotal;
      });
    }
    var totalCount = countTotal().reduce(function(a, b) {
      return a + b;
    });
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

export function updateCash(eventId) {
  return function (dispatch, getState) {
    var eventsRef = firebaseRef.child("events");
    var eventRef = eventsRef.child(eventId);
    event = getState().event[0];
    var parsedExpenses = [];
    Object.keys(event.expenses).forEach((expense) => {
      parsedExpenses.push({
        ...event.expenses[expense],
      });
    });
    var totalExpenses = 0;
    for (var i=0; i< parsedExpenses.length; i++) {
      totalExpenses = totalExpenses + parsedExpenses[i].cost;
    }
    var endingCash = event.totalRevenue - totalExpenses + event.cash;
    var net = endingCash - event.cash;

    eventRef.update({
      totalExpenses,
      endingCash,
      net
    })
    dispatch({
      type: 'TOTAL_EXPENSES_CALCULATED',
      totalExpenses,
      endingCash,
      net
    })
  }
}

// change the paid status on an expense
export function changeCheckBox(eventId, expenseId, checked) {
  return function(dispatch) {
    var eventsRef = firebaseRef.child("events");
    var eventRef = eventsRef.child(eventId);
    var expensesRef = eventRef.child('expenses');

    expensesRef.child(expenseId).update({
      paid: checked,
    })
    dispatch({
      type: 'CHECKBOX_UPDATED',
      paid: checked
    })
  }
}


// Function to update event totals when a ticket is modified
// The majority of this code is to calculat the new administrative fee every
// time a new ticket is added or removed.
export function updateExpenses(eventId) {
  return function(dispatch, getState) {
    var eventsRef = firebaseRef.child("events");
    var eventRef = eventsRef.child(eventId);
    var expensesRef = eventRef.child('expenses');
    const state = getState();
    const event = state.event[0];
    expensesRef.once("value", snapshot => {
      var expenses = snapshot.val() || {};
      var parsedExpenses = [];

      Object.keys(expenses).forEach((expense) => {
        parsedExpenses.push({
          ...expenses[expense],
          key: expense
        });
      });

      // Find the band expense
      function findBand(expense) {
        return expense.type === "Band";
      }
      var bandExpense = parsedExpenses.find(findBand); // band expense
      // Find the venue expense
      function findVenue(expense) {
        return expense.type === "Venue";
      }
      var venueExpense = parsedExpenses.find(findVenue); // venue expense

      // Make sure the band and the venue both exist
      if (bandExpense !== undefined && venueExpense !== undefined) {
        // define the band and expense keys
        var bandExpenseId = bandExpense.key;
        var venueExpenseId = venueExpense.key;

        var newBandExpense, newVenueExpense, newAdminFee;
        newVenueExpense = event.totalRevenue * parseInt(venueExpense.percent)/100;
        var venue_mod = newVenueExpense % 1;
        newBandExpense = event.totalRevenue * bandExpense.percent/100 + venue_mod;

        if (event.totalRevenue > 0) {
            if (event.fee <= 100 && newBandExpense > event.band_minimum) {
              if (bandExpense.percent > 0 && venueExpense.percent > 0) {
                var temp_cost_venue = event.totalRevenue * parseInt(venueExpense.percent)/100; // Venue cost
                var venue_mod = temp_cost_venue % 1; // the remainder of cents left over to be rounded up for the band
                var digits = 2;
                var multiplier = Math.pow(10, 2);
                var result = Math.round(venue_mod * multiplier)/multiplier;
                var venue_mod = result;
                var temp_cost_venue = temp_cost_venue - venue_mod; // set the new venue cost - the mod
                var temp_cost_band = event.totalRevenue * bandExpense.percent/100 + venue_mod;
                var r = temp_cost_band - event.band_minimum; // $30
                if (r > bandExpense.percent) {
                  var b_admin = 70
                } else {
                  var b_admin = r
                }

                var v_admin = Math.floor(b_admin/(bandExpense.percent/100) - b_admin)
                if (v_admin > venueExpense.percent) {
                  v_admin = 30;
                }

                // define variables if there is a percentage on the expense
                newBandExpense = temp_cost_band - b_admin;
                newVenueExpense = temp_cost_venue - v_admin;
                newAdminFee = b_admin + v_admin;
              }
            } else {
              newAdminFee = 0;
              newVenueExpense = event.totalRevenue * parseInt(venueExpense.percent)/100;
              var venue_mod = newVenueExpense % 1;
              var digits = 2;
              var multiplier = Math.pow(10, 2);
              var result = Math.round(venue_mod * multiplier)/multiplier;
              var venue_mod = result;
              newVenueExpense = newVenueExpense - venue_mod;
              newBandExpense = event.totalRevenue * bandExpense.percent/100 + venue_mod;
            }
            if (newAdminFee < 0) {
              newAdminFee = 0;
            }
        } else if (event.totalRevenue === 0) {
          newBandExpense = 0;
          newVenueExpense = 0;
        }

        // ***** Set the expenses and event updates in the database and the store
        expensesRef.child(bandExpenseId).update({
          cost: newBandExpense,
        })
        expensesRef.child(venueExpenseId).update({
          cost: newVenueExpense,
        })
        eventRef.update({
          fee: newAdminFee,
        })
        dispatch({
          type: 'BAND_EXPENSE_UPDATED',
          cost: newBandExpense,
          id: bandExpenseId
        })
        dispatch({
          type: 'VENUE_EXPENSE_UPDATED',
          cost: newVenueExpense,
          id: venueExpenseId
        })
        dispatch({
          type: 'UPDATED_EVENT',
          fee: newAdminFee
        })
      }
    });
  }
}
