
import React, {Component, Fragment} from 'react';
import NavBar from '../components/desktop';
import OTPVerify from '../components/otp';
import Footer from '../components/footer';

class OTPPage extends React.Component{
	componentDidMount(){
		   if(localStorage.getItem('login')!=null)
            {
                
            }
	}
 render(){
 	return(
 		<Fragment>
 		    <title>OTP Verification</title>
 			<NavBar/>
 			<OTPVerify/>
 			<Footer/>
 		</Fragment>
 		)
 }
}
export default OTPPage;