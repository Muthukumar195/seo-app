import RC from '../constants';
import config from '../config';
import axios from 'axios';
const PORT = config.serverUrl;


export function dashboardStatus(status, result='', error){  
    return {
        type : RC.DASHBOARD,
        status,
        result,
        error
    }
}

export const  dashboard =  (wel)=>{
    return (dispatch)=>{
        dispatch(dashboardStatus("LOADING"));      
        axios({  
            method: 'GET',
            url: `${PORT}/api/dashboard`,
          
          })
        .then((response)=> {
           dispatch(dashboardStatus("SUCCESS", response.data))
        })
        .catch((error)=> {
          console.log(error);
        });
    }

}
export function googleStatus(status, result='', error){  
    return {
        type : RC.GOOGLE,
        status,
        result,
        error
    }
}

export const  google =  (keyword, adv, file)=>{
    return (dispatch)=>{
        dispatch(googleStatus("LOADING")); 
        var query = "";
        if(adv){
           if(file !==""){
            query += "&FileType="+file;
           }  
        }     
        axios({  
            method: 'GET',
            url: `${PORT}/api/google?q=${keyword+query}`,      
          })
        .then((response)=> {
           dispatch(googleStatus("SUCCESS", response.data))
        })
        .catch((error)=> {
          console.log(error);
        });
    }

}

export function yahooStatus(status, result='', error){  
    return {
        type : RC.YAHOO,
        status,
        result,
        error
    }
}

export const  yahoo =  (keyword, adv, file)=>{
    return (dispatch)=>{
        dispatch(yahooStatus("LOADING")); 
         var query = "";
        if(adv){
           if(file !==""){
            query += "&FileType="+file;
           }  
        }       
        axios({  
            method: 'GET',
            url: `${PORT}/api/yahoo?q=${keyword+query}`,      
          })
        .then((response)=> {
			console.log(response)
           dispatch(yahooStatus("SUCCESS", response.data))
        })
        .catch((error)=> {
          console.log(error);
        });
    }

}

export function bingStatus(status, result='', error){  
    return {
        type : RC.BING,
        status,
        result,
        error
    }
}

export const  bing =  (keyword, adv, file)=>{
    return (dispatch)=>{
        dispatch(bingStatus("LOADING")); 
         var query = "";
        if(adv){
           if(file !==""){
            query += "&FileType="+file;
           }  
        }       
        axios({  
            method: 'GET',
            url: `${PORT}/api/bing?q=${keyword+query}`,      
          })
        .then((response)=> {
			console.log(response)
           dispatch(bingStatus("SUCCESS", response.data))
        })
        .catch((error)=> {
          console.log(error);
        });
    }

}

export function askStatus(status, result='', error){  
    return {
        type : RC.ASK,
        status,
        result,
        error
    }
}

export const  ask =  (keyword, adv, file)=>{
    return (dispatch)=>{
        dispatch(askStatus("LOADING"));
         var query = "";
        if(adv){
           if(file !==""){
            query += "&FileType="+file;
           }  
        }        
        axios({  
            method: 'GET',
            url: `${PORT}/api/ask?q=${keyword+query}`,      
          })
        .then((response)=> {
			console.log(response)
           dispatch(askStatus("SUCCESS", response.data))
        })
        .catch((error)=> {
          console.log(error);
        });
    }

}