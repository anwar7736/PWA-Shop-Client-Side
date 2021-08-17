import React, {Component, Fragment} from 'react';
import NavBar from '../components/desktop';
import UserList from '../components/userlist';
import Footer from '../components/footer';
import Axios from 'axios';


class Users extends React.Component{
      constructor(){
        super();
        this.state = {
            
        }
    }
    componentDidMount(){
        if(localStorage.getItem('admin')==null)
        {
             
        }
         
     }
    render(){
 	return(
 		<Fragment>
            <title>User List</title>
 			<NavBar/>
 			<UserList/>
            <Footer/>
 		</Fragment>
 		);
 }
}
export default Users;