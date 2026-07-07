/* eslint-disable @next/next/no-img-element */
import { getMach10HomepageAssetUrl } from "@/components/homepage/homepageAssets";

const nodes = [
  {
    label: "Strategy",
    value: "01",
    className: "mach10-homepage-hero__node--strategy",
  },
  {
    label: "Design",
    value: "02",
    className: "mach10-homepage-hero__node--design",
  },
  {
    label: "Systems",
    value: "03",
    className: "mach10-homepage-hero__node--systems",
  },
];

export default function HomepageSystemNodes() {
  return (
    <div className="mach10-homepage-hero__nodes" aria-hidden="true">
      <div className="mach10-homepage-hero__core-node">
        <img
          className="mach10-homepage-hero__core-icon"
          src={getMach10HomepageAssetUrl("images/mach10-icon.svg")}
          alt=""
          aria-hidden="true"
        />
        <span>Mach10</span>
      </div>

      {nodes.map((node) => (
        <div
          key={node.label}
          className={`mach10-homepage-hero__node ${node.className}`}
        >
          <span className="mach10-homepage-hero__node-value">{node.value}</span>
          <span className="mach10-homepage-hero__node-label">
            {node.label}
          </span>
        </div>
      ))}

      {/* Future interactivity can bind these rails to scroll position or cursor intent. */}
      <span className="mach10-homepage-hero__rail mach10-homepage-hero__rail--one" />
      <span className="mach10-homepage-hero__rail mach10-homepage-hero__rail--two" />
      <span className="mach10-homepage-hero__rail mach10-homepage-hero__rail--three" />
    </div>
  );
}
