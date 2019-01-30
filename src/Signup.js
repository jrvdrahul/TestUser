import React, { Component } from 'react';                                                        
import './App.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {NotificationContainer, NotificationManager} from 'react-notifications';

class App extends Component {
  
  constructor(props){
      super(props);
      this.state={
        name:'',
        password:'',
        gender:''
      }
    }  

  register(){

    if(!this.state.name || this.state.name===''){
    NotificationManager.error("Name Required", "Error", 5000, () => {
                      });
    }
    else if(!this.state.password || this.state.password===''){
    NotificationManager.error("Password Required", "Error", 5000, () => {
                      });
    }
    else if(!this.state.gender || this.state.gender===''){
    NotificationManager.error("Gender Required", "Error", 5000, () => {
                      });
    }
    else{

      let user={
        userName:this.state.name, 
        password:this.state.password,
        gender:this.state.gender 
    }

    axios.post(`https://api.prontoitlabs.com/api/v1/user`,user )
    .then(res => {
      
      var data=res.data.data.token;
            localStorage.setItem ('token', data);
            window.location.assign('/User');
     
  })
  .catch(error => 
    {
      
      NotificationManager.error("Signup failed", "Error", 5000, () => {
                      });
      this.setState({
      error,
      isLoading: false
      })


  });  
}

    
  }  
    
  render() {
    return (
      <div className="login">
    
        <div className="col-sm-8">
        <h4>Sign up</h4>

          <div className="form-group">
              <label htmlFor="usr">User Name:</label>
              <input type="text" className="form-control" id="usr" name="username" 
              onChange={(event)=>this.setState({name:event.target.value})}/>
            </div>
            
            <div className="form-group">
              <label htmlFor="pwd">Password:</label>
              <input type="password" className="form-control" id="pwd" name="password" 
              onChange={(event)=>this.setState({password:event.target.value})}/>
            </div>
            <div className="form-check-inline">
              <label className="form-check-label" htmlFor="radio1">
                <input type="radio" className="form-check-input" id="radio1" name="optradio" value="MALE" 
                onChange={(event)=>this.setState({gender:event.target.value})}/>Male
              </label>
            </div>
            <div className="form-check-inline">
              <label className="form-check-label" htmlFor="radio2">
                <input type="radio" className="form-check-input" id="radio2" name="optradio" value="FEMALE" 
                onChange={(event)=>this.setState({gender:event.target.value})}/>Female
              </label>
            </div>
            
          <button className="btn btn-info my-4 btn-block"  onClick={()=>this.register()}>Sign Up</button>


        	<br />
        	Already have account <li><Link to="/">Sign In</Link></li>
        	
          </div >
		  <NotificationContainer/>
      </div>
    );
  }
}

export default App;
