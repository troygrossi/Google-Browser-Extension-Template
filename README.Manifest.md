# README for Chrome Extension Manifest

## Table of Contents
- [Introduction](#introduction)
- [Overview of manifest.json](#overview-of-manifestjson)
- [Key Sections Explained](#key-sections-explained)
  - [manifest_version](#manifest_version)
  - [name](#name)
  - [version](#version)
  - [description](#description)
  - [icons](#icons)
  - [action](#action)
  - [background](#background)
  - [permissions](#permissions)
  - [host_permissions](#host_permissions)
  - [content_scripts](#content_scripts)
  - [commands](#commands)
  - [options_page](#options_page)
  - [web_accessible_resources](#web_accessible_resources)
  - [content_security_policy](#content_security_policy)
  - [content_scripts_vs_background_scripts](#content-scripts-vs-background-scripts)
- [Important Notes](#important-notes)
- [References](#references)
- [Author and Date](#author-and-date)
- [Credit](#credit)

## Introduction
This README provides a comprehensive guide to the `manifest.json` file for a Google Chrome extension built using Manifest V3. The manifest file is the backbone of any Chrome extension, defining its behavior, resources, and permissions. This template includes the most commonly used elements such as the popup, content scripts, and background scripts.

## Overview of manifest.json
Below is a complete template for a `manifest.json` file that includes necessary fields for a typical Chrome extension, focusing on key elements like popups, background service workers, and content scripts.


```json
{
    "manifest_version": 3,
    "name": "My Extension",
    "version": "1.0",
    "background": {
      "service_worker": "background.js",
      "type": "module"
    },
    "permissions": ["background", "storage", "scripting"],
    "host_permissions": ["<all_urls>"],
    "action": {
      "default_popup": "popup.html"
    },
    "options_page": "options.html",
    "content_scripts": [
      {
       "matches": ["<all_urls>"],
        "js": ["content.js"],
        "type": "module"
      }
    ],
    "web_accessible_resources": [
      {
        "resources": ["background.html"],
        "matches": ["<all_urls>"]
      }
    ]
  }
```

```json
{
  "manifest_version": 3,
  "name": "My Chrome Extension",
  "version": "1.0",
  "description": "A brief description of what the extension does.",
  "icons": {
    "16": "icons/icon16.png",
    "48": "icons/icon48.png",
    "128": "icons/icon128.png"
  },
  "action": {
    "default_popup": "popup.html",
    "default_icon": {
      "16": "icons/icon16.png",
      "48": "icons/icon48.png",
      "128": "icons/icon128.png"
    },
    "default_title": "My Extension"
  },
  "background": {
    "service_worker": "background.js"
  },
  "permissions": [
    "storage",
    "activeTab",
    "scripting"
  ],
  "host_permissions": [
    "*://*/*"
  ],
  "content_scripts": [
    {
      "matches": ["*://*/*"],
      "js": ["contentScript.js"],
      "css": ["styles.css"],
      "run_at": "document_idle"
    }
  ],
  "commands": {
    "_execute_action": {
      "suggested_key": {
        "default": "Ctrl+Shift+Y",
        "mac": "Command+Shift+Y"
      },
      "description": "Open the popup"
    }
  },
  "options_page": "options.html",
  "web_accessible_resources": [
    {
      "resources": ["images/*", "scripts/injected.js"],
      "matches": ["*://*/*"]
    }
  ],
  "content_security_policy": {
    "extension_pages": "script-src 'self'; object-src 'self'"
  }
}
```

## Key Sections Explained

### manifest_version
- **Description**: This specifies the version of the manifest file format.
- **Value**: Must be set to `3` for extensions using Manifest V3.

### name
- **Description**: The display name of your Chrome extension.
- **Value**: The name appears in the Chrome Web Store and the browser’s extension menu.

### version
- **Description**: The current version of your extension.
- **Value**: Increment this for every update (e.g., `1.0`, `1.1`, `2.0`).

### description
- **Description**: A brief summary of the extension's functionality.
- **Value**: This is displayed in the Chrome Web Store.

### icons
- **Description**: Icons representing the extension in different parts of the Chrome UI.
- **Values**: Provide paths for 16x16, 48x48, and 128x128 PNG images.

### action
- **default_popup**: Specifies the HTML file for the popup interface.
- **default_icon**: Sets icons for the popup action.
- **default_title**: Sets the tooltip text when the user hovers over the extension's icon.

### background
- **service_worker**: Specifies the JavaScript file handling background tasks for the extension.

### permissions
- **Description**: Declares permissions needed by the extension.
- **Common Permissions**:
  - **storage**: Access to Chrome’s storage API.
  - **activeTab**: Access to the currently active tab.
  - **scripting**: Access to the Chrome scripting API.

### host_permissions
- **Description**: Specifies which URL patterns the extension can access.
- **Example**: The `"*://*/*"` pattern grants access to all URLs, but it is recommended to be as specific as possible.

### content_scripts
- **matches**: Defines the URL patterns where the content script runs.
- **js**: JavaScript files to be injected into matching pages.
- **css**: CSS files to be injected into matching pages.
- **run_at**: Determines when the content script will run (e.g., `"document_idle"`).

### commands
- **Description**: Defines keyboard shortcuts for specific extension actions.
- **Example**: The provided shortcut opens the popup with `Ctrl+Shift+Y` (or `Command+Shift+Y` on macOS).

### options_page
- **Description**: The HTML file for the options page, where users can configure extension settings.

### web_accessible_resources
- **Description**: Defines which resources can be accessed from web pages.
- **Example**: Resources specified here are made available to content scripts and external websites.

### content_security_policy
- **Description**: Sets the Content Security Policy (CSP) for the extension, which restricts resource loading and enhances security.
- **Value**: Example policy allows scripts only from `'self'` and restricts other sources.

### Content Scripts vs. Background Scripts
Content scripts and background scripts are two core components of a Chrome extension, each serving distinct roles:
- **Content Scripts**: 
  - Interact directly with a webpage’s DOM.
  - Run in the context of web pages, modifying elements or extracting information.
  - Cannot access most Chrome APIs directly.
  - Use messaging to communicate with background scripts.

- **Background Scripts**:
  - Serve as the extension's central hub, managing long-term tasks and global state.
  - Have full access to Chrome APIs.
  - Cannot modify the DOM but communicate with content scripts through messaging.

## Important Notes
- **Manifest V3 Changes**: Manifest V3 introduces service workers, replacing background pages for handling background tasks more efficiently.
- **Permissions**: Only declare necessary permissions to enhance security and user trust.
- **CSP Restrictions**: Manifest V3 enforces a stricter CSP, preventing use of `eval()` and similar JavaScript functions.

## References
- [Chrome Extension Documentation](https://developer.chrome.com/docs/extensions/)
- [Manifest V3 Overview](https://developer.chrome.com/docs/extensions/mv3/intro/)

## Author and Date
- **Author**: Troy Grossi
- **Date**: 10/31/2024

