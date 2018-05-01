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
export function keywordsStatus(status, result='', error){  
    return {
        type : RC.KEYWORDS,
        status,
        result,
        error
    }
}

export const  keywords =  ()=>{
    return (dispatch)=>{
        dispatch(keywordsStatus("LOADING"));      
        axios({  
            method: 'GET',
            url: `${PORT}/api/keywords`,
          
          })
        .then((response)=> {      
           dispatch(keywordsStatus("SUCCESS", response.data))
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

export const  google =  (keyword, file)=>{

    return (dispatch)=>{
        dispatch(googleStatus("LOADING")); 
        var query = "";
        if(file !== ""){         
            query += "&FileType="+file;        
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

export const  yahoo =  (keyword, file)=>{
    return (dispatch)=>{
        dispatch(yahooStatus("LOADING")); 
         var query = "";       
           if(file !==""){
            query += "&FileType="+file;
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

export const  bing =  (keyword, file)=>{
    return (dispatch)=>{
        dispatch(bingStatus("LOADING")); 
         var query = "";      
           if(file !==""){
            query += "&FileType="+file;
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

export const  ask =  (keyword, file)=>{
    return (dispatch)=>{
        dispatch(askStatus("LOADING"));
         var query = "";
      
           if(file !==""){
            query += "&FileType="+file;
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

export function searchKeyStatus(status, result='', error){  
    return {
        type : RC.SEARCH_KEY,
        status,
        result,
        error
    }
}

export const  searchKey =  (search, authId)=>{
    return (dispatch)=>{
        dispatch(searchKeyStatus("LOADING")); 
        axios({  
            method: 'POST',
            url: `${PORT}/api/search`, 
      data: {
        searchKey: search,
        id: authId
        }     
          })
        .then((response)=> {
           dispatch(searchKeyStatus("SUCCESS", response.data))
        })
        .catch((error)=> {
          console.log(error);
        });
    }

}


export function imageSearchStatus(status, result='', error){  
    return {
        type : RC.IMAGE_SEARCH,
        status,
        result,
        error
    }
}

export const  imageSearch =  (search)=>{
    return (dispatch)=>{
        dispatch(imageSearchStatus("LOADING")); 
        axios({  
            method: 'POST',
            url: `${PORT}/api/imageSearch`, 
           data: {searchKey: search}     
          })
        .then((response)=> {
           dispatch(imageSearchStatus("SUCCESS", response.data))
        })
        .catch((error)=> {
          console.log(error);
        });
    }

}