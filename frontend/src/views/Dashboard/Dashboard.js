import React, { Component } from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';    
import Modal from 'react-responsive-modal';
import 'react-responsive-modal/lib/react-responsive-modal.css';   
import Autosuggest from 'react-autosuggest';
import { dashboard, keywords, google, yahoo, bing, ask, searchKey } from '../../redux/actions/dashboardAction';
import { register, login } from '../../redux/actions/authAction';

const getSuggestionValue = suggestion => suggestion.search_keyword;
const renderSuggestion = suggestion => (
  <div>
    {suggestion.search_keyword}
  </div>
);

const mapStateToProps = (state) => {
  return {
    keywordsResult: state.dashboardReducer.keywords,
    dashboardResult: state.dashboardReducer.dashboard,
	googleResult: state.dashboardReducer.google,
	yahooResult: state.dashboardReducer.yahoo,
	bingResult: state.dashboardReducer.bing,
	askResult: state.dashboardReducer.ask,
	searchResult: state.dashboardReducer.searchKey,
	auth: state.authReducer.auth
  }
}

const mapDispatchToProps = (dispatch) => {
  return {  
    dashboard: (wel)=>{
      dispatch(dashboard(wel))
    },
    keywords: ()=>{
      dispatch(keywords())
    },
	 google: (keyword, adv, file)=>{
      dispatch(google(keyword, adv, file))
    },
	 yahoo: (keyword, adv, file)=>{
      dispatch(yahoo(keyword, adv, file))
    },
	bing: (keyword, adv, file)=>{
      dispatch(bing(keyword, adv, file))
    },
	ask: (keyword, adv, file)=>{
      dispatch(ask(keyword, adv, file))
    },
    searchKey: (search, authId)=>{
      dispatch(searchKey(search, authId))
    },
	register: (formData)=>{
      dispatch(register(formData))
    },
	login: (username, password)=>{
      dispatch(login(username, password))
    }
  } 
}

const Dashboard = class Dashboard extends Component {
  constructor(props){
    super(props);
    this.state = {
      welcome : '',
	  keyword : '',
	  google : '',
	  yahoo : '',
	  bing: '',
	  ask : '',
	  matchesLinks : '',
	  searchKeyword : '',
	  searchKeywordErr :'',
	  searchFlag : false,
	  advanceSearch : false,
	  fileType : '',
	  open: false,
	  loginForm: false,
	  firstName:'',
	  firstNameErr : '',
	  lastName:'',
	  lastNameErr:'',
	  email : '',
	  emailErr : '',
	  password :'',
	  passwordErr :'',
	  confirmPassword:'',
	  confirmPasswordErr:'',
	  authUsername: localStorage.getItem('authEmail'),
	  authEmail : localStorage.getItem('authUsername'),
	  authId : localStorage.getItem('authId'),
	  value: '',
      suggestions: [],
      keywords : []
    }
	this.searchForm = this.searchForm.bind(this);
	this.loginSubmit = this.loginSubmit.bind(this);
	this.registerSubmit = this.registerSubmit.bind(this);
	this.logout = this.logout.bind(this);
  }

  searchForm(event){
	  event.preventDefault();  
	  console.log(this.state.searchKeyword)  
	  if(this.state.searchKeyword !==""){
	  	this.setState({searchFlag : true, matchesLinks : '', searchKeywordErr:''})
		this.props.google(this.state.searchKeyword, this.state.advanceSearch, this.state.fileType);
		this.props.yahoo(this.state.searchKeyword, this.state.advanceSearch, this.state.fileType);
		this.props.bing(this.state.searchKeyword, this.state.advanceSearch, this.state.fileType);
		this.props.ask(this.state.searchKeyword, this.state.advanceSearch, this.state.fileType);
		this.props.searchKey(this.state.searchKeyword, this.state.authId);
	}else{
		 this.setState({searchKeywordErr : 'Search your keyword'});	
	}	
  }

  loginSubmit(event){
  	event.preventDefault();       
  	var validation = false;
	if (this.state.email === ""){
		this.setState({emailErr : 'Email Required'});
		validation = false;
	}
	else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.state.email)){
		this.setState({emailErr : 'You have entered an invalid email address!'});
		validation = false;
	}else{
		this.setState({emailErr : ''});
		validation = true;
	}
	if(this.state.password === ""){
		this.setState({passwordErr : 'Password Required'});
		validation = false;
	}
	else{
		this.setState({passwordErr : ''});
		validation = true;
	}
	if(validation){			
	    this.props.login(this.state.email, this.state.password);
	}
  }

  registerSubmit(event){
	event.preventDefault();
	var validation = false;
	if(this.state.firstName === ""){
		this.setState({firstNameErr : 'First name Required'});
		validation = false;
	}
	else{
		this.setState({firstNameErr : ''});
		validation = true;	
	}
	if(this.state.lastName === ""){
		this.setState({lastNameErr : 'last name Required'});
		validation = false;
	}else{
		this.setState({lastNameErr : ''});
		validation = true;
	}
	if (this.state.email === ""){
		this.setState({emailErr : 'Email Required'});
		validation = false;
	}
	else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.state.email)){
		this.setState({emailErr : 'You have entered an invalid email address!'});
		validation = false;
	}else{
		this.setState({emailErr : ''});
		validation = true;
	}
	if(this.state.password === ""){
		this.setState({passwordErr : 'Password Required'});
		validation = false;
	}
	else{
		this.setState({passwordErr : ''});
		validation = true;
	}
	if(this.state.confirmPassword === ""){
		this.setState({confirmPasswordErr : 'Confirm Password Required'});
		validation = false;
	}
	else{
		this.setState({confirmPasswordErr : ''});
		validation = true;
	}

	if(this.state.password !=="" && this.state.confirmPassword !==""){	
		if(this.state.password !== this.state.confirmPassword){	    
			this.setState({confirmPasswordErr : 'Password Not match'});
			validation = false;
		}else{
			validation = true;
		}
	}
	if(validation){		
		this.props.register(this.state);
	}  
  }

  logout(){
	  localStorage.clear();
	  this.setState({authUsername:null, authEmail:null, authId:null, email:'', password:''})
  }

  componentDidMount(){
   this.props.dashboard('Welcome');
   this.props.keywords();
  }

  componentWillReceiveProps(nextprops){ 
	 if(nextprops.auth.authdicated){
		 console.log('comes')
		var userName =  nextprops.auth.user.first_name +' '+ nextprops.auth.user.last_name;
		 this.setState({
		 	authUsername: userName, 
		 	authEmail:  nextprops.auth.user.email,
		 	authId:  nextprops.auth.user.id,
		 	 open: false},
		 ()=>{
			 localStorage.setItem('authUsername', this.state.authUsername);
			 localStorage.setItem('authEmail', this.state.authEmail);
			 localStorage.setItem('authId', this.state.authId);			 
			 })
	 }

	 if(nextprops.keywordsResult){	 	
	 	this.setState({keywords : nextprops.keywordsResult})
	 }
	 
     var yahooRes = "";
     var askRes = "";
     var bingRes = "";
     console.log(nextprops)
     if(nextprops.yahooResult){
     	yahooRes = nextprops.yahooResult;
     		console.log('if yahoo')
     }else{
     	console.log('else yahoo')
     	yahooRes = nextprops.googleResult
     }
     if(nextprops.bingResult){     	
     	bingRes = nextprops.bingResult
     	console.log('if bing')
     }else{
     	console.log('else bing')
     	bingRes = nextprops.googleResult
     }
     if(nextprops.askResult){
     	askRes = nextprops.askResult
     	console.log('if askRes')
     }else{
     	console.log('else askRes')
     	askRes = nextprops.googleResult
     }
		this.setState({
		  welcome: nextprops.dashboardResult,
		  google : nextprops.googleResult,
		  yahoo : yahooRes,
		  bing : bingRes,
		  ask : askRes
		},()=>{
			  if(this.state.google !== "" && this.state.yahoo !== ""){
				var googleLinks = this.state.google.links;
				var yahooLinks = this.state.yahoo.links;
				//var bingLinks = this.state.bing.links;
				//var askLinks = this.state.ask.links;
				   var matchLinks = _.intersectionWith(googleLinks, yahooLinks, _.isEqual);
					this.setState({matchesLinks : matchLinks})
			  }
			})
  }

//Popup 
onOpenModal = () => {
    this.setState({ open: true, loginForm : true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  //Input box auto fill 
  onSuggestionsChange = (event, { newValue }) => {
    this.setState({
      value: newValue,
      searchKeyword: newValue
    });
  };

   getSuggestions = value => {
   var inputValue = value.trim().toLowerCase();
   var inputLength = inputValue.length;
	  return inputLength === 0 ? [] : this.state.keywords.filter(key =>
	    key.search_keyword.toLowerCase().slice(0, inputLength) === inputValue
	  );
	};
 
  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this.getSuggestions(value)
    });
  }; 
  
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  
  render() {
	
	   const { open, loginForm, authEmail, firstNameErr, lastNameErr, emailErr, passwordErr,
	   	confirmPasswordErr, searchKeywordErr, value, suggestions
	    } = this.state;

    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: 'Search keywords',
      value,
      onChange: this.onSuggestionsChange
    };
 
    return (      
        <div className="container-fulid margin-t-10">
			<div className="row">
			  <div className="col-md-2">
			       <h5 className="heading">{this.state.welcome} </h5> 
			  </div>
			  <div className="col-md-6">
			       <form onSubmit={this.searchForm} method="post">
				   <div className="form-group">
				      <div className="form-row">
				         <div className="col-md-8">
				            <Autosuggest
				               suggestions={suggestions}
				               onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
				               onSuggestionsClearRequested={this.onSuggestionsClearRequested}
				               getSuggestionValue={getSuggestionValue}
				               renderSuggestion={renderSuggestion}
				               inputProps={inputProps}		      
				               />
				            {searchKeywordErr !=="" ? <span className="validation-error">{searchKeywordErr}</span> :null}
				         </div>
				         <div className="col-md-4">
				            <button type="submit" className="btn btn-primary btn-sm" name="search">Search</button>
				         </div>
				      </div>
				   </div>
				   <div className="form-row">
				      <div className="col-md-3"><span className="mar-right-10">Advance Search</span>
				         <input type="checkbox" name="vehicle" value="true"
				            onChange={(e)=>{					
				         this.setState({advanceSearch : e.target.checked})
				         }}/>
				      </div>
				      <div className="col-md-2 ">
				         {this.state.advanceSearch ? (
				         <select className="form-control" onChange={(e)=>
				            {				
				            this.setState({fileType : e.target.value})
				            }}>
				            <option value="">File Types</option>
				            <option value="pdf">PDF</option>
				            <option value="word">Word</option>
				            <option value="txt">Txt</option>
				            <option value="excel">Excel</option>
				         </select>
				         ):null}
				      </div>
				   </div>
				</form>
			  </div>

			  <div className="col-md-4 text-right">
			  	{authEmail === null ? (
		 			<button onClick={this.onOpenModal} className="btn btn-success  btn-sm mar-right-10">login</button>
				):(<div className="user-info ">
					<span className="mar-right-10">{authEmail}</span>
					<a  href="javascript:void(0);"onClick={this.logout}>log out</a>
				</div>
				)}
			  </div>
			</div>

			{ this.state.searchFlag ? (
			<div className="container">
			<div className="row search-engine">
			<div className="col-md-12 top-result ">
			<h6>Top ranking websites</h6>
			<div className="box">
			{  this.state.matchesLinks !== '' ? (
				this.state.matchesLinks.map((matchLinks, i)=>{
				    return(<span  key={i}><strong>Rank: {i+1}</strong> <a href={matchLinks}> {matchLinks}</a><br /></span>)
				})	
				):(<span>Waiting...</span>)
			}
			</div>
			</div>	
			<div className="col-md-12 google">
			<img src="assets/img/google.png" alt="google" title="google" />
			{  this.state.google !== '' ? (
				this.state.google.links.map((googlelinks, i)=>{
				    return(<div  key={i}><a href={googlelinks}> {googlelinks}</a><br /></div>)
				})	
				):(<div>your search keyword is loading...</div>)
			}
			</div>
			<div className=" col-md-12 yahoo">  
			<img src="assets/img/yahoo.png" alt="yahoo" title="yahoo" />
			{  this.state.yahoo !== '' ? (
				this.state.yahoo.links.map((yahoolinks, i)=>{
				    return(<div key={i}><a href={yahoolinks}> {yahoolinks}</a><br /></div>)
				})	
				):(<div>your search keyword is loading...</div>)
			}
			</div>
			<div className="col-md-12 bing">  
			<img src="assets/img/bing.png" alt="bing" title="bing" />
			{  this.state.bing !== '' ? (
				this.state.bing.links.map((binglinks, i)=>{
				    return(<div key={i}><a href={binglinks}> {binglinks}</a><br /></div>)
				})	
				):(<div>your search keyword is loading...</div>)
			}
			</div>
			<div className="col-md-12 ask">      
			<img src="assets/img/ask.png" alt="Ask" title="Ask" />
			{  this.state.ask!== '' ? (
				this.state.ask.links.map((asklinks, i)=>{
				    return(<div key={i}><a href={asklinks}> {asklinks}</a><br /></div>)
				})	
				):(<div>your search keyword is loading...</div>)
			}
			</div>
		  </div></div>):null}	
		<div className="popup-model">
			<Modal open={open} onClose={this.onCloseModal} >
			{loginForm ?(
			<div className="login form">
			  <h3>Login</h3>
			  <form  onSubmit={this.loginSubmit} method="post">
				<div className="form-group">
					<div className="form-row">
						<div className="col-md-12">
							<input type="text" className="form-control mar-bottom" placeholder="Email" 
							onChange={(e)=>{
							this.setState({email : e.target.value})
							}}
							/>
							{emailErr !=="" ? <span className="validation-error">{emailErr}</span> :null}
						</div>	
					</div>
					<div className="form-row">
						<div className="col-md-12">
							<input type="password" className="form-control mar-bottom" placeholder="password" 
							onChange={(e)=>{
							this.setState({password : e.target.value})
							}}
							/>							
							{passwordErr !=="" ? <span className="validation-error">{passwordErr}</span> :null}
						</div>	
					</div>
					<div className="form-row">
						<div className="col-md-12 text-center">
						<button type="submit" className="btn btn-primary btn-sm margin-t-10 float-l" name="login">Login</button>
						<div className="float-r">
						<a href="javascript:void(0);"
						onClick={()=>{
							this.setState({loginForm : false})
							}}>Register</a>
							</div>
						</div>
					</div>
				</div>
			  </form>
			  </div> ):(
			  <div className="register form">
			  <h3>Register</h3>
			  <form  onSubmit={this.registerSubmit} method="post">
				<div className="form-group">
				<div className="form-row">
						<div className="col-md-6">
							<input type="text" className="form-control mar-bottom" placeholder="First name" 
							onChange={(e)=>{
							this.setState({firstName : e.target.value})
							}}
							/>							
							{firstNameErr !=="" ? <span className="validation-error">{firstNameErr}</span> :null}
						</div>
						<div className="col-md-6">
							<input type="text" className="form-control mar-bottom" placeholder="Last name" 
							onChange={(e)=>{
							this.setState({lastName : e.target.value})
							}}
							/>
							{lastNameErr !=="" ? <span className="validation-error">{lastNameErr}</span> :null}
						</div>	
					</div>
					<div className="form-row">
						<div className="col-md-12">
							<input type="text" className="form-control mar-bottom" placeholder="Email" 
							onChange={(e)=>{
							this.setState({email : e.target.value})
							}}
							/>
							{emailErr !=="" ? <span className="validation-error">{emailErr}</span> :null}
						</div>	
					</div>
					<div className="form-row">
						<div className="col-md-6">
							<input type="password" className="form-control mar-bottom" placeholder="password" 
							onChange={(e)=>{
							this.setState({password : e.target.value})
							}}
							/>
							{passwordErr !=="" ? <span className="validation-error">{passwordErr}</span> :null}
						</div>
						<div className="col-md-6">
							<input type="password" className="form-control mar-bottom" placeholder="confirmPassword" 
							onChange={(e)=>{
							this.setState({confirmPassword : e.target.value})
							}}
							/>
							{confirmPasswordErr !=="" ? <span className="validation-error">{confirmPasswordErr}</span> :null}
						</div>	
					</div>
					<div className="form-row">
						<div className="col-md-12">
						<div className="float-r">
						<a href="javascript:void(0)" onClick={()=>{
							this.setState({loginForm : true})
							}}>Login</a>

						</div>

						<button  type="submit" className="btn btn-primary btn-sm float-l" name="register">Register</button>
						</div>
					</div>
				</div>
			  </form>
			  </div>
			  )}
			</Modal>
		  </div> 
        </div>    
      )
  }
}

const DashboardConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard)

export default DashboardConnected
