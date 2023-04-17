import React, { Component } from 'react';
import './Order.css';
import {Table } from 'antd';

class Order extends Component {
  constructor(props) {
    super(props);
    this.state = {
        orders: []
    };
}

    render() {
        const columns = [
          {
            title: 'Order Number',
            dataIndex: 'orderNumber',
            key: 'orderNumber',
          },{
              title: 'Order By',
              dataIndex: 'orderBy',
              key: 'orderBy',
            },
            {
              title: 'Ordered On',
              dataIndex: 'orderedDate',
              key: 'orderedDate',
            },
            {
              title: 'Status',
              dataIndex: 'orderStatus',
              key: 'orderStatus',
            },
            {
              title: 'Order Amount',
              dataIndex: 'paymentDetails.amount',
              key: 'paymentDetails.amount',
            },
            {
              title: 'Payment Mode',
              dataIndex: 'paymentDetails.paymentType',
              key: 'paymentDetails.paymentType',
            }
          ];

        return (
          <div>

            <Table columns={columns} dataSource={this.props.orders} />
            
          </div>
            
        );
    }
}

export default Order;