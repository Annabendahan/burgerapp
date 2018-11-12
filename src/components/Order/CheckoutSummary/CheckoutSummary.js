import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.css'


const checkoutSummary = (props) => {
  return (
    <div >
      <div className={classes.CheckoutSummary}>
        <Burger ingredients={props.ingredients} price={props.totalPrice}/>
      </div>
        <div className={classes.Buttons}>
      <Button
        btnType="Danger"
        clicked={props.checkoutCancelled} >  CANCEL </Button>
      <Button
        btnType="Success"
        clicked={props.checkoutContinued} > CONTINUE </Button>
        </div>
    </div>
    )

}


export default checkoutSummary;
