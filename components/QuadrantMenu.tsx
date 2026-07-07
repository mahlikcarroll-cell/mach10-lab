
"use client";

import ConnectionLines from "@/components/ConnectionLines";
import Blueprint from "@/components/blueprint";

type QuadrantMenuProps = {
  activeQuadrant: string | null;
  previousQuadrant: string | null;
  dragIntensity: number;
  nodePosition: {
    x: number;
    y: number;
  };
  onNavigate?: (href: string) => void;
};

const quadrants = [
  {
    id: "lead-systems",
    title: "Lead Systems",
    description: "Capture, qualify, route, and follow up.",
    href: "/lead-systems",
  },
  {
    id: "websites",
    title: "Websites",
    description: "Conversion-focused digital foundations.",
    href: "/websites",
  },
  {
    id: "video-motion",
    title: "Video & Motion",
    description: "Content that makes the system move.",
    href: "/video-motion",
  },
  {
    id: "ai-infrastructure",
    title: "AI Infrastructure",
    description: "Structured data, automations, and AI-ready paths.",
    href: "/ai-infrastructure",
  },
  
];

export default function QuadrantMenu({
  activeQuadrant,
  previousQuadrant,
  dragIntensity,
  nodePosition,
  onNavigate,
}: QuadrantMenuProps) {
  return (
    <section className="quadrant-menu">
      <ConnectionLines
        dragIntensity={dragIntensity}
        nodePosition={nodePosition}
      />

      {quadrants.map((quadrant) => {
        const isActive =
          activeQuadrant === quadrant.id || previousQuadrant === quadrant.id;

        return (
          <a
            key={quadrant.id}
            href={quadrant.href}
            onClick={(event) => {
              if (!onNavigate) return;

              event.preventDefault();
              onNavigate(quadrant.href);
            }}
            className={`quadrant ${isActive ? "active" : ""} ${
              activeQuadrant && !isActive ? "inactive" : ""
            }`}
            style={
              {
                "--drag-intensity":
                  activeQuadrant === quadrant.id ? dragIntensity : 0,
              } as React.CSSProperties
            }
          >
            <Blueprint
              quadrantId={quadrant.id}
              nodePosition={nodePosition}
              dragIntensity={dragIntensity}
              active={isActive}
            />

            <span className="quadrant-label">{quadrant.title}</span>
            <span className="quadrant-description">
              {quadrant.description}
            </span>
          </a>
        );
      })}
    </section>
  );
}
