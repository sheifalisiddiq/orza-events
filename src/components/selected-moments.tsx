"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import Image from "next/image";
import { Arrow } from "./icons";

const moments = [
  {
    title: "A note held in the room",
    category: "LIVE MUSIC",
    image: "/media/gallery-concepts/01-live-music-harp.png",
  },
  {
    title: "Made by hand, remembered forever",
    category: "GUEST EXPERIENCE",
    image: "/media/gallery-concepts/02-cultural-arts-calligraphy.png",
  },
  {
    title: "Light becomes architecture",
    category: "PRODUCTION",
    image: "/media/gallery-concepts/03-production-av.png",
  },
  {
    title: "The moment the room changed",
    category: "PERFORMANCE",
    image: "/media/gallery-concepts/04-signature-entertainment.png",
  },
  {
    title: "A story written in candlelight",
    category: "WEDDING",
    image: "/media/gallery-concepts/06-weddings.png",
  },
  {
    title: "Precision behind the spectacle",
    category: "CORPORATE",
    image: "/media/gallery-concepts/07-corporate-events.png",
  },
];

export function SelectedMoments() {
  const [active, setActive] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);

  function open(index: number) {
    setActive(index);
    requestAnimationFrame(() => dialog.current?.showModal());
  }

  function close() {
    dialog.current?.close();
    setActive(null);
  }

  function onKeyDown(event: KeyboardEvent<HTMLDialogElement>) {
    if (event.key === "ArrowRight" && active !== null)
      setActive((active + 1) % moments.length);
    if (event.key === "ArrowLeft" && active !== null)
      setActive((active - 1 + moments.length) % moments.length);
  }

  return (
    <section
      className="selected-moments scene-light"
      id="moments"
      aria-labelledby="moments-title"
    >
      <div className="section-kicker">
        <span>06 / SELECTED MOMENTS</span>
        <span>CONCEPT PORTFOLIO · READY FOR ORZA MEDIA</span>
      </div>
      <div className="moments-heading">
        <h2 className="display" id="moments-title">
          Moments that
          <br />
          <em>stay with you.</em>
        </h2>
        <p>
          A visual preview of the portfolio structure. Replace these clearly
          labelled concepts with ORZA’s real project photography before launch.
        </p>
      </div>
      <div className="moments-grid">
        {moments.map((moment, index) => (
          <button
            className="moment-card"
            key={moment.title}
            onClick={() => open(index)}
            aria-label={`Open ${moment.title}`}
          >
            <span className="moment-image">
              <span className="parallax-inner">
                <Image
                  src={moment.image}
                  alt=""
                  fill
                  sizes="(max-width: 700px) 90vw, 42vw"
                  quality={85}
                />
              </span>
            </span>
            <span className="moment-meta">
              <span>{moment.category}</span>
              <span>{moment.title}</span>
              <Arrow diagonal />
            </span>
          </button>
        ))}
      </div>
      <dialog
        ref={dialog}
        className="moment-lightbox"
        aria-label="Selected moment viewer"
        onCancel={(event) => {
          event.preventDefault();
          close();
        }}
        onKeyDown={onKeyDown}
        onClick={(event) => {
          if (event.target === event.currentTarget) close();
        }}
      >
        {active !== null && (
          <div className="lightbox-inner">
            <Image
              src={moments[active].image}
              alt={`Campaign concept: ${moments[active].title}`}
              fill
              sizes="90vw"
              quality={90}
            />
            <div className="lightbox-caption">
              <span>{moments[active].category}</span>
              <p>{moments[active].title}</p>
              <span>{String(active + 1).padStart(2, "0")} / 06</span>
            </div>
            <button className="lightbox-close" onClick={close}>
              CLOSE <span aria-hidden="true">×</span>
            </button>
            <button
              className="lightbox-previous"
              aria-label="Previous moment"
              onClick={() =>
                setActive((active - 1 + moments.length) % moments.length)
              }
            >
              ←
            </button>
            <button
              className="lightbox-next"
              aria-label="Next moment"
              onClick={() => setActive((active + 1) % moments.length)}
            >
              →
            </button>
          </div>
        )}
      </dialog>
    </section>
  );
}
