This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## WordPress / Divi Menu Bundle

Build the standalone Mach10 menu bundle without iframing the Next.js app:

```bash
npm run build:wp-menu
```

The WordPress-ready files are emitted to `dist/wp-menu/`:

- `mach10-menu.js`
- `mach10-menu.css`
- copied public assets, including `images/mach10-icon.svg`, `blueprint-base.svg`, and `blueprint-lines.svg`

Add this mount point in a Divi Code Module or theme template:

```html
<div id="mach10-menu-root"></div>
```

Enqueue `mach10-menu.css` and `mach10-menu.js` from WordPress. If the copied assets live beside the bundle files, add this before the script tag or localize the same value from PHP:

```html
<script>
  window.Mach10MenuConfig = {
    assetBase: "/wp-content/uploads/mach10-menu",
  };
</script>
```

The script automatically finds `#mach10-menu-root` and renders the menu. Navigation uses normal browser URLs in WordPress, so the quadrant links should point to matching WordPress paths such as `/lead-systems`.

## WordPress Plugin Package

Build an installable plugin ZIP:

```bash
npm run package:wp-plugin
```

The package script runs `npm run build:wp-menu`, copies the built files into `wordpress-plugin/mach10-interactive-menu/assets/`, and creates:

```text
mach10-interactive-menu.zip
```

Upload that ZIP in WordPress:

1. Go to Plugins > Add New Plugin > Upload Plugin.
2. Choose `mach10-interactive-menu.zip`.
3. Install and activate it.
4. Add this shortcode in a Divi Code Module, Text Module, or page content:

```text
[mach10_menu]
```

The shortcode outputs:

```html
<div id="mach10-menu-root"></div>
```

The plugin enqueues `assets/mach10-menu.css` and `assets/mach10-menu.js` only for pages where the shortcode is used when WordPress can detect it. It also sets:

```js
window.Mach10MenuConfig = {
  assetBase: "PLUGIN_URL/assets",
};
```

To update the plugin after menu changes, run `npm run package:wp-plugin` again, then upload the new ZIP through WordPress. WordPress may ask you to replace the existing plugin; choose replace to update the bundled JS, CSS, and SVG assets.
