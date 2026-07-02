"use client";

import { useState } from "react";
import CenterNode from "@/components/CenterNode";
import ConnectionLines from "@/components/ConnectionLines";
import Link from "next/link";

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

export default function QuadrantMenu() {
  const [activeQuadrant, setActiveQuadrant] = useState<string | null>(null);
  const [dragIntensity, setDragIntensity] = useState(0);
  const [nodePosition, setNodePosition] = useState({ x: 0, y: 0 });
  return (
    <section className="quadrant-menu">
        <ConnectionLines
  dragIntensity={dragIntensity}
  nodePosition={nodePosition}
/>
        
        <CenterNode
  setActiveQuadrant={setActiveQuadrant}
  setDragIntensity={setDragIntensity}
  setNodePosition={setNodePosition}
/>

      {quadrants.map((quadrant) => (
        <Link
        key={quadrant.id}
        href={quadrant.href}
  className={`quadrant ${
    activeQuadrant === quadrant.id ? "active" : ""
  } ${activeQuadrant && activeQuadrant !== quadrant.id ? "inactive" : ""}`}
  style={
    {
      "--drag-intensity":
        activeQuadrant === quadrant.id ? dragIntensity : 0,
    } as React.CSSProperties
  }
>
          <span className="quadrant-label">{quadrant.title}</span>
          <span className="quadrant-description">{quadrant.description}</span>
        </Link>
      ))}
    </section>
  );
}