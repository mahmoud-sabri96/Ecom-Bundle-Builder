# 🛒 Ecom Bundle Builder

A modern, interactive e-commerce **product bundle builder** built with React 19 and TypeScript. Users can browse products organized by category, select variants, adjust quantities, and view a real-time order summary — all within a sleek, responsive stepper interface.

---

## ✨ Features

- **Step-by-step bundle creation** — guided stepper UI with collapsible accordion steps per product category
- **Product variants** — select between available variants , each with its own image and quantity
- **Quantity controls** — increment / decrement 
- **Live order summary** — dynamically calculated totals with old-price / discount display
- **Persistent state** — bundle selections are saved to `localStorage` and restored on reload
- **Fully responsive** — adaptive layouts for mobile, tablet, and desktop (separate card components)
- **Custom SVG icons** — hand-crafted icon components (no external icon library required)

---

## 🛠 Tech Stack

| Layer            | Technology                                                                                     |
| ---------------- | ---------------------------------------------------------------------------------------------- |
| **Framework**    | [React 19](https://react.dev/) with [TypeScript 6](https://www.typescriptlang.org/)            |
| **Build Tool**   | [Vite 8](https://vite.dev/)                                                                    |
| **Styling**      | [Tailwind CSS 4](https://tailwindcss.com/) (via `@tailwindcss/vite` plugin)                    |
| **State**        | [Zustand 5](https://zustand.docs.pmnd.rs/) — lightweight, hook-based global store              |
| **Routing**      | [React Router DOM 7](https://reactrouter.com/)                                                 |
| **Utilities**    | [`clsx`](https://github.com/lukeed/clsx) + [`tailwind-merge`](https://github.com/dcastil/tailwind-merge) for class composition |
| **Linting**      | [ESLint 10](https://eslint.org/) with `typescript-eslint`, React Hooks & React Refresh plugins |
| **Formatting**   | [Prettier 3](https://prettier.io/)                                                             |

---

## 📋 Prerequisites

Make sure the following tools are installed on your machine before proceeding:

| Tool       | Minimum Version | Check Command        |
| ---------- | --------------- | -------------------- |
| **Node.js** | `18.x` or later  | `node -v`            |
| **npm**     | `9.x` or later   | `npm -v`             |
| **Git**     | any recent       | `git --version`      |

> **Tip:** We recommend using [nvm](https://github.com/nvm-sh/nvm) (macOS/Linux) or [nvm-windows](https://github.com/coreybutler/nvm-windows) to manage Node.js versions.

---

## 🚀 Getting Started

### 1 — Clone the Repository

```bash
git clone https://github.com/mahmoud-sabri96/Ecom-Bundle-Builder.git
cd Ecom-Bundle-Builder
```

### 2 — Install Dependencies

```bash
npm install
```

### 4 — Start the Development Server

```bash
npm run dev
```
### 5 — Before proceeding, verify that your current branch is either main or dev

```bash
git checkout main 
|-or-|
git checkout dev
```

The app will be available at **[http://localhost:5173](http://localhost:5173)** (default Vite port).

---

## 📜 Available Scripts

| Command              | Description                                                    |
| -------------------- | -------------------------------------------------------------- |
| `npm run dev`        | Start the Vite development server with HMR                     |
| `npm run build`      | Type-check with `tsc` and create an optimized production build |
| `npm run preview`    | Locally preview the production build                           |
| `npm run lint`       | Run ESLint across the entire project                           |

---

## 🏗 Project Structure

```
Ecom-Bundle-Builder/
├── public/                     # Static assets served as-is
│   ├── favicon.webp
│   ├── icons.svg
│   └── images/                 # Product images
│
├── src/
│   ├── assets/                 # Imported static assets (processed by Vite)
│   ├── components/
│   │   ├── icons/              # Custom SVG icon components
│   │   ├── ui/                 # Reusable UI primitives
│   │   │   ├── OutlineButton.tsx
│   │   │   └── StepAccordion.tsx
│   │   ├── DesktopProductCard.tsx
│   │   ├── MobileProductCard.tsx
│   │   ├── StepperView.tsx     # Multi-step category stepper
│   │   └── SummaryView.tsx     # Order summary sidebar
│   ├── db/
│   │   └── products.json       # Product catalog (local JSON data)
│   ├── hooks/
│   │   └── useMediaQuery.ts    # Responsive breakpoint hook
│   ├── lib/
│   │   └── utils/              # Shared utility functions
│   ├── pages/
│   │   └── BundleBuilderPage.tsx
│   ├── store/
│   │   └── appStore.ts         # Zustand global state (bundle logic)
│   ├── types/
│   │   └── products.ts         # TypeScript interfaces & types
│   ├── App.tsx                 # Root application component
│   ├── App.css                 # App-level styles
│   ├── index.css               # Global / Tailwind base styles
│   └── main.tsx                # Application entry point
│
├── index.html                  # HTML entry point
├── vite.config.ts              # Vite configuration
├── tsconfig.json               # TypeScript project references
├── tsconfig.app.json           # TS config for the application
├── tsconfig.node.json          # TS config for Node/Vite tooling
├── eslint.config.js            # ESLint flat config
├── package.json
└── package-lock.json
```

---

## ⚙️ Configuration

### Path Aliases

The project uses the `@` alias to reference the `src/` directory:

```ts
// vite.config.ts
resolve: {
  alias: {
    "@": path.resolve(__dirname, "./src"),
  },
}
```

**Usage in imports:**

```ts
import { useBundleStore } from "@/store/appStore";
import StepperView from "@/components/StepperView";
```

### Tailwind CSS

Tailwind 4 is integrated via the official Vite plugin (`@tailwindcss/vite`). Global styles and Tailwind directives are configured in [`src/index.css`](src/index.css).

---

## 📦 Building for Production

```bash
npm run build
```

This runs the TypeScript compiler for type-checking, then Vite bundles the application into the `dist/` directory with optimized, hashed assets.

To preview the production build locally:

```bash
npm run preview
```


## 📄 License
This project is private and not currently published under an open-source license.
---

<p align="center">
  Built with ❤️ using React, TypeScript & Vite
</p>

