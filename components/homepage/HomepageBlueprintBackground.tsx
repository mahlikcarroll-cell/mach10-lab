/* eslint-disable @next/next/no-img-element */
import { getMach10HomepageAssetUrl } from "@/components/homepage/homepageAssets";

export default function HomepageBlueprintBackground() {
  return (
    <div className="mach10-homepage-hero__blueprint" aria-hidden="true">
      {/* Decorative SVG layers are tracked by the homepage preloader. */}
      <img
        className="mach10-homepage-hero__blueprint-asset mach10-homepage-hero__blueprint-asset--base"
        src={getMach10HomepageAssetUrl("blueprint-base.svg")}
        alt=""
        aria-hidden="true"
      />
      <img
        className="mach10-homepage-hero__blueprint-asset mach10-homepage-hero__blueprint-asset--lines"
        src={getMach10HomepageAssetUrl("blueprint-lines.svg")}
        alt=""
        aria-hidden="true"
      />
      <div className="mach10-homepage-hero__grid" />
      <div className="mach10-homepage-hero__scanline" />
      <svg
        className="mach10-homepage-hero__schematic"
        viewBox="0 0 1200 720"
        role="presentation"
      >
        <path d="M84 560H292L374 474H548" />
        <path d="M766 178H938L1026 266H1140" />
        <path d="M198 172H374L456 256H638L720 338H1012" />
        <path d="M250 640H506L594 552H846L932 466H1112" />
        <circle cx="374" cy="474" r="5" />
        <circle cx="720" cy="338" r="5" />
        <circle cx="932" cy="466" r="5" />
        <circle cx="1026" cy="266" r="5" />
      </svg>
    </div>
  );
}
