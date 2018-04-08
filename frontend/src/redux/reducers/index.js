import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import  dashboardReducer  from './dashboardReducer';
import  authReducer  from './authReducer';
import  profileReducer  from './profileReducer';
import { reducer as reduxFormReducer } from 'redux-form';




export default combineReducers({
  routing: routerReducer,
  dashboardReducer,
  authReducer, 
  profileReducer,
  form: reduxFormReducer
})
