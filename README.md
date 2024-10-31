
# Google Chrome Extension Template with Vite/React

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Setup](#setup)
- [Usage](#usage)
- [Deployment](#deployment)
- [Entry Points](#entry-points)
  - [Content Script](#content-script)
  - [Background Script](#background-script)
  - [Popup](#popup)
  - [Options Page](#options-page)

---

## Introduction
This template provides a starting point for creating a Google Chrome extension using Vite and React. It includes setup for the four main entry points commonly used in Chrome extensions—content, background, popup, and options. The project showcases a basic example of functionality, where activating the extension displays a red box in the center of the screen. Clicking the red box triggers communication between the content and background scripts, which subsequently opens a new window called `backgroundModa...

## Features
- Built with **Vite** and **React** for fast development and easy bundling.
- Includes the main extension entry points: **Content**, **Background**, **Popup**, and **Options**.
- Demonstrates content-to-background script communication.
- Example functionality: A red box appears on activation, and clicking it opens a separate window.

## Setup

1. **Clone the Repository**:
   ```bash
   git clone <repository_url>
   cd <repository_directory>
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Build the Extension**:
   ```bash
   npm run build
   ```

4. **Structure Overview**:
   - **Source Code**: Found in `src/` directory.
   - **Build Output**: Placed in `dist/` after running the build command.

## Usage

1. **Load Unpacked Extension in Chrome**:
   - Go to `chrome://extensions/` in your Chrome browser.
   - Enable **Developer mode** (top right corner).
   - Click on **Load unpacked** and select the `dist` directory from the project.

2. **Activate the Extension**:
   - Click the extension icon in the Chrome toolbar to activate it.
   - A red box should appear at the center of the browser window.
   - Clicking the red box triggers a background script that opens a new window (i.e., `backgroundModal.html`).

## Deployment

To deploy:
1. Build the extension by running:
   ```bash
   npm run build
   ```
2. Load the built extension from `dist/` in `chrome://extensions/` with **Load unpacked** for testing.
3. For distribution, package the `dist/` folder as per Chrome Web Store guidelines.

## Entry Points

This template includes the four primary entry points essential for most Chrome extensions:

### Content Script
- **Location**: `src/content/`
- **Type**: JavaScript entry (`content.js`)
- **Purpose**: Interacts directly with the webpage’s DOM and displays UI elements within the page itself. For example, the red box that appears on activation is injected by the content script.
- **Where to Find It**: Embedded directly into the active webpage when the extension is activated.

### Background Script
- **Location**: `src/background/`
- **Type**: JavaScript entry (`background.js`)
- **Purpose**: Manages persistent tasks like message handling, event listeners, and window creation. It facilitates interaction with the content script; for instance, when the red box in the content script is clicked, a message is sent to the background script, which then opens a new window (`backgroundModal.html`).
- **Where to Find It**: Runs independently in the background, accessible through the Chrome Extensions panel.

### Popup
- **Location**: `src/popup/`
- **Type**: HTML entry (`popup.html`)
- **Purpose**: Provides an extension interface that appears when the user clicks the extension icon in the Chrome toolbar. This popup can show settings, information, or controls related to the extension.
- **Where to Find It**: Click the extension icon in the Chrome toolbar to open the popup.

### Options Page
- **Location**: `src/options/`
- **Type**: HTML entry (`options.html`)
- **Purpose**: Contains settings or preferences for the extension. The user can access this page through the Chrome Extensions panel by clicking “Details” on the extension and selecting “Extension options.”
- **Where to Find It**: Open `chrome://extensions/`, locate your extension, click “Details,” and select “Extension options.”

---

This template provides a solid foundation for creating a Chrome extension with React and Vite. Modify and extend the functionality to fit your specific use case, and utilize the four entry points to create a versatile, user-friendly extension. Enjoy building!

## Author and Date
- **Author**: Troy Grossi
- **Date**: 10/31/2024

