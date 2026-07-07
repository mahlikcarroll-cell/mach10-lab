import React from "react";
import { createRoot } from "react-dom/client";
import Mach10MenuCore from "@/components/Mach10MenuCore";
import "./mach10-menu.css";

const rootId = window.Mach10MenuConfig?.rootId ?? "mach10-menu-root";
const rootElement = document.getElementById(rootId);

if (rootElement) {
  createRoot(rootElement).render(
    <React.StrictMode>
      <Mach10MenuCore />
    </React.StrictMode>
  );
}
