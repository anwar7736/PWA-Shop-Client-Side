import React, {Component, Fragment} from 'react';
import {Modal,Button} from 'react-bootstrap'
import BootstrapTable from 'react-bootstrap-table-next';
import Axios from 'axios';
import cogoToast from 'cogo-toast';
import paginationFactory from 'react-bootstrap-table2-paginator';

class UserList extends React.Component{
 constructor() {
        super();
        this.state={
            fname : '',
            uname : '',
            email : '',
            uroll : 'Worker',
            upass : '',
            roll1 : 'Admin',
            roll2 : 'Worker',
            isDisabled : true,
            selectedID : '',
            dataTable : [],
            show :false,
            ModalTitle : '',
            submitBtn : '',
        }
    }
    componentDidMount(){
         Axios.get('https://api.coderanwar.com/api/SelectUser')
         .then(response=>{
             this.setState({dataTable : response.data});
         })
         .catch(error=>{

         })
     }
    onChangeHandler=(event)=>
    {
        this.setState({[event.target.name] : event.target.value});
        this.setState({selected : event.target.value['uroll']});
    }
    onSubmitHandler=()=>
    {
        let emailPattern = /^[a-zA-Z0-9]+@+[a-zA-Z0-9]+.+[A-z]/;

        if(this.state.fname=='')
        {
            cogoToast.warn('Full Name Field is Required!')
        }
        else if(this.state.uname=='')
        {
            cogoToast.warn('Username Field is Required!')
        }
        else if(this.state.email=='')
        {
            cogoToast.warn('Email Address Field is Required!')
        }
        else if (!emailPattern.test(this.state.email))
        {
             cogoToast.warn('Invalid Email Address!')
        }
        else if(this.state.upass=='')
        {
            cogoToast.warn('Password Field is Required!')
        }
        else if(this.state.editID==''){
           Axios.post('https://api.coderanwar.com/api/AddUser', 
            {
                name:this.state.fname,
                username:this.state.uname,
                email:this.state.email,
                password:this.state.upass,
                roll:this.state.uroll
            }
            )
                 .then(response=>{
                    if(response.status==200 && response.data==1)
                    {
                         this.resetForm();
                         this.handleClose();
                         cogoToast.success('New User added successfully');
                         this.componentDidMount();

                    }
                    else{
                         cogoToast.error(response.data);
                    }
                 })
                 .catch(error=>{
                    cogoToast.error('Something went wrong!');
                 })
        }
        else
        {
          Axios.post('https://api.coderanwar.com/api/UpdateUser', {
                id:this.state.editID,
                name:this.state.fname,
                username:this.state.uname,
                email:this.state.email,
                roll:this.state.uroll })
                 .then(response=>{
                    if(response.status==200 && response.data==1)
                    {
                         this.resetForm();
                         this.handleCloseEdit();
                         cogoToast.success('User data updated successfully');
                         this.componentDidMount();

                    }
                    else{
                        this.handleCloseEdit();
                         cogoToast.info('Nothing to Changes');
                    }
                 })
                 .catch(error=>{

                      cogoToast.error('Something went wrong!');
                 })
        }
    }
    resetForm=()=>{
        this.setState({ fname : '',uname : '', email : '', upass : '', uroll : 'Worker'})
    }

    handleClose=()=>{
        this.setState({ show:false})
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

    handleCloseEdit=()=>{
        this.setState({ showEdit:false, editID : ''})
        this.resetForm();
    }

    handleOpenEdit=()=>{
        this.setState({ showEdit:true})
    }

    deleteIconOnClick=(id)=>{
           
                 Axios.get('https://api.coderanwar.com/api/DeleteUser/'+id)
                 .then(response=>{
                     cogoToast.success('User has been deleted');
                     this.componentDidMount();
                 })
                 .catch(error=>{

                 })
            
          
    }

    editIconOnClick=(id)=>{
       this.handleOpenEdit();
       this.setState({editID:id})
       Axios.get('https://api.coderanwar.com/api/getUser/'+id)
                 .then(response=>{
                         this.setState({
                            fname: response.data.fullname,
                            uname: response.data.username,
                            email: response.data.email,
                            upass: response.data.password,
                            uroll: response.data.roll,
                        })
                 })
                 .catch(error=>{
                    cogoToast.error('Something went wrong!');
                 })

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
        this.setState({selectedID : row['id'], isDisabled: false});
    }
}

 	return(
 		<Fragment>
 			 <div className="w-100 bg-light text-white container-fluid">
            <h3 className="text-danger text-center">All User List</h3>
            <div>
              <button onClick={this.handleOpen.bind(this,'Add')} className="btn btn-success btn-sm m-2">Add New User</button>
              <button onClick={this.handleOpen.bind(this,'Edit')} className="btn btn-info btn-sm m-2" disabled={this.state.isDisabled}>Edit User</button>
              <button className="btn btn-danger btn-sm m-2" disabled={this.state.isDisabled}>Delete User</button>
            </div>
            <BootstrapTable 
              keyField='id' 
              data={ DataList } 
              columns={ columns } 
              selectRow={ selectRow }
              pagination={ paginationFactory() } 
            />
          </div><br/><br/>
          <Modal animation={false} className="animated zoomIn" show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header>
                        <h6>{this.state.ModalTitle}</h6>
                    </Modal.Header>
                    <Modal.Body>
                        <label className="form-label">Full Name</label>
                        <input value={this.state.fname} onChange={this.onChangeHandler} name="fname" className="form-control form-control-sm" type="text"/>
                        <label className="form-label">User Name</label>
                        <input value={this.state.uname} onChange={this.onChangeHandler} name="uname" className="form-control form-control-sm" type="text"/> 
                        <label className="form-label">User Email</label>
                        <input value={this.state.email} onChange={this.onChangeHandler} name="email" className="form-control form-control-sm" type="text"/>
                        <label className="form-label">Password</label>
                        <input value={this.state.password} onChange={this.onChangeHandler} name="upass" className="form-control form-control-sm" type="password"/>
                        <label className="form-label">User Roll</label>
                        <select onChange={this.onChangeHandler} name="uroll" value={this.state.uroll} className="form-control form-control-sm form-select">
                            <option>{this.state.roll1}</option>
                            <option>{this.state.roll2}</option>
                        </select>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button className="btn btn-sm btn-danger" variant="secondary" onClick={this.handleClose}>
                            Close
                        </Button>
                        <button onClick={this.onSubmitHandler} className="btn btn-sm btn-success">
                           {this.state.submitBtn}
                        </button>
                    </Modal.Footer>
                </Modal>
 		</Fragment>
 		);
 }
}
export default UserList;