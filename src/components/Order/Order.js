import React from 'react';
import classes from './Order.css'

const order = (props) => {


const ingredients = [];

for (let ingredientName in props.ingredients) {
  ingredients.push({
    name: ingredientName,
    amount:  props.ingredients[ingredientName]
  });
}


const ingredientOutput = ingredients.map(ig => {
  if (ig.amount === 0)
    {return null}
  else
  {return <p
        style= {{
          textTransform: 'capitalize',
          margin: '0 8px',
          padding: '5px',
        }}
        key= {ig.name}> <span style ={{'color': '#41a4c8', 'font-weight':'500'}}> {ig.amount} x </span> {ig.name }</p>
        ;}
});


return (

  <div className ={classes.Order}>
  <h3 className= {classes.Title}> ORDER </h3>
    <p> <strong> Ingredients:</strong> {ingredientOutput}  </p>
    <p> Price : <strong> {Number.parseFloat(props.price).toFixed(2)} </strong>  € </p>
  </div>
  );
  }



export default order;
