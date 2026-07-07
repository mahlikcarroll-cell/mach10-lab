export type HomepageAsset = {
  id: string;
  path: string;
};

declare global {
  interface Window {
    Mach10HomepageConfig?: {
      assetBase?: string;
    };
  }
}

export const mach10HomepageAssets = [
  {
    id: "blueprint-base",
    path: "blueprint-base.svg",
  },
  {
    id: "blueprint-lines",
    path: "blueprint-lines.svg",
  },
  {
    id: "mach10-icon",
    path: "images/mach10-icon.svg",
  },
] satisfies HomepageAsset[];

export function getMach10HomepageAssetUrl(path: string) {
  const normalizedPath = path.replace(/^\/+/, "");

  if (typeof window === "undefined") {
    return `/${normalizedPath}`;
  }

  const assetBase = window.Mach10HomepageConfig?.assetBase;

  if (!assetBase) {
    return `/${normalizedPath}`;
  }

  return `${assetBase.replace(/\/+$/, "")}/${normalizedPath}`;
}

export function getMach10HomepageAssetUrls() {
  return mach10HomepageAssets.map((asset) => ({
    ...asset,
    url: getMach10HomepageAssetUrl(asset.path),
  }));
}
