"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { contact, eventTypes } from "@/lib/content";
import { Arrow } from "./icons";

export function EventBrief({ experience }: { experience: string }) {
  const [preparedUrl, setPreparedUrl] = useState("");
  const [error, setError] = useState("");
  const nameRef = useRef<HTMLInputElement>(null);
  const continueRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (preparedUrl) continueRef.current?.focus();
  }, [preparedUrl]);

  function prepareBrief(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") || "").trim();
    if (!name) {
      setError("Please enter your name.");
      nameRef.current?.focus();
      return;
    }
    const lines = [
      "Hello ORZA, I’d love to plan an event.",
      "",
      `Name: ${name}`,
      `Occasion: ${data.get("occasion")}`,
      experience ? `Interested in: ${experience}` : "",
      data.get("date") ? `Date: ${data.get("date")}` : "",
      data.get("guests") ? `Guests: ${data.get("guests")}` : "",
      String(data.get("details") || "").trim()
        ? `Details: ${String(data.get("details")).trim()}`
        : "",
    ].filter(Boolean);
    const url = `${contact.whatsapp}?text=${encodeURIComponent(lines.join("\n"))}`;
    setError("");
    setPreparedUrl(url);
  }

  return (
    <div className="brief-content">
      <p className="eyebrow">LET’S MAKE SOMETHING MEMORABLE</p>
      <h2 id="brief-title">
        Every great event
        <br />
        starts with <em>a hello.</em>
      </h2>
      {experience && (
        <p className="brief-interest">
          Your interest: {experience.toLowerCase()}
        </p>
      )}
      {!preparedUrl ? (
        <form onSubmit={prepareBrief} className="brief-form">
          <label>
            Your name <span aria-hidden="true">*</span>
            <input
              ref={nameRef}
              autoComplete="name"
              name="name"
              required
              maxLength={80}
              placeholder="How shall we call you?"
            />
          </label>
          <label>
            The occasion <span aria-hidden="true">*</span>
            <select name="occasion" defaultValue="" required>
              <option value="" disabled>
                Select your event
              </option>
              {eventTypes.map((type) => (
                <option key={type}>{type}</option>
              ))}
            </select>
          </label>
          <div className="form-row">
            <label>
              Event date <span>(optional)</span>
              <input type="date" name="date" />
            </label>
            <label>
              Number of guests <span>(optional)</span>
              <input
                type="number"
                inputMode="numeric"
                name="guests"
                min={1}
                max={100000}
                placeholder="An estimate is fine"
              />
            </label>
          </div>
          <label>
            What do you have in mind? <span>(optional)</span>
            <textarea
              name="details"
              rows={3}
              maxLength={1500}
              placeholder="The mood, the location, the little things that matter…"
            />
          </label>
          {error && (
            <p role="alert" className="form-error">
              {error}
            </p>
          )}
          <button className="brief-submit" type="submit">
            Prepare my WhatsApp brief <Arrow diagonal />
          </button>
          <p className="form-note">
            Your details stay in this browser until you choose to send them
            through WhatsApp.
          </p>
        </form>
      ) : (
        <div className="brief-ready" role="status">
          <span className="ready-mark" aria-hidden="true">
            ✓
          </span>
          <h3>
            Your next unforgettable
            <br />
            moment starts here.
          </h3>
          <p>
            Your brief is ready. Open WhatsApp to review your message and send
            it to the ORZA team.
          </p>
          <a
            ref={continueRef}
            className="brief-submit"
            href={preparedUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Continue in WhatsApp <Arrow diagonal />
          </a>
          <button className="text-link" onClick={() => setPreparedUrl("")}>
            Start a new brief
          </button>
        </div>
      )}
      <div className="brief-contact">
        <span>PREFER A CONVERSATION?</span>
        <a href={contact.telephone}>{contact.phone}</a>
      </div>
    </div>
  );
}
