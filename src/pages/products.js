import React, {Component, Fragment} from 'react';
import NavBar from '../components/desktop';
import PrdouctList from '../components/productlist';
import Footer from '../components/footer';
import {Redirect} from 'react-router-dom';

class Products extends React.Component{
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
 			<title>Product List</title>
 			<NavBar/>
 			<PrdouctList/>
 			<Footer/>
		   {this.RedirectToLoginPage()}
 		</Fragment>
 		)
 }
}
export default Products;