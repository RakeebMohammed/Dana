"use client";

import { useState } from "react";

export default function LeadForm() {
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");

    const res = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setStatus(res.ok ? "done" : "error");
  }

  if (status === "done") {
    return <p style={{ marginTop: 32 }}>Thanks — we got your details.</p>;
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: 32, display: "flex", flexDirection: "column", gap: 12 }}>
      <input
        required
        placeholder="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        style={inputStyle}
      />
      <input
        placeholder="Phone"
        value={form.phone}
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
        style={inputStyle}
      />
      <textarea
        placeholder="Message"
        value={form.message}
        onChange={(e) => setForm({ ...form, message: e.target.value })}
        style={{ ...inputStyle, minHeight: 100, resize: "vertical" }}
      />
      {status === "error" && <p style={{ color: "#ff6b6b" }}>Something went wrong. Try again.</p>}
      <button disabled={status === "loading"} type="submit" style={buttonStyle}>
        {status === "loading" ? "Sending..." : "Submit"}
      </button>
    </form>
  );
}

const inputStyle: React.CSSProperties = {
  padding: "12px 14px",
  borderRadius: 8,
  border: "1px solid #2c2c36",
  background: "#0f0f14",
  color: "#fff",
  fontSize: 16,
  fontFamily: "inherit",
};

const buttonStyle: React.CSSProperties = {
  padding: "12px 14px",
  borderRadius: 8,
  border: "none",
  background: "#5b6cff",
  color: "#fff",
  fontSize: 16,
  fontWeight: 600,
  cursor: "pointer",
};
