"use client";

import { animate, motion, useMotionValue } from "motion/react";
import { useRef, useState } from "react";

type MenuPuckProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  setActiveQuadrant: (quadrant: string | null) => void;
  setDragIntensity: (intensity: number) => void;
  setNodePosition: (position: { x: number; y: number }) => void;
};

export default function MenuPuck({
  isOpen,
  setIsOpen,
  setActiveQuadrant,
  setDragIntensity,
  setNodePosition,
}: MenuPuckProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const [localIntensity, setLocalIntensity] = useState(0);
  const lastQuadrant = useRef<string | null>(null);

  function updateDragState() {
    if (!isOpen) return;

    const currentX = x.get();
    const currentY = y.get();

    setNodePosition({ x: currentX, y: currentY });

    const distance = Math.sqrt(currentX * currentX + currentY * currentY);
    const intensity = Math.min(distance / 160, 1);

    setDragIntensity(intensity);
    setLocalIntensity(intensity);

    let nextQuadrant: string | null = null;

    if (distance >= 20) {
      if (currentX < 0 && currentY < 0) nextQuadrant = "lead-systems";
      else if (currentX > 0 && currentY < 0) nextQuadrant = "websites";
      else if (currentX < 0 && currentY > 0) nextQuadrant = "video-motion";
      else if (currentX > 0 && currentY > 0) nextQuadrant = "ai-infrastructure";
    }

    if (nextQuadrant !== lastQuadrant.current) {
      lastQuadrant.current = nextQuadrant;
      setActiveQuadrant(nextQuadrant);
    }
  }

  function resetNode() {
    lastQuadrant.current = null;
    setActiveQuadrant(null);
    setDragIntensity(0);
    setLocalIntensity(0);
    setNodePosition({ x: 0, y: 0 });

    animate(x, 0, { type: "spring", stiffness: 400, damping: 38 });
    animate(y, 0, { type: "spring", stiffness: 400, damping: 38 });
  }

  return (
    <motion.div
  className={`menu-puck-shell ${isOpen ? "open" : "closed"}`}
  initial={false}
  animate={isOpen ? "open" : "closed"}
  variants={{
    closed: {
      top: "2rem",
      left: "calc(100% - 2rem - 86px)",
      scale: 0.82,
    },
    open: {
      top: "50%",
      left: "50%",
      scale: 1,
    },
  }}
  transition={{
    delay: isOpen ? 0 : 0.28,
    type: "spring",
    stiffness: 95,
    damping: 17,
  }}
>
      <motion.button
        className="center-node"
        onClick={() => !isOpen && setIsOpen(true)}
        drag={isOpen}
        dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
        dragElastic={0.58}
        dragMomentum={false}
        style={
          {
            x,
            y,
            "--node-intensity": localIntensity,
          } as any
        }
        onDrag={updateDragState}
        onDragEnd={resetNode}
        whileDrag={{ scale: 1.08 }}
        aria-label={isOpen ? "Navigation control" : "Open menu"}
      >
        <img
          className="center-node-icon"
          src="/images/mach10-icon.svg"
          alt=""
          aria-hidden="true"
        />
      </motion.button>

      {!isOpen && <span className="floating-menu-label">Menu</span>}
    </motion.div>
  );
}