import React, {Component, Fragment} from 'react';
import NavBar from '../components/desktop';
import ReceivedList from '../components/stockReceivedReport';
import Footer from '../components/footer';

class StockIncrease extends React.Component{
        componentDidMount(){
            if(localStorage.getItem('login')==null)
            {
                 
            }
        }
 render(){
    return(
        <Fragment>
            <title>Stock Received Report</title>
            <NavBar/>
            <ReceivedList/>
           <div className="no-print">
                <Footer/>
            </div>
        </Fragment>
        )
 }
}
export default StockIncrease;