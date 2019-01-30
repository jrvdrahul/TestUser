import React, { Component } from 'react';
import './App.css';
import axios from 'axios';


class App extends Component {
    
    constructor(props){
      super(props);

      var TOKEN =localStorage.getItem ('token');
      if(!TOKEN){
        this.props.history.push("/");
      }
      
      this.state={
        user:[],
        pageNo:1,
        totalPages:''
      }
    }                  
    
    componentDidMount(){

    var TOKEN =localStorage.getItem ('token'); 
    if(!TOKEN){
      return false;
    }  
    var no=this.state.pageNo-1;   
                         
        axios.get(`https://api.prontoitlabs.com/api/v1/user?page=`+no+`&size=25`, { headers: { 'X-AUTH-TOKEN': TOKEN } }  )
        .then(res => {  
         
         var data=res.data.data;     
         this.setState({
           user:data.content,
           totalPages:data.totalPages 
         })                                   
      })
      .catch(error =>              
        {
    
          this.setState({
          error,
          isLoading: false
          })
      });
      }           
      
      
      logout(){
        localStorage.removeItem ('token');
        
        this.props.history.push("/");
      }
  
      enter(){ 
        
         var no=this.state.pageNo-1;   
                         
        axios.get(`https://api.prontoitlabs.com/api/v1/user?page=`+no+`&size=25`, { headers: { 'X-AUTH-TOKEN': 'abcdefghi' } }  )
        .then(res => {  
         
         var data=res.data.data;     
         this.setState({
           user:data.content,
           totalPages:data.totalPages 
         })                                   
      })
      .catch(error =>              
        {
    
          this.setState({
          error,
          isLoading: false
          })
      });
         
      }
	
  render() {
    return (
      <div>

      <div className="row top-bar">
        <div className="col-sm-3">
          User List
        </div>
        
        <div className="col-sm-6 row">
            <div className="col-sm-2">Page</div>
            <div className="col-sm-3"><input type="number" className="form-control" placeholder="page no" value={this.state.pageNo}
            onChange={(event)=>this.setState({pageNo:event.target.value})} onKeyUp={()=>this.enter()}/></div>
            <div className="col-sm-2">of {this.state.totalPages}</div>
        </div>
        <div className="col-sm-3">
        <span onClick={()=>this.logout()}>Logout</span>                             
        </div>
        
      </div>
       

      <div className="card user">
      <div className="card-body row">
        {this.state.user.map((data,index)=>
        <div className="card col-sm-3 user-box" key={index}>
          <div className="card-body">
            <div className="card-title">{data.userName}</div>
          </div>
        </div>
      )}
      </div>
      </div>

		
      </div>
    );
  }
}                                    

export default App;
