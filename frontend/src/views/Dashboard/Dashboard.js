import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Link } from "react-router-dom";
import _ from 'lodash';    
import Modal from 'react-responsive-modal';
import 'react-responsive-modal/lib/react-responsive-modal.css';   
import Autosuggest from 'react-autosuggest';
import { dashboard, keywords, google, yahoo, bing, ask, searchKey, imageSearch } from '../../redux/actions/dashboardAction';
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
	imageResult: state.dashboardReducer.imageSearch,
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
	 google: (keyword, file)=>{
      dispatch(google(keyword, file))
    },
	 yahoo: (keyword,  file)=>{
      dispatch(yahoo(keyword, file))
    },
	bing: (keyword, file)=>{
      dispatch(bing(keyword, file))
    },
	ask: (keyword, file)=>{
      dispatch(ask(keyword, file))
    },
    searchKey: (search, authId)=>{
      dispatch(searchKey(search, authId))
    },
    imageSearch: (search)=>{
      dispatch(imageSearch(search))
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
      keywords : [],
      images:[],
      showImage:false
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
		this.props.google(this.state.searchKeyword, this.state.fileType);
		this.props.yahoo(this.state.searchKeyword, this.state.fileType);
		this.props.bing(this.state.searchKeyword, this.state.fileType);
		this.props.ask(this.state.searchKeyword, this.state.fileType);
		this.props.searchKey(this.state.searchKeyword, this.state.authId);
		this.props.imageSearch(this.state.searchKeyword);
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
  	console.log('imagwes', nextprops.imageResult)
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
     var yahooResType = false;
     var askResType = false;
     var bingResType = false;     
     console.log(nextprops)
     if(nextprops.yahooResult){
     	yahooRes = nextprops.yahooResult;
     	yahooResType = true;
     }else{     
     	yahooRes = nextprops.googleResult
     }
     if(!_.isEmpty(nextprops.bingResult)){     	
     	bingRes = nextprops.bingResult
     	bingResType = true;
     }else{     
     	bingRes = nextprops.googleResult
     }
     if(!_.isEmpty(nextprops.askResult.links)){
     	askRes = nextprops.askResult
     	askResType = true;
     }else{
     	askRes = nextprops.googleResult
     }
      bingRes = _.uniq(bingRes.links);
		this.setState({
		  welcome: nextprops.dashboardResult,
		  google : nextprops.googleResult,
		  yahoo : yahooRes,
		  bing : bingRes,
		  ask : askRes,
		  images : nextprops.imageResult
		},()=>{
			  if(this.state.google !== "" && this.state.yahoo !== ""){
				var googleLinks = this.state.google.links;
				var yahooLinks = this.state.yahoo.links;
				//var bingLinks = this.state.bing.links;
				//var askLinks = this.state.ask.links;
				   var matchLinks = _.intersectionWith(googleLinks, yahooLinks, _.isEqual);
				   console.log(matchLinks.length,'ssssssssssssssssss')
				   if(_.isEmpty(matchLinks) || matchLinks.length <= 2){
				        var matches = [];

				   		// var	googleSuffle =  _.shuffle(googleLinks)
				   		var	googleSuffle = googleLinks;
				   		for(var i= 0; googleSuffle < 10; i++){
				   			console.log(googleSuffle);  
				   			matches.push(googleSuffle[i]);
				   		}
				   		console.log(matches)
				   		matchLinks = matches;
				   }
				 
				   		var googleMatch, googleMatchCnt, yahooMatch, yahooMatchCnt;
				         googleMatch = _.intersectionWith(matchLinks, googleLinks, _.isEqual);
						 googleMatchCnt = googleMatch.length;
						 yahooMatch = _.intersectionWith(matchLinks, yahooLinks, _.isEqual);
						 yahooMatchCnt = yahooMatch.length;
						
					
						var googlePrecision = ((matchLinks.length /  googleMatchCnt) * 100);
						console.log(googlePrecision)

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
	   	confirmPasswordErr, searchKeywordErr, value, suggestions, images
	    } = this.state;
	 

    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: 'Search keywords',
      value,
      onChange: this.onSuggestionsChange
    };
 
    return (      
        <div>		
		<div className="popup-model">
			<Modal open={open} onClose={this.onCloseModal} >
			{loginForm ?(
			<div className="login form">
			  <h5>Login</h5>
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
			  <h5>Register</h5>
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
	  <div class="support-bar-top" id="raindrops-green">
        <div class="container">
            <div class="row">
                <div class="col-md-6">
                  <div class="contact-info">
                
                  </div>
                </div>
                <div class="col-md-6 text-right">
                    <div class="contact-admin">
						{authEmail === null ? (
							 <a onClick={this.onOpenModal} class="pointer" ><i class="fa fa-user"></i> Login</a>
						):(
							<div className="user-info ">
							<span className="profile-name">{authEmail}</span>
							<Link to="/profile">My Profile</Link>
							<a  href="javascript:void(0);"onClick={this.logout}>log out</a>
							</div>
						)}
                      <a class="pointer" onClick={()=>{                         
							this.setState({ open: true, loginForm : false})
							}} ><i class="fa fa-user-plus"></i> Registration</a>
                     
                    </div>
                </div>
            </div>
        </div>
    </div>
   <section id="particles-js" class="header-area">
      <div id="carousel-example-generic" class="carousel slide" data-ride="carousel">
             
                <ol class="carousel-indicators">
                    <li data-target="#carousel-example-generic" data-slide-to="0" class="active"></li>                  
                </ol>
             

                 <div class="carousel-inner" role="listbox">
                    <div class="item active carousel-thumb1">
                       <div class="container">
                           <div class="row">
                               <div class="col-md-8 col-md-offset-2 text-center">
                                   <div class="header-section-wrapper">
                                       <div class="header-section-top-part">
                                           <h5>BEST PRIVATE SEARCH</h5>
                                           <h1>WEB SEARCH ENGINE</h1>
                                           <p>
The results of a search for the term "lunar eclipse" in a web-based image search engine
A 'web search engine' is a software system that is designed to search for information on the World Wide Web.</p>
                                       </div>
                                       <div class="header-section-bottom-part">
                                           <div class="domain-search-from">
                                               <form onSubmit={this.searchForm} method="post">
                                                <Autosuggest
									               suggestions={suggestions}
									               onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
									               onSuggestionsClearRequested={this.onSuggestionsClearRequested}
									               getSuggestionValue={getSuggestionValue}
									               renderSuggestion={renderSuggestion}
									               inputProps={inputProps}		      
									               />
									            {searchKeywordErr !=="" ? <span className="validation-error">{searchKeywordErr}</span> :null}
                                                   <select onChange={(e)=>
											            {				
											            this.setState({fileType : e.target.value})
											            }}>
											            <option value="0">File Types</option>
											            <option value="pdf">PDF</option>
											            <option value="word">Word</option>
											            <option value="txt">Txt</option>
											            <option value="excel">Excel</option>
											         </select>  
                                                   <input type="submit" name="search" value="Search" />
                                               </form>
                                           </div>
                                           <div class="domain-rate-wrapper">			
                                              <div class="single-domain-rate-circle">
                                                   <p onClick={()=>{this.setState({searchFlag:true, showImage:false})}}> All</p>
                                               </div>
                                               <div class="single-domain-rate-circle">
                                                   <p onClick={()=>{this.setState({searchFlag:false, showImage:true})}} >Image </p>
                                               </div>                                             
                                           </div>
                                       </div>
                                   </div>
                               </div>
                           </div>
                       </div>
                    </div>
                  </div>
      </div>
   </section>
  

  <div class="clearfix"></div>

  
  <div class="admin-section" id="raindrops">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
       
          <div class="admin-content">
         
            <div class="admin-text">
              <h2>Get All Browser Result</h2>
            </div>
          
            <div class="admin-user">
            {authEmail === null ? (
              <button name="login" onClick={this.onOpenModal}>sign in</button>
              ):null}
              <button name="register"  onClick={()=>{                         
							this.setState({ open: true, loginForm : false})
							}}>register now</button>
            </div>
       
          </div>
        
        </div>
      </div>
    </div>
  </div>
  <div class="clearfix"></div>
  { this.state.searchFlag ? (
   <section id="service" class="services-section section-padding section-background">
    <div class="container">
      <div class="row">
        <div class="col-md-12">        
          <div class="section-header">
            <h2>Top <span>Ranking</span></h2>
            <p><img src="assets/img/icon.png" alt="icon" /></p>
          </div>      
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">     
          <div class="service-content">
         	{  this.state.matchesLinks !== '' ? (
				this.state.matchesLinks.map((matchLinks, i)=>{
				    return(<span  key={i}><strong>Rank: {i+1}</strong> <a href={matchLinks}> {matchLinks}</a><br /></span>)
				})	
				):(<span>Waiting...</span>)
			}           
          </div>        
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-md-12">
        
          <div class="section-header">
            <h2>Google <span>Result</span></h2>
            <p><img src="assets/img/icon.png" alt="icon" /></p>
          </div>
      
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
     
          <div class="service-content">
         	{  this.state.google !== '' ? (
				this.state.google.links.map((googlelinks, i)=>{
				    return(<div  key={i}><a href={googlelinks}> {googlelinks}</a><br /></div>)
				})	
				):(<div>your search keyword is loading...</div>)
			}           
          </div>
        
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-md-12">
        
          <div class="section-header">
            <h2>Yahoo <span>Result</span></h2>
            <p><img src="assets/img/icon.png" alt="icon" /></p>
          </div>
      
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
     
          <div class="service-content">
         	{  this.state.yahoo !== '' ? (
				this.state.yahoo.links.map((yahoolinks, i)=>{
				    return(<div key={i}><a href={yahoolinks}> {yahoolinks}</a><br /></div>)
				})	
				):(<div>your search keyword is loading...</div>)
			}           
          </div>
        
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-md-12">
        
          <div class="section-header">
            <h2>Bing <span>Result</span></h2>
            <p><img src="assets/img/icon.png" alt="icon" /></p>
          </div>
      
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
     
          <div class="service-content">
         	{  this.state.bing !== '' ? (		
				this.state.bing.map((binglinks, i)=>{
				    return(<div key={i}><a href={binglinks}> {binglinks}</a><br /></div>)
				})	
				):(<div>your search keyword is loading...</div>)
			}
           
          </div>
        
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-md-12">
        
          <div class="section-header">
            <h2>Ask <span>Result</span></h2>
            <p><img src="assets/img/icon.png" alt="icon" /></p>
          </div>
      
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
     
          <div class="service-content">
         	{  this.state.ask!== '' ? (
				this.state.ask.links.map((asklinks, i)=>{
				    return(<div key={i}><a href={asklinks}> {asklinks}</a><br /></div>)
				})	
				):(<div>your search keyword is loading...</div>)
			}
           
          </div>
        
        </div>
      </div>
    </div>
<div class="clearfix"></div>
  </section>):null}

	{this.state.showImage ? (
		 <div id="portfolio" class="gallery section-padding section-background">
   <div class="container">
      <div class="row">
         <div class="col-md-12">
            <div class="section-header">
               <h2>Result <span>Images</span></h2>
               <p><img src="assets/img/icon.png" alt="icon"/></p>
            </div>
         </div>
      </div>
      <div class="row">
     	{  !_.isEmpty(images) ? (
     			images.map((img, i)=>{
				return(<div class=" col-md-4"  key={i}>
			            <div class="single-isotope">
			               <div class="layer"></div>
			               <div class="isotope-social">
			                  <a href={img.thumb_url} data-rel="lightcase"><i class="fa fa-search" aria-hidden="true"></i></a>
			                  <a href="#"><i class="fa fa-link" aria-hidden="true"></i></a>
			               </div>
			               <img src={img.thumb_url} alt="gallery"  width={img.thumb_width} height={img.thumb_height}/>
			            </div>
			         </div>
				
					)
				})
     		):null       		
     		
		}
      </div>
   </div>
</div>
		):null}


   <div class="clearfix"></div>

        </div>    
      )
  }
}

const DashboardConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard)

export default DashboardConnected
