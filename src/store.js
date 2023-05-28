import { createStore } from 'redux';
import userReducer from './reducer/user.reducer';

const store = createStore(userReducer);

export default store;