import React, {Component, Fragment} from 'react';
import NavBar from '../components/desktop';
import Increase from '../components/stockIncrease';
import Footer from '../components/footer';
import {Redirect} from 'react-router-dom';

class StockIncrease extends React.Component{
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
            <title>Stock Received</title>
            <NavBar/>
            <Increase/>
            <Footer/>
            {this.RedirectToLoginPage()}
        </Fragment>
        )
 }
}
export default StockIncrease;