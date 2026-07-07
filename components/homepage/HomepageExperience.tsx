"use client";

import { useMemo, useState } from "react";
import InitializationLoader from "@/components/homepage/InitializationLoader";
import Mach10HomepageHero from "@/components/homepage/Mach10HomepageHero";
import SystemInitialization from "@/components/homepage/SystemInitialization";
import { getMach10HomepageAssetUrls } from "@/components/homepage/homepageAssets";
import { useAssetPreloader } from "@/components/homepage/useAssetPreloader";

export type HomepageIntroState = "loading" | "dispersing" | "hero-ready";

export default function HomepageExperience() {
  const assetsToPreload = useMemo(() => getMach10HomepageAssetUrls(), []);
  const { progress, isComplete, failedAssets } =
    useAssetPreloader(assetsToPreload);
  const [introState, setIntroState] =
    useState<HomepageIntroState>("loading");
  const [isLoaderVisible, setIsLoaderVisible] = useState(true);

  return (
    <main
      className={`mach10-homepage-experience mach10-homepage-experience--${introState}`}
    >
      {isLoaderVisible ? (
        <InitializationLoader
          progress={progress}
          isComplete={isComplete}
          failedAssetCount={failedAssets.length}
          onDisperseStart={() => setIntroState("dispersing")}
          onExitComplete={() => {
            setIntroState("hero-ready");
            setIsLoaderVisible(false);
          }}
        />
      ) : null}

      {/* Future shared-element transitions can map loader fragments to exact hero element layout boxes. */}
      <Mach10HomepageHero introState={introState} />
      <SystemInitialization />
    </main>
  );
}
