"use client";

import { useEffect, useState} from "react";
import QuadrantMenu from "@/components/QuadrantMenu";
import MenuPuck from "@/components/MenuPuck";
import { motion } from "motion/react";

export default function Mach10Menu() {
const [isOpen, setIsOpen] = useState(false);
const [isMenuVisible, setIsMenuVisible] = useState(false);
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

  function closeMenu() {
  setIsOpen(false);
  setActiveQuadrant(null);
  setPreviousQuadrant(null);
  setDragIntensity(0);
  setNodePosition({ x: 0, y: 0 });

  setTimeout(() => {
    setIsMenuVisible(false);
  }, 420);
}

  return (
  <>
    <MenuPuck
      isOpen={isMenuVisible}
      setIsOpen={(open) => {
        if (open) {
          setIsMenuVisible(true);
          setIsOpen(true);
        }
      }}
      setActiveQuadrant={setActiveQuadrant}
      setDragIntensity={setDragIntensity}
      setNodePosition={setNodePosition}
    />

    {isMenuVisible && (
      <div className="mach10-menu-overlay" onClick={closeMenu}>
        <motion.div
          className="mach10-menu-content"
          onClick={(e) => e.stopPropagation()}
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
          />
        </motion.div>
      </div>
    )}
  </>
);
}