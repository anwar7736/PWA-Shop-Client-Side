import React, {Component, Fragment} from 'react';
import NavBar from '../components/desktop';
import SiteLogin from '../components/login';
import Footer from '../components/footer';

class Login extends React.Component{
	componentDidMount(){
		   if(localStorage.getItem('login')!=null)
            {
                
            }
	}
 render(){
 	return(
 		<Fragment>
 			<title>Login</title>
 			<NavBar/>
 			<SiteLogin/>
 			<Footer/>
 		</Fragment>
 		)
 }
}
export default Login;