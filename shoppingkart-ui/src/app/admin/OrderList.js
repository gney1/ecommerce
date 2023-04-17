import React, { Component } from 'react';
import Order from './Order';
import { withRouter } from 'react-router-dom';
import './OrderList.css';
import { getAllOrders } from '../../util/APIUtils';

class OrderList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: []
        };
        this.loadOrdersList = this.loadOrdersList.bind(this);
    }

    loadOrdersList() {
        let promise;
        promise = getAllOrders();
        if(!promise) {
            return;
        }
        this.setState({
            isLoading: true
        });
        promise            
        .then(response => {
            console.log(response);
            const orders = this.state.orders.slice();
            this.setState({
                orders: orders.concat(response),
                isLoading: false
            })
        }).catch(error => {
            console.log(error)
            if(error.status==401){
                this.props.handleLogout();
              }
        });  
        
    }

    componentDidMount() {
        this.loadOrdersList();
    }

    componentDidUpdate(nextProps) {
        if(this.props.isAuthenticated !== nextProps.isAuthenticated) {
            // Reset State
            this.setState({
                orders: [],
                isLoading: false
            });    
            this.loadOrdersList();
        }
    }


    render() {
        return (
            <div className="policies-container">
                <h3>Order List</h3>
                <Order orders={this.state.orders} />
                {
                    !this.state.isLoading && this.state.orders.length === 0 ? (
                        <div className="no-products-found">
                            <span>No Orders Found.</span>
                        </div>    
                    ): null
                }              
                
            </div>
        );
    }
}

export default withRouter(OrderList);