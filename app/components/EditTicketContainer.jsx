import EditTicket from 'EditTicket';
import { connect } from 'react-redux';

export default connect(store => ({
    ticket: store.ticket,
}))(EditTicket);
