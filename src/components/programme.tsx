"use client";

import { useEffect, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { programme } from "@/lib/content";
import { Arrow } from "./icons";

export function Programme() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    ScrollTrigger.refresh();
  }, [active]);
  return (
    <section
      id="services"
      className="programme scene-light"
      aria-labelledby="programme-title"
    >
      <div className="section-kicker">
        <span>04 / A WORLD OF POSSIBILITIES</span>
        <span>CURATED AROUND YOU</span>
      </div>
      <div className="programme-heading">
        <h2 className="display" id="programme-title">
          <span className="reveal-line">
            <span>THE ART OF</span>
          </span>
          <span className="reveal-line">
            <span>
              <em>coming together.</em>
            </span>
          </span>
        </h2>
        <p className="reveal">
          A wedding. A celebration. A new beginning.
          <br />
          Whatever brings you together,
          <br />
          we make it feel extraordinary.
        </p>
      </div>
      <div className="programme-body">
        <div className="programme-image">
          <Image
            key={active}
            src={programme[active].image}
            alt={`Campaign concept illustrating ${programme[active].label.toLowerCase()}`}
            fill
            sizes="(max-width: 800px) 90vw, 36vw"
            style={{ objectPosition: programme[active].position }}
          />
          <span>ORZA / CAMPAIGN CONCEPT</span>
        </div>
        <div className="programme-list">
          {programme.map((item, index) => (
            <div
              className={`programme-item ${active === index ? "is-active" : ""}`}
              key={item.number}
            >
              <h3>
                <button
                  id={`programme-trigger-${index}`}
                  aria-expanded={active === index}
                  aria-controls={`programme-panel-${index}`}
                  onClick={() => setActive(index)}
                >
                  <span className="programme-number">{item.number}</span>
                  <span>
                    <span className="eyebrow">{item.label}</span>
                    <span className="programme-name">{item.title}</span>
                  </span>
                  <span className="programme-plus" aria-hidden="true">
                    {active === index ? "−" : "+"}
                  </span>
                </button>
              </h3>
              <div
                className="programme-panel"
                id={`programme-panel-${index}`}
                role="region"
                aria-labelledby={`programme-trigger-${index}`}
                hidden={active !== index}
              >
                <p>{item.detail}</p>
                <p className="programme-items">{item.items}</p>
                <button
                  className="text-link"
                  data-enquire
                  data-experience={item.label}
                >
                  Make it part of your event <Arrow />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
