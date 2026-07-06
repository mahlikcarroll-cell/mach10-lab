"use client";

import { animate, motion, useMotionValue, type MotionStyle } from "motion/react";
import { useRef, useState } from "react";
type CenterNodeProps = {
  setActiveQuadrant: (quadrant: string | null) => void;
  setDragIntensity: (intensity: number) => void;
  setNodePosition: (position: { x: number; y: number }) => void;
};

export default function CenterNode({
  setActiveQuadrant,
  setDragIntensity,
  setNodePosition,
}: CenterNodeProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const lastQuadrant = useRef<string | null>(null);
  const [localIntensity, setLocalIntensity] = useState(0);
  function updateDragState() {
    const currentX = x.get();
    const currentY = y.get();
    setNodePosition({ x: currentX, y: currentY });

    const distance = Math.sqrt(currentX * currentX + currentY * currentY);
    const intensity = Math.min(distance / 160, 1);

    setDragIntensity(intensity);
    setLocalIntensity(intensity);

let nextQuadrant: string | null = null;

if (distance >= 20) {
  if (currentX < 0 && currentY < 0) {
    nextQuadrant = "lead-systems";
  } else if (currentX > 0 && currentY < 0) {
    nextQuadrant = "websites";
  } else if (currentX < 0 && currentY > 0) {
    nextQuadrant = "video-motion";
  } else if (currentX > 0 && currentY > 0) {
    nextQuadrant = "ai-infrastructure";
  }
}

if (nextQuadrant !== lastQuadrant.current) {
  lastQuadrant.current = nextQuadrant;
  setActiveQuadrant(nextQuadrant);
}
  }

  function resetNode() {
    setActiveQuadrant(null);
    setDragIntensity(0);
    setLocalIntensity(0);
    setNodePosition({ x: 0, y: 0 });
    lastQuadrant.current = null;
    
    animate(x, 0, {
      type: "spring",
      stiffness: 400,
      damping: 38,
    });

    animate(y, 0, {
      type: "spring",
      stiffness: 400,
      damping: 38,
    });
  }

  return (
    <div className="center-node-wrapper">
      <motion.button
  className="center-node"
  drag
  dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
  dragElastic={0.58}
  dragMomentum={false}
 style={
  {
    x,
    y,
    "--node-intensity": localIntensity,
  } as MotionStyle
}
  onDrag={updateDragState}
  onDragEnd={resetNode}
  whileDrag={{ scale: 1.08 }}
>
        <img
  className="center-node-icon"
  src="/images/mach10-icon.svg"
  alt="Mach10"
/>
      </motion.button>
    </div>
  );
}