import React, { Component } from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import { dashboard } from '../../redux/actions/dashboardAction';


const mapStateToProps = (state) => {
  return {
    dashboardResult: state.dashboardReducer.dashboard
  }
}

const mapDispatchToProps = (dispatch) => {
  return {  
    dashboard: (wel)=>{
      dispatch(dashboard(wel))
    }
  } 
}

const Profile = class Profile extends Component {
  constructor(props){
    super(props);
    this.state = {
      welcome : '',
	  authId : localStorage.getItem('authId')
    }

  }




  componentDidMount(){
   this.props.dashboard('Welcome');
  }

  componentWillReceiveProps(nextprops){ 
	
  }
  
  render() {
	
 
    return (      
        <div className="container-fulid margin-t-10">
			<div className="row">
			  <div className="col-md-2">
			       <h5 className="heading">saasasas </h5> 
			  </div>
			</div>
        </div>    
      )
  }
}

const ProfileConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile)

export default ProfileConnected
