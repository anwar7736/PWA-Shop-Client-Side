import React, {Component, Fragment} from 'react';
import {Button, Card, Col, Container, Modal, Row} from "react-bootstrap";
import BootstrapTable from 'react-bootstrap-table-next';
import Axios from 'axios';
import cogoToast from 'cogo-toast';
import ReactHtmlParser from 'react-html-parser';
import paginationFactory from 'react-bootstrap-table2-paginator';

class ProductList extends React.Component{
	constructor() {
        super();
        this.state={
            dataTable : [],
            show:false,
            showEdit:false,
            categories : [],
            product_name : '',
            product_icon : '',
            product_price : '',
            product_remarks : '',
            selected_category : 'Mobile',
            isDisabled : true,
            selectedID : '',
            ModalTitle : '',
            submitBtn : '',
        }
    }
        componentDidMount(){
         Axios.get('https://api.coderanwar.com/api/SelectProduct')
         .then(response=>{
             this.setState({dataTable : response.data});
         })
         .catch(error=>{

         })
         Axios.get('https://api.coderanwar.com/api/SelectCategory')
         .then(response=>{
             this.setState({categories : response.data});
         })
         .catch(error=>{

         })
     }
    onChangeHandler=(event)=>{
        this.setState({[event.target.name] : event.target.value})
    }
    onCategoryChange=(event)=>{
        this.setState({selected_category : event.target.value})
    }
    onProductIconChange=(event)=>{
        this.setState({product_icon : event.target.files[0]})
    }

     onSubmitHandler=()=>
     {
        if(this.state.product_name=='')
        {
            cogoToast.warn('Product Name Field is Required!')
        }
        else if(this.state.product_icon=='')
        {
            cogoToast.warn('Product Image Field is Required!')
        }
        else if(this.state.product_price=='')
        {
            cogoToast.warn('Product Price Field is Required!')
        } 
        else if(!Number(this.state.product_price))
        {
            cogoToast.error('Invalid Product Price!')
        }
        else if(this.state.product_remarks=='')
        {
            cogoToast.warn('Product Remarks Field is Required!')
        }
        else if(this.state.selected_category=='')
        {
            cogoToast.warn('Product Category Field is Required!')
        }
        else{
            var myData = new FormData;
            myData.append('product_name', this.state.product_name);
            myData.append('product_icon', this.state.product_icon);
            myData.append('product_price', this.state.product_price);
            myData.append('product_remarks', this.state.product_remarks);
            myData.append('product_category', this.state.selected_category);
            Axios.post('https://api.coderanwar.com/api/AddProduct',myData)
                 .then(response=>{
                    if(response.status==200 && response.data==1)
                    {
                         this.resetForm();
                         this.handleClose();
                         cogoToast.success('New Product added successfully');
                         this.componentDidMount();

                    }
                    else{
                         cogoToast.error(response.data);
                    }
                 })
                 .catch(error=>{
                   
                 })
        }
      
    }
    onUpdateHandler=()=>{
        if(this.state.product_name=='')
        {
            cogoToast.warn('Product Name Field is Required!')
        }
        else if(this.state.product_price=='')
        {
            cogoToast.warn('Product Price Field is Required!')
        }
        else if(this.state.product_remarks=='')
        {
            cogoToast.warn('Product Remarks Field is Required!')
        }
        else if(this.state.selected_category=='')
        {
            cogoToast.warn('Product Category Field is Required!')
        }
        else{
            var myData = new FormData;
            myData.append('product_name', this.state.product_name);
            myData.append('product_icon', this.state.product_icon);
            myData.append('product_price', this.state.product_price);
            myData.append('product_remarks', this.state.product_remarks);
            myData.append('product_category', this.state.selected_category);
            myData.append('id', this.state.editID);
            Axios.post('https://api.coderanwar.com/api/UpdateProduct',myData)
            .then(response=>{
                    if(response.status==200 && response.data==1)
                    {
                         this.resetForm();
                         this.handleCloseEdit();
                         cogoToast.success('Product updated successfully');
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

    handleOpen=(action)=>{
        if(action==='Add')
        {
          this.setState({ModalTitle : 'Add New Product', submitBtn : 'Save Data'});
        }
        else if(action==='Edit')
        {
          this.setState({ModalTitle : 'Edit Current Product', submitBtn : 'Update Data'});
        }

        this.setState({ show:true})
    }

    handleClose=()=>{
        this.setState({ show:false})
    }

    handleCloseEdit=()=>{
        this.setState({ showEdit:false})
    }

    handleOpenEdit=()=>{
        this.setState({ showEdit:true})
    }

    deleteIconOnClick=(id)=>{
             Axios.get('https://api.coderanwar.com/api/DeleteProduct/'+id)
             .then(response=>{
                 cogoToast.success('Product has been deleted');
                 this.componentDidMount();
             })
             .catch(error=>{

             })
        
    }

    editIconOnClick=(id)=>{
        this.handleOpenEdit();
        this.setState({editID:id})
        Axios.get('https://api.coderanwar.com/api/getProduct/'+id)
        .then(response=>{
           this.setState({
            product_name: response.data.product_name,
            product_price: response.data.product_price,
            product_remarks: response.data.product_remarks,
            selected_category: response.data.product_category,
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

 render(){

   const DataList = this.state.dataTable;



    const selectRow = {
    mode: 'radio',
    onSelect:(row, isSelect, rowIndex)=>{ 
        this.setState({selectedID : row['id'], isDisabled: false});
        }
    }

    const columns = [
    {
      dataField: 'product_icon',
      text: 'Product Icon',
      formatter:this.imgCellFormat
    },  
    {
      dataField: 'product_code',
      text: 'Product Code'
    },
    {
     dataField: 'product_name',
      text: 'Product Name'
    }, 
    {
     dataField: 'product_remarks',
      text: 'Product Remarks'
    }, 
    {
     dataField: 'product_price',
      text: 'Product Price'
    },
     {
     dataField: 'product_category',
      text: 'Product Category'
    }

    ];
    const AllCategory = this.state.categories;

    const category_list = AllCategory.map(item=>{
        return <option>{item.cat_name}</option>
    });


 	return(
 		<Fragment>
 			  <div className="w-100 bg-light text-dark container-fluid">
                    <h3 className="text-danger text-center">All Product List</h3>
                    <div>
                      <button onClick={this.handleOpen.bind(this,'Add')} className="btn btn-success btn-sm m-2">Add New Product</button>
                      <button onClick={this.handleOpen.bind(this,'Edit')} className="btn btn-info btn-sm m-2" disabled={this.state.isDisabled}>Edit Product</button>
                      <button className="btn btn-danger btn-sm m-2" disabled={this.state.isDisabled}>Delete Product</button>
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
                        <label className="form-label">Product Name</label>
                        <input onChange={this.onChangeHandler} name="product_name" className="form-control form-control-sm" type="text"/>
                        <label className="form-label">Product Icon</label>
                        <input onChange={this.onProductIconChange} name="product_icon" className="form-control form-control-sm form-control-file" type="file"/>
                        <label className="form-label">Product Price</label>
                        <input onChange={this.onChangeHandler} name="product_price" className="form-control form-control-sm" type="text"/>
                        <label className="form-label">Product Remarks</label>
                        <input onChange={this.onChangeHandler} name="product_remarks" className="form-control form-control-sm" type="text"/>

                        <label className="form-label">Product Category</label>
                        <select value={this.state.selected_category} onChange={this.onCategoryChange} name="product_category" className="form-control form-control-sm form-select">
                            {category_list}
                        </select>
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="btn btn-sm btn-danger" onClick={this.handleClose}>
                            Close
                        </button>
                        <button className="btn btn-sm btn-success"  onClick={this.onSubmitHandler}>
                            {this.state.submitBtn}
                        </button>
                    </Modal.Footer>
                </Modal>
 		</Fragment>
 		)
 }
}
export default ProductList;