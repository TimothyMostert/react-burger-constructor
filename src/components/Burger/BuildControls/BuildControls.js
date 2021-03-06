import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    { label: 'Salad', type: 'salad'},
    { label: 'Bacon', type: 'bacon'},
    { label: 'Cheese', type: 'cheese'},
    { label: 'Meat', type: 'meat'}
];

const BuildControls = (props) => ( 
    <div className={classes.BuildControls} >
    <p>Current Price: <strong>{props.price.toFixed(.2)}</strong></p>
        {controls.map(ctrl => (
           <BuildControl 
            key={ctrl.label} 
            label={ctrl.label}
            disabled={props.disabled[ctrl.type]}
            added={() => props.ingredientAdded(ctrl.type)}
            removed={() => props.ingredientRemoved(ctrl.type)} />
        ))}
        <button
            onClick={props.clicked} 
            className={classes.OrderButton}
            disabled={!props.purchaseable} ><strong>ORDER NOW</strong></button>
    </div>
    );
 
export default BuildControls;