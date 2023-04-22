import React, { Component } from 'react';
import { checkout, checkUsernameAvailability, deleteCartItem, getAllCartItems, getCurrentUser } from '../util/APIUtils';
import { withRouter } from 'react-router-dom';
import './Cart.css';
import { Button, Col, Modal, Row,notification, Input, Form } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import { NAME_MAX_LENGTH, NAME_MIN_LENGTH } from '../constants';
const { confirm } = Modal;

class Checkout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: '',
            cardNumber: {
                value: ''
            },
            expiry: {
                value: ''
            },
            cvv: {
                value: ''
            },
            cardName:{
                value:''
            },
            paymentType:{
                value:'CARD'
            },
            amount:{
                number:0
            },
            currentUser: null,
            isAuthenticated: false,
            total:0,
            cost:0,
            cartItems: [],
            isModalOpen:false,
            orderNumber:''

        };
        this.loadCartItems = this.loadCartItems.bind(this);
        this.loadCurrentUser = this.loadCurrentUser.bind(this);
        this.showCODConfirm = this.showCODConfirm.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.isFormInvalid = this.isFormInvalid.bind(this);
        this.handleOk = this.handleOk.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.showModal = this.showModal.bind(this);
    }

     
  loadCurrentUser() {
    getCurrentUser()
    .then(response => {
      this.setState({
        currentUser: response,
        userId:response.id,
        isAuthenticated: true,
        isLoading: false
      });
      this.loadCartItems();
    }).catch(error => {
      this.setState({
        isLoading: false
      });  
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

    
  
  validateName = (name) => {
    if(name.length < NAME_MIN_LENGTH) {
        return {
            validateStatus: 'error',
            errorMsg: `Name is too short (Minimum ${NAME_MIN_LENGTH} characters needed.)`
        }
    } else if (name.length > NAME_MAX_LENGTH) {
        return {
            validationStatus: 'error',
            errorMsg: `Name is too long (Maximum ${NAME_MAX_LENGTH} characters allowed.)`
        }
    } else {
        return {
            validateStatus: 'success',
            errorMsg: null,
          };            
    }
}

validateCvv = (name) => {
    if(name.length != 3) {
        return {
            validateStatus: 'error',
            errorMsg: `CVV must be 3 digits only`
        }
    } else {
        return {
            validateStatus: 'success',
            errorMsg: null,
          };            
    }
}
validateExpiry = (name) => {
    if(name.length != 5) {
        return {
            validateStatus: 'error',
            errorMsg: `Expiry should be mm/yy format`
        }
    } else {
        return {
            validateStatus: 'success',
            errorMsg: null,
          };            
    }
}
  

  handleInputChange(event, validationFun) {
    const target = event.target;
    const inputName = target.name;        
    const inputValue = target.value;

    this.setState({
        [inputName] : {
            value: inputValue,
            ...validationFun(inputValue)
        }
    });
}

handleNumberChange(event, validationFun) {
    const target = event.target;
    const inputName = target.name;        
    const inputValue = target.value;

    this.setState({
        [inputName] : {
            number: inputValue,
            ...validationFun(inputValue)
        }
    });

}

showCODConfirm() {
    const orderRequest = {
        userId: this.state.userId,
        cardNumber: this.state.cardNumber.value,
        expiry: this.state.expiry.value,
        cvv: this.state.cvv.value,
        cardName: this.state.cardName.value,
        paymentType: "COD",
        amount: this.state.cost,
    };
        let promise;
        promise = checkout(orderRequest);
        if(!promise) {
            return;
        }
        promise            
        .then(response => {
            this.setState({
                orderNumber: response.orderNumber
            });
            this.showModal();
            notification.success({
                message: 'ShoppingKart',
                description: "Thank you! You're order has been placed sucesfully for COD !",
            });
            //this.props.history.push("/");
        }).catch(error => {
          console.log(error)
        });  
  }

handleSubmit(event) {
    event.preventDefault();

    const orderRequest = {
        userId: this.state.userId,
        cardNumber: this.state.cardNumber.value,
        expiry: this.state.expiry.value,
        cvv: this.state.cvv.value,
        cardName: this.state.cardName.value,
        paymentType: this.state.paymentType.value,
        amount: this.state.cost,
    };
    checkout(orderRequest)
    .then(response => {
        this.setState({
            orderNumber: response.orderNumber
        });
        this.showModal();
        notification.success({
            message: 'ShoppingKart',
            description: "Thank you! You're order has been placed sucesfully!",
        });          
        
    }).catch(error => {
        notification.error({
            message: 'ShoppingKart',
            description: error.message || 'Sorry! Something went wrong. Please try again!'
        });
        if(error.status==401){
            this.props.handleLogout();
          }
    });
}

isFormInvalid() {
    return !(
        this.state.cardNumber.validateStatus === 'success' &&
        this.state.expiry.validateStatus === 'success' &&
        this.state.cvv.validateStatus === 'success' &&
        this.state.cardName.validateStatus === 'success'     );
}

showModal() {
    console.log("showmaol")
    this.setState({
        isModalOpen: true
    });
};

handleOk () {
    this.setState({
        isModalOpen: false
    });
    this.props.history.push("/");
};

handleCancel() {
    this.setState({
        isModalOpen: false
    });
};


    render() {
        
        return (
            <div className="container">                
                {
                    !this.state.isLoading && this.state.cartItems.length === 0 ? (
                        <div className="no-policies-found">
                            <span>No Items in Cart.</span>
                        </div>    
                    ): 
                    (
                        <div>
                        <Row>
                            <Col span={6}>
                                <div className='mh-400 cart-summary-box'>
                                    <Row className='mh-50'>
                                        <Col span={18}> <span className='header'>Summary</span></Col>
                                        
                                      </Row>
                                    <Row className='mh-50'>
                                        <Col span={2}></Col>
                                        <Col span={16}> <span className='sub-header'>Total Items</span></Col>
                                        <Col span={4}><span className='sub-header'>{this.state.total}</span></Col>
                                    </Row>
                                    <Row className='mh-50'>
                                        <Col span={2}></Col>
                                        <Col span={16}> <span className='sub-header-number'>Total Cost</span></Col>
                                        <Col span={4}><span className='sub-header-number'>{this.state.cost}$</span></Col>
                                    </Row>
                                    <Row className='mh-50'></Row>
                                    <Row className='mh-50'>
                                    </Row>
                                </div>
                            </Col>
                            <Col span={2}></Col>
                            <Col span={16}>
                                <div className='mh-400 cart-summary-box'>
                                <Form labelCol={{span: 8,}} wrapperCol={{span: 16,}} onSubmit={this.handleSubmit} className="signup-form">
                                    <FormItem 
                                        label="Card Number"
                                        validateStatus={this.state.cardNumber.validateStatus}
                                        help={this.state.cardNumber.errorMsg}>
                                        <Input 
                                            size="large"
                                            name="cardNumber"
                                            autoComplete="off"
                                            placeholder="Credit/Debit Card Number"
                                            value={this.state.cardNumber.value} 
                                            onChange={(event) => this.handleInputChange(event, this.validateName)} />    
                                    </FormItem>
                                    <FormItem 
                                        label="Cvv"
                                        validateStatus={this.state.cvv.validateStatus}
                                        help={this.state.cvv.errorMsg}>
                                        <Input 
                                            size="large"
                                            name="cvv"
                                            autoComplete="off"
                                            placeholder="CVV"
                                            value={this.state.cvv.value} 
                                            onChange={(event) => this.handleInputChange(event, this.validateCvv)} />    
                                    </FormItem>
                                    <FormItem label="Expiry"
                                        hasFeedback
                                        validateStatus={this.state.expiry.validateStatus}
                                        help={this.state.expiry.errorMsg}>
                                        <Input 
                                            size="large"
                                            name="expiry" 
                                            autoComplete="off"
                                            placeholder="Expiry Date of card in MM/YY format"
                                            value={this.state.expiry.value} 
                                            onChange={(event) => this.handleInputChange(event, this.validateExpiry)} />    
                                    </FormItem>
                                    <FormItem 
                                        label="Card Holder Name"
                                        hasFeedback
                                        validateStatus={this.state.cardName.validateStatus}
                                        help={this.state.cardName.errorMsg}>
                                        <Input 
                                            size="large"
                                            name="cardName" 
                                            type="text"
                                            autoComplete="off"
                                            placeholder="Card Holder Name" 
                                            value={this.state.cardName.value} 
                                            onChange={(event) => this.handleInputChange(event, this.validateName)} />    
                                    </FormItem>
                                    
                                    <FormItem span={24}>
                                        <Col span={12}>
                                        <Button type="primary" 
                                            htmlType="submit" 
                                            size="large" 
                                            className="signup-form-button"
                                            disabled={this.isFormInvalid()}>Pay & Confirm Order</Button>
                                        </Col>
                                        <Col span={1}></Col>
                                    </FormItem>
                                </Form>
                                <Row>
                                    <Col span={11}>
                                        <Button type="primary" 
                                            onClick={this.showCODConfirm} 
                                            size="large" 
                                            className="signup-form-button"
                                            >Pay With Cash On Delivery</Button>
                                    </Col>

                                    </Row>
                                </div>
                            </Col>
                        </Row>
                        <Modal title="Order Success" visible={this.state.isModalOpen} onOk={this.handleOk}>
                            <p>Your Order has been placed sucessfully.</p>
                            <p>Order reference number is {this.state.orderNumber}</p>
                        </Modal>
					</div>

                    )
                }              
                
            </div>
        );
    }
}

export default withRouter(Checkout);