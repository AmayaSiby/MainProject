import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import "./Payment.css";

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const totalPrice = location.state?.totalPrice;

  const [paymentMethod, setPaymentMethod] = useState("");
  const [onlinePaymentMethod, setOnlinePaymentMethod] = useState("");
  const [visitDate, setVisitDate] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [bankDetails, setBankDetails] = useState(null);
  const [qrCode, setQrCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    const fetchPaymentDetails = async () => {
      try {
        const email = localStorage.getItem("email");
        if (!email) {
          setError("User is not authenticated. Please log in again.");
          return;
        }

        const cartResponse = await axios.get(`http://localhost:8080/api/cart/consumer/${email}`);
        if (!cartResponse.data || cartResponse.data.length === 0) {
          setError("Your cart is empty. Please add items before proceeding.");
          return;
        }

        const farmerEmail = cartResponse.data[0]?.farmerEmail;
        if (!farmerEmail) {
          setError("Unable to retrieve farmer details.");
          return;
        }

        const profileResponse = await axios.get(`http://localhost:8080/api/profiles/user/email/${farmerEmail}`);
        if (profileResponse.data) {
          setBankDetails({
            bankName: profileResponse.data.bankName,
            branch: profileResponse.data.branchName,
            accountNumber: profileResponse.data.accountNumber,
            ifscCode: profileResponse.data.ifscCode
          });

          setQrCode(profileResponse.data.qrCodeImage?.startsWith("data:image/png;base64,")
          ? profileResponse.data.qrCodeImage
          :` data:image/png;base64,${profileResponse.data.qrCodeImage}`
        );
        }
      } catch (err) {
        console.error("Error fetching payment details:", err);
        setError("Failed to fetch payment details. Please try again.");
      }
    };

    if (paymentMethod === "online_payment") {
      fetchPaymentDetails();
    }
  }, [paymentMethod]);

  const handlePaymentSubmit = async () => {
    setError("");
  
    if (!paymentMethod) {
      setError("Please select a payment method.");
      return;
    }
  
    if (paymentMethod === "direct_visit" && !visitDate) {
      setError("Please select a valid visit date.");
      return;
    }
  
    if (paymentMethod === "online_payment" && (!onlinePaymentMethod || !transactionId)) {
      setError("Please select an online payment method and enter the transaction ID.");
      return;
    }
  
    setIsSubmitting(true);
  
    try {
      const email = localStorage.getItem("email");
      if (!email) {
        setError("User is not authenticated. Please log in again.");
        return;
      }
  
      const cartResponse = await axios.get(`http://localhost:8080/api/cart/consumer/${email}`);
      const cartItems = cartResponse.data;
      if (!cartItems || cartItems.length === 0) {
        setError("Your cart is empty. Please add items before proceeding.");
        return;
      }
  
      const farmerEmails = new Set(cartItems.map(item => item.farmerEmail));
      if (paymentMethod === "direct_visit" && farmerEmails.size > 1) {
        setError("All items must be from the same farmer for a direct visit.");
        return;
      }
  
      if (paymentMethod === "direct_visit") {
        const visitRequest = {
          consumerEmail: email,
          farmerEmail: cartItems[0].farmerEmail,
          visitDate: visitDate,
          status: "PENDING"
        };
  
        const response = await axios.post("http://localhost:8080/api/visitrequests/create", visitRequest, {
          headers: { "Content-Type": "application/json" }
        });
  
        if (response.status === 200) {
          alert("Your visit request has been submitted. Please wait for the farmer's approval.");
          navigate("/visit-status", { state: { email } });
        } else {
          setError("Failed to create visit request.");
        }
      } else {
        for (const cartItem of cartItems) {
          const transactionData = {
            consumerEmail: email,
            farmerEmail: cartItem.farmerEmail,
            transactionId: transactionId,
            paymentType: onlinePaymentMethod.toUpperCase()
          };
  
          await axios.post("http://localhost:8080/api/transactions/process", transactionData);
        }
  
        alert("Your order has been confirmed!");
        navigate("/consumerorders");
      }
    } catch (error) {
      console.error("Error processing payment:", error);
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  

  return (
    <div className="payment-container">
      <h2>Choose Your Payment Method</h2>
      <div className="payment-options">
        <label>
          <input type="radio" name="payment" value="direct_visit" checked={paymentMethod === "direct_visit"} onChange={(e) => setPaymentMethod(e.target.value)} />
          Direct Visit
        </label>
        <label>
          <input type="radio" name="payment" value="online_payment" checked={paymentMethod === "online_payment"} onChange={(e) => setPaymentMethod(e.target.value)} />
          Online Payment
        </label>
      </div>

      {paymentMethod === "direct_visit" && (
        <div className="visit-date-container">
          <label>Select a visit date:</label>
          <input type="date" min={today} value={visitDate} onChange={(e) => setVisitDate(e.target.value)} />
        </div>
      )}

      {paymentMethod === "online_payment" && (
        <div className="online-payment-options">
          <label>
            <input type="radio" name="online_payment" value="bank_transfer" checked={onlinePaymentMethod === "bank_transfer"} onChange={(e) => setOnlinePaymentMethod(e.target.value)} />
            Bank Transfer
          </label>
          <label>
            <input type="radio" name="online_payment" value="upi" checked={onlinePaymentMethod === "upi"} onChange={(e) => setOnlinePaymentMethod(e.target.value)} />
            UPI
          </label>

          {onlinePaymentMethod === "bank_transfer" && bankDetails && (
            <div className="bank-details">
              <p><strong>Bank Name:</strong> {bankDetails.bankName}</p>
              <p><strong>Branch:</strong> {bankDetails.branch}</p>
              <p><strong>Account Number:</strong> {bankDetails.accountNumber}</p>
              <p><strong>IFSC Code:</strong> {bankDetails.ifscCode}</p>
            </div>
          )}

          {onlinePaymentMethod === "upi" && qrCode && (
            <div className="upi-details">
              <img src={qrCode} alt="QR Code" />
            </div>
          )}

          <label>Transaction ID:</label>
          <input type="text" value={transactionId} onChange={(e) => setTransactionId(e.target.value)} />
        </div>
      )}

      {error && <p className="error-message">{error}</p>}
      <button className="submit-btn" onClick={handlePaymentSubmit} disabled={isSubmitting}>Confirm Order</button>
    </div>
  );
};

export default Payment;
