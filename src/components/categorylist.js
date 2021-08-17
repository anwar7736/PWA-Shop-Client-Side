import React, {Component, Fragment} from 'react';
import {Button, Card, Col, Container, Modal, Row} from "react-bootstrap";
import BootstrapTable from 'react-bootstrap-table-next';
import Axios from 'axios';
import cogoToast from 'cogo-toast';
import ReactHtmlParser from 'react-html-parser';
import paginationFactory from 'react-bootstrap-table2-paginator';

class CategoryList extends Component {
    constructor() {
        super();
        this.state={
            dataTable : [],
            show:false,
            showEdit:false,
            cat_name : '',
            cat_img : '',
            isDisabled : true,
            selectedID : '',
            ModalTitle : '',
            submitBtn : '',
        }
    }
    componentDidMount(){
         Axios.get('https://api.coderanwar.com/api/SelectCategory')
         .then(response=>{
             this.setState({dataTable : response.data});
         })
         .catch(error=>{

         })
     }
    onCategoryName=(event)=>
    {
        this.setState({cat_name : event.target.value});
    }
    onCategoryImg=(event)=>
    {
        this.setState({cat_img : event.target.files[0]});
    }
    onSubmitHandler=()=>
    {
        if(this.state.cat_name=='')
        {
            cogoToast.warn('Category Name Field is Required!')
        }
        else if(this.state.cat_img=='')
        {
            cogoToast.warn('Category Image Field is Required!')
        }
        else{
            var myData = new FormData;
            myData.append('name', this.state.cat_name);
            myData.append('image', this.state.cat_img);
           Axios.post('https://api.coderanwar.com/api/AddCategory',myData)
                 .then(response=>{
                    if(response.status==200 && response.data==1)
                    {
                         this.resetForm();
                         this.handleClose();
                         cogoToast.success('New Category added successfully');
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
      
    }
    onUpdateHandler=()=>{
        if(this.state.cat_name=='')
        {
            cogoToast.warn('Category Name Field is Required!')
        }
        else{
            var myData = new FormData;
            myData.append('name', this.state.cat_name);
            myData.append('image', this.state.cat_img);
            myData.append('cat_code', this.state.editID);
            Axios.post('https://api.coderanwar.com/api/UpdateCategory',myData)
                 .then(response=>{
                    if(response.status==200 && response.data==1)
                    {
                         this.resetForm();
                         this.handleCloseEdit();
                         cogoToast.success('Category updated successfully');
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
    }
    resetForm=()=>{
        this.setState({ cat_name : '',cat_img : ''})
    }
    handleClose=()=>{
        this.setState({ show:false})
    }
   handleOpen=(action)=>{
        if(action==='Add')
        {
          this.setState({ModalTitle : 'Add New Category', submitBtn : 'Save Data'});
        }
        else if(action==='Edit')
        {
          this.setState({ModalTitle : 'Edit Current Category', submitBtn : 'Update Data'});
        }

        this.setState({ show:true})
    }

    handleCloseEdit=()=>{
        this.setState({ showEdit:false})
    }
    handleOpenEdit=()=>{
        this.setState({ showEdit:true})
    }

    deleteIconOnClick=(id)=>{

             Axios.get('https://api.coderanwar.com/api/DeleteCategory/'+id)
             .then(response=>{
                 cogoToast.success('Category has been deleted');
                 this.componentDidMount();
             })
             .catch(error=>{

             })
        
    }


    editIconOnClick=(id)=>{
        this.handleOpenEdit();
        this.setState({editID:id})
         Axios.get('https://api.coderanwar.com/api/getCategory/'+id)
                 .then(response=>{
                         this.setState({cat_name: response.data.cat_name,cat_img: response.data.cat_icon
                        })
                 })
                 .catch(error=>{
                    cogoToast.error('Something went wrong!');
                 })

    }
    imgCellFormat=(cell, rowIndex)=>{
        return <img className="table-cell-img" src={cell}/>
    }
    cellFormatter=(cell, rowIndex)=>{
        return ReactHtmlParser(cell);
    }
    render() {
    const DataList = this.state.dataTable;

    const columns = [
    {
      dataField: 'cat_icon',
      text: 'Category Icon',
      formatter:this.imgCellFormat
    },  
    {
      dataField: 'cat_code',
      text: 'Category Code'
    },
    {
     dataField: 'cat_name',
      text: 'Category Name'
    }

    ];

    const selectRow = {
    mode: 'radio',
    onSelect:(row, isSelect, rowIndex)=>{ 
        this.setState({selectedID : row['id'], isDisabled: false});
    }
}


        return (
            <Fragment>
                <div className="w-100 bg-light text-dark container-fluid">
                    <h3 className="text-danger text-center">All Category List</h3>
                    <div>
                      <button onClick={this.handleOpen.bind(this,'Add')} className="btn btn-success btn-sm m-2">Add New Category</button>
                      <button onClick={this.handleOpen.bind(this,'Edit')} className="btn btn-info btn-sm m-2" disabled={this.state.isDisabled}>Edit Category</button>
                      <button className="btn btn-danger btn-sm m-2" disabled={this.state.isDisabled}>Delete Category</button>
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
                        <label className="form-label">Category Name</label>
                        <input onChange={this.onCategoryName} name="cat_name" className="form-control form-control-sm" type="text"/>
                        <label className="form-label">Category Icon</label>
                        <input onChange={this.onCategoryImg} name="cat_img" className="form-control form-control-sm form-control-file" type="file"/>
                    </Modal.Body>
                    <Modal.Footer>
                        <button  className="btn btn-sm btn-danger" onClick={this.handleClose}>
                            Close
                        </button>
                        <button onClick={this.onSubmitHandler} className="btn btn-sm btn-success">
                              {this.state.submitBtn}
                        </button>
                    </Modal.Footer>
                </Modal>
            </Fragment>
        );
    }
}
export default CategoryList;