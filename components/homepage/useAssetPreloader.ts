"use client";

import { useEffect, useMemo, useState } from "react";

export type PreloadAsset = {
  id: string;
  url: string;
};

type AssetPreloaderState = {
  progress: number;
  isComplete: boolean;
  failedAssets: PreloadAsset[];
};

function preloadImage(asset: PreloadAsset) {
  return new Promise<{ asset: PreloadAsset; ok: boolean }>((resolve) => {
    const image = new Image();

    image.decoding = "async";

    image.onload = () => {
      if (typeof image.decode !== "function") {
        resolve({ asset, ok: true });
        return;
      }

      image
        .decode()
        .then(() => resolve({ asset, ok: true }))
        .catch(() => resolve({ asset, ok: true }));
    };

    image.onerror = () => resolve({ asset, ok: false });
    image.src = asset.url;
  });
}

export function useAssetPreloader(assets: PreloadAsset[]) {
  const stableAssets = useMemo(() => {
    const seenUrls = new Set<string>();

    return assets.filter((asset) => {
      if (seenUrls.has(asset.url)) return false;
      seenUrls.add(asset.url);
      return true;
    });
  }, [assets]);

  const [state, setState] = useState<AssetPreloaderState>(() => ({
    progress: stableAssets.length === 0 ? 100 : 0,
    isComplete: stableAssets.length === 0,
    failedAssets: [],
  }));

  useEffect(() => {
    let isCancelled = false;
    let resolvedCount = 0;
    const failedAssets: PreloadAsset[] = [];
    const totalAssets = stableAssets.length;

    queueMicrotask(() => {
      if (isCancelled) return;

      setState({
        progress: totalAssets === 0 ? 100 : 0,
        isComplete: totalAssets === 0,
        failedAssets: [],
      });
    });

    if (totalAssets === 0) {
      return () => {
        isCancelled = true;
      };
    }

    stableAssets.forEach((asset) => {
      preloadImage(asset).then((result) => {
        if (isCancelled) return;

        resolvedCount += 1;

        if (!result.ok) {
          failedAssets.push(result.asset);
        }

        const progress = Math.round((resolvedCount / totalAssets) * 100);

        setState({
          progress,
          isComplete: resolvedCount === totalAssets,
          failedAssets: [...failedAssets],
        });
      });
    });

    return () => {
      isCancelled = true;
    };
  }, [stableAssets]);

  return state;
}
