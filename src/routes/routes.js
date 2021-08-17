import React, {Component, Fragment} from 'react';
import {Route} from 'react-router-dom';
import HomePage from '../pages/index';
import LoginPage from '../pages/login';
import EmailVerify from '../pages/EmailPage';
import OTPVerify from '../pages/OTPPage';
import ForgetPassword from '../pages/ResetPage';
import UserPage from '../pages/users';
import CategoryPage from '../pages/categories';
import ProductPage from '../pages/products';
import StockReceivedPage from '../pages/stockIncrease';
import StockDecreasePage from '../pages/stockDecrease';

class Routes extends React.Component{
 render() {
    return (
        <Fragment>
                <Route exact path="/" render={(props)=> <HomePage {...props} key={ Date.now() } />} />
                <Route exact path="/login" render={(props)=> <LoginPage {...props} key={ Date.now() } />} />
                <Route exact path="/email_verification" render={(props)=> <EmailVerify {...props} key={ Date.now() } />} />
                <Route exact path="/otp_verification" render={(props)=> <OTPVerify {...props} key={ Date.now() } />} />
                <Route exact path="/reset_password" render={(props)=> <ForgetPassword {...props} key={ Date.now() } />} />
                <Route exact path="/users" render={(props)=> <UserPage {...props} key={ Date.now() } />} />
                <Route exact path="/categories" render={(props)=> <CategoryPage {...props} key={ Date.now() } />} />
                <Route exact path="/products" render={(props)=> <ProductPage {...props} key={ Date.now() } />} />
                <Route exact path="/stock_received" render={(props)=> <StockReceivedPage {...props} key={ Date.now() } />} />
                <Route exact path="/stock_adjustment" render={(props)=> <StockDecreasePage {...props} key={ Date.now() } />} />
       
        </Fragment>
    );
  }
}

export default Routes;
