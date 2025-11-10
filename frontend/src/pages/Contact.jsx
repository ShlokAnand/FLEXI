import React, { useState } from "react";

/**
 * Flower-delivery conversational stepper contact form.
 * Fields:
 *  - name, phone, email
 *  - deliveryAddress (optional for enquiries)
 *  - deliveryDate (optional)
 *  - reason (Order / Wedding / Corporate / Subscription / General)
 *  - message
 *
 * Posts to POST http://localhost:5000/api/messages
 */

const REASONS = [
  "Place an order",
  "Wedding / Event decor",
  "Corporate / Bulk order",
  "Weekly subscription",
  "General question / Feedback",
];

function isValidEmail(s) {
  return /^\S+@\S+\.\S+$/.test(s);
}
function isValidPhone(s) {
  return /^[0-9+\-\s]{7,20}$/.test(s); // permissive numeric check
}

export default function Contact() {
  const [step, setStep] = useState(0);

  // form fields
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [reason, setReason] = useState(REASONS[0]);
  const [message, setMessage] = useState("");

  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState(null); // 'sent'|'error'
  const [errorText, setErrorText] = useState("");

  const steps = [
    { id: 0, label: "Your full name" },
    { id: 1, label: "Phone number" },
    { id: 2, label: "Email address" },
    { id: 3, label: "Delivery address (if any)" },
    { id: 4, label: "Delivery date (optional)" },
    { id: 5, label: "How can we help?" },
    { id: 6, label: "Message details" },
    { id: 7, label: "Review & Send" },
  ];

  function canNext() {
    if (step === 0) return name.trim().length > 0;
    if (step === 1) return isValidPhone(phone.trim());
    if (step === 2) return isValidEmail(email.trim());
    if (step === 3) return true; // optional
    if (step === 4) {
      if (!deliveryDate) return true; // optional
      // not allow past dates
      const d = new Date(deliveryDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return d >= today;
    }
    if (step === 5) return reason.trim().length > 0;
    if (step === 6) return message.trim().length >= 5;
    return true;
  }

  function next() {
    if (!canNext()) return;
    setStep((s) => Math.min(s + 1, steps.length - 1));
  }
  function prev() {
    setStep((s) => Math.max(s - 1, 0));
  }

  async function sendMessage() {
    setSending(true);
    setStatus(null);
    setErrorText("");
    try {
      const payload = {
        name: name.trim(),
        phone: phone.trim(),
        email: email.trim(),
        deliveryAddress: deliveryAddress.trim(),
        deliveryDate: deliveryDate || null,
        reason,
        message: message.trim(),
        date: new Date().toISOString(),
      };

      const res = await fetch("http://localhost:5000/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Server error");
      }

      setStatus("sent");
    } catch (err) {
      console.error(err);
      setStatus("error");
      setErrorText(err.message || "Failed to send");
    } finally {
      setSending(false);
    }
  }

  // quick template helpers for flower flows
  function applyTemplate(type) {
    if (type === "Order bouquet") {
      setReason("Place an order");
      setMessage("Hi, I want to order a fresh bouquet for delivery. Details:\n- Size: Standard\n- Message card: Please include 'Happy Birthday'\n- Prefer delivery in the morning.");
      setStep(7); // go to review
    } else if (type === "Wedding decor") {
      setReason("Wedding / Event decor");
      setMessage("Hello, I need wedding decor for [date]. Approx guests: 150. Please share a quote and availability.");
      setStep(7);
    } else if (type === "Corporate order") {
      setReason("Corporate / Bulk order");
      setMessage("We need bulk bouquets for an office event on [date]. Quantity ~50. Request pricing details.");
      setStep(7);
    } else if (type === "Weekly subscription") {
      setReason("Weekly subscription");
      setMessage("I want a weekly flower subscription to be delivered every Monday. Please share plans and prices.");
      setStep(7);
    }
  }

  return (
    <main style={{ padding: 24, maxWidth: 980, margin: "0 auto", fontFamily: "system-ui, Arial, sans-serif" }}>
      <h2 style={{ textAlign: "center", marginBottom: 6 }}>Contact / Order — Bright Bloom</h2>
      <p style={{ textAlign: "center", color: "#444", marginBottom: 18 }}>
          </p>

      <div style={{ display: "flex", gap: 20 }}>
        {/* Left: main stepper */}
        <div style={{ flex: 1, border: "1px solid #e6e6e6", padding: 18, borderRadius: 10, background: "#fff", boxShadow: "0 6px 20px rgba(0,0,0,0.03)" }}>
          <div style={{ fontSize: 13, color: "#666", marginBottom: 8 }}>Step {Math.min(step + 1, steps.length)} of {steps.length}</div>

          <div style={{ minHeight: 140, display: "flex", flexDirection: "column", justifyContent: "center" }}>
            {step === 0 && (
              <>
                <div style={{ fontSize: 18, fontWeight: 600 }}>{steps[0].label}</div>
                <input autoFocus value={name} onChange={(e) => setName(e.target.value)} placeholder="Your full name" style={{ marginTop: 12, padding: 10, fontSize: 16, width: "100%" }} />
              </>
            )}

            {step === 1 && (
              <>
                <div style={{ fontSize: 18, fontWeight: 600 }}>{steps[1].label}</div>
                <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+91 9XXXXXXXXX" style={{ marginTop: 12, padding: 10, fontSize: 16, width: "100%" }} />
                <div style={{ fontSize: 13, color: phone && !isValidPhone(phone) ? "crimson" : "#666", marginTop: 8 }}>
                  {phone && !isValidPhone(phone) ? "Enter a valid phone number" : "We may contact you to confirm delivery."}
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <div style={{ fontSize: 18, fontWeight: 600 }}>{steps[2].label}</div>
                <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" style={{ marginTop: 12, padding: 10, fontSize: 16, width: "100%" }} />
                <div style={{ fontSize: 13, color: email && !isValidEmail(email) ? "crimson" : "#666", marginTop: 8 }}>
                  {email && !isValidEmail(email) ? "Enter a valid email" : "We will email order confirmation."}
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <div style={{ fontSize: 18, fontWeight: 600 }}>{steps[3].label}</div>
                <textarea value={deliveryAddress} onChange={(e) => setDeliveryAddress(e.target.value)} placeholder="Flat / House no., Street, Landmark, City, PIN" rows={3} style={{ marginTop: 12, padding: 10, fontSize: 16, width: "100%" }} />
                <div style={{ fontSize: 13, color: "#666", marginTop: 8 }}>If you're just enquiring, you can skip this.</div>
              </>
            )}

            {step === 4 && (
              <>
                <div style={{ fontSize: 18, fontWeight: 600 }}>{steps[4].label}</div>
                <input type="date" value={deliveryDate} onChange={(e) => setDeliveryDate(e.target.value)} style={{ marginTop: 12, padding: 10, fontSize: 16, width: "100%" }} />
                <div style={{ fontSize: 13, color: "#666", marginTop: 8 }}>Choose a delivery date (optional). We will confirm availability.</div>
              </>
            )}

            {step === 5 && (
              <>
                <div style={{ fontSize: 18, fontWeight: 600 }}>{steps[5].label}</div>
                <select value={reason} onChange={(e) => setReason(e.target.value)} style={{ marginTop: 12, padding: 10, fontSize: 16, width: "100%" }}>
                  {REASONS.map((r) => <option key={r} value={r}>{r}</option>)}
                </select>
              </>
            )}

            {step === 6 && (
              <>
                <div style={{ fontSize: 18, fontWeight: 600 }}>{steps[6].label}</div>
                <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Write details: bouquet size, colors, message card, delivery time, etc." rows={5} style={{ marginTop: 12, padding: 10, fontSize: 16, width: "100%" }} />
              </>
            )}

            {step === 7 && (
              <>
                <div style={{ fontSize: 18, fontWeight: 600 }}>Review your request</div>
                <div style={{ marginTop: 12, textAlign: "left", whiteSpace: "pre-wrap" }}>
                  <strong>Name:</strong> {name || "—"} <br />
                  <strong>Phone:</strong> {phone || "—"} <br />
                  <strong>Email:</strong> {email || "—"} <br />
                  <strong>Delivery address:</strong> {deliveryAddress || "—"} <br />
                  <strong>Delivery date:</strong> {deliveryDate || "—"} <br />
                  <strong>Reason:</strong> {reason} <br />
                  <strong>Message:</strong>
                  <div style={{ marginTop: 8, padding: 10, background: "#fafafa", borderRadius: 6 }}>{message || "—"}</div>
                </div>
              </>
            )}
          </div>

          {/* Controls */}
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 14 }}>
            <div>
              <button onClick={prev} disabled={step === 0 || sending} style={{ padding: "8px 12px", marginRight: 8 }}>Back</button>
              {step < steps.length - 1 && <button onClick={next} disabled={!canNext() || sending} style={{ padding: "8px 12px" }}>Next</button>}
            </div>

            <div>
              {step === steps.length - 1 && (
                <button onClick={sendMessage} disabled={sending} style={{ padding: "8px 14px", background: "#0b5fff", color: "white", border: "none", borderRadius: 6 }}>
                  {sending ? "Sending..." : "Confirm & Send"}
                </button>
              )}
            </div>
          </div>

          {/* status */}
          <div style={{ marginTop: 12 }}>
            {status === "sent" && <div style={{ color: "green" }}>✅ Request sent. We'll contact you to confirm details.</div>}
            {status === "error" && <div style={{ color: "crimson" }}>Error: {errorText || "Failed to send."}</div>}
          </div>
        </div>

        {/* Right: contact details + templates + map */}
        <aside style={{ width: 360 }}>
          <div style={{ border: "1px solid #eee", padding: 12, borderRadius: 10, background: "#fff" }}>
            <h4 style={{ marginTop: 0 }}>Contact & quick actions</h4>
            <p style={{ margin: "6px 0" }}>Phone: <a href="tel:+911234567890">+91 9876542310</a></p>
            <p style={{ margin: "6px 0" }}>Email: <a href="mailto:orders@brightbloom.local">orders@brightbloom.com</a></p>
            <p style={{ margin: "6px 0" }}>Hours: Mon–Sat 09:00–18:00</p>
            <hr style={{ margin: "10px 0" }} />

            <h4>Quick templates</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <button onClick={() => applyTemplate("Order bouquet")} style={{ padding: 8 }}>Order bouquet (quick)</button>
              <button onClick={() => applyTemplate("Wedding decor")} style={{ padding: 8 }}>Wedding / event quote</button>
              <button onClick={() => applyTemplate("Corporate order")} style={{ padding: 8 }}>Corporate / bulk</button>
              <button onClick={() => applyTemplate("Weekly subscription")} style={{ padding: 8 }}>Weekly subscription</button>
            </div>

            <hr style={{ margin: "10px 0" }} />
            <h4>Our service area</h4>
            <p style={{ margin: "6px 0" }}>We deliver across Nagpur city; for outside-city delivery, contact us for rates.</p>

            <div style={{ width: "100%", height: 180, marginTop: 8 }}>
              <iframe
                title="brightbloom-location"
                width="100%"
                height="100%"
                frameBorder="0"
                src="https://www.google.com/maps?q=Nagpur&output=embed"
                style={{ borderRadius: 8 }}
              />
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
