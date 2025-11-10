// frontend/src/pages/Admin.jsx
import React, { useState } from "react";

export default function Admin() {
  const [token, setToken] = useState("");
  const [orders, setOrders] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadOrders = async () => {
    setError("");
    setLoading(true);
    setOrders(null);
    try {
      const res = await fetch("http://localhost:5000/api/orders", {
        headers: {
          "Content-Type": "application/json",
          "x-admin-token": token.trim(),
        },
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        const msg = body.error || `Server returned ${res.status}`;
        throw new Error(msg);
      }

      const data = await res.json();
      if (data && data.success) setOrders(data.data || []);
      else setOrders([]);
    } catch (err) {
      console.error("Load orders failed:", err);
      setError(err.message || "Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 1100, margin: "32px auto", padding: 16 }}>
      <h2 style={{ textAlign: "center", marginBottom: 18 }}>Admin — Orders</h2>

      <div style={{ display: "flex", gap: 8, alignItems: "center", justifyContent: "center", marginBottom: 14 }}>
        <input
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="Enter admin token"
          style={{ padding: "8px 12px", width: 420, borderRadius: 6, border: "1px solid #ccc" }}
        />
        <button
          onClick={loadOrders}
          disabled={!token.trim() || loading}
          style={{
            padding: "8px 12px",
            background: "#ff80a1",
            color: "#fff",
            border: "none",
            borderRadius: 6,
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          {loading ? "Loading…" : "Load Orders"}
        </button>
      </div>

      {error && (
        <div style={{ color: "crimson", textAlign: "center", marginBottom: 12 }}>
          {error}
        </div>
      )}

      {!orders && !loading && (
        <div style={{ textAlign: "center", color: "#555" }}>
          Enter the admin token and click <strong>Load Orders</strong>.
        </div>
      )}

      {orders && orders.length === 0 && (
        <div style={{ textAlign: "center", color: "#555" }}>No orders found.</div>
      )}

      {orders && orders.length > 0 && (
        <div style={{ marginTop: 16 }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ textAlign: "left", borderBottom: "2px solid #eee" }}>
                <th style={{ padding: 10 }}>Order ID</th>
                <th style={{ padding: 10 }}>Date</th>
                <th style={{ padding: 10 }}>Items</th>
                <th style={{ padding: 10, textAlign: "right" }}>Total</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id} style={{ borderBottom: "1px solid #f0f0f0" }}>
                  <td style={{ padding: 10, verticalAlign: "top", fontFamily: "monospace" }}>{o.id}</td>
                  <td style={{ padding: 10, verticalAlign: "top" }}>{new Date(o.createdAt).toLocaleString()}</td>
                  <td style={{ padding: 10 }}>
                    <ul style={{ margin: 0, paddingLeft: 14 }}>
                      {Array.isArray(o.items) && o.items.map((it, idx) => (
                        <li key={idx}>
                          {it.name} — {it.qty || 1} × ₹{it.price}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td style={{ padding: 10, textAlign: "right", verticalAlign: "top", fontWeight: 700 }}>
                    ₹{(o.total || 0).toFixed(0)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
