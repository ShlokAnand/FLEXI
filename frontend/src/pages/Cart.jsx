// frontend/src/pages/Cart.jsx
import React from "react";
import { useCart } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";

export default function Cart() {
  const { cart, updateQty, removeFromCart, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  if (!cart || cart.length === 0) {
    return (
      <div style={{ padding: 40, textAlign: "center" }}>
        <h2>Your cart is empty 🛒</h2>
        <p>
          <Link to="/">Browse products</Link>
        </p>
      </div>
    );
  }

  return (
    <div style={{ padding: 24, maxWidth: 1000, margin: "0 auto" }}>
      <h2 style={{ textAlign: "center", marginBottom: 16 }}>Your Basket</h2>
      <div style={{ display: "grid", gap: 12 }}>
        {cart.map((item) => (
          <div
            key={item.id}
            style={{
              display: "flex",
              gap: 12,
              alignItems: "center",
              border: "1px solid #eee",
              padding: 12,
              borderRadius: 8,
              background: "#fff",
            }}
          >
            <img src={item.image} alt={item.name} style={{ width: 110, height: 90, objectFit: "cover", borderRadius: 6 }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700 }}>{item.name}</div>
              <div style={{ color: "#666", marginTop: 6 }}>₹{item.price}</div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "flex-end" }}>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <button onClick={() => updateQty(item.id, (item.qty || 1) - 1)} style={{ padding: "6px 8px" }}>
                  −
                </button>
                <div style={{ minWidth: 28, textAlign: "center" }}>{item.qty || 1}</div>
                <button onClick={() => updateQty(item.id, (item.qty || 1) + 1)} style={{ padding: "6px 8px" }}>
                  +
                </button>
              </div>

              <div style={{ fontWeight: 700 }}>₹{(item.price * (item.qty || 1)).toFixed(0)}</div>

              <div style={{ display: "flex", gap: 8 }}>
                <button onClick={() => removeFromCart(item.id)} style={{ color: "crimson", background: "transparent", border: "none", cursor: "pointer" }}>
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 18, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <button onClick={() => { clearCart(); }} style={{ padding: "10px 14px", borderRadius: 6, background: "#ddd", border: "none" }}>
            Clear Cart
          </button>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 18, fontWeight: 700 }}>Total: ₹{totalPrice.toFixed(0)}</div>
          <div style={{ marginTop: 8 }}>
            <button onClick={() => navigate("/checkout")} style={{ padding: "10px 16px", background: "#ff80a1", color: "#fff", border: "none", borderRadius: 6 }}>
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
