
# README for Building a Chrome Extension with Vite and React

## Table of Contents
- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Project Setup](#project-setup)
  - [Install Dependencies](#install-dependencies)
  - [Directory Structure](#directory-structure)
- [Vite Configuration](#vite-configuration)
  - [Overview of `vite.config.js`](#overview-of-viteconfigjs)
  - [Entry Points](#entry-points)
  - [Build Output Settings](#build-output-settings)
- [Source (`src`) Directory Structure](#source-src-directory-structure)
- [Build/Dist Directory Structure](#builddist-directory-structure)
- [Development and Build Commands](#development-and-build-commands)
- [Important Notes](#important-notes)
- [References](#references)
- [Author and Date](#author-and-date)
- [Credit](#credit)

## Introduction
This README provides a comprehensive guide to setting up a Chrome extension using React and Vite. It covers the Vite configuration, directory structure for the source and build output, and essential commands to develop, build, and test the extension.

## Prerequisites
Before proceeding, ensure you have the following installed:
- Node.js (v14+)
- npm or yarn

## Project Setup

### Install Dependencies
Run the following commands to set up the project:
```bash
npm create vite@latest my-extension --template react
cd my-extension
npm install
```

Install additional dependencies needed for a Chrome extension:
```bash
npm install @vitejs/plugin-react --save-dev
```

### Directory Structure
```
/my-extension
├── dist/
├── node_modules/
├── public/
│   ├── icons/
│   └── manifest.json
│   ├── backgroundModal.html (chrome.windows.create)
│   ├── options.html (ENTRY POINT)
│   └── popup.html (ENTRY POINT)
├── src/
│   ├── background/
│   │   └── index.js --> configuartion/background.js
│   │   └── background.js (javascript only for background entry point)
│   ├── backgroundModal/
│   │   └── index.jsx --> configuartion/backgroundModal.js
│   │   └── backgroundModal.jsx (injected into new chrome window html)
│   ├── content/
│   │   ├── index.js --> configuartion/content.js
│   │   ├── content.jsx (injected into website html body)
│   ├── popup/
│   │   ├── index.js --> configuartion/popup.js
│   │   └── popup.jsx (injected into popup entry point *extension popup)
│   ├── options/
│   │   ├── index.js --> configuartion/options.js
│   │   └── options.jsx (injected into options entry point *extension options)
├── configuration/
│   ├── background.js (ENTRY POINT)
│   ├── backgroundModal.js --> backgroundModal.html
│   ├── content.js (ENTRY POINT)
│   ├── options.js --> options.html
│   ├── popup.js --> popup.html
├── vite.config.content.js (content bundled separately *must be one file)
├── vite.config.js
└── README.md
```

## Vite Configuration

### Overview of \`vite.config.js\`
```javascript
// Vite configuration
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { createHtmlPlugin } from 'vite-plugin-html';

// Vite configuration
export default defineConfig({
  plugins: [
    react(),
    createHtmlPlugin({
      minify: true, // Optional: Minifies the HTML files
    })
  ],
  build: {
    rollupOptions: {
      input: {
        popup: configuration/popup.html',
        options: configuration/options.html',
        backgroundHtml: configuration/background.html',
        backgroundJs: configuration/background.js'
      },
      output: {
        entryFileNames: '[name].js', // JS entry files placed at root level
        chunkFileNames: 'scripts/[name].js', // Chunk files placed in scripts/
        assetFileNames: 'assets/[name].[ext]' // Asset files placed in assets/
      }
    },
    outDir: 'dist',
    emptyOutDir: true
  }
});
```
### Overview of \`vite.config.content.js\`
```javascript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: 'configuration/content.js', // Only content script as entry point
      output: {
        inlineDynamicImports: true,
        entryFileNames: 'content.js'
      }
    },
    outDir: 'dist',
    emptyOutDir: false // Prevents deleting other files from main build
  }
});
```

### Key Sections of Vite Configuration

#### Entry Points
- The \`input\` field in \`rollupOptions\` specifies multiple entry files for your project, we are using it to define entry points to the extension:
  - \`popup\`: The popup page’s HTML file.
  - \`background\`: The background script’s JavaScript file.
  - \`options\`: The options page’s HTML file.
  - \`content\`: The content script’s JavaScript file.
- Each entry corresponds to a part of the Chrome extension and is bundled separately.

#### Build Output Settings
- **\`entryFileNames\`, \`chunkFileNames\`, \`assetFileNames\`**:
  - These specify the file naming conventions for scripts and assets in the build output.
  - Organizing scripts into a \`scripts/\` directory and assets into an \`assets/\` directory helps keep the build organized.
- **\`outDir\`**:
  - This sets the build output directory to \`dist\`, which will contain all bundled files for the Chrome extension.
- **\`emptyOutDir\`**:
  - This clears the \`dist\` directory before each build to ensure that old files do not persist.

## Source (\`src\`) Directory Structure

The \`src\` directory contains the source code for different parts of the Chrome extension.

```
├── src/
│   ├── backgroundModal/
│   │   └── index.jsx
│   │   └── backgroundModal.jsx
│   ├── background/
│   │   └── index.js
│   │   └── background.js
│   ├── content/
│   │   ├── index.jsx
│   │   └── content.jsx
│   ├── options/
│   │   ├── index.jsx
│   │   └── options.jsx
│   ├── popup/
│   │   ├── index.jsx
│   │   └── popup.jsx

```

### Key Directories and Files

- **\`background/\`**:
  - Contains the background script, which runs in the background for persistent tasks.
  - Entry point: \`index.js\`.

- **\`content/\`**:
  - Contains content scripts that interact with the webpage's DOM.
  - Entry point: \`contentScript.js\`.

- **\`popup/\`**:
  - Contains React components and related files for the popup interface.
  - \`App.jsx\`: Main React component for the popup UI.
  - \`index.html\`: HTML template for the popup, specified in the Vite config.

- **\`options/\`**:
  - Contains React components for the options/settings page of the extension.
  - Similar structure to the \`popup/\` directory.

- **\`manifest.json\`**:
  - The manifest file for the Chrome extension, defining its permissions, scripts, and other configurations.

## Build/Dist Directory Structure

After building the extension, the \`dist\` directory will contain the bundled files:

```
/dist
├── assets/ (optional)
├── scripts/
│   ├── sharedChunk.js (example chunk file)
│   ├── ... (other chunk files)
├── background.js
├── backgroundModal.html
├── backgroundModal.js
├── content.js
├── manifest.json
├── options.html
├── options.js
├── popup.html
├── popup.js
```

### Key Directories and Files
- **\`assets/\`**:
  - Contains bundled assets like images and CSS files.

- **\`scripts/\`**:
  - Contains bundled JavaScript files for background scripts, content scripts, options, and popup pages.

- **\`manifest.json\`**:
  - Copied directly from the \`src\` directory, ensuring the extension has the necessary configurations in the build.

## Development and Build Commands

### Build the Extension
```bash
npm run build
```
- This command bundles the extension into the \`dist\` directory, preparing it for loading into Chrome.

### Load the Extension in Chrome
1. Go to \`chrome://extensions/\` in your browser.
2. Enable **Developer mode**.
3. Click **Load unpacked** and select the \`dist\` directory.

## Important Notes
- **Manifest V3 Compatibility**: Make sure the manifest file adheres to Manifest V3 specifications.
- **Hot Reloading Limitations**: Vite's hot module replacement works for popup and options pages during development but may not work for background scripts or content scripts.
- **Testing**: Test the extension thoroughly after building, as the development and production builds might behave differently.

## References
- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://reactjs.org/)
- [Chrome Extension Documentation](https://developer.chrome.com/docs/extensions/)

## Author and Date
- **Author**: Troy Grossi
- **Date**: 10/31/2024

