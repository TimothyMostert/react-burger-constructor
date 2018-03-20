import React, { Component, Fragment } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-loader';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
    salad: 5,
    cheese: 4,
    meat: 10,
    bacon: 8
}

class BurderBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 15,
        purchaseable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount () {
        axios.get('/ingredients.json')
        .then(response => {
            this.setState({
                ingredients: response.data
            })
        })
        .catch(error => {
            this.setState({
                error: true
            });
        });;
    }

    updatePurchaseable (ingredients) {
        const sum = Object.keys(ingredients)
        .map(key => {
            return ingredients[key];
        })
        .reduce((sum, el) => {
            return sum + el;
        }, 0);
        this.setState({
            purchaseable: sum > 0
        });
    }

    purchaseHandler = () => {
        let currentState = this.state.purchasing;
        this.setState({
            purchasing: !currentState
        });
    }

    purchaseContinueHandler = () => {
        this.setState({
            loading: true
        });
        const orderPackage = {
            ingredients: this.state.ingredients,
            deliveryMethod: 'fast',
            customer: {
                address: {
                    country: 'Zimbabwe',
                    street: 'some street',
                    home: 'large'
                },
                name: 'Tim Mostert',
                email: 'some@email.co'
            }
        }
        axios.post('/orders.json', orderPackage)
            .then(response => {
                this.setState({
                    loading: false,
                    purchasing: false
                });
            })
            .catch(error => {
                this.setState({
                    loading: false,
                    purchasing: false
                });
        });
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.updatePurchaseable(updatedIngredients);
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice
        });

    }

    removerIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount > 0) {
            const updatedCount = oldCount - 1;
            const updatedIngredients = {
                ...this.state.ingredients
            }
            updatedIngredients[type] = updatedCount;
            const priceSubtraction = INGREDIENT_PRICES[type];
            const oldPrice = this.state.totalPrice;
            const newPrice = oldPrice - priceSubtraction;
            this.updatePurchaseable(updatedIngredients);
            this.setState({
                ingredients: updatedIngredients,
                totalPrice: newPrice
            });
        }

        
    }

    render() {
        const disableInfo = {
            ...this.state.ingredients
        };
        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0;
        }
        let orderSummary = null;
        let burger = this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner />;
        if(this.state.ingredients) {
            orderSummary = (
                <OrderSummary 
                            ingredients={this.state.ingredients}
                            clickedCancel={this.purchaseHandler}
                            clickedContinue={this.purchaseContinueHandler}
                            totalPrice={this.state.totalPrice}
                        />
            );
            burger = (
                <Fragment>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved={this.removerIngredientHandler}
                        disabled={disableInfo}
                        purchaseable={this.state.purchaseable}
                        price={this.state.totalPrice}
                        clicked={this.purchaseHandler} />
                </Fragment>
            );
        }
        if(this.state.loading) {
            orderSummary = <Spinner />;
        }
        return (
            <Fragment>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseHandler} >
                    {orderSummary}
                </Modal>
                {burger}
            </Fragment>
        );
    }
}

export default withErrorHandler(BurderBuilder);