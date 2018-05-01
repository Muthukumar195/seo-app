import React, { Component } from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import moment from 'moment'
import { searchHistory } from '../../redux/actions/profileAction';

const mapStateToProps = (state) => {
  return {
   histroyResult: state.profileReducer.history
  }
}

const mapDispatchToProps = (dispatch) => {
  return {  
    searchHistory: (wel)=>{
      dispatch(searchHistory(wel))
    }
  } 
}

const Profile = class Profile extends Component {
  constructor(props){
    super(props);
    this.state = {
      welcome : '',
	    authId : localStorage.getItem('authId'),
      history : [],
    }

  }

  componentDidMount(){
    console.log(moment());
   this.props.searchHistory(this.state.authId);
  }

  componentWillReceiveProps(nextprops){ 
    if(!_.isEmpty(nextprops.histroyResult)){	
      this.setState({history:nextprops.histroyResult});
    }
  }
  
render() {
    return (      
      <div className="container-fulid">
        <div className="row">
          <div className="col-md-2">
            <h5 className="heading">My Activity </h5>
              {this.state.history.map((his, index)=>{
                 return(
                    <div key={index}>
                     <p>{his.search_keyword}</p>
                     <p>{moment(his.created_at).format('DD-MM-YYYY HH:mm')}</p>
                    </div>
                  ) 
              })} 
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

export default ProfileConnected;
