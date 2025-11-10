// frontend/src/pages/Checkout.jsx
import React from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const { cart, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  const handlePlaceOrder = async () => {
    try {
      // Simulate saving order to backend
      const order = {
        items: cart,
        total: totalPrice,
        date: new Date().toISOString(),
      };

      const res = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order),
      });

      const data = await res.json();

      if (data.success) {
        alert("Order placed successfully! 🎉");
        clearCart();
        navigate("/");
      } else {
        alert("Error placing order. Please try again.");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to connect to backend.");
    }
  };

  if (!cart.length) {
    return (
      <div style={{ textAlign: "center", marginTop: "80px" }}>
        <h2>Your cart is empty 🛒</h2>
        <button onClick={() => navigate("/")} style={{ marginTop: "20px" }}>
          Go to Home
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 800, margin: "40px auto", padding: 20 }}>
      <h2 style={{ textAlign: "center", marginBottom: 20 }}>Order Summary</h2>

      {cart.map((item) => (
        <div
          key={item.id}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid #ddd",
            padding: "10px 0",
          }}
        >
          <div>
            <strong>{item.name}</strong> x {item.qty || 1}
          </div>
          <div>₹{(item.price * (item.qty || 1)).toFixed(0)}</div>
        </div>
      ))}

      <h3 style={{ textAlign: "right", marginTop: 20 }}>Total: ₹{totalPrice.toFixed(0)}</h3>

      <div style={{ textAlign: "center", marginTop: 30 }}>
        <button
          onClick={handlePlaceOrder}
          style={{
            backgroundColor: "#ff80a1",
            color: "#fff",
            border: "none",
            padding: "10px 20px",
            borderRadius: "8px",
            fontSize: "1rem",
            cursor: "pointer",
          }}
        >
          Confirm Order
        </button>
      </div>
    </div>
  );
}
