import React, {Component, Fragment} from 'react';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDraw from '../../components/Navigation/SideDraw/SideDraw';

class Layout extends Component {
    state = {
        showSideDraw: false
    }

    sideDrawClosedHandler = () => {
        this.setState( (prevState) => {
            return {showSideDraw: !prevState.showSideDraw};
        });
    }

    render() {
        return (
            <Fragment>
                <Toolbar toggleDrawer={this.sideDrawClosedHandler} />
                <SideDraw open={this.state.showSideDraw} closed={this.sideDrawClosedHandler} />
                <main className={classes.Content} >
                    {this.props.children}
                </main>
            </Fragment>
        );
    }
};

export default Layout;