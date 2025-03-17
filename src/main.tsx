
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Make sure the root element exists before trying to render
const rootElement = document.getElementById("root");

if (!rootElement) {
  console.error("Failed to find the root element");
  document.body.innerHTML = '<div id="root"></div>';
}

// Create root and render app
try {
  console.log("Starting application...");
  createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
  console.log("App rendered successfully");
} catch (error) {
  console.error("Error rendering application:", error);
  document.body.innerHTML = `
    <div style="padding: 20px; color: red;">
      <h1>Error Starting Application</h1>
      <p>${error instanceof Error ? error.message : String(error)}</p>
    </div>
  `;
}
