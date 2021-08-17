import React, {Component, Fragment} from 'react';
import NavBar from '../components/desktop';
import RecoverPass from '../components/RecoverPass';
import Footer from '../components/footer';


class PasswordRecover extends React.Component{
	componentDidMount(){
		   if(localStorage.getItem('login')!=null)
            {
                
            }
	}
 render(){
 	return(
 		<Fragment>
 				<title>Password Recover</title>
 			<NavBar/>
 			<RecoverPass/>
 			<Footer/>
 		</Fragment>
 		)
 }
}
export default PasswordRecover;