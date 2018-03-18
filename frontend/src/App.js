import React, { Component } from 'react';
import { BrowserRouter, Route , Switch } from 'react-router-dom';
import Full from './containers/Full';
class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      
    }  
  }
  

  render() {
    return (
      <div>       
		<BrowserRouter>
		  <Switch>    
			<Route path="/" component={Full} /> 
		  </Switch>
		</BrowserRouter> 
      </div>
    );
  }
}

export default App;
