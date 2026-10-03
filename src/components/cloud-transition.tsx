import Image from "next/image";

export function CloudTransition() {
  return (
    <section
      className="cloud-transition scene-light"
      aria-labelledby="cloud-title"
    >
      <div className="cloud-stage">
        <div className="cloud-sky" aria-hidden="true">
          <span className="cloud cloud-far" />
          <span className="cloud cloud-mid" />
          <span className="cloud cloud-near" />
          <span className="cloud-light" />
        </div>
        <div
          className="cloud-botanical cloud-botanical-left"
          aria-hidden="true"
        >
          <Image
            src="/media/botanical/bougainvillea-branch.png"
            alt=""
            fill
            sizes="50vw"
          />
        </div>
        <div
          className="cloud-botanical cloud-botanical-right"
          aria-hidden="true"
        >
          <Image
            src="/media/botanical/bougainvillea-branch.png"
            alt=""
            fill
            sizes="45vw"
          />
        </div>
        <div className="cloud-copy">
          <p className="eyebrow">FROM AN IDEA TO AN ATMOSPHERE</p>
          <h2 className="display" id="cloud-title">
            Let the world
            <br />
            <em>fall away.</em>
          </h2>
        </div>
        <div className="cloud-window">
          <div className="cloud-window-camera">
            <Image
              src="/media/gallery-concepts/06-weddings.png"
              alt="Campaign concept of a candlelit Dubai wedding experience"
              fill
              sizes="100vw"
              quality={85}
            />
          </div>
          <span>AN ORZA WORLD / CAMPAIGN CONCEPT</span>
        </div>
        <div className="cloud-final-copy">
          <p className="eyebrow">ONE ROOM. A THOUSAND FEELINGS.</p>
          <p>Every element composed as one complete experience.</p>
        </div>
      </div>
    </section>
  );
}
