import { createRoot } from 'react-dom/client';
import {Content} from './content';
// This file is exported to configuration/contentScript


console.log('Content script loaded');


// Create root embedds js in already existing DOM
const container = document.createElement('div');
container.id = 'content-script-root';
document.body.appendChild(container);
createRoot(container).render(<Content />);

// Add Extension related script here or import it from a module

