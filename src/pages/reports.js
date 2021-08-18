import React, {Component, Fragment} from 'react';
import NavBar from '../components/desktop';
import ReportList from '../components/reportlist';
import Footer from '../components/footer';

class Reports extends React.Component{
        componentDidMount(){
            if(localStorage.getItem('login')==null)
            {
                 
            }
        }
 render(){
 	return(
 		<Fragment>
             <title>Sales Report</title>
 			<NavBar/>
 			<ReportList/>
 			<div className="no-print">
                <Footer/>
            </div>
 		</Fragment>
 		)
 }
}
export default Reports;