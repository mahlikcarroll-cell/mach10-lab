"use client";

import { motion, useReducedMotion } from "motion/react";

const paths = [
  {
    id: "discover",
    d: "M500 310 C390 250 285 190 178 142",
  },
  {
    id: "design",
    d: "M500 310 C618 244 730 190 842 142",
  },
  {
    id: "build",
    d: "M500 310 C380 360 274 420 172 492",
  },
  {
    id: "optimize",
    d: "M500 310 C616 370 724 430 836 492",
  },
];

type SystemConnectionLinesProps = {
  activePillar: string | null;
  isActive: boolean;
};

export default function SystemConnectionLines({
  activePillar,
  isActive,
}: SystemConnectionLinesProps) {
  const shouldReduceMotion = useReducedMotion();
  const initialPathLength = shouldReduceMotion ? 1 : 0;
  const targetPathLength = isActive ? 1 : initialPathLength;

  return (
    <svg
      className="mach10-homepage-process__connections"
      viewBox="0 0 1000 620"
      aria-hidden="true"
    >
      {paths.map((path, index) => {
        const isHighlighted = activePillar === path.id;

        return (
          <motion.path
            key={path.id}
            className={`mach10-homepage-process__connection ${
              isHighlighted ? "mach10-homepage-process__connection--active" : ""
            }`}
            d={path.d}
            initial={{ pathLength: initialPathLength, opacity: 0 }}
            animate={{
              pathLength: targetPathLength,
              opacity: isActive ? 1 : 0,
            }}
            transition={{
              duration: shouldReduceMotion ? 0 : 1.1,
              delay: shouldReduceMotion ? 0 : 0.16 + index * 0.08,
              ease: "easeOut",
            }}
          />
        );
      })}
    </svg>
  );
}
