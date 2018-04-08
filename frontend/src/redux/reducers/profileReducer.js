import RC from '../constants';

const initialState = {
    history: [],  
  }

  export default function profileReducer(state = initialState, action) {
    switch (action.type) {
      case RC.SEARCH_HISTORY:
        return {
          ...state,
          status: action.status,
          history: action.result
        }
      default:
        return state
      }
  }