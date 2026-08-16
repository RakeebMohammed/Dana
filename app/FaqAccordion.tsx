"use client";

import { useState } from "react";

const FAQS = [
  "How does Popin enhance the online shopping experience?",
  "What are the key features of Popin for agents?",
  "How can I integrate Popin into my website?",
  "What steps are involved in setting up my store to start using Popin?",
  "How do I start using the Popin Seller agent app?",
  "How can I track live call data using the Popin dashboard?",
  "What are the benefits of using Popin's live video shopping feature for customers?",
  "Can I customize the appearance of the Popin button on my website?",
  "How does Popin ensure privacy and security during video calls?",
];

export default function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {FAQS.map((q, i) => (
        <div key={i} style={{ borderBottom: "1px solid #24242c" }}>
          <button
            onClick={() => setOpen(open === i ? null : i)}
            style={{
              width: "100%",
              textAlign: "left",
              background: "transparent",
              border: "none",
              color: "#f2f2f5",
              padding: "20px 4px",
              fontSize: 16,
              fontWeight: 500,
              cursor: "pointer",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 16,
            }}
          >
            <span>{q}</span>
            <span style={{ opacity: 0.5, fontSize: 20, flexShrink: 0 }}>{open === i ? "−" : "+"}</span>
          </button>
          {open === i && (
            <p style={{ margin: "0 4px 20px", opacity: 0.6, fontSize: 14, lineHeight: 1.6 }}>
              Reach out to our team and we'll walk you through this in detail for your specific setup.
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
