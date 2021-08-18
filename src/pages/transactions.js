import React, {Component, Fragment} from 'react';
import NavBar from '../components/desktop';
import TrasactionList from '../components/transactionlist';
import Footer from '../components/footer';

class Transactions extends React.Component{
        componentDidMount(){
            if(localStorage.getItem('login')==null)
            {
                 
            }
        }
 render(){
 	return(
 		<Fragment>
			 <title>Transaction</title>
 			<NavBar/>
 			<TrasactionList/>
 			<Footer/>
 		</Fragment>
 		)
 }
}
export default Transactions;