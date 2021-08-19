import React, {Component, Fragment} from 'react';
import NavBar from '../components/desktop';
import CategoryList from '../components/categorylist';
import Footer from '../components/footer';
import {Redirect} from 'react-router-dom';

class Categories extends React.Component{
	constructor(){
		super();
		this.state = {
			redirectStatus : false,
		}

		}

        componentDidMount(){
            if(localStorage.getItem('login')==null)
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
 			<title>Category List</title>
 			<NavBar/>
 			<CategoryList/>
 			<Footer/>
			{this.RedirectToLoginPage()}
 		</Fragment>
 		)
 }
}
export default Categories;