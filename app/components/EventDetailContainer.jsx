import EventDetail from 'EventDetail';
import { connect } from 'react-redux';

export default connect(store => ({
    event: store.event,
}))(EventDetail);
