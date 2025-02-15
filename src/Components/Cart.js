import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './Cart.css';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]); // Default to empty array
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedItems, setSelectedItems] = useState([]); // Track selected items
  const [errorMessage, setErrorMessage] = useState(''); // To hold the error message
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/cart/consumer/${localStorage.getItem('email')}`);
        // Ensure response data is an array before setting state
        if (Array.isArray(response.data)) {
          setCartItems(response.data);
        } else {
          console.error('Cart items are not in the expected array format:', response.data);
        }
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    fetchCartItems();
  }, []);

  // Calculate total price whenever cartItems or selectedItems change
  useEffect(() => {
    const total = selectedItems.reduce((acc, itemId) => {
      const item = cartItems.find(cartItem => cartItem.id === itemId);
      if (item) {
        return acc + item.spice.minPriceLevel * item.quantity;
      }
      return acc;
    }, 0);
    setTotalPrice(total);
  }, [selectedItems, cartItems]);

  // Handle quantity increase
  const increaseQuantity = (item) => {
    if (item.quantity < item.spice.quantity) {
      setCartItems(cartItems.map(cartItem =>
        cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
      ));
    } else {
      alert("Not enough stock available!");
    }
  };

  // Handle quantity decrease
  const decreaseQuantity = (item) => {
    if (item.quantity > 1) {
      setCartItems(cartItems.map(cartItem =>
        cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem
      ));
    }
  };

  // Handle item removal
  const handleRemove = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/cart/remove/${id}`);
      setCartItems(cartItems.filter(item => item.id !== id)); // Remove from state
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  // Handle checkbox selection
  const handleCheckboxChange = (itemId) => {
    setSelectedItems(prevSelectedItems =>
      prevSelectedItems.includes(itemId)
        ? prevSelectedItems.filter(id => id !== itemId) // Unselect
        : [...prevSelectedItems, itemId] // Select
    );
  };

  // Handle proceed to payment page
 // Handle proceed to payment page
const proceedToBuy = () => {
  if (totalPrice === 0) {
    // Show an alert message if no items are selected
    alert('Error: No items have been selected yet.');
  } else {
    navigate('/payment', { state: { totalPrice } });
  }
};


  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <nav className="sidebar">
        <h2 className="sidebar-title">Harvest Hub</h2>
        <ul>
        <li><Link to="/consumer-dashboard">Home</Link></li>

          <li><Link to="/consumerorders">Your Orders</Link></li>
          <li><Link to="/visit-status">Your Visit Requests</Link></li> {/* New link to visit requests */}
        </ul>
        <Link to="/logout">Logout</Link>
      </nav>

      {/* Main content area */}
      <div className="main-content">
        <h2 className="cart-title">Your Cart</h2>
        {cartItems.length === 0 ? (
          <p className="cart-empty">Your cart is empty.</p>
        ) : (
          <>
            <table className="cart-table">
              <thead>
                <tr>
                <th></th> {/* Add Select column */}
                  <th>Spice Image</th>
                  <th>Spice Name</th>
                  <th>Available Quantity</th>
                  <th className="quantity-header">Quantity</th>
                  <th>Price</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map(item => (
                  <tr key={item.id}>
                    <td>
                      <input
                        type="checkbox"
                        className="item-checkbox"
                        checked={selectedItems.includes(item.id)}
                        onChange={() => handleCheckboxChange(item.id)}
                      />
                    </td>
                    <td>
                      <img src={item.spice.spicePhoto} alt={item.spice.name} />
                    </td>
                    <td>{item.spice.name}</td>
                    <td>{item.spice.quantity}</td>
                    <td>
                      <div className="quantity-wrapper">
                        <button className="quantity-btn" onClick={() => decreaseQuantity(item)}>-</button>
                        <span className="quantity-number">{item.quantity}</span>
                        <button className="quantity-btn" onClick={() => increaseQuantity(item)}>+</button>
                      </div>
                    </td>
                    <td>₹{(item.spice.minPriceLevel * item.quantity).toFixed(2)}</td>
                    <td>
                      <button className="remove-btn" onClick={() => handleRemove(item.id)}>Remove</button>
                    </td>
                    
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="cart-total">
              Total Price: ₹{totalPrice.toFixed(2)}
            </div>

            {/* Show error message if no items are selected */}
            {errorMessage && <div className="error-message">{errorMessage}</div>}

            <button className="buy-btn" onClick={proceedToBuy}>
              Proceed to Buy
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
