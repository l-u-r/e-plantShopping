import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping , onCart}) => {
    const cart = useSelector(state => state.cart.items);
    const dispatch = useDispatch();
    const [totalAmount, setTotalAmount] = useState(0);

    // Calculate total amount for all products in the cart
    useEffect(() => {
        const calculateTotalAmount = () => {
            let totalCost = 0;
            cart.forEach((item) => {
                const cost = parseFloat(item.cost.replace('$', ''));
                const quantity = parseInt(item.quantity, 10);
                totalCost += cost * quantity;
            });
            setTotalAmount(totalCost);
        };
        calculateTotalAmount();
    }, [cart]);

    const handleContinueShopping = (e) => {
        onContinueShopping(e);
    };

    const handleIncrement = (item) => {
        const updatedItem = { ...item, quantity: item.quantity + 1 };
        dispatch(updateQuantity(updatedItem));
    };

    const handleDecrement = (item) => {
        if (item.quantity > 1) {
            const updatedItem = { ...item, quantity: item.quantity - 1 };
            dispatch(updateQuantity(updatedItem));
        } else {
            dispatch(removeItem(item.name));
        }
    };

    const handleRemove = (item) => {
        dispatch(removeItem(item.name));
    };

    // Calculate total cost based on quantity for an item
    const calculateTotalCost = (item) => {
        let totalCost = 0;
        const cost = parseFloat(item.cost.replace('$', ''));
        const quantity = parseInt(item.quantity, 10);
        totalCost = cost * quantity;
        return totalCost.toFixed(2);
    };

    const handleCheckoutShopping = (e) => {
        alert('Functionality to be added for future reference');
    };

    return (
        <div className="cart-container">
            <h2 style={{ color: 'black' }}>Total Cart Amount: ${totalAmount.toFixed(2)}</h2>
            <div>
                {cart.map(item => (
                    <div className="cart-item" key={item.name}>
                        <img className="cart-item-image" src={item.image} alt={item.name} />
                        <div className="cart-item-details">
                            <div className="cart-item-name">{item.name}</div>
                            <div className="cart-item-cost">{item.cost}</div>
                            <div className="cart-item-quantity">
                                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                                <span className="cart-item-quantity-value">{item.quantity}</span>
                                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
                            </div>
                            <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
                            <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
            <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
            <div className="continue_shopping_btn">
                <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
                <br />
                <button className="get-started-button1" onClick={(e) => handleCheckoutShopping(e)}>Checkout</button>
            </div>
        </div>
    );
};

export default CartItem;


