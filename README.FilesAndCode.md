
# README for Chrome Extension

## Table of Contents
- [Introduction](#introduction)
- [Background Scripts](#background-scripts)
  - [Purpose and Setup](#purpose-and-setup-1)
  - [Examples of Background Script Logic](#examples-of-background-script-logic)
    - [Handling Events](#handling-events)
    - [Message Passing](#message-passing)
    - [Alarms and Timers](#alarms-and-timers)
    - [Using Chrome Storage in Background Scripts](#using-chrome-storage-in-background-scripts)
- [Content Scripts](#content-scripts)
  - [Purpose and Setup](#purpose-and-setup-2)
  - [Examples of Content Script Logic](#examples-of-content-script-logic)
    - [Interacting with the DOM](#interacting-with-the-dom)
    - [Injecting Elements](#injecting-elements)
    - [Sending and Receiving Messages](#sending-and-receiving-messages)
- [Popup](#popup)
  - [Purpose and Setup](#purpose-and-setup-3)
  - [Examples of Popup Logic](#examples-of-popup-logic)
    - [Displaying Information](#displaying-information)
    - [Handling User Input](#handling-user-input)
    - [Interacting with Chrome Storage](#interacting-with-chrome-storage)
- [Options Page](#options-page)
  - [Purpose and Setup](#purpose-and-setup-4)
  - [Examples of Options Page Logic](#examples-of-options-page-logic)
    - [User Configuration](#user-configuration)
    - [Saving and Loading Preferences](#saving-and-loading-preferences)
    - [Syncing Preferences Across Devices](#syncing-preferences-across-devices)
- [Chrome Storage Management](#chrome-storage-management)
  - [Using the Storage API](#using-the-storage-api)
  - [Examples of Storing and Retrieving Data](#examples-of-storing-and-retrieving-data)
- [Important Notes](#important-notes)
- [References](#references)
- [Author and Date](#author-and-date)
- [Credit](#credit)

## Introduction
This README provides a comprehensive guide for building a Chrome extension. It covers background scripts, content scripts, the popup, and the options page, along with Chrome storage management. These components are essential for implementing non-UI logic and user settings in the extension.

## Background Scripts

### Purpose and Setup 1
Background scripts handle tasks such as event listening, alarms, and centralized communication. In Manifest V3, they are typically implemented as service workers.

### Examples of Background Script Logic

#### Handling Events
Background scripts can listen for various Chrome events, such as installation or tab updates.
```javascript
// background.js

chrome.runtime.onInstalled.addListener(() => {
    console.log('Extension installed');
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete') {
        console.log('Tab updated:', tab.url);
    }
});
```

#### Message Passing
Message passing allows communication between the background script and other parts of the extension.
```javascript
// background.js

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'getData') {
        const data = { message: 'Hello from background!' };
        sendResponse(data);
    }
});
```

#### Alarms and Timers
Background scripts can manage alarms or timers for scheduling tasks.
```javascript
// background.js

chrome.alarms.create('myAlarm', { delayInMinutes: 1 });

chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === 'myAlarm') {
        console.log('Alarm triggered!');
    }
});
```

#### Using Chrome Storage in Background Scripts
Background scripts can use the Chrome Storage API to save or retrieve extension data.
```javascript
// background.js

// Save data to local storage
chrome.storage.local.set({ userSettings: { theme: 'dark', notifications: true } }, () => {
    console.log('User settings saved!');
});

// Retrieve data from local storage
chrome.storage.local.get(['userSettings'], (result) => {
    console.log('Retrieved settings:', result.userSettings);
});
```

## Content Scripts

### Purpose and Setup 2
Content scripts run in the context of web pages and can interact with the DOM, allowing for modifications or data extraction.

### Examples of Content Script Logic

#### Interacting with the DOM
Content scripts can modify page elements, such as changing the background color or adding text.
```javascript
// contentScript.js

document.body.style.backgroundColor = 'lightblue';

const newElement = document.createElement('div');
newElement.textContent = 'Hello from the content script!';
document.body.appendChild(newElement);
```

#### Injecting Elements
Content scripts can add elements like buttons, tooltips, or notifications to a webpage.
```javascript
// contentScript.js

const button = document.createElement('button');
button.textContent = 'Click Me';
document.body.appendChild(button);

button.addEventListener('click', () => {
    alert('Button clicked!');
});
```

#### Sending and Receiving Messages
Content scripts can communicate with background scripts using message passing.
```javascript
// Sending a message from contentScript.js

chrome.runtime.sendMessage({ action: 'getData' }, (response) => {
    console.log('Received response:', response.message);
});
```


## Popup

### Purpose and Setup 3
The popup is the UI displayed when the user clicks the extension's icon. It can show data, interact with the user, or provide controls to modify extension behavior.

### Examples of Popup Logic

#### Displaying Information
The popup can display information fetched from the extension's storage or from web APIs.
```javascript
// popup.js

document.addEventListener('DOMContentLoaded', () => {
    chrome.storage.local.get(['userSettings'], (result) => {
        document.getElementById('info').textContent = `Theme: ${result.userSettings?.theme}`;
    });
});
```

#### Handling User Input
The popup can allow users to interact with settings or perform actions.
```javascript
// popup.js

document.getElementById('saveBtn').addEventListener('click', () => {
    const theme = document.getElementById('themeSelect').value;
    chrome.storage.local.set({ userSettings: { theme: theme } }, () => {
        alert('Theme saved!');
    });
});
```

#### Interacting with Chrome Storage
The popup can read from and write to Chrome's storage to save user inputs or fetch preferences.
```javascript
// popup.js

chrome.storage.local.get(['theme'], (result) => {
    document.getElementById('themeDisplay').textContent = result.theme || 'Default';
});
```

## Options Page

### Purpose and Setup 4
The options page provides a standalone UI for users to configure the extension’s settings. It is typically accessed from the Chrome Extensions page.

### Examples of Options Page Logic

#### User Configuration
Users can customize extension settings, such as toggling features or entering API keys.
```javascript
// options.js

document.addEventListener('DOMContentLoaded', () => {
    chrome.storage.local.get(['notifications'], (result) => {
        document.getElementById('notifications').checked = result.notifications;
    });
});
```

#### Saving and Loading Preferences
The options page allows users to save and load their preferences using Chrome Storage.
```javascript
// options.js

document.getElementById('saveBtn').addEventListener('click', () => {
    const notifications = document.getElementById('notifications').checked;
    chrome.storage.local.set({ notifications: notifications }, () => {
        alert('Settings saved!');
    });
});
```

#### Syncing Preferences Across Devices
Users can sync preferences across devices using Chrome's sync storage.
```javascript
// options.js

document.getElementById('syncBtn').addEventListener('click', () => {
    const language = document.getElementById('languageSelect').value;
    chrome.storage.sync.set({ language: language }, () => {
        alert('Language preference saved and synced!');
    });
});
```

## Chrome Storage Management

### Using the Storage API
- The Chrome Storage API allows extensions to save data locally or sync it across devices.
- **Can be used in all file types ex: popup/options/content/background**

### Examples of Storing and Retrieving Data

#### Saving Data
```javascript
// Save data to Chrome's local storage
chrome.storage.local.set({ myKey: 'myValue' }, () => {
    console.log('Data saved!');
});
```

#### Retrieving Data
```javascript
// Retrieve data from Chrome's local storage
chrome.storage.local.get(['myKey'], (result) => {
    console.log('Retrieved data:', result.myKey);
});
```

## Important Notes
- **Popup vs. Options Page**: The popup is meant for quick interactions, while the options page is for comprehensive settings management.
- **Persistent Storage**: Both popups and options pages can use Chrome Storage to store and manage user preferences.
- **Security Considerations**: Be mindful of security when interacting with storage or handling user inputs.

## References
- [Chrome Extension Documentation](https://developer.chrome.com/docs/extensions/)
- [Manifest V3 Overview](https://developer.chrome.com/docs/extensions/mv3/intro/)

## Author and Date
- **Author**: Troy Grossi
- **Date**: 10/31/2024


