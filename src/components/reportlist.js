import React, {Component, Fragment} from 'react';
import {Button, Card, Col, Container, Modal, Row} from "react-bootstrap";
import DataTable from "react-data-table-component";
import Axios from 'axios';
import cogoToast from 'cogo-toast';
import TransactionList  from './transactionlist';

class ReportList extends React.Component{
    constructor() {
            super();
            this.state={
                dataTable : [],
                selectedMemo : '',
                MemoList : [],
                total : '',
                showEdit : false,
                editID : '',

                }
        }

            componentDidMount=()=>{
             Axios.get('https://api.coderanwar.com/api/TransactionList')
             .then(response=>{
                 this.setState({dataTable : response.data[0], total : response.data[1]});
             })
             .catch(error=>{

             })

             Axios.get('https://api.coderanwar.com/api/GetInvoiceList')
             .then(response=>{
                 this.setState({MemoList : response.data});
             })
             .catch(error=>{

             })
         }
         
        resetForm=()=>{
            let from = document.getElementById('from_date').value = '';
            let to = document.getElementById('to_date').value = '';
            this.componentDidMount();
        }
        GetOrderDetails=(e)=>{
            let memo_no = e.target.value;
            this.setState({selectedMemo : memo_no});
            Axios.get('https://api.coderanwar.com/api/GetOrderDetails/'+memo_no)
             .then(response=>{
                 this.setState({dataTable : response.data[0], total : response.data[1]});
             })
             .catch(error=>{

             })
         }
         filterByDate=()=>{
           let from_date =  document.getElementById('from_date').value;
           let to_date =  document.getElementById('to_date').value;
           if(from_date=='' || to_date=='')
           {
             cogoToast.warn('Both dates are required!');
           }
           else{
              Axios.post('https://api.coderanwar.com/api/TransactionListByDate', {from_date:from_date, to_date:to_date})
             .then(response=>{
                this.setState({dataTable : response.data[0], total : response.data[1]});
             })
             .catch(error=>{

             })
           }
         } 
         
         handleCloseEdit=()=>{
            this.setState({ showEdit:false, editID : ''})
            this.resetForm();
        }
    
        handleOpenEdit=()=>{
            this.setState({ showEdit:true})
        }

        deleteIconOnClick=(invoice_no)=>{
              Axios.post('https://api.coderanwar.com/api/DeleteSalesInvoice', {invoice_no : invoice_no})
              .then(res=>{
                   cogoToast.success(invoice_no + ' Invoice has been deleted');
                   this.componentDidMount();
                  
              })
              .catch(err=>{
                  cogoToast.error('Something went wrong!');
              })
                    
                
            
        }

        editIconOnClick=(id)=>{
        this.handleOpenEdit();
        this.setState({editID:id})
        Axios.get('')
                    .then(response=>{
                            this.setState({
                            
                            })
                    })
                    .catch(error=>{
                        cogoToast.error('Something went wrong!');
                    })

        }

         print=()=>{
           window.print();
         }

         deleteSalesMemo=()=>{
             if(this.state.selectedMemo==='')
             {
                 cogoToast.info('Please choose memo no!');
             }
             else
             {
               Axios.post('https://api.coderanwar.com/api/DeleteSalesMemo', {memo_no : this.state.selectedMemo})
               .then(res=>{
                    cogoToast.success(this.state.selectedMemo + ' Memo has been deleted');
                    this.componentDidMount();
                    this.setState({selectedMemo : this.state.selectedMemo-1});
               })
               .catch(err=>{
                   cogoToast.error('Something went wrong!');
               })
             }
         }

    render(){
            const dataTable = this.state.dataTable;
 	 const columns = [
            {
                name: 'Invoice No',
                selector: 'invoice_no',
                sortable: true,

            },
            {
                name: 'Memo No',
                selector: 'memo_no',
                sortable: true,

            },
            {
                name: 'Invoice Date',
                selector: 'invoice_date',
                sortable: true,
            },
            {
                name: 'Product Name',
                selector: 'product_name',
                sortable: true,
            },
            {
                name: 'Unit Price',
                selector: 'product_unit_price',
                sortable: true,
            }, 
            {
                name: 'Quantity',
                selector: 'product_qty',
                sortable: true,
            },
            {
                name: 'Total Price',
                selector: 'product_total_price',
                sortable: true,
            },
            {
                name: 'Delete',
                selector: 'id',
                sortable: false,
                cell: row => <button onClick={()=>{
                        if(window.confirm('Do you want to delete this invoice?'))
                        {
                            this.deleteIconOnClick(row.invoice_no);
                        }

                    }
                }  
                className="btn btn-sm text-danger"><i className="fa fa-trash-alt"/></button>
            },
            {
                name: 'Edit',
                selector: 'id',
                sortable: false,
                cell: row => <button disabled onClick={this.editIconOnClick.bind(this,row.id)}  className="btn btn-sm text-success"><i className="fa fa-edit"/></button>
            },


        ];

 	return(
 		<Fragment>
 			 <div className="container-fluid animated zoomIn transaction-preview mt-3">
                    <div className="input-group">
                        <h3 className=" mr-2 text-danger heading-title">Sales Report</h3>
                        <div className="offset-md-1 no-print">
                            <span className="table-title">Memo No : </span>
                            <select onChange={this.GetOrderDetails}>
                                <option value="" selected disabled>Choose Memo No</option>
                                {
                                    this.state.MemoList.map((List, i)=>{
                                        return <option value={List.memo_no} >{List.memo_no}</option>
                                    })
                                }
                            </select>
                                <button onClick={this.print} className="btn btn-info btn-sm ml-3">Print Memo</button>
                                <button onClick={this.deleteSalesMemo} className="btn btn-danger btn-sm ml-3">Delete Memo</button>
                        </div>
                        
                    </div>
                    <br/>

                <div className="no-print">
                    <div className="input-group" id="form">
                        <input id="from_date" className="form-control form-control-sm mx-2" type="date"/>
                        <input id="to_date" className="form-control form-control-sm mx-2" type="date"/>
                        <button onClick={this.filterByDate} className="btn btn-sm btn-success mx-2">Filter</button>
                        <button onClick={this.resetForm} className="btn btn-sm btn-danger mx-2">Refresh</button>
                    </div>
                </div>
                <hr className="bg-secondary"/>
                    <h5 className="mb-3"><span className="text-danger">Total Sales Value : </span><span className="text-success">{this.state.total}TK</span></h5>
                    <DataTable
                        noHeader={true}
                        paginationPerPage={5}
                        pagination={true}
                        columns={columns}
                        data={dataTable}
                    />
                </div>
                <br/>
                <br/>
                <br/>
                <Modal animation={false} className="animated zoomIn" show={this.state.showEdit} onHide={this.handleCloseEdit}>
                    <Modal.Header>
                        <h6>Edit User</h6>
                    </Modal.Header>
                    <Modal.Body>
                        <label className="form-label">Full Name</label>
                        <input onChange={this.onChangeHandler} name="fname" value={this.state.fname} className="form-control form-control-sm" type="text"/> 
                        <label className="form-label ">User Name</label>
                        <input onChange={this.onChangeHandler} name="uname" value={this.state.uname}className="form-control form-control-sm" type="text"/>
                         <label className="form-label">User Email</label>
                        <input onChange={this.onChangeHandler} name="email" value={this.state.email} className="form-control form-control-sm" type="text"/>
                        <label className="form-label">User Roll</label>
                        <select onChange={this.onChangeHandler} name="uroll" value={this.state.uroll} className="form-control form-control-sm form-select">
                            <option>{this.state.roll1}</option>
                            <option>{this.state.roll2}</option>
                        </select>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button className="btn-sm btn-danger" variant="secondary" onClick={this.handleCloseEdit}>
                            Close
                        </Button>
                        <button  className="btn btn-sm btn-info"  onClick={this.onSubmitHandler}>
                            Save Changes
                        </button>
                    </Modal.Footer>
                </Modal>
 		</Fragment>
 		)
 }
}
export default ReportList;