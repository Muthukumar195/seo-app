import React, { Component } from 'react';
import { BrowserRouter as Router, Link } from "react-router-dom";
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
    <div>     
      <div class="support-bar-top" id="raindrops-green">
        <div class="container">
            <div class="row">
                <div class="col-md-6">
                  <div class="contact-info">
                    <ul>
                      <li><a href="#"> <i class="fa fa-envelope email" aria-hidden="true"></i> daffodillsindia@gmail.com </a></li>
                      <li><i class="fa fa-phone" aria-hidden="true"></i> 0422 240 6649</li>
                    </ul>
                    
                      
                  </div>
                </div>
                <div class="col-md-6 text-right">
                    <div class="contact-admin">
                    <Link to="/dashboard" >Back</Link>
                     <p> My Activity</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <section class="selected-section domain-list-section section-padding">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
        {this.state.history.map((his, index)=>{
                 return(
                    <div class="selected-list" key={index}>
                      <div class="selected-list-name">
                        <h5>{his.search_keyword}</h5>
                      </div>
                      <div class="selected-list-cart">
                        <p>{moment(his.created_at).format('DD-MM-YYYY hh:mm A')}</p>
                      </div>
                  </div>
                  ) 
              })}
          </div>
        </div>
      </div>
   
  </section>

     
      </div>    
    )
  }
}

const ProfileConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile)

export default ProfileConnected;
