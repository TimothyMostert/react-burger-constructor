import React, { Fragment } from 'react';
import classes from './SideDraw.css';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';

const SideDraw = (props) => {
    let attachedClasses = [classes.SideDraw, classes.Close];
    if (props.open) {
        attachedClasses = [classes.SideDraw, classes.Open];
    }

    return (
        <Fragment>
            <Backdrop show={props.open} clicked={props.closed} />
            <div className={attachedClasses.join(' ')} >
                <div className={classes.Logo} >
                    <Logo />
                </div>
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </Fragment>
    );
}
 
export default SideDraw;