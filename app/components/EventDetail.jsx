var React = require('react');
const Loading = require('react-loading-animation');
import { connect } from 'react-redux';
import {Link, IndexLink} from 'react-router';
import EventsAPI from 'EventsAPI';
import { fetchEventDetails, requestEvent, changeTicket, updateEventTotals, modifyTicket } from "../actions/eventActions";
import Tickets from 'Tickets';
import AddTicket from 'AddTicket';
import Incomes from 'income/Incomes';
import Admission from 'Admission';
import Expenses from 'expenses/Expenses';
import Cashbox from 'Cashbox';
import AdminFee from 'AdminFee';

export default class EventDetail extends React.Component{
  updateTicket(eventId, typeId, newCount, ticketTotal){
    this.props.dispatch(changeTicket(eventId, typeId, newCount, ticketTotal));
  }
  modifyTicket(eventId, typeId, count, price, edit) {
    this.props.dispatch(modifyTicket(eventId, typeId, count, price, edit));
  }
  updateTotals(eventId, totalRevenue, totalCount){
    this.props.dispatch(updateEventTotals(eventId, totalRevenue, totalCount));
  }
  componentDidMount() {
    this.props.dispatch(fetchEventDetails(this.props.params.id))
  }
  render() {
    var renderAdminFee = () => {
      var {fee} = this.props.event[0];
      if (fee > 0) {
        return (
          <AdminFee fee={fee} />
        )
      }
    }
    var renderEvent = () => {
      if (this.props.event.loading === true) {
        return (
          <Loading />
        )
      }
      if (this.props.event.loading === false) {
        var event = this.props.event[0];
        var eventId = this.props.params.id;
        return (
          <div>
            <h1 className="text-center">{event.name}</h1>
            <Link to={"events/" + eventId + "/addticket"}>Add Tickets</Link>
            <Admission
              tickets={event.tickets}
              eventId={eventId}
              totalRevenue={event.totalRevenue}
              totalCount={event.totalCount}
              modifyTicket={this.modifyTicket.bind(this)}
              updateTicket={this.updateTicket.bind(this)}
              updateTotals={this.updateTotals.bind(this)}
              />
            {renderAdminFee()}
            <Expenses expenses={event.expenses} eventId={eventId}/>
            <Cashbox cash={event.cash} endingCash={event.endingCash} net={event.net}/>
          </div>
        )
      }
    }

    return (
      <div>
        {renderEvent()}
      </div>
    )
  }
}
