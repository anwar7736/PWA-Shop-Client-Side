import React, {Component, Fragment} from 'react';
import NavBar from '../components/desktop';
import UserList from '../components/userlist';
import Footer from '../components/footer';
import Axios from 'axios';
import {Redirect} from 'react-router-dom';

class Users extends React.Component{
      constructor(){
        super();
        this.state = {
          redirectStatus : false,
        }
    }
    componentDidMount(){
        if(localStorage.getItem('admin')==null)
        {
            this.setState({redirectStatus : true});
        }
         
     }

     RedirectToLoginPage=()=>{
      if(this.state.redirectStatus==true)
      {
          return (
                  <Redirect to="/login" />
                  );
      }
  }
    render(){
 	return(
 		<Fragment>
            <title>User List</title>
 			<NavBar/>
 			<UserList/>
            <Footer/> 
      {this.RedirectToLoginPage()}
 		</Fragment>
 		);
 }
}
export default Users;