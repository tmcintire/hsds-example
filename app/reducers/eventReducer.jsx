export var eventsReducer = (state = [], action) => {
  switch (action.type) {
    case 'FETCH_EVENTS':
      return {...state, ...action.payload}
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
          ...action.payload,
        }
    default:
      return state;
  }
}
