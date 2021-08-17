import React, {Component, Fragment} from 'react';
import NavBar from '../components/desktop';
import CurrentStockList from '../components/currentstocklist';
import Footer from '../components/footer';

class CurrentStock extends React.Component{
        componentDidMount(){
            if(localStorage.getItem('login')==null)
            {
                 
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
        </Fragment>
        )
 }
}
export default CurrentStock;