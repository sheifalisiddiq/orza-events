import Image from "next/image";
import { Arrow } from "./icons";

const formats = [
  {
    number: "01",
    title: "Weddings & engagements",
    note: "Romance, ritual and the beginning of something new.",
    image: "/media/gallery-concepts/06-weddings.png",
  },
  {
    number: "02",
    title: "Corporate events",
    note: "Brand stories delivered with precision and presence.",
    image: "/media/gallery-concepts/07-corporate-events.png",
  },
  {
    number: "03",
    title: "Concerts",
    note: "The scale of a live stage. The intimacy of a shared note.",
    image: "/media/event-formats/03-concerts.png",
  },
  {
    number: "04",
    title: "Festivals",
    note: "Many moving parts, orchestrated as one living world.",
    image: "/media/event-formats/04-festivals.png",
  },
  {
    number: "05",
    title: "Cultural events",
    note: "Heritage expressed with care, artistry and relevance.",
    image: "/media/gallery-concepts/02-cultural-arts-calligraphy.png",
  },
  {
    number: "06",
    title: "Exhibitions",
    note: "Spaces that invite curiosity, conversation and discovery.",
    image: "/media/event-formats/06-exhibitions.png",
  },
  {
    number: "07",
    title: "Private parties",
    note: "Personal celebrations made beautifully your own.",
    image: "/media/gallery-concepts/08-private-celebrations.png",
  },
];

export function EventFormats() {
  return (
    <section
      className="event-formats scene-dark"
      id="event-formats"
      aria-labelledby="event-formats-title"
    >
      <div className="event-formats-stage">
        <div className="format-media" aria-hidden="true">
          {formats.map((item) => (
            <div className="format-scene" key={item.number}>
              <Image src={item.image} alt="" fill sizes="100vw" quality={85} />
            </div>
          ))}
          <div className="format-shade" />
          <div className="format-light" />
          <div className="format-particles" />
          <div className="format-reflection" />
        </div>
        <div className="format-header">
          <span>05 / EVERY OCCASION, ITS OWN WORLD</span>
          <span>SEVEN DISTINCT FORMATS</span>
        </div>
        <div className="format-copies">
          {formats.map((item, index) => (
            <article className="format-copy" key={item.number}>
              <span className="format-number">{item.number}</span>
              <p className="eyebrow">ORZA EVENT FORMAT</p>
              <h2
                className="display"
                id={index === 0 ? "event-formats-title" : undefined}
              >
                {item.title}
              </h2>
              <p>{item.note}</p>
              <button
                className="text-link"
                data-enquire
                data-experience={item.title}
              >
                Plan this occasion <Arrow />
              </button>
            </article>
          ))}
        </div>
        <div className="format-index" aria-hidden="true">
          {formats.map((item) => (
            <span key={item.number}>{item.number}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
