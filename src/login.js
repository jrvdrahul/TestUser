import React, { Component } from 'react';
import './App.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {NotificationContainer, NotificationManager} from 'react-notifications';

class App extends Component {
    

    constructor(props){
      super(props);

      var TOKEN =localStorage.getItem ('token');
      if(TOKEN){
        window.location.assign("/User");
      }

      this.state={
        name:'',
        password:''
      }
    }
    
    login(){


    if(!this.state.name || this.state.name===''){
    NotificationManager.error("Name Required", "Error", 5000, () => {
                      });
    }
    else if(!this.state.password || this.state.password===''){
    NotificationManager.error("Password Required", "Error", 5000, () => {
                      });
    }
    else{
      let user={
            userName:this.state.name, 
            password:this.state.password,   
        }
    
        axios.post(`https://api.prontoitlabs.com/api/v1/user/login`,user )
        .then(res => {
            var data=res.data.data.token;
            this.setState({id:data})
            localStorage.setItem ('token', data);
            window.location.assign('/User');
          
      })                                                                                                 
      .catch(error => 
        { 
          NotificationManager.error("Invalid username or password", "Error", 5000, () => {
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
      <h4>LOGIN</h4>
      
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
      
      <button className="btn btn-info btn-block my-4" type="submit" onClick={()=>this.login()} >Sign in</button>

      <p>Not a member?
          <li><Link to="/Signup">Signup</Link></li>
      </p>

      </div>

		  <NotificationContainer/>
    </div>
    );
  }
}

export default App;
