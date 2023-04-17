import React, { Component } from 'react';
import './home.css'
import { Button, Card, Col, Icon,notification } from 'antd';
import { addToCart } from './util/APIUtils';
//import { useNavigate } from "react-router-dom";

//const navigate = useNavigate();
const { Meta } = Card;

class ProductHome extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentUser: null,
            isAuthenticated: false,
            product: {}
        };
    }



    addToCart(id,name) {
        console.log(this.props)
        if(this.props.isAuthenticated && this.props.currentUser){
            const cartData = {
                userId: this.props.currentUser.id,
                productId:id,
                quantity: 1
            };  

        addToCart(cartData)
        .then(response => {
            notification.success({
                message: 'ShoppingKart',
                description: name+" Item Added to cart",
            });
        }).catch(error => {
            if(error.status === 401) {
                this.props.handleLogout('/login', 'error', 'You have been logged out. Please login .');    
            } else {
                notification.error({
                    message: 'ShoppingKart',
                    description: error.message || 'failed to add item to cart. Please try again!'
                });              
            }
        });
        }else{
            alert("Please login to add items to cart.")
        }
      }

    render() {
        return (
            <Col span={8}>
            <Card
            
            style={{ width: 240,marginTop:30 }}
            cover={<img alt={this.props.product.name} src={this.props.product.image} />}
            actions={[
                <Button onClick={() => this.addToCart(this.props.product.id,this.props.product.name)}><Icon type="shopping-cart" key="cart" /></Button>
                
              ]}
          >
            <Meta title={this.props.product.brand} description={this.props.product.name} />
            <Meta description={'$. '+this.props.product.price} />
          </Card>
          </Col>
        );
    }

    
}

export default ProductHome;