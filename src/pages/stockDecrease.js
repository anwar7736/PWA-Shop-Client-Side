import React, {Component, Fragment} from 'react';
import NavBar from '../components/desktop';
import Decrease from '../components/stockDecrease';
import Footer from '../components/footer';

class StockIncrease extends React.Component{
        componentDidMount(){
        if(localStorage.getItem('admin')==null)
        {
             
        }
    }
 render(){
    return(
        <Fragment>
            <title>Stock Adjustment</title>
            <NavBar/>
            <Decrease/>
            <Footer/>
        </Fragment>
        )
 }
}
export default StockIncrease;