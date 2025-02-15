import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import "./OrderDetails.css"

const OrderDetails = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/orders/${orderId}`);
        setOrder(response.data);
      } catch (error) {
        console.error('Error fetching order details:', error);
        setError('Failed to fetch order details');
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  if (error) return <p>{error}</p>;
  if (!order) return <p>Loading order details...</p>;

  const statusSteps = [
    { label: 'Order Placed', date: order.orderPlacedDate ?? "N/A", active: order.status === "ORDER_PLACED" || order.status !== "CANCELLED" },
    { label: 'Order Confirmed', date: order.orderConfirmedDate ?? "N/A", active: order.status === "ORDER_CONFIRMED" || ["ORDER_PROCESSED", "SHIPPED", "OUT_FOR_DELIVERY", "DELIVERED"].includes(order.status) },
    { label: 'Order Processed', date: order.orderProcessedDate ?? "N/A", active: order.status === "ORDER_PROCESSED" || ["SHIPPED", "OUT_FOR_DELIVERY", "DELIVERED"].includes(order.status) },
    { label: 'Ready to Ship', date: order.readyToShipDate ?? "N/A", active: order.status === "SHIPPED" || ["OUT_FOR_DELIVERY", "DELIVERED"].includes(order.status) },
    { label: 'Out for Delivery', date: order.outForDeliveryDate ?? "N/A", active: order.status === "OUT_FOR_DELIVERY" || order.status === "DELIVERED" },
    { label: 'Delivered', date: order.deliveredDate ?? "N/A", active: order.status === "DELIVERED" },
  ];
  
  return (
    <div className="order-details-container">
      <Link to="/consumerorders" className="back-button">Back to Orders</Link>
      
      <h2>Order Details</h2>
      
      <div className="order-content">
        {/* Spice Image - Aligned to the Left */}
        <div className="spice-image">
          {order.spice?.spicePhoto ? (
            <img 
              src={order.spice.spicePhoto} 
              alt={order.spice.name} 
              className="spice-photo"
            />
          ) : (
            <p className="no-image">No Image Available</p>
          )}
        </div>

        {/* Order Information */}
        <div className="order-info">
          <p><strong>Order ID:</strong> {order.id}</p>
          <p><strong>Spice Name:</strong> {order.spice?.name}</p>
          <p><strong>Quantity:</strong> {order.quantity}</p>
          <p><strong>Order Type:</strong> {order.paymentType === 'DIRECT' ? 'Direct Order' : 'Online Order'}</p>
        </div>
      </div>

      {/* Order Tracking */}
      <div className="order-tracking">
        {statusSteps.map((step, index) => (
          <div key={index} className={`order-step ${step.active ? 'active' : 'inactive'}`}>
            <div className="icon">{step.active ? '✔️' : '🔘'}</div>
            <div className="step-details">
              <p className="step-label">{step.label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderDetails;
