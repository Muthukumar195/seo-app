import RC from '../constants';

const initialState = {
  dashboard: [],
	google : '',
	yahoo : '',
	bing : '',
	ask :'',
  searchKey:'',
  keywords:[]
  }

  export default function dashboardReducer(state = initialState, action) {
    switch (action.type) {
      case RC.DASHBOARD:
        return {
          ...state,
          status: action.status,
          dashboard: action.result
        }
    case RC.KEYWORDS:
        return {
          ...state,
          status: action.status,
          keywords: action.result
        }
	   case RC.GOOGLE:
        return {
          ...state,
          status: action.status,
          google: action.result
        }
	 case RC.YAHOO:
        return {
          ...state,
          status: action.status,
          yahoo: action.result
        }
	case RC.BING:
        return {
          ...state,
          status: action.status,
          bing: action.result
        }
	case RC.ASK:
        return {
          ...state,
          status: action.status,
          ask: action.result
        }  
      default:
        return state
      }
  }