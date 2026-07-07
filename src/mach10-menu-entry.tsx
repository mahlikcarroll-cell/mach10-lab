import React from "react";
import { createRoot } from "react-dom/client";
import Mach10MenuCore from "@/components/Mach10MenuCore";
import "./mach10-menu.css";

const moduleAssetBase = new URL(".", /* @vite-ignore */ import.meta.url).href;

function getConfiguredRootId() {
  return window.Mach10MenuConfig?.rootId ?? "mach10-menu-root";
}

function getRootAssetBase() {
  const rootElement = document.getElementById(getConfiguredRootId());

  return rootElement?.dataset.mach10AssetBase;
}

function ensureAssetBase() {
  window.Mach10MenuConfig = {
    ...window.Mach10MenuConfig,
    assetBase:
      window.Mach10MenuConfig?.assetBase ??
      getRootAssetBase() ??
      moduleAssetBase,
  };
}

ensureAssetBase();

const debugEnabled =
  Boolean(window.Mach10MenuConfig?.debug) ||
  new URLSearchParams(window.location.search).has("mach10MenuDebug");

function debugLog(message: string, detail?: unknown) {
  if (!debugEnabled) return;

  console.info(`[Mach10Menu] ${message}`, detail ?? "");
}

function mountMach10Menu() {
  ensureAssetBase();

  const rootId = getConfiguredRootId();
  const rootElement = document.getElementById(rootId);

  debugLog("bundle executed", {
    rootId,
    rootFound: Boolean(rootElement),
    config: window.Mach10MenuConfig,
  });

  if (!rootElement) {
    return false;
  }

  if (rootElement.dataset.mach10MenuMounted === "true") {
    debugLog("root already mounted", rootElement);
    return true;
  }

  rootElement.dataset.mach10MenuMounted = "true";

  createRoot(rootElement).render(
    <React.StrictMode>
      <Mach10MenuCore />
    </React.StrictMode>
  );

  debugLog("React root rendered", rootElement);
  return true;
}

function watchForMach10Root() {
  if (mountMach10Menu()) return;

  const observer = new MutationObserver(() => {
    if (mountMach10Menu()) {
      observer.disconnect();
    }
  });

  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
  });

  window.setTimeout(() => observer.disconnect(), 10000);
}

if (!mountMach10Menu()) {
  if (document.readyState === "loading") {
    window.addEventListener("DOMContentLoaded", watchForMach10Root, {
      once: true,
    });
  } else {
    watchForMach10Root();
  }
}
