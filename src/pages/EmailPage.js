import React, {Component, Fragment} from 'react';
import NavBar from '../components/desktop';
import EmailVerify from '../components/email';
import Footer from '../components/footer';

class EmailPage extends React.Component{
	componentDidMount(){
		   if(localStorage.getItem('login')!=null)
            {
                
            }
	}
 render(){
 	return(
 		<Fragment>
 			<title>Email Verification</title>
 			<NavBar/>
 			<EmailVerify/>
 			<Footer/>
 		</Fragment>
 		)
 }
}
export default EmailPage;