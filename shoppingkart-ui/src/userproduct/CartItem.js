import React, { Component } from 'react';
import './CartItem.css';
import { Button, Modal, notification, Table } from 'antd';
import { deleteCartItem } from '../util/APIUtils';
import { withRouter } from 'react-router-dom';

class CartItem extends Component {

  constructor(props) {
    super(props);
    this.state = {
      cartItems: [],
        user:{}
    };
           this.showConfirm = this.showConfirm.bind(this);

}

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };

  
  
  showConfirm(id,name) {
    const userId= this.props.currentUser.id;
        let promise;
        promise = deleteCartItem(userId,id);
        if(!promise) {
          console.log(promise)
            return;
        }
        promise            
        .then(response => {
          notification.success({
            message: 'ShoppingKart',
            description: name+" Deleted from cart sucesfully!",
        }); 
        this.setState({
          cartItems:response
        })
        this.props.history.push("/");
        }).catch(error => {
          console.log(error)
        });  
      }

    render() {
      
        const columns = [
          {
            title: 'Item Name',
            dataIndex: 'product.name',
            key: 'product.name',
          },{
              title: 'Price',
              dataIndex: 'product.price',
              key: 'product.price',
            },
            {
              title: 'Quantity',
              dataIndex: 'quantity',
              key: 'quantity',
            },{
              title: 'Action',
              dataIndex: '',
              key: 'id',
              render: (text,record) => <Button onClick={() => this.showConfirm(record.id,record.product.name)} size="small" style={{ width: 90 }}>
              Delete
            </Button>,
            }
          ];

        return (
            <Table columns={columns} dataSource={this.props.cartItems} />
        );
    }
}

export default withRouter(CartItem)