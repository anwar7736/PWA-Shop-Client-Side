import React, {Component, Fragment} from 'react';
import {Button, Card, Col, Container, Modal, Row} from "react-bootstrap";
import DataTable from "react-data-table-component";
import Axios from 'axios';
import cogoToast from 'cogo-toast';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';  

class StockReceivedList extends React.Component{
	constructor() {
        super();
        this.state={
            dataTable : [],
            editID:"",
            product_qty : 0,
            total : '',
        }
    }
        componentDidMount=()=>{
         Axios.get('https://api.coderanwar.com/api/ReceivedAllStockData')
         .then(response=>{
             this.setState({dataTable : response.data[0], total: response.data[1]});
         })
         .catch(error=>{

         })
     }

       resetForm=()=>{
            let from = document.getElementById('from_date').value = '';
            let to = document.getElementById('to_date').value = '';
            this.componentDidMount();
        }
     
      filterByDate=()=>{
           let from_date =  document.getElementById('from_date').value;
           let to_date =  document.getElementById('to_date').value;
           if(from_date=='' || to_date=='')
           {
             cogoToast.warn('Both dates are required!');
           }
           else{
              Axios.post('https://api.coderanwar.com/api/ReportFilterByDate', {from_date:from_date, to_date:to_date})
             .then(response=>{
                 this.setState({dataTable : response.data[0], total: response.data[1]});
             })
             .catch(error=>{

             })
           }
         } 
    print=()=>{
            
        window.print();
         }
 render(){

 	return(
 		<Fragment>
 			  <div className="container-fluid animated zoomIn transaction-preview">
                    <h3 className="heading-title text-danger text-center">Stock Received Report</h3>  
                    <div className="no-print">  
                    <ReactHTMLTableToExcel  
                            className="btn btn-info btn-sm"  
                            table="export-excel"  
                            filename="Stock Received"  
                            sheet="Sheet"  
                            buttonText="Save As Excel" /> 
                        <button onClick={this.print} className="btn btn-dark ml-3 btn-sm">Print Report</button> 
                    </div>  
                    <br/>
                <div className="no-print">
                    <div className="input-group">
                        <input id="from_date" className="w-25 form-control form-control-sm mx-2" type="date"/>
                        <input id="to_date" className="w-25 form-control form-control-sm mx-2" type="date"/>
                        <button onClick={this.filterByDate} className="btn btn-sm btn-success mx-2">Filter</button>
                        <button onClick={this.resetForm} className="btn btn-sm btn-danger mx-2">Refresh</button>
                    </div>
                </div>
                <hr className="bg-secondary"/>
                        <table className="table table-borderd table-striped" id="export-excel">
                        <thead className="bg-light">
                                <div className="col-md-12 w-100">
                                    <h5 className="heading-subtitle text-success">Total : {this.state.total}TK</h5>
                                </div>
                            <tr>
                                <th width="20%">Invoice No</th>
                                <th width="20%">Received Date</th>
                                <th>Product Code</th>
                                <th>Product Name</th>
                                <th>Category</th>
                                <th>Unit</th>
                                <th>Qty</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                            this.state.dataTable.map((List, i)=>{
                                return  <tr>
                                            <td>{List.invoice_no}</td>
                                            <td>{List.received_date}</td>
                                            <td>{List.product_code}</td>
                                            <td>{List.product_name}</td>
                                            <td>{List.product_category}</td>
                                            <td>{List.product_unit_price}</td>
                                            <td>{List.product_qty}</td>
                                            <td>{List.product_total_price}</td>
                                        </tr>
                            })
                            }
                        </tbody>
                        
                    </table>  
                </div>          
                <br/>
                <br/>
                <br/>

 		</Fragment>
 		)
 }
}
export default StockReceivedList;