import  { useState, useMemo } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router';
import './App.css'
import Layout from './Components/Layout';
import HomePage from './Pages/HomePage';
import AboutPage from './Pages/AboutPage';
import ContactPage from './Pages/ContactPage';
import NotFoundPage from './Pages/NotFoundPage';
// Componente Principal App
function App() {
  // Estado para la ruta actual (opcional, para demostración o necesidades específicas)
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  // Define las rutas usando createBrowserRouter.
  // useMemo asegura que el router no se recree en cada renderizado a menos que cambien sus dependencias.
  const appRouter = useMemo(() => createBrowserRouter([
    {
      // El componente Layout se renderizará para todas las rutas hijas.
      // Pasa la función para actualizar la ruta actual al Layout.
      element: <Layout setCurrentPathForApp={setCurrentPath} />,
      children: [
        {
          path: "/", // Ruta para la página de inicio
          element: <HomePage />,
        },
        {
          path: "/about", // Ruta para la página "Sobre Nosotros"
          element: <AboutPage />,
        },
        {
          path: "/contact", // Ruta para la página de contacto
          element: <ContactPage />,
        },
        {
          path: "*", // Ruta comodín para páginas 404 No Encontradas
          element: <NotFoundPage />,
        }
      ],
    },
  ]), [setCurrentPath]); // Dependencia: setCurrentPath (generalmente estable)

  // RouterProvider hace que la configuración del router esté disponible para el resto de la app.
  return <RouterProvider router={appRouter} />;
}

export default App;
