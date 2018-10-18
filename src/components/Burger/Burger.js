import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
  let transformedIngredients = Object.keys(props.ingredients)
  .map( igKey => {
    console.log(Object.keys(props.ingredients)); // (salad, meat, cheese, bacon)
    console.log (igKey); // salad / meat / cheese / bacon
    console.log(props.ingredients[igKey]); // 0, 1 , 2 , 3 .... nb de salad, bacon..
    return [...Array(props.ingredients[igKey])].map((_, i) => {
      console.log([...Array(props.ingredients[igKey])]); // ( _, _ )
      return <BurgerIngredient key={igKey + i} type={igKey} />;
    });
  })
  .reduce((arr, el) => {
    return arr.concat(el)
    }, []);

  console.log(transformedIngredients);

    if (transformedIngredients.length === 0) {
        transformedIngredients = <p> Please start adding ingredients! </p>
    };


  return (
    <div className= {classes.Burger}>
    <h1 className={classes.Title} > MAKE YOUR OWN BURGER !</h1>
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
    );
};

export default burger;
