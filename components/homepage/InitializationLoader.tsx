"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

type InitializationLoaderProps = {
  progress: number;
  isComplete: boolean;
  failedAssetCount?: number;
  onDisperseStart?: () => void;
  onExitComplete: () => void;
};

const fragments = [
  { x: -43, y: -31, rotate: -18, scaleX: 1.5 },
  { x: -26, y: -48, rotate: 22, scaleX: 1.1 },
  { x: 5, y: -52, rotate: 4, scaleX: 1.6 },
  { x: 35, y: -34, rotate: -26, scaleX: 1.2 },
  { x: 48, y: -4, rotate: 8, scaleX: 1.9 },
  { x: 31, y: 32, rotate: 28, scaleX: 1.35 },
  { x: -3, y: 50, rotate: -6, scaleX: 1.7 },
  { x: -38, y: 25, rotate: -34, scaleX: 1.25 },
];

export default function InitializationLoader({
  progress,
  isComplete,
  failedAssetCount = 0,
  onDisperseStart,
  onExitComplete,
}: InitializationLoaderProps) {
  const shouldReduceMotion = useReducedMotion();
  const [isDispersing, setIsDispersing] = useState(false);
  const normalizedProgress = Math.min(100, Math.max(0, progress));
  const circumference = 2 * Math.PI * 54;
  const strokeOffset =
    circumference - (normalizedProgress / 100) * circumference;

  const fragmentNodes = useMemo(
    () =>
      fragments.map((fragment, index) => ({
        ...fragment,
        id: `fragment-${index}`,
      })),
    []
  );

  useEffect(() => {
    if (!isComplete || isDispersing) return;

    const disperseDelay = window.setTimeout(
      () => {
        setIsDispersing(true);
        onDisperseStart?.();
      },
      shouldReduceMotion ? 0 : 260
    );

    return () => window.clearTimeout(disperseDelay);
  }, [isComplete, isDispersing, onDisperseStart, shouldReduceMotion]);

  useEffect(() => {
    if (!isDispersing) return;

    const exitDelay = window.setTimeout(
      onExitComplete,
      shouldReduceMotion ? 80 : 1250
    );

    return () => window.clearTimeout(exitDelay);
  }, [isDispersing, onExitComplete, shouldReduceMotion]);

  return (
    <motion.div
      className={`mach10-homepage-loader ${
        isDispersing ? "mach10-homepage-loader--dispersing" : ""
      }`}
      initial={{ opacity: 1 }}
      animate={{ opacity: isDispersing && shouldReduceMotion ? 0 : 1 }}
      aria-live="polite"
      aria-label={`Mach10 homepage initialization ${normalizedProgress}% complete`}
    >
      <div className="mach10-homepage-loader__blueprint" aria-hidden="true" />

      <motion.div
        className="mach10-homepage-loader__core"
        animate={
          isComplete && !shouldReduceMotion
            ? {
                scale: [1, 1.035, 1],
                boxShadow: [
                  "0 0 42px rgba(80, 180, 255, 0.24)",
                  "0 0 76px rgba(158, 231, 255, 0.42)",
                  "0 0 42px rgba(80, 180, 255, 0.24)",
                ],
              }
            : {}
        }
        transition={{ duration: 0.62, ease: "easeInOut" }}
      >
        <svg
          className="mach10-homepage-loader__ring"
          viewBox="0 0 128 128"
          aria-hidden="true"
        >
          <circle
            className="mach10-homepage-loader__ring-track"
            cx="64"
            cy="64"
            r="54"
          />
          <motion.circle
            className="mach10-homepage-loader__ring-progress"
            cx="64"
            cy="64"
            r="54"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: strokeOffset }}
            transition={{ duration: 0.28, ease: "easeOut" }}
          />
        </svg>

        <motion.div
          className="mach10-homepage-loader__mark"
          animate={
            isDispersing && !shouldReduceMotion
              ? { scale: 0.72, opacity: 0 }
              : { scale: 1, opacity: 1 }
          }
          transition={{ duration: 0.48, ease: "easeOut" }}
        >
          MACH10
        </motion.div>

        <span className="mach10-homepage-loader__percent">
          {normalizedProgress}%
        </span>
      </motion.div>

      <div className="mach10-homepage-loader__fragments" aria-hidden="true">
        {fragmentNodes.map((fragment) => (
          <motion.span
            key={fragment.id}
            className="mach10-homepage-loader__fragment"
            initial={{ opacity: 0, x: 0, y: 0, rotate: 0, scaleX: 1 }}
            animate={
              isDispersing && !shouldReduceMotion
                ? {
                    opacity: [0, 0.96, 0],
                    x: `${fragment.x}vw`,
                    y: `${fragment.y}vh`,
                    rotate: fragment.rotate,
                    scaleX: fragment.scaleX,
                  }
                : {}
            }
            transition={{ duration: 1.05, ease: "easeOut" }}
          />
        ))}
      </div>

      {failedAssetCount > 0 ? (
        <span className="mach10-homepage-loader__status">
          {failedAssetCount} asset fallback resolved
        </span>
      ) : null}
    </motion.div>
  );
}
