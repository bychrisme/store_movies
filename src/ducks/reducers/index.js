import { combineReducers } from 'redux';
import mainReducers from './mainReducers';

const allReducers = combineReducers({
    main: mainReducers,
});

export default allReducers;