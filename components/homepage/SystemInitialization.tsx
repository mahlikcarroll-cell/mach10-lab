"use client";

import { useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import ProcessNode from "@/components/homepage/ProcessNode";
import SystemConnectionLines from "@/components/homepage/SystemConnectionLines";

const pillars = [
  {
    id: "discover",
    index: "01",
    title: "DISCOVER",
    description: "Find the audience, offer, friction, and conversion path.",
  },
  {
    id: "design",
    index: "02",
    title: "DESIGN",
    description: "Shape the interface around clarity, trust, and action.",
  },
  {
    id: "build",
    index: "03",
    title: "BUILD",
    description: "Create the site, content, tracking, and automation layer.",
  },
  {
    id: "optimize",
    index: "04",
    title: "OPTIMIZE",
    description: "Use behavior data to improve what the system does next.",
  },
];

export default function SystemInitialization() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [activePillar, setActivePillar] = useState<string | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const isInView = useInView(sectionRef, {
    amount: 0.42,
    once: true,
  });

  return (
    <section
      ref={sectionRef}
      className={`mach10-homepage-process ${
        isInView ? "mach10-homepage-process--active" : ""
      }`}
      aria-labelledby="mach10-process-title"
    >
      <div className="mach10-homepage-process__blueprint" aria-hidden="true" />

      <div className="mach10-homepage-process__inner">
        <div className="mach10-homepage-process__intro">
          <p className="mach10-homepage-process__eyebrow">
            SYSTEM INITIALIZATION
          </p>
          <h2
            id="mach10-process-title"
            className="mach10-homepage-process__headline"
          >
            Four stages. One connected machine.
          </h2>
          <p className="mach10-homepage-process__support">
            Strategy, design, content, and automation are built together so the
            website works as a system from day one.
          </p>
        </div>

        <div className="mach10-homepage-process__system">
          <SystemConnectionLines
            activePillar={activePillar}
            isActive={isInView}
          />

          {/* Future hero-to-section shared transitions can hand off the hero hub into this process hub. */}
          <motion.div
            className="mach10-homepage-process__hub"
            initial={false}
            animate={
              isInView && !shouldReduceMotion
                ? {
                    scale: [1, 1.055, 1],
                    boxShadow: [
                      "0 0 42px rgba(80, 180, 255, 0.22)",
                      "0 0 70px rgba(80, 180, 255, 0.38)",
                      "0 0 42px rgba(80, 180, 255, 0.22)",
                    ],
                  }
                : {}
            }
            transition={{
              duration: 1.2,
              ease: "easeInOut",
              delay: 0.12,
            }}
          >
            <span className="mach10-homepage-process__hub-label">System</span>
          </motion.div>

          <div className="mach10-homepage-process__nodes">
            {pillars.map((pillar) => (
              <motion.div
                key={pillar.id}
                className={`mach10-homepage-process__node-shell mach10-homepage-process__node-shell--${pillar.id}`}
                initial={
                  shouldReduceMotion
                    ? false
                    : {
                        opacity: 0,
                        x: 0,
                        y: 18,
                        scale: 0.96,
                      }
                }
                animate={
                  isInView
                    ? {
                        opacity: 1,
                        x: 0,
                        y: 0,
                        scale: 1,
                      }
                    : {}
                }
                transition={{
                  duration: shouldReduceMotion ? 0 : 0.72,
                  ease: "easeOut",
                  delay:
                    shouldReduceMotion ? 0 : 0.24 + Number(pillar.index) * 0.08,
                }}
              >
                <ProcessNode
                  {...pillar}
                  isActive={activePillar === pillar.id}
                  onActivate={setActivePillar}
                  onDeactivate={() => setActivePillar(null)}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
