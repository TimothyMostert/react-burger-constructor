import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const Burger = (props) => {

    let trnasformedIngredients = Object.keys(props.ingredients)
        .map(key => {
            return [...Array(props.ingredients[key])].map((_, i) => {
            return  <BurgerIngredient key={key + i} type={key} />;
            });
        })
        .reduce((arr, el) => {
                return arr.concat(el);
            }, []);
    
    if (trnasformedIngredients.length === 0) {
        trnasformedIngredients = <p>Please start adding ingredients!</p>
    }
    

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {trnasformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
};
 
export default Burger;