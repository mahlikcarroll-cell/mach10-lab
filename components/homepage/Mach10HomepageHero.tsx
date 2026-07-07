import HomepageBlueprintBackground from "@/components/homepage/HomepageBlueprintBackground";
import HomepageSystemNodes from "@/components/homepage/HomepageSystemNodes";
import type { HomepageIntroState } from "@/components/homepage/HomepageExperience";

type Mach10HomepageHeroProps = {
  introState?: HomepageIntroState;
  isAssembled?: boolean;
};

export default function Mach10HomepageHero({
  introState,
  isAssembled = true,
}: Mach10HomepageHeroProps) {
  const resolvedIntroState =
    introState ?? (isAssembled ? "hero-ready" : "loading");

  return (
    <section
      className={`mach10-homepage-hero mach10-homepage-hero--${resolvedIntroState}`}
      aria-labelledby="mach10-hero-title"
    >
      <HomepageBlueprintBackground />

      <div className="mach10-homepage-hero__inner">
        <div className="mach10-homepage-hero__content">
          <div className="mach10-homepage-hero__message">
            <p className="mach10-homepage-hero__eyebrow">Mach10 Creative</p>
            <h1 id="mach10-hero-title" className="mach10-homepage-hero__title">
              WE BUILD WEBSITES THAT WORK.
            </h1>
            <p className="mach10-homepage-hero__subheadline">
              Strategy, design, and intelligent systems working together to turn
              your website into your best salesperson.
            </p>
          </div>

          <div className="mach10-homepage-hero__actions">
            <a className="mach10-homepage-hero__button" href="/work">
              See Our Work
            </a>
            <a
              className="mach10-homepage-hero__button mach10-homepage-hero__button--secondary"
              href="/contact"
            >
              Build My System
            </a>
          </div>
        </div>

        <HomepageSystemNodes />
      </div>
    </section>
  );
}
