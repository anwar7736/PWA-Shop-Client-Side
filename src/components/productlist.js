import React, {Component, Fragment} from 'react';
import {Button, Card, Col, Container, Modal, Row} from "react-bootstrap";
import DataTable from "react-data-table-component";
import Axios from 'axios';
import cogoToast from 'cogo-toast';

class ProductList extends React.Component{
	constructor() {
        super();
        this.state={
            dataTable : [],
            show:false,
            showEdit:false,
            deleteID:"",
            editID:"",
            categories : [],
            product_name : '',
            product_icon : '',
            product_price : '',
            product_remarks : '',
            selected_category : 'Mobile',
        }
    }
        componentDidMount(){
         Axios.get('https://shop-api.coderanwar.online/api/SelectProduct')
         .then(response=>{
             this.setState({dataTable : response.data});
         })
         .catch(error=>{

         })
         Axios.get('https://shop-api.coderanwar.online/api/SelectCategory')
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
            Axios.post('https://shop-api.coderanwar.online/api/AddProduct',myData)
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
            Axios.post('https://shop-api.coderanwar.online/api/UpdateProduct',myData)
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

    handleClose=()=>{
        this.setState({ show:false})
    }

    resetForm=()=>{
        this.setState({ cat_name : '',cat_img : ''})
    }

    handleOpen=()=>{
        this.setState({ show:true})
    }

    handleCloseEdit=()=>{
        this.setState({ showEdit:false})
    }

    handleOpenEdit=()=>{
        this.setState({ showEdit:true})
    }

    deleteIconOnClick=(id)=>{

             Axios.get('https://shop-api.coderanwar.online/api/DeleteProduct/'+id)
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
        Axios.get('https://shop-api.coderanwar.online/api/getProduct/'+id)
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


 render(){
    const AllCategory = this.state.categories;
    const category_list = AllCategory.map(item=>{
        return <option>{item.cat_name}</option>
    })
 	const columns = [
            {
                name: 'Product Icon',
                selector: 'product_icon',
                sortable: true,
                cell: row => <img src={row.product_icon} className="cat-icon"/>


            },
            {
                name: 'Product Name',
                selector: 'product_name',
                sortable: true,

            },
            {
                name: 'Product Code',
                selector: 'product_code',
                sortable: true,
            },
            {
                name: 'Product Remarks',
                selector: 'product_remarks',
                sortable: true,
            },
            {
                name: 'Product Price',
                selector: 'product_price',
                sortable: true,
            },
            {
                name: 'Product Category',
                selector: 'product_category',
                sortable: true,
            },

            {
                name: 'Delete',
                selector: 'id',
                sortable: false,
                cell: row => <button onClick={()=>{
                    if(window.confirm('Do you want to delete this product?'))
                    {
                          this.deleteIconOnClick(row.id)
                    }
                } 
            }
                     className="btn text-danger"><i className="fa fa-trash-alt"/></button>
            },
            {
                name: 'Edit',
                selector: 'id',
                sortable: false,
                cell: row => <button onClick={this.editIconOnClick.bind(this,row.product_code)}  className="btn text-primary"><i className="fa fa-edit"/></button>
            },
        ];

 	return(
 		<Fragment>
 			  <div className="container-fluid mt-3 animated zoomIn">
                    <h3 className="text-danger text-center">All Product List</h3>
                    <button onClick={this.handleOpen} className="float-right circular-btn"><i className="fa fa-plus"/></button>
                        <hr className="bg-secondary"/>
                        <DataTable
                            noHeader={true}
                            paginationPerPage={5}
                            pagination={true}
                            columns={columns}
                            data={this.state.dataTable}
                        />
                </div>
                <br/>
                <br/>
                <br/>
                <Modal animation={false} className="animated zoomIn" show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header>
                        <h6>Add New Product</h6>
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
                            Save Changes
                        </button>
                    </Modal.Footer>
                </Modal>

                <Modal animation={false} className="animated zoomIn" show={this.state.showEdit} onHide={this.handleCloseEdit}>
                    <Modal.Header>
                        <h6>Edit Product</h6>
                    </Modal.Header>
                    <Modal.Body>

                        <label className="form-label">Product Name</label>
                        <input value={this.state.product_name} name="product_name" onChange={this.onChangeHandler} className="form-control form-control-sm" type="text"/>
                        <label className="form-label">Product Icon</label>
                        <input name="product_icon" onChange={this.onProductIconChange} className="form-control form-control-sm form-control-file" type="file"/>
                        <label className="form-label">Product Price</label>
                        <input value={this.state.product_price} name="product_price" onChange={this.onChangeHandler} className="form-control form-control-sm" type="text"/>
                        <label className="form-label">Product Remarks</label>
                        <input value={this.state.product_remarks} name="product_remarks" onChange={this.onChangeHandler} className="form-control form-control-sm" type="text"/>

                        <label className="form-label">Product Category</label>
                        <select onChange={this.onCategoryChange} value={this.state.selected_category} className="form-control form-control-sm form-select">
                            {category_list}
                        </select>


                    </Modal.Body>
                    <Modal.Footer>
                        <button className="btn btn-sm btn-danger" onClick={this.handleCloseEdit}>
                            Close
                        </button>
                        <button className="btn btn-sm btn-primary"  onClick={this.onUpdateHandler}>
                            Save Changes
                        </button>
                    </Modal.Footer>
                </Modal>
 		</Fragment>
 		)
 }
}
export default ProductList;