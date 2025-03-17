import { combineReducers } from 'redux';

import posts from './posts';
import auth from './auth';  // Import auth reducer

export default combineReducers({
    posts,
    auth,  // Add auth reducer
});
