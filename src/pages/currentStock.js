import React, {Component, Fragment} from 'react';
import NavBar from '../components/desktop';
import CurrentStockList from '../components/currentstocklist';
import Footer from '../components/footer';
import {Redirect} from 'react-router-dom';

class CurrentStock extends React.Component{
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
                <title>Current Stock</title>
            <NavBar/>
            <CurrentStockList/>
           <div className="no-print">
                <Footer/>
            </div>
            {this.RedirectToLoginPage()}
        </Fragment>
        )
 }
}
export default CurrentStock;