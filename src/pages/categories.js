import React, {Component, Fragment} from 'react';
import NavBar from '../components/desktop';
import CategoryList from '../components/categorylist';
import Footer from '../components/footer';

class Categories extends React.Component{
        componentDidMount(){
            if(localStorage.getItem('login')==null)
            {
                
            }
        }
 render(){
 	return(
 		<Fragment>
 			<title>Category List</title>
 			<NavBar/>
 			<CategoryList/>
 			<Footer/>
 		</Fragment>
 		)
 }
}
export default Categories;