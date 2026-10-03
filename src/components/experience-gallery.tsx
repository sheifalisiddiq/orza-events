import Image from "next/image";
import { Arrow } from "./icons";

const experiences = [
  {
    number: "01",
    label: "LIVE MUSIC",
    title: "The room finds its rhythm.",
    detail:
      "From a single oud to a full live band, we curate the sound that belongs to your occasion.",
    services: "OUD · VIOLIN · QANUN · HARP · DJS · TRIOS · LIVE BANDS",
    image: "/media/gallery-concepts/01-live-music-harp.png",
  },
  {
    number: "02",
    label: "CULTURAL ARTS",
    title: "Tradition, alive in the moment.",
    detail:
      "Cultural artistry presented with respect, beauty and a contemporary point of view.",
    services: "CALLIGRAPHY · CULTURAL PERFORMERS · LIVE ART · HERITAGE MOMENTS",
    image: "/media/gallery-concepts/02-cultural-arts-calligraphy.png",
  },
  {
    number: "03",
    label: "SIGNATURE ENTERTAINMENT",
    title: "A performance guests never expect.",
    detail:
      "Choreographed reveals, dancers and special acts designed around the energy of the room.",
    services: "DANCERS · INTERACTIVE SHOWS · SPECIAL ACTS · PERFORMANCE DESIGN",
    image: "/media/gallery-concepts/04-signature-entertainment.png",
  },
  {
    number: "04",
    label: "GUEST EXPERIENCES",
    title: "Every guest becomes part of the story.",
    detail:
      "Personal, beautifully hosted encounters that become the details people remember.",
    services: "LIVE SKETCHING · INSTANT PHOTOGRAPHY · HOSPITALITY · KEEPSAKES",
    image: "/media/gallery-concepts/05-guest-experiences.png",
  },
  {
    number: "05",
    label: "PRODUCTION & AV",
    title: "The invisible craft behind the feeling.",
    detail:
      "Sound, light, staging and show control brought together with quiet precision.",
    services: "SOUND · LIGHTING · AV · STAGING · EVENT PRODUCTION",
    image: "/media/gallery-concepts/03-production-av.png",
  },
  {
    number: "06",
    label: "WEDDINGS",
    title: "A celebration shaped around your story.",
    detail:
      "From the entrance to the final note, every moment is considered as part of one experience.",
    services: "ENGAGEMENTS · CEREMONIES · RECEPTIONS · BESPOKE ENTRANCES",
    image: "/media/gallery-concepts/06-weddings.png",
  },
  {
    number: "07",
    label: "CORPORATE EVENTS",
    title: "Precision, with presence.",
    detail:
      "Brand moments, launches and gatherings that feel polished without ever feeling predictable.",
    services: "LAUNCHES · GALAS · CONFERENCES · BRAND EXPERIENCES",
    image: "/media/gallery-concepts/07-corporate-events.png",
  },
  {
    number: "08",
    label: "PRIVATE CELEBRATIONS",
    title: "Intimate. Personal. Unforgettable.",
    detail:
      "A private dinner or a milestone gathering, composed around the people who matter most.",
    services: "PRIVATE DINNERS · BIRTHDAYS · MAJLIS · BESPOKE PARTIES",
    image: "/media/gallery-concepts/08-private-celebrations.png",
  },
];

export function ExperienceGallery() {
  return (
    <section
      id="experiences"
      className="experience-gallery scene-light"
      aria-labelledby="experience-gallery-title"
    >
      <div className="experience-gallery-stage">
        <div className="experience-gallery-header">
          <span>03 / ORZA EXPERIENCES</span>
          <span>SCROLL TO EXPLORE</span>
        </div>

        <div className="experience-gallery-copies">
          {experiences.map((item, index) => (
            <article className="experience-category-copy" key={item.number}>
              <p className="eyebrow">
                {item.number} / {item.label}
              </p>
              <h2
                className="display"
                id={index === 0 ? "experience-gallery-title" : undefined}
              >
                {item.title}
              </h2>
              <p>{item.detail}</p>
              <span className="experience-services">{item.services}</span>
              <button
                className="text-link"
                data-enquire
                data-experience={item.label}
              >
                Explore this experience <Arrow />
              </button>
            </article>
          ))}
        </div>

        <div className="experience-deck" aria-hidden="true">
          {experiences.map((item, index) => (
            <figure className="experience-card" key={item.image}>
              <div className="experience-card-image">
                <Image
                  src={item.image}
                  alt=""
                  fill
                  sizes="(max-width: 700px) 78vw, 46vw"
                  quality={85}
                />
              </div>
              <figcaption>
                <span>{item.label}</span>
                <span>{String(index + 1).padStart(2, "0")} / 08</span>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="experience-gallery-footer" aria-hidden="true">
          <span className="experience-gallery-count">01 / 08</span>
          <div className="experience-gallery-progress">
            <span />
          </div>
          <span>ORZA / CAMPAIGN CONCEPT</span>
        </div>
        <span className="gallery-cursor" aria-hidden="true">
          SCROLL TO EXPLORE
        </span>
      </div>
    </section>
  );
}
