import React, {Component, Fragment} from 'react';
import {Form, Button, Container, Row, Col} from 'react-bootstrap';
import cogoToast from 'cogo-toast';
import {Link} from "react-router-dom";
import {Redirect} from "react-router";
import Axios from 'axios';

class OTP extends React.Component{
	constructor(){
		super()
		this.state = {
			username : '',
			password : '',
			isChecked : true,
		}
	}
componentDidMount(){
	let user = localStorage.getItem('user');
	let pass = localStorage.getItem('pass')
	if(user!==null && pass!==null)
	{
		this.setState({username : user, password : pass, isChecked : true});
	}
}
RememberOnChange=()=>{
	if(this.state.isChecked==false)
	{
		this.setState({isChecked : true});
	}
	else
	{
		this.setState({isChecked : false});
	}
}

Login=(e)=>{
	e.preventDefault();
	let username = this.state.username;
	let password = this.state.password;
	if(username=='')
	{
		 cogoToast.warn('Username Field is Required!')
	}
	else if(password=='')
	{
		 cogoToast.warn('Password Field is Required!')
	}
	else{
		Axios.post('https://api.coderanwar.com/api/login', {username:username, password:password})
                 .then(response=>{
                    if(response.status==200 && response.data[0]==='admin')
                    {
                         localStorage.setItem('login', true);
                         localStorage.setItem('seller', response.data[1]);
                         localStorage.setItem('admin', true);
                         if(this.state.isChecked==true)
                         {
                         	localStorage.setItem('user', this.state.username);
                         	localStorage.setItem('pass', this.state.password);
                         }
                         else
                         {
                         	let user = localStorage.getItem('user');
							let pass = localStorage.getItem('pass');
							if(user!==null && pass!==null)
							{
								localStorage.removeItem('user');
								localStorage.removeItem('pass');	
							}
                         }
                        
                    }
                    else if (response.status==200 && response.data[0]==='worker')
                    {
                    	localStorage.setItem('login', true);
                    	localStorage.setItem('seller', response.data[1]);
                         localStorage.setItem('worker', true);
                         if(this.state.isChecked==true)
                         {
                         	localStorage.setItem('user', this.state.username);
                         	localStorage.setItem('pass', this.state.password);
                         }
                         else
                         {
                         	let user = localStorage.getItem('user');
						let pass = localStorage.getItem('pass');
						if(user!==null && pass!==null)
						{
							localStorage.removeItem('user');
							localStorage.removeItem('pass');	
						}
                         }
                       
                    }
                    else{
                         cogoToast.error(response.data);
                    }
                 })
                 .catch(error=>{
                    cogoToast.error('Something went wrong!');
                 })
	}
}
passwordShowHide=()=>{
	let input = document.getElementById("password");
	let btnText = document.getElementById("showHideBtn");
	if(input.type=="password")
	{
		input.type = "text";
		btnText.innerHTML = '<i class="fa fa-eye-slash"/> Hide Password';
	}
	else
	{
		input.type = "password";
		btnText.innerHTML = '<i class="fa fa-eye"/> Show Password';
	}
}
 render(){

 	return(
 		<Fragment>	
 			<Container className="mt-4 col-lg-5 col-md-5 col-sm-8 col-xs-12">
 						<Form onSubmit={this.Login}>
 							<h2 className="text-center text-danger">Step 02 : OTP Verification</h2>
						  <Form.Group controlId="formBasicEmail">
						    <Form.Label>Enter Valid OTP</Form.Label>
						    <Form.Control value={this.state.username} maxLength="6" onChange={(e)=>{this.setState({username:e.target.value})}} type="text" placeholder="Enter your valid OTP number..." />
						    <Form.Text className="text-muted">
						    </Form.Text>
						  </Form.Group>

						  <Button variant="success" className="btn-block mb-2" type="submit">
						    Verify OTP	
						  </Button>
						  	<Link to="/email_verification">
						    		<p className="forget-pass">Back to Email Verify</p> 
						    </Link>
						   
					</Form>
 			</Container>
 		</Fragment>
 		)
 	
 }
}
export default OTP;