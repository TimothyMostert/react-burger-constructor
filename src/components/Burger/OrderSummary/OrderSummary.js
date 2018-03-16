import React, { Fragment } from 'react';
import Button from '../../UI/Button/Button';

const OrderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
        .map(key => {
            return ( 
                <li key={key} ><span style={{textTransform: 'capitalize'}}>{key}</span>: {props.ingredients[key]}</li>
                );
        });
    return (
        <Fragment>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price: R{props.totalPrice.toFixed(2)}</strong></p>
            <p>Continue to Checkout?</p>
            <Button clicked={props.clickedCancel} btnType="Danger" >CANCEL</Button>
            <Button clicked={props.clickedContinue} btnType="Success" >CONTINUE</Button>
        </Fragment>
    );

};
 
export default OrderSummary;