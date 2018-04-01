import RC from '../constants';
import config from '../config';
import axios from 'axios';
const PORT = config.serverUrl;



export function registerStatus(status, result='', error){  
    return {
        type : RC.REGISTER,
        status,
        result,
        error
    }
}

export const  register =  (formData)=>{   
    return (dispatch)=>{
        dispatch(registerStatus("LOADING")); 
        axios({  
            method: 'POST',
            url: `${PORT}/api/auth/register`, 
			data: formData     
          })
        .then((response)=> {
           dispatch(registerStatus("SUCCESS", response.data))
        })
        .catch((error)=> {
          console.log(error);
        });
    }

}



export function loginStatus(status, result='', error){  
    return {
        type : RC.REGISTER,
        status,
        result,
        error
    }
}

export const  login =  (username, password)=>{
    return (dispatch)=>{
        dispatch(loginStatus("LOADING")); 
        axios({  
            method: 'POST',
            url: `${PORT}/api/auth/login`, 
			data: {
				username: username,
				password: password
			  }     
          })
        .then((response)=> {
           dispatch(loginStatus("SUCCESS", response.data))
        })
        .catch((error)=> {
          console.log(error);
        });
    }

}

