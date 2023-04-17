import React, { Component } from 'react';
import './App.css';
import {
  Route,
  withRouter,
  Switch
} from 'react-router-dom';

import { getCurrentUser } from '../util/APIUtils';
import { ACCESS_TOKEN } from '../constants';


import Login from '../user/login/Login';
import Signup from '../user/signup/Signup';
import AppHeader from '../common/AppHeader';
import NotFound from '../common/NotFound';
import PrivateRoute from '../common/PrivateRoute';

import { Layout, notification } from 'antd';
import NewProduct from '../product/NewProduct';
import Landing from '../landingpage';
import ProductList from '../product/ProductList';
import Checkout from '../userproduct/Checkout';
import Cart from '../userproduct/Cart';
import OrderList from './admin/OrderList';
const { Content } = Layout;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      isAuthenticated: false,
      isLoading: true
    }
    this.handleLogout = this.handleLogout.bind(this);
    this.loadCurrentUser = this.loadCurrentUser.bind(this);
    this.handleLogin = this.handleLogin.bind(this);

    notification.config({
      placement: 'topRight',
      top: 70,
      duration: 3,
    });    
  }

  loadCurrentUser(isLogin) {
    console.log("Loading user App.js")
    getCurrentUser()
    .then(response => {
      this.setState({
        currentUser: response,
        isAuthenticated: true,
        isLoading: false
      });
      if(isLogin){
        if(response.role === "ADMIN"){
          this.props.history.push("/products");
        }else{
          this.props.history.push("/");
        }
      }
    }).catch(error => {
      if(error.status===401){
        this.handleLogout();
      }
      this.setState({
        isLoading: false
      });  
    });
  }

  componentDidMount() {
    this.loadCurrentUser(false);
  }

  handleLogout(redirectTo="/login", notificationType="success", description="You're logged out.") {
    localStorage.removeItem(ACCESS_TOKEN);

    this.setState({
      currentUser: null,
      isAuthenticated: false
    });

    this.props.history.push(redirectTo);
    
    notification[notificationType]({
      message: 'ShoppingKart',
      description: description,
    });
  }

  handleLogin() {
    notification.success({
      message: 'ShoppingKart',
      description: "You're successfully logged in.",
    });
    this.loadCurrentUser(true);
  }

  render() {
    
    return (
        <Layout className="app-container">
          <AppHeader isAuthenticated={this.state.isAuthenticated} 
            currentUser={this.state.currentUser} 
            onLogout={this.handleLogout} />
          <Content className="app-content">
            <div className="">
              <Switch>
                <Route exact path="/" component={Landing}></Route>
                <Route path="/login" render={(props) => <Login onLogin={this.handleLogin} {...props} />}></Route>
                <Route path="/signup" component={Signup}></Route>
                <PrivateRoute authenticated={this.state.isAuthenticated} path="/products" component={ProductList} handleLogout={this.handleLogout}></PrivateRoute>
                <PrivateRoute authenticated={this.state.isAuthenticated} path="/orders" component={OrderList} handleLogout={this.handleLogout}></PrivateRoute>
                <PrivateRoute authenticated={this.state.isAuthenticated} path="/cart" component={Cart} handleLogout={this.handleLogout}></PrivateRoute>
                <PrivateRoute authenticated={this.state.isAuthenticated} path="/checkout" component={Checkout} handleLogout={this.handleLogout}></PrivateRoute>
                <PrivateRoute authenticated={this.state.isAuthenticated} path="/product/new" component={NewProduct} handleLogout={this.handleLogout}></PrivateRoute>
                <Route component={NotFound}></Route>
              </Switch>
            </div>
          </Content>
        </Layout>
    );
  }
}

export default withRouter(App);
