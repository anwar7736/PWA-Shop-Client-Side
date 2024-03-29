import React, {Component, Fragment} from 'react';
import {Card, Col, Container, ListGroup, Row} from "react-bootstrap";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Axios from 'axios';
import cogoToast from 'cogo-toast';

class TransactionList extends React.Component{
    constructor(){
        super()
        this.state = {
            Categories: [],
            Products : [],
            Carts : [],
            TotalOrderValue : '',
        }
    }
    componentDidMount(){
         Axios.get('https://shop-api.coderanwar.online/api/SelectCategory')
         .then(response=>{
             this.setState({Categories : response.data});
         })
         .catch(error=>{

         }) 

         Axios.get('https://shop-api.coderanwar.online/api/SelectProduct')
         .then(response=>{
             this.setState({Products : response.data});
         })
         .catch(error=>{

         }) 

         Axios.get('https://shop-api.coderanwar.online/api/CartList/'+1)
         .then(response=>{
             this.setState({Carts : response.data});
         })
         .catch(error=>{

         })

         Axios.get('https://shop-api.coderanwar.online/api/TotalOrderValue/'+1)
         .then(response=>{
             this.setState({TotalOrderValue : response.data});
         })
         .catch(error=>{

         })
     }
     filterByCategory=(cat_name)=>{
       Axios.get('https://shop-api.coderanwar.online/api/SelectProductByCategory/'+cat_name)
         .then(response=>{
             this.setState({Products : response.data});
         })
         .catch(error=>{

         })
     }

     addToCart=(code,name,price,icon)=>{
            let seller = localStorage.getItem('seller');
            var myData = new FormData;
            myData.append('product_code', code);
            myData.append('product_name', name);
            myData.append('product_qty', 1);
            myData.append('user_id', 1);
            myData.append('product_unit_price', price);
            myData.append('seller_name', seller);
            myData.append('product_icon', icon);
           Axios.post('https://shop-api.coderanwar.online/api/CartAdd',myData)
                 .then(response=>{
                    if(response.status==200 && response.data==1)
                    {
                         cogoToast.success('New Product Added to Card successfully');
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

    cartItemPlus=(id)=>{
        Axios.get('https://shop-api.coderanwar.online/api/CartItemPlus/'+id)
         .then(response=>{
             this.componentDidMount();
             cogoToast.success('Quantity Increased Successfully')
         })
         .catch(error=>{

         })  
    } 

    cartItemMinus=(id)=>{
        Axios.get('https://shop-api.coderanwar.online/api/CartItemMinus/'+id)
         .then(response=>{
             if(response.status==200 && response.data==1)
             {
                this.componentDidMount();
                cogoToast.success('Quantity Decreased Successfully')
             }
             else{
                 cogoToast.error(response.data);
             }
         })
         .catch(error=>{
            cogoToast.error(error);
         })   
    }

    cartItemRemove=(id)=>{
        Axios.get('https://shop-api.coderanwar.online/api/RemoveCartList/'+id)
         .then(response=>{
             this.componentDidMount();
             cogoToast.success('Item Removed Successfully')
         })
         .catch(error=>{

         }) 
     
    }   

    ConfirmSale=()=>{
         Axios.get('https://shop-api.coderanwar.online/api/ConfirmSale')
         .then(response=>{
             if(response.status===200 && response.data===1)
             {
                this.componentDidMount();
                cogoToast.success('Transaction Successfully')
             }
             else if(response.status===200 &&  response.data=='')
             {
                this.componentDidMount();
                cogoToast.error('Something went wrong!');
             }
             else
             {
                this.componentDidMount();
                cogoToast.info(response.data);
             }
             
         })
         .catch(error=>{

         }) 
    }

	next=()=>{
        this.slider.slickNext();
    }
    previous=()=>{
        this.slider.slickPrev();
    }
    render(){
 	
        const settings = {
            dots: false,
            infinite: true,
            speed: 500,
            arrows:false,
            autoplaySpeed:3000,
            autoplay:false,
            slidesToShow: 6,
            slidesToScroll: 1,
            initialSlide: 0,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 6,
                        slidesToScroll: 1,
                        infinite: true,
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1,
                        initialSlide: 2
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1
                    }
                }
            ]
        };

        const CategoryList = this.state.Categories;

        let CategoryView=CategoryList.map((List,i)=>{
            return(
                <div>
                    <h1 onClick={this.filterByCategory.bind(this, List.cat_name)} className="category-name">{List.cat_name}</h1>
                </div>
            )
        })

        const ProductData = this.state.Products;


        let MyView=ProductData.map((List,i)=>{
            return(
                <div onClick={this.addToCart.bind(this,List.product_code,List.product_name,List.product_price, List.product_icon)} className="col-md-2 p-1  text-center col-lg-2 col-sm-3 col-3">
                    <div className="product-card">
                        <img className="product-img"  src={List.product_icon}/>
                        <h1 className="product-name">{List.product_name}</h1>
                        <h1 className="product-price">{List.product_price} TK</h1>
                    </div>
                </div>
            )
        })

        const allCart = this.state.Carts;
        let cart_list = allCart.map((List, i)=>{
                return (
                        <div className="row">
                                        <div className="col text-center">
                                            <img className="cart-image" src={List.product_icon}/>
                                        </div>
                                        <div className="col text-center">
                                            <p className="product-name">{List.product_name}</p>
                                            <p className="product-price">Qty: {List.qty} | {List.product_total_price} TK</p>
                                        </div>
                                        <div className="col text-center">
                                            <div className="input-group">
                                                <button onClick={this.cartItemPlus.bind(this, List.id)} className="circular-btn"><i className="fa fa-plus"/></button>
                                                <button onClick={this.cartItemMinus.bind(this, List.id)} className="circular-btn"><i className="fa fa-minus"/></button>
                                                <button onClick={this.cartItemRemove.bind(this, List.id)} className="circular-btn"><i className="fa fa-trash-alt"/></button>
                                            </div>

                                        </div>
                            </div>
                                       

                                )
                    })
            

        return (
            <Fragment>
                <div  className="w-100 animated  zoomIn container-fluid mt-3">
                                        <h3 className=" text-danger text-center">TRANSACTION</h3>
                                        <button className="btn" onClick={this.previous}><i className="fa fa-angle-left"/></button>
                                 
                                        <Slider ref={c=>(this.slider=c)} {...settings}>
                                            {CategoryView}
                                        </Slider>
                       
                                        <button className="btn" onClick={this.next}><i className="fa fa-angle-right"/></button>

                                <div className="w-100 container-fluid">
                                    {MyView}
                                </div>
                            </div>
                            <div className="container-fluid">
                            <h6 className="text-danger">Cart List</h6>
                            <div className="shadow-sm bg-white text-center ListTransactionCartHeight ListTransaction p-3   ">
                                <div className="container-fluid">
                                   {
                                    cart_list
                                   }
                                   
                                    <hr className="bg-secondary"/>
                                </div>
                            </div>
                            <div className="shadow-sm text-center p-2 bg-white">
                                <h6>Total Due: {this.state.TotalOrderValue} TK</h6>
                                <button onClick={this.ConfirmSale} className="btn btn-info">Confirm Sale</button>
                            </div>

                </div>
                <br/>
                <br/>
                <br/>
            </Fragment>
        );
 }
}
export default TransactionList;