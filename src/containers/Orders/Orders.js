import React, {Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders'
import classes from './Orders.css'

class Orders extends Component {
  state = {
    orders: [],
    loading: true
  }
  componentDidMount() {
    axios.get('/orders.json')
          .then(res => {
            console.log(res.data);
            const fetchedOrders = [];
            for (let key in res.data) {
              fetchedOrders.push({
                ...res.data[key],
                id: key
              });
            }
            console.log(fetchedOrders);
            this.setState({loading: false, orders: fetchedOrders})
            this.setState({loading: false})
          })
          .catch(err =>
              this.setState({loading: false})
            )
  }

  render () {


    return (
      <div className={classes.Orders}>
        <h3 className={classes.Title}> MY ORDERS</h3>
        {this.state.orders.map(order => (
          <Order
            key={order.id}
            ingredients= {order.ingredients}
            price = {order.price}/>
    ))}
      </div>
      );
  }
}


export default Orders;
