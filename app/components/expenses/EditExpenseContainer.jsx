import EditExpense from 'expenses/EditExpense';
import { connect } from 'react-redux';

export default connect(store => ({
    expense: store.expense,
}))(EditExpense);
