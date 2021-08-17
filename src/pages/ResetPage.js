import React, {Component, Fragment} from 'react';
import NavBar from '../components/desktop';
import Reset from '../components/reset';
import Footer from '../components/footer';

class ResetPage extends React.Component{
	componentDidMount(){
		   if(localStorage.getItem('login')!=null)
            {
                
            }
	}
 render(){
 	return(
 		<Fragment>
 			<title>Reset Password</title>
 			<NavBar/>
 			<Reset/>
 			<Footer/>
 		</Fragment>
 		)
 }
}
export default ResetPage;