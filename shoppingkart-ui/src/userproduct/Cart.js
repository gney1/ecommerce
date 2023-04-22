import React, { Component } from 'react';
import { deleteCartItem, getAllCartItems, getCurrentUser } from '../util/APIUtils';
import CartItem from './CartItem';
import { withRouter } from 'react-router-dom';
import './Cart.css';
import { Button, Col, Modal, Row } from 'antd';
const { confirm } = Modal;

class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            templateType:'',
            currentUser: null,
            isAuthenticated: false,
            total:0,
            cost:2,
            cartItems: []
        };
        this.loadCartItems = this.loadCartItems.bind(this);
        this.loadCurrentUser = this.loadCurrentUser.bind(this);
       // this.showConfirm = this.showConfirm.bind(this);
        this.routeChange = this.routeChange.bind(this);

    }

     
  loadCurrentUser() {
    getCurrentUser()
    .then(response => {
      this.setState({
        currentUser: response,
        isAuthenticated: true,
        isLoading: false
      });
      this.loadCartItems();
    }).catch(error => {
        if(error.status==401){
            this.props.handleLogout();
          }  
    });
  }

    loadCartItems() {
        console.log(this.state.currentUser);
        let promise;
        promise = getAllCartItems(this.state.currentUser.id);
        if(!promise) {
            return;
        }
        this.setState({
            isLoading: true
        });
        promise
        .then(response => {
            console.log(response);
            const cartItems = this.state.cartItems.slice();
            this.setState({
                cartItems: response.cartItems,
                total:response.totalQuantity,
                cost:response.totalCost,
                isLoading: false
            })
        }).catch(error => {
            this.setState({
                isLoading: false
            })
        });  
        
    }

    componentDidMount() {
        this.loadCurrentUser();
    }

    componentDidUpdate(nextProps) {
        if(this.props.isAuthenticated !== nextProps.isAuthenticated) {
            // Reset State
            this.setState({
                cartItems: [],
                isLoading: false
            });    
            this.loadCartItems();
        }
    }

    

  routeChange() {
    let path = '/checkout';
    this.props.history.push(path);
  }


    render() {
        return (
            <div className="container">
                <h3>Cart Items</h3>
                
                {
                    !this.state.isLoading && this.state.cartItems.length === 0 ? (
                        <div className="no-policies-found">
                            <span>No Items in Cart.</span>
                        </div>    
                    ): 
                    (
                        <div>
                        <Row>
                            <Col span={16}>
                            <CartItem cartItems={this.state.cartItems} currentUser={this.state.currentUser}/>
                            </Col>
                            <Col span={2}></Col>
                            <Col span={6}>
                                <div className='mh-400 cart-summary-box'>
                                    <Row className='mh-50'>
                                        <Col span={18}> <span className='header'>Summary</span></Col>
                                        
                                      </Row>
                                    <Row className='mh-50'>
                                        <Col span={2}></Col>
                                        <Col span={16}> <span className='sub-header'>Total Items</span></Col>
                                        <Col span={5}><span className='sub-header-number'>{this.state.total}</span></Col>
                                    </Row>
                                    <Row className='mh-50'>
                                        <Col span={2}></Col>
                                        <Col span={16}> <span className='sub-header'>Total Cost</span></Col>
                                        <Col span={5}><span className='sub-header-number'>{this.state.cost}$</span></Col>
                                    </Row>
                                    <Row className='mh-50'></Row>
                                    <Row className='mh-50'>
                                        <Button type='primary'  onClick={this.routeChange}>Checkout</Button>
                                    </Row>
                                </div>
                            </Col>
                        </Row>
					</div>

                    )
                }              
                
            </div>
        );
    }
}

export default withRouter(Cart);