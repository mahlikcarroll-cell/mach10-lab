"use client";

import { useEffect, useRef, useState } from "react";
import QuadrantMenu from "@/components/QuadrantMenu";
import MenuPuck from "@/components/MenuPuck";
import { motion } from "motion/react";

type Mach10MenuCoreProps = {
  navigateTo?: (href: string) => void;
};

export default function Mach10MenuCore({ navigateTo }: Mach10MenuCoreProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [activeQuadrant, setActiveQuadrant] = useState<string | null>(null);
  const [previousQuadrant, setPreviousQuadrant] = useState<string | null>(null);
  const [dragIntensity, setDragIntensity] = useState(0);
  const [nodePosition, setNodePosition] = useState({ x: 0, y: 0 });
  const previousQuadrantTimer = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );

  function navigate(href: string) {
    if (navigateTo) {
      navigateTo(href);
      return;
    }

    window.location.href = href;
  }

  function handleNavigate(href: string) {
    closeMenu();

    setTimeout(() => {
      navigate(href);
    }, 520);
  }

  useEffect(() => {
    return () => {
      if (previousQuadrantTimer.current) {
        clearTimeout(previousQuadrantTimer.current);
      }
    };
  }, []);

  function handleActiveQuadrantChange(nextQuadrant: string | null) {
    setActiveQuadrant(nextQuadrant);

    if (previousQuadrantTimer.current) {
      clearTimeout(previousQuadrantTimer.current);
    }

    if (!nextQuadrant) {
      setPreviousQuadrant(null);
      return;
    }

    setPreviousQuadrant(nextQuadrant);
    previousQuadrantTimer.current = setTimeout(() => {
      setPreviousQuadrant(null);
    }, 150);
  }

  function closeMenu() {
    setIsOpen(false);
    setActiveQuadrant(null);
    setPreviousQuadrant(null);
    if (previousQuadrantTimer.current) {
      clearTimeout(previousQuadrantTimer.current);
    }
    setTimeout(() => {
      setDragIntensity(0);
      setNodePosition({ x: 0, y: 0 });
      setIsMenuVisible(false);
    }, 420);
  }

  return (
    <>
      <MenuPuck
        isOpen={isOpen}
        setIsOpen={(open) => {
          if (open) {
            setIsMenuVisible(true);
            setIsOpen(true);
          }
        }}
        setActiveQuadrant={handleActiveQuadrantChange}
        setDragIntensity={setDragIntensity}
        setNodePosition={setNodePosition}
        onNavigate={handleNavigate}
      />

      {isMenuVisible && (
        <motion.div
          className="mach10-menu-overlay"
          onClick={closeMenu}
          style={{ pointerEvents: isOpen ? "auto" : "none" }}
          initial={false}
          animate={{
            backgroundColor: isOpen
              ? "rgba(5, 8, 12, 0.16)"
              : "rgba(5, 8, 12, 0)",
            backdropFilter: isOpen
              ? "blur(10px) saturate(1.12)"
              : "blur(0px) saturate(1)",
          }}
          transition={{
            duration: 0.25,
            ease: "easeOut",
          }}
        >
          <motion.div
            className="mach10-menu-content"
            onClick={(event) => event.stopPropagation()}
            initial={{ opacity: 0, scale: 0.18 }}
            animate={
              isOpen
                ? { opacity: 1, scale: 1 }
                : { opacity: 0, scale: 0.18 }
            }
            transition={{
              delay: isOpen ? 0.42 : 0,
              type: "spring",
              stiffness: 150,
              damping: 20,
            }}
          >
            <QuadrantMenu
              activeQuadrant={activeQuadrant}
              previousQuadrant={previousQuadrant}
              dragIntensity={dragIntensity}
              nodePosition={nodePosition}
              onNavigate={handleNavigate}
            />
          </motion.div>
        </motion.div>
      )}
    </>
  );
}
