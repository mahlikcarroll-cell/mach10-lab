declare global {
  interface Window {
    Mach10MenuConfig?: {
      assetBase?: string;
      rootId?: string;
    };
  }
}

export function getMach10AssetUrl(path: string) {
  if (typeof window === "undefined") {
    return path;
  }

  const assetBase = window.Mach10MenuConfig?.assetBase;

  if (!assetBase) {
    return path;
  }

  return `${assetBase.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;
}
