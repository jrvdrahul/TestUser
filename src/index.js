import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import Signup from './Signup';
import User from './User';


import {
	BrowserRouter as Router,
	Route
} from 'react-router-dom'




ReactDOM.render(<Router >
<div>
	
	<Route exact path="/" component={App}/>
	<Route path="/Signup" component={Signup}/>
	<Route path="/User" component={User}/>
	
</div>

</Router>
, document.getElementById('root'));
registerServiceWorker();
