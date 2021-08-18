import React, {Component, Fragment} from 'react';
import NavBar from '../components/desktop';
import DecreaseList from '../components/stockDecreaseReport';
import Footer from '../components/footer';

class StockDecrease extends React.Component{
        componentDidMount(){
            if(localStorage.getItem('login')==null)
            {
                 
            }
        }
 render(){
    return(
        <Fragment>
            <title>Stock Adjustment Report</title>
            <NavBar/>
            <DecreaseList/>
           <div className="no-print">
                <Footer/>
            </div>
        </Fragment>
        )
 }
}
export default StockDecrease;