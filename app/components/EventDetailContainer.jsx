import EventDetail from 'EventDetail';
import { connect } from 'react-redux';

const Connector = connect(store => ({event: store.event}))(EventDetail)

export default Connector;
