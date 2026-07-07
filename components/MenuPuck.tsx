"use client";

import { animate, motion, useMotionValue } from "motion/react";
import type { MotionStyle } from "motion/react";
import { useRef, useState } from "react";

type NodeStyle = MotionStyle & {
  "--node-intensity": number;
};

const quadrantLinks: Record<string, string> = {
  "lead-systems": "/lead-systems",
  websites: "/websites",
  "video-motion": "/video-motion",
  "ai-infrastructure": "/ai-infrastructure",
};

type MenuPuckProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  setActiveQuadrant: (quadrant: string | null) => void;
  setDragIntensity: (intensity: number) => void;
  setNodePosition: (position: { x: number; y: number }) => void;
  onNavigate: (href: string) => void;
};

export default function MenuPuck({
  isOpen,
  setIsOpen,
  setActiveQuadrant,
  setDragIntensity,
  setNodePosition,
  onNavigate,
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
    const selectedQuadrant = lastQuadrant.current;
    const selectedHref = selectedQuadrant
      ? quadrantLinks[selectedQuadrant]
      : undefined;
    const shouldNavigate = Boolean(selectedHref && localIntensity > 0.35);

    lastQuadrant.current = null;
    setActiveQuadrant(null);

    if (shouldNavigate && selectedHref) {
      onNavigate(selectedHref);

      setTimeout(() => {
        x.set(0);
        y.set(0);
        setDragIntensity(0);
        setLocalIntensity(0);
        setNodePosition({ x: 0, y: 0 });
      }, 520);

      return;
    }

    setDragIntensity(0);
    setLocalIntensity(0);
    setNodePosition({ x: 0, y: 0 });

    animate(x, 0, { type: "spring", stiffness: 400, damping: 38 });
    animate(y, 0, { type: "spring", stiffness: 400, damping: 38 });
  }

  return (
    <motion.div
      className="menu-puck-shell"
      animate={isOpen ? "open" : "closed"}
      variants={{
        closed: {
          top: "2rem",
          left: "calc(100% - 2rem - 86px)",
          x: 0,
          y: 0,
          scale: 0.82,
        },
        open: {
          top: "50%",
          left: "50%",
          x: "-50%",
          y: "-50%",
          scale: 1,
        },
      }}
      transition={
        isOpen
          ? {
              type: "tween",
              stiffness: 95,
              damping: 17,
              ease: "easeOut",
            }
          : {
              type: "tween",
              delay: 0.8,
              duration: 0.38,
              damping: 17,
              ease: "easeInOut",
            }
      }
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
          } as NodeStyle
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
