import React, {Component, Fragment} from 'react';
import NavBar from '../components/desktop';
import DashboardList from '../components/dashboardlist';
import Footer from '../components/footer';
import Axios from 'axios';
import {Redirect} from 'react-router-dom';

class Index extends React.Component{
    constructor(){
        super();
        this.state = {
            transactions : '',
            categories : '',
            products: '',
            earnings : '',
            dataTable : '',
            dataChart : '',
            redirectStatus : false,
        }
    }
    componentDidMount(){
            if(localStorage.getItem('login')==null)
            {
                 this.setState({redirectStatus : true});
            }
           


         Axios.get('https://shop-api.coderanwar.online/api/CountSummary')
         .then(response=>{
             this.setState({
                transactions: response.data['transactions'].length,
                categories: response.data['categories'],
                products: response.data['products'],
                earnings: response.data['earnings'],
            });
         })
         .catch(error=>{

         }) 
         Axios.get('https://shop-api.coderanwar.online/api/RecentTransactionList')
         .then(response=>{
             this.setState({dataTable : response.data});
         })
         .catch(error=>{

         })
         Axios.get('https://shop-api.coderanwar.online/api/IncomeLast7Days')
         .then(response=>{
             this.setState({dataChart : response.data});
         })
         .catch(error=>{

         })
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
 				<title>Home</title>
 			<NavBar/>
 			<DashboardList
 			   TotalTransaction={this.state.transactions}
 			   TotalIncome={this.state.earnings}
			   TotalCategory={this.state.categories}
			   TotalProduct={this.state.products}
			   dataChart={this.state.dataChart}
			   dataTable={this.state.dataTable}
 			/>
            <Footer/>
            {this.RedirectToLoginPage()}
 		</Fragment>
 		)
    
 }
}
export default Index;