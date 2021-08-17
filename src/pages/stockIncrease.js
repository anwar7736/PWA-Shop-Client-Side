import React, {Component, Fragment} from 'react';
import NavBar from '../components/desktop';
import Increase from '../components/stockIncrease';
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
            <NavBar/>
            <Increase/>
            <Footer/>
        </Fragment>
        )
 }
}
export default StockIncrease;