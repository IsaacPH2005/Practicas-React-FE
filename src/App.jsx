import { useState, useMemo } from "react"
import { createBrowserRouter, RouterProvider } from "react-router"
import Layout from "./Components/Layout"
import LayoutAdmin from "./Components/LayoutAdmin" // Importamos el layout admin
import HomePage from "./Pages/HomePage"
import AboutPage from "./Pages/AboutPage"
import ContactPage from "./Pages/ContactPage"
import NotFoundPage from "./Pages/NotFoundPage"

// Páginas de administración
import AdminDashboard from "./Pages/Admin/Dashboard"
import AdminUsers from "./Pages/Admin/Users"
import Login from "./Pages/Auth/Login"
import Register from "./Pages/Auth/Register"

// Componente Principal App
function App() {
  // Estado para la ruta actual (opcional, para demostración o necesidades específicas)
  const [currentPath, setCurrentPath] = useState(window.location.pathname)

  // Define las rutas usando createBrowserRouter.
  // useMemo asegura que el router no se recree en cada renderizado a menos que cambien sus dependencias.
  const appRouter = useMemo(
    () =>
      createBrowserRouter([
        {
          // El componente Layout se renderizará para todas las rutas hijas públicas.
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
          ],
        },
        {
          // Sección de administración con su propio layout
          path: "/admin",
          element: <LayoutAdmin setCurrentPathForApp={setCurrentPath} />,
          children: [
            {
              index: true, // Ruta principal de admin
              element: <AdminDashboard />,
            },
            {
              path: "users", // /admin/users
              element: <AdminUsers />,
            },
          ],
        },
        {
          path: "/login", // Ruta para la página de inicio de sesión
          element: <Login />,
        },
        {
          path: "/register", // Ruta para la página de registro (puedes crearla más adelante)
          element: <Register />,
        },
        {
          // Ruta comodín para páginas 404 No Encontradas
          path: "*",
          element: <NotFoundPage />,
        },
      ]),
    [setCurrentPath],
  ) // Dependencia: setCurrentPath (generalmente estable)

  // RouterProvider hace que la configuración del router esté disponible para el resto de la app.
  return <RouterProvider router={appRouter} />
}

export default App
