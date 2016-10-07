import EventDetail from 'EventDetail.jsx';
import { connect } from 'react-redux';

export const EventDetailContainer = connect(store => ({
    event: store.event,
}))(EventDetail);
