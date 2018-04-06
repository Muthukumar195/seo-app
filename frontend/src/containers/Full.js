import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Dashboard from '../views/Dashboard/Dashboard';
import Profile from '../views/Profile/Profile';
class Full extends Component {
  render() { 
    return (
      <div className="app"> 
          <main>
            <Switch>   
              <Route exact path="/dashboard" component={Dashboard} />
			  <Route exact path="/profile" component={Profile} />
              <Redirect from="/" to="/dashboard"/>    
            </Switch> 
          </main> 
      </div>
    );
  }
}

export default Full;
