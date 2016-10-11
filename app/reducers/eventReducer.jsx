export var eventsReducer = (state = [], action) => {
  console.log(action);
  switch (action.type) {
    case 'FETCH_EVENTS':
      return {...state, ...action.payload}
    case 'EVENT_REMOVED':
      return {
        events: [
          ...state.events.slice(0, action.id),
          ...state.events.slice(action.id + 1)
        ]
      }
    default:
      return state;
  }
}

export var eventReducer = (state = [], action) => {
  switch (action.type) {
    case 'REQUEST_EVENT':
      return {
        loading: true
      }
    case 'RECEIVED_EVENT':
      return {
        ...state,
        ...action.payload,
        loading: false,
      }
    case 'UPDATE_TOTALS':
      return {
        ...state,
        totalRevenue: action.totalRevenue,
        totalCount: action.totalCount
      }
    case 'UPDATED_EVENT':
      return {
        ...state,
        fee: action.fee
      }
      case 'BAND_EXPENSE_UPDATED':
      case 'VENUE_EXPENSE_UPDATED':
        return {
          ...state,
          [action.id]: {
            cost: action.cost
          }
        }
      case 'CHECKBOX_UPDATED':
        return {
          ...state,
          paid: action.paid
        }
      case 'TOTAL_EXPENSES_CALCULATED':
        return {
          ...state,
          totalExpenses: action.totalExpenses,
          endingCash: action.endingCash,
          net: action.net,
        }
    default:
      return state;
  }
}

export var ticketReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TICKET':
      return {
        ...state,
        ...action.payload,
      }
      case 'CHANGE_TICKET':
        return {
          ...state,
          count: action.count,
          total: action.total
        }
      case 'TICKET_MODIFIED':
        return {
          ...state,
          count: action.count,
          total: action.total
        }
    default:
      return state;
  }
}

export var expenseReducer = (state = [], action) => {
  switch (action.type) {
    case 'REQUEST_EXPENSE':
      return {
        loading: true
      }
    case 'RECEIVED_EXPENSE':
      return {
        ...state,
        ...action.payload,
        loading: false,
      }
    default:
      return state;
  }
}
