"use client";

import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Lenis from "lenis";
import { BrandMark } from "./brand-mark";
import { Arrow } from "./icons";
import { EventBrief } from "./event-brief";
import { contact } from "@/lib/content";

gsap.registerPlugin(useGSAP, ScrollTrigger);
const noSubscribe = () => () => {};
function subscribeReduced(callback: () => void) {
  const query = window.matchMedia("(prefers-reduced-motion: reduce)");
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}
const getReduced = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function keepDialogFocus(event: KeyboardEvent<HTMLDialogElement>) {
  if (event.key !== "Tab") return;
  const elements = Array.from(
    event.currentTarget.querySelectorAll<HTMLElement>(
      'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex="0"]',
    ),
  ).filter((el) => el.getClientRects().length > 0);
  const first = elements[0],
    last = elements[elements.length - 1];
  if (!first) return;
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}

export function SiteExperience({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const header = useRef<HTMLElement>(null);
  const introTimeline = useRef<gsap.core.Timeline | null>(null);
  const lenis = useRef<Lenis | null>(null);
  const menu = useRef<HTMLDialogElement>(null);
  const brief = useRef<HTMLDialogElement>(null);
  const briefReturnFocus = useRef<HTMLElement | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [briefOpen, setBriefOpen] = useState(false);
  const [interest, setInterest] = useState("");
  const [paused, setPaused] = useState(false);
  const [introRun, setIntroRun] = useState(0);
  const hydrated = useSyncExternalStore(
    noSubscribe,
    () => true,
    () => false,
  );
  const systemReduced = useSyncExternalStore(
    subscribeReduced,
    getReduced,
    () => true,
  );
  const reduced = paused || systemReduced;

  useEffect(() => {
    const rememberPosition = () => {
      const hero = root.current?.querySelector<HTMLElement>(".hero");
      try {
        sessionStorage.setItem(
          "orza-refresh-position",
          JSON.stringify({
            path: location.pathname + location.search,
            inHero: !!hero && hero.getBoundingClientRect().bottom > 85,
          }),
        );
      } catch {
        /* Storage restrictions must never block the opening. */
      }
    };
    window.addEventListener("pagehide", rememberPosition);
    return () => window.removeEventListener("pagehide", rememberPosition);
  }, []);

  function finishIntro() {
    introTimeline.current?.progress(1);
    document.documentElement.dataset.intro = "complete";
  }

  function replayIntro() {
    if (reduced) return;
    lenis.current?.scrollTo(0, { immediate: true });
    window.scrollTo({ top: 0, behavior: "instant" });
    history.replaceState(null, "", location.pathname + location.search);
    document.documentElement.dataset.intro = "pending";
    setIntroRun((run) => run + 1);
  }

  function openBrief(experience = "") {
    briefReturnFocus.current = menuOpen
      ? root.current?.querySelector<HTMLElement>(".menu-toggle") || null
      : (document.activeElement as HTMLElement);
    finishIntro();
    setMenuOpen(false);
    setInterest(experience);
    setBriefOpen(true);
  }
  function closeBrief() {
    setBriefOpen(false);
    requestAnimationFrame(() =>
      briefReturnFocus.current?.focus({ preventScroll: true }),
    );
  }

  useEffect(() => {
    if (!hydrated || reduced) return;
    const smooth = new Lenis({
      duration: 1.15,
      smoothWheel: true,
      syncTouch: false,
      anchors: { offset: -60 },
    });
    lenis.current = smooth;
    smooth.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => smooth.raf(time * 1000);
    gsap.ticker.add(tick);
    return () => {
      gsap.ticker.remove(tick);
      smooth.destroy();
      lenis.current = null;
    };
  }, [hydrated, reduced]);

  useEffect(() => {
    const isOpen = menuOpen || briefOpen;
    const previous = document.body.style.overflow;
    if (isOpen) {
      lenis.current?.stop();
      document.body.style.overflow = "hidden";
    } else lenis.current?.start();
    return () => {
      document.body.style.overflow = previous;
      if (isOpen) lenis.current?.start();
    };
  }, [menuOpen, briefOpen]);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const scene = Array.from(
        document.querySelectorAll<HTMLElement>(".scene-light,.scene-dark"),
      ).find((el) => {
        const r = el.getBoundingClientRect();
        return r.top <= 85 && r.bottom > 85;
      });
      if (header.current) {
        header.current.dataset.tone = scene?.classList.contains("scene-light")
          ? "dark"
          : "light";
        header.current.classList.toggle("is-scrolled", window.scrollY > 80);
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    const current = root.current;
    const onEnquire = (event: MouseEvent) => {
      const target = (event.target as Element).closest<HTMLElement>(
        "[data-enquire]",
      );
      if (target) {
        briefReturnFocus.current = target;
        introTimeline.current?.progress(1);
        document.documentElement.dataset.intro = "complete";
        setInterest(target.dataset.experience || "");
        setBriefOpen(true);
      }
    };
    current?.addEventListener("click", onEnquire);
    return () => current?.removeEventListener("click", onEnquire);
  }, []);

  useEffect(() => {
    if (reduced || window.matchMedia("(pointer: coarse)").matches) return;
    const gallery = root.current?.querySelector<HTMLElement>(
      ".experience-gallery-stage",
    );
    const cursor = gallery?.querySelector<HTMLElement>(".gallery-cursor");
    if (!gallery || !cursor) return;
    const xTo = gsap.quickTo(cursor, "x", { duration: 0.28, ease: "power3" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.28, ease: "power3" });
    const move = (event: PointerEvent) => {
      xTo(event.clientX);
      yTo(event.clientY);
    };
    const enter = () =>
      gsap.to(cursor, { autoAlpha: 1, scale: 1, duration: 0.2 });
    const leave = () =>
      gsap.to(cursor, { autoAlpha: 0, scale: 0.8, duration: 0.2 });
    gallery.addEventListener("pointermove", move);
    gallery.addEventListener("pointerenter", enter);
    gallery.addEventListener("pointerleave", leave);
    return () => {
      gallery.removeEventListener("pointermove", move);
      gallery.removeEventListener("pointerenter", enter);
      gallery.removeEventListener("pointerleave", leave);
    };
  }, [reduced]);

  useGSAP(
    () => {
      if (!hydrated) return;
      const container = root.current!;
      const q = gsap.utils.selector(container);
      const complete = () => {
        document.documentElement.dataset.intro = "complete";
        if (document.activeElement?.classList.contains("skip-intro")) {
          container
            .querySelector<HTMLElement>(".replay-intro")
            ?.focus({ preventScroll: true });
        }
      };
      if (reduced) {
        complete();
        return;
      }
      const shouldIntro = document.documentElement.dataset.intro !== "complete";
      if (shouldIntro) {
        document.documentElement.dataset.intro = document.hidden
          ? "waiting"
          : "playing";
        const logo = container.querySelector<HTMLElement>(".intro-logo")!;
        const target = container.querySelector<HTMLElement>(".header-brand")!;
        const from = logo.getBoundingClientRect(),
          to = target.getBoundingClientRect();
        const tl = gsap.timeline({
          defaults: { ease: "power3.inOut" },
          onComplete: complete,
          paused: true,
        });
        introTimeline.current = tl;
        tl.fromTo(
          q(".curtain-left"),
          { xPercent: 0 },
          { xPercent: -103, skewX: 2, duration: 2.65 },
          0.55,
        )
          .fromTo(
            q(".curtain-right"),
            { xPercent: 0 },
            { xPercent: 103, skewX: -2, duration: 2.65 },
            0.55,
          )
          .fromTo(
            q(".curtain-folds"),
            { scaleX: 1 },
            { scaleX: 1.14, duration: 2.8 },
            0.35,
          )
          .fromTo(
            q(".hero-camera"),
            { scale: 1.16, filter: "blur(4px)" },
            {
              scale: 1,
              filter: "blur(0px)",
              duration: 3.3,
              ease: "power2.out",
            },
            0.35,
          )
          .to(
            logo,
            {
              x: to.left + to.width / 2 - (from.left + from.width / 2),
              y: to.top + to.height / 2 - (from.top + from.height / 2),
              scale: to.width / from.width,
              duration: 1.8,
            },
            0.65,
          )
          .to(logo, { opacity: 0, duration: 0.35 }, 2.35)
          .fromTo(target, { opacity: 0 }, { opacity: 1, duration: 0.35 }, 2.35)
          .from(
            q(".hero-line > span"),
            {
              yPercent: 110,
              rotate: 2,
              filter: "blur(3px)",
              duration: 1.2,
              stagger: 0.12,
              ease: "power3.out",
            },
            1.8,
          )
          .from(
            q(".hero-eyebrow,.hero-signature,.hero-lower"),
            { opacity: 0, y: 12, duration: 0.8, stagger: 0.1 },
            2.45,
          )
          .to(q(".skip-intro"), { opacity: 0, duration: 0.2 }, 3.2);
        // A preview can load behind the chat. Do not spend its opening off-screen.
        const onVisibility = () => {
          if (document.documentElement.dataset.intro === "complete") return;
          document.documentElement.dataset.intro = document.hidden
            ? "waiting"
            : "playing";
          if (document.hidden) tl.pause();
          else tl.play();
        };
        document.addEventListener("visibilitychange", onVisibility);
        onVisibility();
        return () => {
          document.removeEventListener("visibilitychange", onVisibility);
          introTimeline.current = null;
        };
      } else {
        gsap.from(q(".hero-line > span"), {
          yPercent: 105,
          duration: 1.15,
          stagger: 0.1,
          ease: "power3.out",
        });
      }
    },
    {
      scope: root,
      dependencies: [hydrated, reduced, introRun],
      revertOnUpdate: true,
    },
  );

  useGSAP(
    () => {
      if (!hydrated || reduced) return;
      const q = gsap.utils.selector(root.current!);
      const responsive = gsap.matchMedia();
      responsive.add("(min-width: 800px)", () => {
        gsap.to(q(".hero-media"), {
          yPercent: 15,
          ease: "none",
          scrollTrigger: {
            trigger: q(".hero")[0],
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });
        gsap.fromTo(
          q(".artist-camera"),
          { yPercent: -5, scale: 1.08 },
          {
            yPercent: 5,
            scale: 1.02,
            ease: "none",
            scrollTrigger: {
              trigger: q(".artist-figure")[0],
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          },
        );
      });

      const journey = q(".scroll-journey")[0] as HTMLElement | undefined;
      const journeyStage = q(".journey-stage")[0] as HTMLElement | undefined;
      const journeyFrames = q(".journey-frame") as HTMLElement[];
      const journeyCopies = q(".journey-copy") as HTMLElement[];
      const journeyDots = q(".journey-dot") as HTMLElement[];
      const journeyProgress = q(".journey-progress-fill")[0] as
        HTMLElement | undefined;

      if (
        journey &&
        journeyStage &&
        journeyFrames.length > 1 &&
        journeyCopies.length === journeyFrames.length
      ) {
        gsap.set(journeyFrames, { autoAlpha: 0, scale: 1.06 });
        gsap.set(journeyFrames[0], { autoAlpha: 1, scale: 1 });
        gsap.set(journeyCopies, { autoAlpha: 0, y: 28 });
        gsap.set(journeyCopies[0], { autoAlpha: 1, y: 0 });
        gsap.set(journeyDots, { opacity: 0.35 });
        gsap.set(journeyDots[0], { opacity: 1 });
        if (journeyProgress) gsap.set(journeyProgress, { scaleX: 0 });

        const journeyTimeline = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: journey,
            start: "top top",
            end: () =>
              `+=${window.innerHeight * (window.innerWidth < 800 ? 2.4 : 3.35)}`,
            pin: journeyStage,
            scrub: 0.75,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        if (journeyProgress) {
          journeyTimeline.to(journeyProgress, { scaleX: 1, duration: 3 }, 0);
        }
        for (let index = 1; index < journeyFrames.length; index += 1) {
          const at = index - 0.25;
          journeyTimeline
            .to(
              journeyFrames[index - 1],
              { autoAlpha: 0, scale: 1.045, duration: 0.7 },
              at,
            )
            .fromTo(
              journeyFrames[index],
              { autoAlpha: 0, scale: 1.07 },
              { autoAlpha: 1, scale: 1, duration: 0.85 },
              at,
            )
            .to(
              journeyCopies[index - 1],
              { autoAlpha: 0, y: -22, duration: 0.3 },
              at,
            )
            .to(
              journeyCopies[index],
              { autoAlpha: 1, y: 0, duration: 0.42 },
              at + 0.27,
            )
            .to(journeyDots[index - 1], { opacity: 0.35, duration: 0.2 }, at)
            .to(journeyDots[index], { opacity: 1, duration: 0.2 }, at);
        }
      }

      const gallery = q(".experience-gallery")[0] as HTMLElement | undefined;
      const galleryStage = q(".experience-gallery-stage")[0] as
        HTMLElement | undefined;
      const galleryCards = q(".experience-card") as HTMLElement[];
      const galleryCopies = q(".experience-category-copy") as HTMLElement[];
      const galleryProgress = q(".experience-gallery-progress > span")[0] as
        HTMLElement | undefined;
      const galleryCount = q(".experience-gallery-count")[0] as
        HTMLElement | undefined;

      if (
        gallery &&
        galleryStage &&
        galleryCards.length > 1 &&
        galleryCopies.length === galleryCards.length
      ) {
        const travelX = () => window.innerWidth * 0.52;
        const travelY = () => window.innerHeight * 0.48;
        gsap.set(galleryCards, {
          autoAlpha: 0,
          x: travelX,
          y: travelY,
          rotate: 6,
          scale: 0.78,
        });
        gsap.set(galleryCards[0], {
          autoAlpha: 1,
          x: 0,
          y: 0,
          rotate: 0,
          scale: 1,
        });
        gsap.set(galleryCopies, { autoAlpha: 0, y: 28 });
        gsap.set(galleryCopies[0], { autoAlpha: 1, y: 0 });
        if (galleryProgress) gsap.set(galleryProgress, { scaleX: 0 });

        const galleryTimeline = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: gallery,
            start: "top top",
            end: () =>
              `+=${window.innerHeight * (window.innerWidth < 800 ? 5.4 : 7.2)}`,
            pin: galleryStage,
            scrub: 0.85,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (!galleryCount) return;
              const current = Math.min(
                galleryCards.length - 1,
                Math.round(self.progress * (galleryCards.length - 1)),
              );
              galleryCount.textContent = `${String(current + 1).padStart(2, "0")} / ${String(galleryCards.length).padStart(2, "0")}`;
            },
          },
        });
        if (galleryProgress)
          galleryTimeline.to(
            galleryProgress,
            { scaleX: 1, duration: galleryCards.length - 1 },
            0,
          );
        for (let index = 1; index < galleryCards.length; index += 1) {
          const at = index - 0.8;
          galleryTimeline
            .to(
              galleryCards[index - 1],
              {
                autoAlpha: 0.14,
                x: () => -travelX(),
                y: () => -travelY(),
                rotate: -6,
                scale: 0.7,
                duration: 0.92,
              },
              at,
            )
            .fromTo(
              galleryCards[index],
              {
                autoAlpha: 0,
                x: travelX,
                y: travelY,
                rotate: 6,
                scale: 0.78,
              },
              {
                autoAlpha: 1,
                x: 0,
                y: 0,
                rotate: 0,
                scale: 1,
                duration: 0.96,
              },
              at + 0.05,
            )
            .to(
              galleryCopies[index - 1],
              { autoAlpha: 0, y: -28, duration: 0.3 },
              at,
            )
            .to(
              galleryCopies[index],
              { autoAlpha: 1, y: 0, duration: 0.42 },
              at + 0.38,
            )
            .fromTo(
              galleryCards[index].querySelector("img"),
              { scale: 1.1, yPercent: 4 },
              { scale: 1.02, yPercent: -3, duration: 1 },
              at,
            );
        }
      }

      const cloudSection = q(".cloud-transition")[0] as HTMLElement | undefined;
      const cloudStage = q(".cloud-stage")[0] as HTMLElement | undefined;
      if (cloudSection && cloudStage) {
        const cloudTimeline = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: cloudSection,
            start: "top top",
            end: () => `+=${window.innerHeight * 2.2}`,
            pin: cloudStage,
            scrub: 0.85,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
        cloudTimeline
          .to(q(".cloud-far"), { xPercent: 10, yPercent: -4, duration: 2 }, 0)
          .to(q(".cloud-mid"), { xPercent: -18, yPercent: -7, duration: 2 }, 0)
          .to(q(".cloud-near"), { xPercent: 24, yPercent: -11, duration: 2 }, 0)
          .to(
            q(".cloud-botanical-left"),
            { xPercent: -18, rotate: -7, duration: 1.15 },
            0,
          )
          .to(
            q(".cloud-botanical-right"),
            { xPercent: 18, rotate: 8, duration: 1.15 },
            0,
          )
          .to(q(".cloud-copy"), { autoAlpha: 0, y: -32, duration: 0.45 }, 0.25)
          .to(
            q(".cloud-window"),
            {
              width: "100vw",
              height: "100svh",
              borderRadius: 0,
              duration: 1.35,
              ease: "power2.inOut",
            },
            0.45,
          )
          .to(
            q(".cloud-window-camera img"),
            { scale: 1.01, duration: 1.55 },
            0.45,
          )
          .to(
            q(".cloud-sky,.cloud-botanical"),
            { autoAlpha: 0, duration: 0.55 },
            1.1,
          )
          .to(
            q(".cloud-final-copy"),
            { autoAlpha: 1, y: 0, duration: 0.45 },
            1.45,
          );
      }

      const formats = q(".event-formats")[0] as HTMLElement | undefined;
      const formatsStage = q(".event-formats-stage")[0] as
        HTMLElement | undefined;
      const formatScenes = q(".format-scene") as HTMLElement[];
      const formatCopies = q(".format-copy") as HTMLElement[];
      const formatIndices = q(".format-index span") as HTMLElement[];
      if (
        formats &&
        formatsStage &&
        formatScenes.length > 1 &&
        formatCopies.length === formatScenes.length
      ) {
        gsap.set(formatScenes, { autoAlpha: 0, scale: 1.08 });
        gsap.set(formatScenes[0], { autoAlpha: 1, scale: 1 });
        gsap.set(formatCopies, { autoAlpha: 0, y: 34 });
        gsap.set(formatCopies[0], { autoAlpha: 1, y: 0 });
        gsap.set(formatIndices, { opacity: 0.35 });
        gsap.set(formatIndices[0], { opacity: 1 });

        const formatTimeline = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: formats,
            start: "top top",
            end: () =>
              `+=${window.innerHeight * (window.innerWidth < 800 ? 4.6 : 6.2)}`,
            pin: formatsStage,
            scrub: 0.8,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
        for (let index = 1; index < formatScenes.length; index += 1) {
          const at = index - 0.72;
          formatTimeline
            .to(
              formatScenes[index - 1],
              { autoAlpha: 0, scale: 1.05, duration: 0.62 },
              at,
            )
            .fromTo(
              formatScenes[index],
              { autoAlpha: 0, clipPath: "inset(0 0 100% 0)", scale: 1.08 },
              {
                autoAlpha: 1,
                clipPath: "inset(0 0 0% 0)",
                scale: 1,
                duration: 0.82,
              },
              at,
            )
            .to(
              formatCopies[index - 1],
              { autoAlpha: 0, y: -30, duration: 0.28 },
              at,
            )
            .to(
              formatCopies[index],
              { autoAlpha: 1, y: 0, duration: 0.4 },
              at + 0.3,
            )
            .to(formatIndices[index - 1], { opacity: 0.35, duration: 0.2 }, at)
            .to(formatIndices[index], { opacity: 1, duration: 0.2 }, at);
        }
      }

      q(".moment-card").forEach((card: HTMLElement, index: number) =>
        gsap.from(card, {
          clipPath: index % 2 === 0 ? "inset(0 0 100% 0)" : "inset(100% 0 0 0)",
          y: index % 2 === 0 ? 40 : 80,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 90%", once: true },
        }),
      );
      q(".reveal-line").forEach((line: HTMLElement) =>
        gsap.from(line.children, {
          yPercent: 112,
          rotate: 1.5,
          duration: 1.05,
          ease: "power3.out",
          scrollTrigger: { trigger: line, start: "top 92%", once: true },
        }),
      );
      q(".reveal").forEach((el: HTMLElement) =>
        gsap.from(el, {
          y: 26,
          opacity: 0,
          duration: 0.9,
          scrollTrigger: { trigger: el, start: "top 92%", once: true },
        }),
      );
      q(".image-reveal").forEach((el: HTMLElement) =>
        gsap.from(el, {
          clipPath: "inset(12% 0% 12% 0%)",
          duration: 1.4,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        }),
      );
      const light = gsap.to(q(".hero-light"), {
        opacity: 0.36,
        xPercent: 8,
        duration: 7,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        paused: true,
      });
      ScrollTrigger.create({
        trigger: q(".hero")[0],
        start: "top bottom",
        end: "bottom top",
        onToggle: (self) => (self.isActive ? light.play() : light.pause()),
      });
      const refresh = () => ScrollTrigger.refresh();
      document.fonts.ready.then(refresh);
      return () => {
        responsive.revert();
      };
    },
    { scope: root, dependencies: [hydrated, reduced], revertOnUpdate: true },
  );

  useGSAP(
    () => {
      const dialog = menu.current!;
      if (!menuOpen) {
        if (dialog.open) dialog.close();
        return;
      }
      dialog.showModal();
      if (!reduced) {
        gsap.fromTo(
          dialog,
          { clipPath: "inset(0 0 100% 0)" },
          { clipPath: "inset(0 0 0% 0)", duration: 0.65, ease: "power3.inOut" },
        );
        gsap.from(dialog.querySelectorAll(".menu-link"), {
          yPercent: 65,
          opacity: 0,
          stagger: 0.08,
          duration: 0.65,
          delay: 0.25,
          ease: "power3.out",
        });
      }
      return () => {
        if (dialog.open) dialog.close();
      };
    },
    { scope: root, dependencies: [menuOpen, reduced], revertOnUpdate: true },
  );

  useGSAP(
    () => {
      const dialog = brief.current!;
      if (!briefOpen) {
        if (dialog.open) dialog.close();
        return;
      }
      dialog.showModal();
      if (!reduced)
        gsap.fromTo(
          dialog,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
        );
      return () => {
        if (dialog.open) dialog.close();
      };
    },
    { scope: root, dependencies: [briefOpen, reduced], revertOnUpdate: true },
  );

  function navigateFromMenu(id: string) {
    setMenuOpen(false);
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        lenis.current?.start();
        const target = document.querySelector<HTMLElement>(id);
        if (!target) return;
        if (lenis.current) lenis.current.scrollTo(target, { offset: -60 });
        else
          target.scrollIntoView({ behavior: reduced ? "instant" : "smooth" });
        target.setAttribute("tabindex", "-1");
        target.focus({ preventScroll: true });
        history.replaceState(null, "", id);
      }),
    );
  }

  return (
    <div ref={root} className={`site ${reduced ? "motion-reduced" : ""}`}>
      <a className="skip-content" href="#main-content" onClick={finishIntro}>
        Skip to content
      </a>
      <header ref={header} className="site-header" data-tone="light">
        <a
          href="#home"
          className="header-brand"
          aria-label="ORZA Entertainment, home"
          onClick={finishIntro}
        >
          <BrandMark id="navigation" />
        </a>
        <div className="header-right">
          <button className="header-enquire" onClick={() => openBrief()}>
            PLAN YOUR EVENT <Arrow diagonal />
          </button>
          <button
            className="menu-toggle"
            aria-haspopup="dialog"
            aria-controls="main-menu"
            aria-expanded={menuOpen}
            onClick={() => {
              finishIntro();
              setMenuOpen(true);
            }}
          >
            MENU{" "}
            <span className="menu-bars" aria-hidden="true">
              <i />
              <i />
            </span>
          </button>
        </div>
      </header>
      <div className="intro" aria-label="ORZA opening sequence">
        <div className="curtain curtain-left" aria-hidden="true">
          <div className="curtain-folds" />
        </div>
        <div className="curtain curtain-right" aria-hidden="true">
          <div className="curtain-folds" />
        </div>
        <div className="intro-logo" aria-hidden="true">
          <BrandMark id="intro" />
        </div>
        <button className="skip-intro" onClick={finishIntro}>
          SKIP INTRO <Arrow />
        </button>
      </div>
      {children}
      <button
        className="motion-control replay-intro"
        onClick={replayIntro}
        disabled={reduced}
        title={
          reduced
            ? "Intro unavailable while reduced motion is enabled"
            : "Replay the curtain opening"
        }
      >
        <span aria-hidden="true">↻</span>
        <span>REPLAY INTRO</span>
      </button>
      <button
        className="motion-control"
        aria-pressed={paused || systemReduced}
        disabled={systemReduced}
        onClick={() => {
          finishIntro();
          setPaused((value) => !value);
        }}
        title={
          systemReduced
            ? "Reduced motion follows your device preference"
            : "Pause or resume decorative motion"
        }
      >
        <span aria-hidden="true">{reduced ? "▷" : "Ⅱ"}</span>
        <span>{reduced ? "MOTION OFF" : "MOTION ON"}</span>
      </button>
      <dialog
        ref={menu}
        id="main-menu"
        className="menu-dialog"
        aria-label="Main navigation"
        onKeyDown={keepDialogFocus}
        onCancel={(event) => {
          event.preventDefault();
          setMenuOpen(false);
        }}
      >
        <div className="dialog-header">
          <a
            href="#home"
            aria-label="ORZA Entertainment, home"
            onClick={(event) => {
              event.preventDefault();
              navigateFromMenu("#home");
            }}
          >
            <BrandMark id="menu" />
          </a>
          <button className="close-button" onClick={() => setMenuOpen(false)}>
            CLOSE <span aria-hidden="true">×</span>
          </button>
        </div>
        <div className="menu-layout">
          <div className="menu-intro">
            <span className="eyebrow">AN INVITATION INTO OUR WORLD</span>
            <p>
              Extraordinary
              <br />
              begins <em>here.</em>
            </p>
            <span className="menu-address">DUBAI, UNITED ARAB EMIRATES</span>
          </div>
          <nav aria-label="Main">
            <a
              className="menu-link"
              href="#story"
              onClick={(event) => {
                event.preventDefault();
                navigateFromMenu("#story");
              }}
            >
              <span>01</span>Our story
              <Arrow diagonal />
            </a>
            <a
              className="menu-link"
              href="#experiences"
              onClick={(event) => {
                event.preventDefault();
                navigateFromMenu("#experiences");
              }}
            >
              <span>02</span>Experiences
              <Arrow diagonal />
            </a>
            <a
              className="menu-link"
              href="#services"
              onClick={(event) => {
                event.preventDefault();
                navigateFromMenu("#services");
              }}
            >
              <span>03</span>Services
              <Arrow diagonal />
            </a>
            <button className="menu-link" onClick={() => openBrief()}>
              <span>04</span>Your occasion
              <Arrow diagonal />
            </button>
            <a
              className="menu-link"
              href="#contact"
              onClick={(event) => {
                event.preventDefault();
                navigateFromMenu("#contact");
              }}
            >
              <span>05</span>Say hello
              <Arrow diagonal />
            </a>
          </nav>
        </div>
        <div className="menu-bottom">
          <a href={contact.telephone}>{contact.phone}</a>
          <div>
            <a
              href={contact.instagram}
              target="_blank"
              rel="noopener noreferrer"
            >
              INSTAGRAM
            </a>
            <a
              href={contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              LINKEDIN
            </a>
            <a
              href={contact.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
            >
              WHATSAPP
            </a>
          </div>
        </div>
      </dialog>
      <dialog
        ref={brief}
        id="event-brief"
        className="brief-dialog"
        aria-labelledby="brief-title"
        data-lenis-prevent
        onKeyDown={keepDialogFocus}
        onCancel={(event) => {
          event.preventDefault();
          closeBrief();
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeBrief();
        }}
      >
        <button
          className="close-button brief-close"
          onClick={closeBrief}
          aria-label="Close event brief"
        >
          CLOSE <span aria-hidden="true">×</span>
        </button>
        {briefOpen && <EventBrief experience={interest} />}
      </dialog>
    </div>
  );
}
