declare global {
  interface Window {
    Mach10MenuConfig?: {
      assetBase?: string;
      debug?: boolean;
      rootId?: string;
    };
  }
}

export function getMach10AssetUrl(path: string) {
  const normalizedPath = path.replace(/^\/+/, "");

  if (typeof window === "undefined") {
    return `/${normalizedPath}`;
  }

  const assetBase = window.Mach10MenuConfig?.assetBase;

  if (!assetBase) {
    return `/${normalizedPath}`;
  }

  return `${assetBase.replace(/\/+$/, "")}/${normalizedPath}`;
}
