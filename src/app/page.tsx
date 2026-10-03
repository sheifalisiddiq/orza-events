import Image from "next/image";
import { SiteExperience } from "@/components/site-experience";
import { BrandMark } from "@/components/brand-mark";
import { Arrow, Flourish } from "@/components/icons";
import { Programme } from "@/components/programme";
import { ScrollJourney } from "@/components/scroll-journey";
import { ExperienceGallery } from "@/components/experience-gallery";
import { CloudTransition } from "@/components/cloud-transition";
import { EventFormats } from "@/components/event-formats";
import { SelectedMoments } from "@/components/selected-moments";
import { contact } from "@/lib/content";

export default function Home() {
  return (
    <SiteExperience>
      <main id="main-content">
        <section
          className="hero scene-dark"
          id="home"
          aria-labelledby="hero-title"
        >
          <div className="hero-media" aria-hidden="true">
            <div className="hero-camera">
              <Image
                className="hero-image"
                src="/media/hero-concept.png"
                alt=""
                fill
                priority
                sizes="100vw"
                quality={88}
              />
            </div>
          </div>
          <div className="hero-shade" aria-hidden="true" />
          <div className="hero-light" aria-hidden="true" />
          <div className="hero-heading">
            <p className="eyebrow hero-eyebrow">
              <span className="tiny-star">✦</span> LUXURY ENTERTAINMENT,
              BEAUTIFULLY ORCHESTRATED
            </p>
            <h1 id="hero-title">
              <span className="hero-line">
                <span>BEYOND EVENTS.</span>
              </span>
              <span className="hero-line">
                <span>INTO EXPERIENCES.</span>
              </span>
            </h1>
            <p className="hero-signature">a feeling that stays.</p>
          </div>
          <div className="hero-lower">
            <div className="hero-introduction">
              <p>
                Music, entertainment, ambience and
                <br className="desktop-break" /> unforgettable moments, curated
                in Dubai.
              </p>
              <a className="text-link" href="#story">
                Explore experiences <Arrow />
              </a>
            </div>
            <a
              className="scroll-cue"
              href="#story"
              aria-label="Scroll to the ORZA story"
            >
              <span>SCROLL TO FEEL IT</span>
              <span className="scroll-line" />
            </a>
            <div className="hero-location">
              <span className="location-dot" /> DUBAI, UAE{" "}
              <span>25°12′ N &nbsp; 55°16′ E</span>
            </div>
          </div>
          <span className="concept-label">
            CAMPAIGN CONCEPT · AI-GENERATED IMAGERY
          </span>
        </section>

        <section
          id="story"
          className="story scene-light"
          aria-labelledby="story-title"
        >
          <div className="section-kicker">
            <span>01 / THE ORZA FEELING</span>
            <span>DUBAI, AND BEYOND</span>
          </div>
          <div className="story-title-wrap">
            <p className="italic-note reveal">A moment becomes a memory.</p>
            <h2 className="display story-title" id="story-title">
              <span className="reveal-line">
                <span>WE DON’T JUST</span>
              </span>
              <span className="reveal-line">
                <span>ENTERTAIN.</span>
              </span>
              <span className="reveal-line">
                <span>
                  WE CREATE <em>atmosphere.</em>
                </span>
              </span>
            </h2>
            <Flourish className="story-flourish" />
          </div>
          <div className="story-editorial">
            <figure className="artist-figure">
              <div className="image-reveal">
                <div className="artist-camera">
                  <Image
                    src="/media/artist-concept.png"
                    alt="Campaign concept of an oud artist in an ivory gown, framed by burgundy flowers and candlelight"
                    fill
                    sizes="(max-width: 700px) 86vw, 43vw"
                    quality={85}
                  />
                </div>
              </div>
              <figcaption>
                <span>THE ART OF BEING PRESENT</span>
                <span>CONCEPT IMAGE</span>
              </figcaption>
            </figure>
            <div className="story-copy">
              <span className="eyebrow reveal">
                SOME THINGS CAN ONLY BE FELT.
              </span>
              <h3 className="reveal">
                The first note.
                <br />
                The room, transformed.
                <br />
                <em>The moment, yours.</em>
              </h3>
              <p className="reveal">
                We believe an extraordinary event is a feeling. The warmth of a
                welcome. The energy of a live performance. The quiet beauty of
                every detail falling into place.
              </p>
              <p className="reveal">
                ORZA brings together exceptional artists, considered production
                and thoughtful hospitality to create experiences that stay with
                you. Rooted in Dubai. Shaped around you.
              </p>
              <a className="text-link reveal" href="#experiences">
                Enter our world <Arrow />
              </a>
              <BrandMark id="story-emblem" emblem className="story-emblem" />
            </div>
          </div>
          <div className="story-values">
            <span>CURATED TALENT</span>
            <span className="tiny-star">✦</span>
            <span>IMMERSIVE AMBIENCE</span>
            <span className="tiny-star">✦</span>
            <span>EFFORTLESS EXECUTION</span>
          </div>
        </section>

        <ScrollJourney />

        <ExperienceGallery />

        <Programme />

        <CloudTransition />

        <EventFormats />

        <SelectedMoments />

        <section
          className="closing scene-dark"
          id="contact"
          aria-labelledby="closing-title"
        >
          <div className="closing-orbit" aria-hidden="true" />
          <p className="eyebrow reveal">YOUR OCCASION. OUR OBSESSION.</p>
          <h2 className="display" id="closing-title">
            <span className="reveal-line">
              <span>MAKE IT</span>
            </span>
            <span className="reveal-line">
              <span>
                <em>unforgettable.</em>
              </span>
            </span>
          </h2>
          <p className="closing-copy reveal">
            Tell us what you are planning.
            <br />
            ORZA will shape the experience around it.
          </p>
          <button className="circle-cta" data-enquire>
            START YOUR
            <br />
            EVENT <Arrow diagonal />
          </button>
          <a
            className="closing-whatsapp text-link"
            href={contact.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
          >
            Or say hello on WhatsApp <Arrow diagonal />
          </a>
          <div className="closing-meta">
            <span>DUBAI, UNITED ARAB EMIRATES</span>
            <a href={contact.telephone}>{contact.phone}</a>
          </div>
        </section>
      </main>
      <footer className="footer">
        <div className="footer-top">
          <a href="#home" aria-label="ORZA Entertainment, back to top">
            <BrandMark id="footer" />
          </a>
          <p>
            Beyond events.
            <br />
            <em>Into experiences.</em>
          </p>
          <nav aria-label="Footer navigation">
            <a href="#services">
              SERVICES <Arrow />
            </a>
            <a href="#story">
              ABOUT <Arrow />
            </a>
            <a href="#contact">
              CONTACT <Arrow />
            </a>
            <a
              href={contact.instagram}
              target="_blank"
              rel="noopener noreferrer"
            >
              INSTAGRAM <Arrow diagonal />
            </a>
            <a
              href={contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              LINKEDIN <Arrow diagonal />
            </a>
            <a
              href={contact.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
            >
              WHATSAPP <Arrow diagonal />
            </a>
          </nav>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} ORZA ENTERTAINMENT</span>
          <span>LUXURY, IN EVERY LITTLE DETAIL.</span>
          <a href="#home">BACK TO TOP ↑</a>
        </div>
      </footer>
    </SiteExperience>
  );
}
