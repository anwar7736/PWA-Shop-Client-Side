import React, {Component, Fragment} from 'react';
import NavBar from '../components/desktop';
import PrdouctList from '../components/productlist';
import Footer from '../components/footer';

class Products extends React.Component{

        componentDidMount(){
            if(localStorage.getItem('login')==null)
            {
                 
            }
        }
 render(){
 	return(
 		<Fragment>
 			<title>Product List</title>
 			<NavBar/>
 			<PrdouctList/>
 			<Footer/>
 		</Fragment>
 		)
 }
}
export default Products;