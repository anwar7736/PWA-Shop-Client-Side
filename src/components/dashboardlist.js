import React, {Component,Fragment} from 'react';
import {Modal,Button} from 'react-bootstrap'
import BootstrapTable from 'react-bootstrap-table-next';
import Axios from 'axios';

class DashboardList extends React.Component{
  constructor(){
    super();
    this.state = {
      isDisabled : true,
      selectedID : '',
      dataTable : [],
      show :false,
      ModalTitle : '',
      submitBtn : '',
    }
  }
  componentDidMount(){
         Axios.get('https://shop-api.coderanwar.online/api/SelectUser')
         .then(response=>{
             this.setState({dataTable : response.data});
         })
         .catch(error=>{

         })
  }

  handleOpen=(action)=>{
        if(action==='Add')
        {
          this.setState({ModalTitle : 'Add New User', submitBtn : 'Save Data'});
        }
        else if(action==='Edit')
        {
          this.setState({ModalTitle : 'Edit Current User', submitBtn : 'Update Data'});
        }
        this.setState({ show:true})
  }
  handleClose=()=>{
        this.setState({ show:false})
  }
 render(){

    const DataList = this.state.dataTable;

    const columns = [
    {
      dataField: 'id',
      text: 'ID'
    },  
    {
     dataField: 'fullname',
      text: 'Full Name'
    }, 
    {
      dataField: 'username',
      text: 'User Name'
    },
    {
      dataField: 'roll',
      text: 'Roll'
    }, 
    {
      dataField: 'email',
      text: 'Email'
    }

    ];

    const selectRow = {
    mode: 'radio',
     onSelect:(row, isSelect, rowIndex)=>{ 
        this.setState({selectedID : row['id'], isDisabled: false})
      }
  };

 	return(
 		 <Fragment>
           <center><div className="container-fluid">
            <h2 className="text-danger text-center m-4">DASHBOARD <span className="text-success">SUMMARY</span></h2>
                      <div class="w-75 card bg-dark mb-3">
                        <div class="card-body">
                          <h3 class="card-title text-success"><strong>TOTAL TRANSACTION</strong></h3>
                          <h1 className="text-danger"><strong>{this.props.TotalTransaction}</strong></h1>
                        </div>
                      </div>
                      <div class="w-75 card bg-info mb-3">
                        <div class="card-body">
                          <h3 class="card-title text-light"><strong>TOTAL EARNINGS</strong></h3>
                          <h1 className="text-dark"><strong>{this.props.TotalIncome} TK</strong></h1>
                        </div>
                      </div>
                      <div class="w-75 card bg-success mb-3">
                        <div class="card-body">
                          <h3 class="card-title text-danger"><strong>TOTAL CATEGORY</strong></h3>
                          <h1 className="text-white"><strong>{this.props.TotalCategory}</strong></h1>
                        </div>
                      </div>
                      <div class="w-75 card bg-site mb-5">
                        <div class="card-body">
                          <h3 class="card-title text-warning"><strong>TOTAL PRODUCT</strong></h3>
                          <h1 className="text-light"><strong>{this.props.TotalProduct}</strong></h1>
                        </div>
                      </div><br/><br/>
           </div></center>
      </Fragment>
 		)
 }
}
export default DashboardList;