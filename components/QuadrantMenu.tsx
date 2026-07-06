"use client";

import { useEffect, useState } from "react";
import CenterNode from "@/components/CenterNode";
import ConnectionLines from "@/components/ConnectionLines";
import Link from "next/link";
import Blueprint from "@/components/blueprint";
import { Space_Grotesk, IBM_Plex_Mono } from "next/font/google";

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
  const [previousQuadrant, setPreviousQuadrant] = useState<string | null>(null);
  const [dragIntensity, setDragIntensity] = useState(0);
  const [nodePosition, setNodePosition] = useState({ x: 0, y: 0 });
  useEffect(() => {
  if (!activeQuadrant) return;

  setPreviousQuadrant(activeQuadrant);

  const timer = setTimeout(() => {
    setPreviousQuadrant(null);
  }, 150);

  return () => clearTimeout(timer);
}, [activeQuadrant]);
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

      {quadrants.map((quadrant) => {
  const isActive =
    activeQuadrant === quadrant.id || previousQuadrant === quadrant.id;

  return ( <Link
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
          <Blueprint
  quadrantId={quadrant.id}
  nodePosition={nodePosition}
  dragIntensity={dragIntensity}
  active={isActive}
/>
          <span className="quadrant-label">{quadrant.title}</span>
          <span className="quadrant-description">{quadrant.description}</span>
        </Link>
        );
})}
    </section>
  );
}