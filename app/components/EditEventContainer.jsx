import EditEvent from 'EditEvent';
import { connect } from 'react-redux';

export default connect(store => ({
    event: store.event,
}))(EditEvent);
