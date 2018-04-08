import RC from '../constants';
import config from '../config';
import axios from 'axios';
const PORT = config.serverUrl;
  


export function searchHistoryStatus(status, result='', error){  
    return {
        type : RC.SEARCH_HISTORY,
        status,
        result,
        error
    }
}

export const  searchHistory =  (userId)=>{   
    return (dispatch)=>{
        dispatch(searchHistoryStatus("LOADING")); 
        axios({  
            method: 'GET',
            url: `${PORT}/api/searchHistory?id=${userId}`
          })
        .then((response)=> {
           dispatch(searchHistoryStatus("SUCCESS", response.data))
        })
        .catch((error)=> {
          console.log(error);
        });
    }

}


