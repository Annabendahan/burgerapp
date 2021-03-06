import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'
import { connect } from 'react-redux'



class ContactData extends Component {
  state = {
    orderForm: {
          name: {
            elementType: 'input',
            elementConfig: {
              type : 'text',
              placeholder: 'Your Name '
            },
            value : '',
          },
          street: {
            elementType: 'input',
            elementConfig: {
              type : 'text',
              placeholder: 'Street '
            },
            value : '',
          },
          number: {
            elementType: 'input',
            elementConfig: {
              type : 'text',
              placeholder: 'Number '
            },
            value : '',
          },
          email: {
            elementType: 'input',
            elementConfig: {
              type : 'text',
              placeholder: 'Email '
            },
            value : '',
          },
          deliveryMethod: {
            elementType: 'select',
            elementConfig: {
              options: [
                  { value: 'fastest', displayValue: 'Fastest'},
                  { value: 'cheapest', displayValue: 'Cheapest'}
              ]
            },
            value : '',
          },
    },
    loading: false
  };

  orderHandler = (event) => {
    event.preventDefault();

      this.setState( {loading: true} );
        const order = {
        ingredients: this.props.ings,
        price: this.props.tp
      }

      axios.post('/orders.json', order)
          .then(response => {
            this.setState({loading: false});
            this.props.history.push('/');
          })
          .catch(error => {
            this.setState({loading: false});
          });
  }

  render () {

    const formElementsArray = [];
    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key]
      });
    }
    let form = (<form>
          <Input inputtype="input" type ="text" name="name" placeholder ="Your name" />
          {formElementsArray.map(formElement => (
            <Input
            key={formElement.id}
            elementType= {formElement.config.elementType}
            elementConfig= {formElement.config.elementConfig}
            value= {formElement.config.value} />
            ))}
          <Button btnType="Success" clicked={this.orderHandler} > ORDER </Button>
        </form>);
    if (this.state.loading) {
      form = <Spinner />;
    }
     return(
      <div className={classes.ContactData}>
        <h4> Enter your contact data </h4>
        {form}
      </div>
    )
  }
}


const mapStateToProps = state =>{
  return {
  ings: state.ingredients,
  tp: state.totalPrice
 }
}

export default connect(mapStateToProps)(ContactData) ;
