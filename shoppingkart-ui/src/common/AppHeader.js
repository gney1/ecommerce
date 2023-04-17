import React, { Component } from 'react';
import {
    Link,
    withRouter
} from 'react-router-dom';
import './AppHeader.css';
import { Layout, Menu } from 'antd';
const Header = Layout.Header;
    
class AppHeader extends Component {
    constructor(props) {
        super(props);   
        this.handleMenuClick = this.handleMenuClick.bind(this);   
    }

    handleMenuClick({ key }) {
      if(key === "logout") {
        this.props.onLogout();
      }
    }

    render() {
      console.log(this.props.isAuthenticated);

        let menuItems;
        console.log(this.props.currentUser) 
        if(this.props.isAuthenticated && this.props.currentUser) {
          if(this.props.currentUser.role === 'ADMIN'){
            menuItems = [
              <Menu.Item key="newproduct" className="dropdown-item">
                <Link to={`/product/new`}>Add new Product</Link>
              </Menu.Item>,
              <Menu.Item key="products" className="dropdown-item">
                <Link to={`/products`}>Existing Products</Link> 
              </Menu.Item>,
              <Menu.Item key="orders" className="dropdown-item">
              <Link to={`/orders`}>Orders</Link> 
            </Menu.Item>,
              <Menu.Item onClick={this.handleMenuClick} key="logout" className="dropdown-item">
                <Link to={`/logout`}>Logout</Link>
              </Menu.Item>
            ]
          }else{
            menuItems = [
              <Menu.Item key="cart" className="dropdown-item">
                <Link to={`/cart`}>Cart </Link>
              </Menu.Item>,
              <Menu.Item onClick={this.handleMenuClick} key="logout" className="dropdown-item">
               <Link to={`/logout`}>Logout</Link>
              </Menu.Item>
          
          ]; 
        }
        } else {
          menuItems = [
            <Menu.Item key="/login">
              <Link to="/login">Login</Link>
            </Menu.Item>,
            <Menu.Item key="/signup">
              <Link to="/signup">Signup</Link>
            </Menu.Item>                  
          ];
        }

        return (
            <Header className="app-header">
            <div className="">
              <div className="app-title" >
                <Link to="/">ShoppingKart</Link>
              </div>
              <Menu
                className="app-menu"
                mode="horizontal"
                selectedKeys={[this.props.location.pathname]}
                style={{ lineHeight: '64px' }} >
                  
                  {menuItems}
              </Menu>
            </div>
          </Header>
        );
    }
}

export default withRouter(AppHeader);