import React, { Component } from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';    
import { dashboard, google, yahoo, bing, ask } from '../../redux/actions/dashboardAction'


const mapStateToProps = (state) => {
  return {
    dashboardResult: state.dashboardReducer.dashboard,
	googleResult: state.dashboardReducer.google,
	yahooResult: state.dashboardReducer.yahoo,
	bingResult: state.dashboardReducer.bing,
	askResult: state.dashboardReducer.ask,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {  
    dashboard: (wel)=>{
      dispatch(dashboard(wel))
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
	  searchFlag : false,
	  advanceSearch : false,
	  fileType : '',
    }
	this.searchForm = this.searchForm.bind(this);
  }
  searchForm(event){
	  event.preventDefault();
	  console.log(this.state.searchKeyword)
	this.setState({searchFlag : true, matchesLinks : ''})
	this.props.google(this.state.searchKeyword, this.state.advanceSearch, this.state.fileType);
	this.props.yahoo(this.state.searchKeyword, this.state.advanceSearch, this.state.fileType);
	this.props.bing(this.state.searchKeyword, this.state.advanceSearch, this.state.fileType);
	this.props.ask(this.state.searchKeyword, this.state.advanceSearch, this.state.fileType);
  }
  componentDidMount(){
   this.props.dashboard('Welcome');
   
 }
  componentWillReceiveProps(nextprops){
     console.log(nextprops)
     var yahooRes = "";
     var askRes = "";
     var bingRes = "";

     if(nextprops.yahooResult !== undefined && nextprops.yahooResult > 0){
     	yahooRes = nextprops.yahooResult
     }else{
     	yahooRes = nextprops.googleResult
     }
     if(nextprops.bingResult !== undefined && nextprops.bingResult > 0){
     	bingRes = nextprops.bingResult
     }else{
     	bingRes = nextprops.googleResult
     }
     if(nextprops.askResult !== undefined && nextprops.askResult > 0){
     	askRes = nextprops.askResult
     }else{
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
				
				console.log('matches links', matchLinks)
				this.setState({matchesLinks : matchLinks})
		}
		})
  }

  render() {
    return (      
        <div className="container">         
            <h1 className="heading">{this.state.welcome} </h1> 
			<form onSubmit={this.searchForm} method="post">
			<div className="form-group">
			 <div className="form-row">
			 <div className="col-md-3"></div>
              <div className="col-md-5">
			<input type="text" className="form-control" placeholder="Search your keywords" 
			onChange={(e)=>{
				this.setState({searchKeyword : e.target.value})
				}}
			/>
			</div>
			<div className="col-md-4">
			<button type="submit" className="btn btn-primary" name="search">Search</button>
				</div>
			  </div>
			</div>
			<div className="form-row">
			<div className="col-md-2 offset-md-3"><span className="mar-right-10">Advance Search</span>
			  <input type="checkbox" name="vehicle" value="true"
			   onChange={(e)=>{					
					this.setState({advanceSearch : e.target.checked})
				}}/>
			</div>
				<div className="col-md-2 ">
				{this.state.advanceSearch ? (
				<select className="form-control" onChange={(e)=>{				
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
			{ this.state.searchFlag ? (
			<div className="row search-engine">
			<div className="col-md-12 top-result ">
			<h2>Top ranking websites</h2>
			{  this.state.matchesLinks !== '' ? (
				this.state.matchesLinks.map((matchLinks, i)=>{
				    return(<span  key={i}><strong>Rank: {i+1}</strong> <a href={matchLinks}> {matchLinks}</a><br /></span>)
				})	
				):(<span>Waiting...</span>)
			}
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
		  </div>):null}	
        </div>    
      )
  }
}

const DashboardConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard)

export default DashboardConnected
