import React, {Component, Fragment} from 'react';
import {Nav, Navbar, NavDropdown} from 'react-bootstrap';
import {Link} from "react-router-dom";
import {Redirect} from "react-router";

class DesktopNavbar extends React.Component{
    constructor(){
        super()
        this.state = {
            login: '',
        }
    }
    componentDidMount(){
           if(localStorage.getItem('login')!=null)
            {
                this.setState({login : true});
            }
            else{
                this.setState({login : false});
            }
    }
    Login=()=>{
        localStorage.setItem('name', 'Anwar');
        alert(localStorage.getItem('name'))
    }
    Logout=()=>{
        localStorage.removeItem('admin');
        localStorage.removeItem('worker');
        localStorage.removeItem('login');
        localStorage.removeItem('seller');
        
    }
 render(){
    
    const login_logout_btn = 
        
        this.state.login==true ? 
                            <>
                                <Nav.Link className="text-center" onClick={this.Logout}>
                                        <div className="nav-item-div">
                                            <i className="fas mx-1 fas fa-power-off"/>Logout
                                        </div>
                                </Nav.Link>
                            </>
                          : 
                          <>
                              <Nav.Link className="text-center">
                                    <Link to="/login">
                                        <div className="nav-item-div">
                                            <i className="fas mx-1 fas fa-power-off"/>Login
                                        </div>
                                    </Link>
                                </Nav.Link>

                          </>
 	return(
 		<Fragment>
 			<Navbar className="w-100 nav-bar sticky-top" collapseOnSelect expand="lg" variant="light">
				  <Link to="/">
				  <Navbar.Brand style={{cursor:'pointer'}}>
				  		<img className="nav-logo" src="../shop-icon.png" alt="NavLogo"/>
				  </Navbar.Brand>
				  </Link>
				  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
				  <Navbar.Collapse id="responsive-navbar-nav">
				    <Nav className="mr-auto">
				      <Nav.Link className="text-center">
				      	 	<Link activeClassName="d-none" to="/">
				      	 		<div className="nav-item-div">
				      	 		 	<i className="fa mx-1 fa-home"/> Dashboard
				      			 </div>
				      	 		
				      	 	</Link>
				      </Nav.Link>
				      <Nav.Link className="text-center">
				      	 	<Link to="/users">
				      	 		<div className="nav-item-div">
				      	 		 	<i className="fa mx-1 fa-user-alt"/> User List
				      			 </div>
				      	 		
				      	 	</Link>
				      </Nav.Link>
				      <Nav.Link className="text-center" >
                                <Link to="/categories">
                                    <div className="nav-item-div">
                                        <i className="fa mx-1 fa-list-ul"/>Category
                                    </div>
                                </Link>
                            </Nav.Link>

                            <Nav.Link className="text-center" >
                                <Link to="/products">
                                    <div className="nav-item-div">
                                        <i className="fa mx-1 fa-shopping-bag"/>Product
                                    </div>
                                </Link>
                            </Nav.Link>

                            <Nav.Link className="text-center" >
                                <Link to="/transactions">
                                    <div className="nav-item-div">
                                        <i className="fa mx-1 fa-money-bill"/>Transaction
                                    </div>
                                </Link>
                            </Nav.Link>
                            <NavDropdown className="nav-item-div" title="Others" id="navbarScrollingDropdown">
                                 <NavDropdown.Item>
                                    <Link to="/stock_received">Stock Received</Link>
                                </NavDropdown.Item>
                                <NavDropdown.Item>
                                    <Link to="/stock_adjustment">Stock Decrease</Link>
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                          </NavDropdown>
                          <i className="fa fa-report-alt"/><NavDropdown className="nav-item-div" title="Reports" id="navbarScrollingDropdown">
                                 <NavDropdown.Item>
                                    <Link to="/currentStock">Current Stock Report</Link>
                                </NavDropdown.Item>
                                <NavDropdown.Item>
                                    <Link to="/stockReceivedReport">Stock Received Report</Link>
                                </NavDropdown.Item>
                                <NavDropdown.Item>
                                    <Link to="/stockDecreaseReport">Stock Decrease Report</Link>
                                </NavDropdown.Item>
                                <NavDropdown.Item>
                                    <Link to="/salesReport">Sales Report</Link>
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                          </NavDropdown>
                           {
                            login_logout_btn
                           }
				    </Nav>

				  </Navbar.Collapse>
			</Navbar>
 		</Fragment>
 		)
 }
}
export default DesktopNavbar;
