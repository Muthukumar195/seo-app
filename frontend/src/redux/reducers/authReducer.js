import RC from '../constants';

const initialState = {
    auth: [],
  }

  export default function authReducer(state = initialState, action) {
    switch (action.type) {
      case RC.REGISTER:
        return {
          ...state,
          status: action.status,
          auth: action.result
        }
	case RC.LOGIN:
        return {
          ...state,
          status: action.status,
          user: action.result
        }
      default:
        return state
      }
  }