import Image from "next/image";

const scenes = [
  {
    number: "01",
    label: "CURATED TALENT",
    title: "The right artist changes everything.",
    detail:
      "We select musicians, performers and makers for their craft, presence and fit with the occasion, never from a generic list.",
    image: "/media/scroll-concepts/01-arrival.png",
    position: "center center",
  },
  {
    number: "02",
    label: "IMMERSIVE AMBIENCE",
    title: "Every detail belongs to the same world.",
    detail:
      "Music, light, florals, hospitality and performance are composed together, so the atmosphere is felt from the first arrival.",
    image: "/media/scroll-concepts/02-threshold.png",
    position: "center center",
  },
  {
    number: "03",
    label: "EFFORTLESS EXECUTION",
    title: "Complex behind the scenes. Seamless in the room.",
    detail:
      "From production cues to guest flow, our team manages the moving parts with calm precision so you can stay present.",
    image: "/media/scroll-concepts/03-performance-reveal.png",
    position: "center center",
  },
];

export function ScrollJourney() {
  return (
    <section
      className="scroll-journey scene-dark"
      id="journey"
      aria-labelledby="journey-title"
    >
      <div className="journey-stage">
        <div className="journey-frames" aria-hidden="true">
          {scenes.map((scene, index) => (
            <div className="journey-frame" data-scene={index} key={scene.image}>
              <Image
                src={scene.image}
                alt=""
                fill
                sizes="100vw"
                quality={85}
                style={{ objectPosition: scene.position }}
              />
            </div>
          ))}
          <div className="journey-shade" />
          <div className="journey-grain" />
        </div>

        <div className="journey-header">
          <span>02 / WHY ORZA</span>
          <span>THREE REASONS · THREE WORLDS</span>
        </div>

        <div className="journey-copy-wrap">
          {scenes.map((scene, index) => (
            <article
              className="journey-copy"
              data-scene={index}
              key={scene.number}
            >
              <p className="eyebrow">
                {scene.number} / {scene.label}
              </p>
              <h2
                className="display"
                id={index === 0 ? "journey-title" : undefined}
              >
                {scene.title}
              </h2>
              <p>{scene.detail}</p>
            </article>
          ))}
        </div>

        <div className="journey-footer" aria-hidden="true">
          <div className="journey-progress">
            <span className="journey-progress-fill" />
          </div>
          <div className="journey-dots">
            {scenes.map((scene, index) => (
              <span
                className="journey-dot"
                data-scene={index}
                key={scene.number}
              >
                {scene.number}
              </span>
            ))}
          </div>
          <span>ORZA / WHY CHOOSE US</span>
        </div>
      </div>
    </section>
  );
}
