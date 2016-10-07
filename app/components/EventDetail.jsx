var React = require('react');
const Loading = require('react-loading-animation');
import { connect } from 'react-redux';
import {Link, IndexLink} from 'react-router';
import EventsAPI from 'EventsAPI';
import { fetchEventDetails, requestEvent, changeTicket } from "../actions/eventActions";
import Tickets from 'Tickets';
import AddTicket from 'AddTicket';
import Incomes from 'income/Incomes';
import Admission from 'Admission';
import Expenses from 'expenses/Expenses';
import Cashbox from 'Cashbox';

export default class EventDetail extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }
  updateTicket(eventId, typeId, newCount){
    this.props.dispatch(changeTicket(eventId, typeId, newCount));
  }
  componentDidMount() {
    var {id} = this.props.params;
    var that = this;
    this.props.dispatch(fetchEventDetails(id))
  }
  render() {
    var {loading} = this.props.event;
    var renderEvent = () => {
      if (loading === true) {
        return (
          <Loading />
        )
      }
      if (loading === false) {
        var event = this.props.event[0];
        var {name, tickets} = event;
        var {id} = this.props.params;
        return (
          <div>
            <h1 className="text-center">{name}</h1>
            <Link to={"events/" + id + "/addticket"}>Add Tickets</Link>
            <Admission tickets={tickets} eventId={id} updateTicket={this.updateTicket.bind(this)}/>
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
