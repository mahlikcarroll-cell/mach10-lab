"use client";

import { animate, motion, useMotionValue } from "motion/react";
import { useState } from "react";
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
  const [localIntensity, setLocalIntensity] = useState(0);
  function updateDragState() {
    const currentX = x.get();
    const currentY = y.get();
    setNodePosition({ x: currentX, y: currentY });

    const distance = Math.sqrt(currentX * currentX + currentY * currentY);
    const intensity = Math.min(distance / 160, 1);

    setDragIntensity(intensity);
    setLocalIntensity(intensity);

    if (distance < 20) {
      setActiveQuadrant(null);
      return;
    }

    if (currentX < 0 && currentY < 0) {
      setActiveQuadrant("lead-systems");
    } else if (currentX > 0 && currentY < 0) {
      setActiveQuadrant("websites");
    } else if (currentX < 0 && currentY > 0) {
      setActiveQuadrant("video-motion");
    } else if (currentX > 0 && currentY > 0) {
      setActiveQuadrant("ai-infrastructure");
    }
  }

  function resetNode() {
    setActiveQuadrant(null);
    setDragIntensity(0);
    setLocalIntensity(0);
    setNodePosition({ x: 0, y: 0 });
    
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
  style={{
    x,
    y,
    "--node-intensity": localIntensity,
  } as React.CSSProperties}
  onDrag={updateDragState}
  onDragEnd={resetNode}
  whileDrag={{ scale: 1.08 }}
>
        <span className="center-node-label">M10</span>
      </motion.button>
    </div>
  );
}