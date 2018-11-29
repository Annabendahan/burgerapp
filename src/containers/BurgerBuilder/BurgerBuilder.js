
import React, {Component} from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../components/withErrorHandler/withErrorHandler'
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';





class BurgerBuilder extends Component {

    state = {

      purchasable: false,
      purchasing: false,
      loading: false
    }

    updatePurchaseState (ingredients ) {
      const sum = Object.keys( ingredients)
      .map( igKey => {
        return ingredients[igKey];
      })
      .reduce( (sum, el ) => {
        return sum + el;
      }, 0);
      return sum > 0;
    }


    // addIngredientHandler = (type) => {
    //   const oldCount = this.state.ingredients[type];
    //   const updatedCount = oldCount + 1;
    //   const updatedIngredients = {
    //     ...this.state.ingredients
    //   }
    //   updatedIngredients[type] = updatedCount;
    //   const priceAddition = INGREDIENT_PRICES[type];
    //   const oldPrice = this.state.totalPrice;
    //   const newPrice = oldPrice+ priceAddition;

    //   this.setState( {totalPrice: newPrice, ingredients: updatedIngredients});
    //   this.updatePurchaseState(updatedIngredients);
    // }

    // removeIngredientHandler = (type) => {
    //   const oldCount = this.state.ingredients[type];
    //   if (oldCount<=0){
    //     return;
    //   }
    //   const updatedCount = oldCount - 1;
    //   const updatedIngredients = {
    //     ...this.state.ingredients
    //   }
    //   updatedIngredients[type] = updatedCount;
    //   const priceDeduction = INGREDIENT_PRICES[type];
    //   const oldPrice = this.state.totalPrice;
    //   const newPrice = oldPrice - priceDeduction;

    //   this.setState( {totalPrice: newPrice, ingredients: updatedIngredients});
    //   this.updatePurchaseState(updatedIngredients);
    // }

    purchaseHandler = () => {
    //     this.setState({purchasing: true});
    // }

    // purchaseCancelHandler = () => {
    //   this.setState({purchasing: false});
    // }

    // purchaseContinueHandler = () => {
    //
    //   // alert('You continue!');
    //


    this.props.history.push('/checkout');
    }

  render () {
    const disabledInfo = {
      ...this.props.ings
    };
    for (let key in disabledInfo) {
        disabledInfo[key] = disabledInfo[key] <= 0
    }
    let orderSummary = <OrderSummary
          ingredients={this.props.ings}
          purchaseCancelled= {this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
          price= {this.props.tp}/>;

      if (this.state.loading) {
        orderSummary = <Spinner />;
      }

    return (
      <Aux>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        <Burger ingredients={this.props.ings }/>
        <BuildControls
          ingredientAdded={this.props.onIngredientAdded}
          ingredientRemoved={this.props.onIngredientRemoved}
          disabled = {disabledInfo}
          purchasable={this.updatePurchaseState(this.props.ings)}
          price={this.props.tp}
          ordered={this.purchaseHandler}/>
      </Aux>
      );
  }
}
const mapStateToProps = state => {
  return {
    ings : state.ingredients,
    tp : state.totalPrice
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName }),
    onIngredientRemoved: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName })
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder);
