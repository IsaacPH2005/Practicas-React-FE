import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
// Obtiene el elemento raíz del DOM donde se montará la aplicación React.
const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("No se encontró el elemento con id 'root'. Asegúrate de que exista en tu HTML.");
}

// Crea la raíz de React y renderiza el componente App dentro de StrictMode.
// StrictMode ayuda a identificar problemas potenciales en la aplicación.
createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);