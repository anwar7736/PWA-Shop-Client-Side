import React, {Component, Fragment} from 'react';
import {Button, Card, Col, Container, Modal, Row} from "react-bootstrap";
import DataTable from "react-data-table-component";
import Axios from 'axios';
import cogoToast from 'cogo-toast';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';  

class CurrentStockList extends React.Component{
	constructor() {
        super();
        this.state={
            dataTable : [],
            editID:"",
            product_qty : 0,
            total : '',
        }
    }
        componentDidMount(){
         Axios.get('https://api.coderanwar.com/api/CurrentStockReport')
         .then(response=>{
             this.setState({dataTable : response.data[0], total: response.data[1]});
         })
         .catch(error=>{

         })
     }

        print=()=>{
            
           window.print();
         }
 render(){

 	return(
 		<Fragment>
 			  <div className=" text-white container-fluid mt-4">
               <h3 className=" mr-2 text-danger heading-title text-center">Current Stock</h3>           
                    <div className="no-print">  
                    <ReactHTMLTableToExcel  
                            className="btn btn-success btn-sm"  
                            table="export-excel"  
                            filename="Current Stock"  
                            sheet="Sheet"  
                            buttonText="Save As Excel" />  
                        <button onClick={this.print} className="btn btn-danger ml-3 btn-sm">Print</button>
                    </div>  
                        <hr className="bg-secondary"/>
                                    <table className="table table-borderd table-striped" id="export-excel">
                                        <thead className="bg-light">
                                            <h5 className="text-success heading-subtitle">Total Stock : {this.state.total}TK</h5>
                                            <tr>
                                                <th>Image</th>
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
                                                            <td><img className="cat-icon" src={List.product_icon}/></td>
                                                            <td>{List.product_code}</td>
                                                            <td>{List.product_name}</td>
                                                            <td>{List.product_category}</td>
                                                            <td>{List.product_price}</td>
                                                            <td>{List.product_qty}</td>
                                                            <td>{List.total_price}</td>
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
export default CurrentStockList;