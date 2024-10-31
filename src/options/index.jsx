import { createRoot } from 'react-dom/client';
import {Options} from './options';
// This file is exported to configuration/options

console.log('Options HTML/script loaded');

// Create root embedds js in already existing DOM
createRoot(document.getElementById('root')).render(
    <Options></Options>
   )
