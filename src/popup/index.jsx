import { createRoot } from 'react-dom/client';
import {Popup} from './popup'
// This file is sent to configuration/popup.html
console.log('Popup HTML/script loaded');

// Create root embedds html/js in extension popup window
createRoot(document.getElementById('root')).render(
    <Popup></Popup>
    )
