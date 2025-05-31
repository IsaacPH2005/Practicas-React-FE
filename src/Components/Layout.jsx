import { useEffect } from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router';

function Layout({ setCurrentPathForApp }) {
    const navigate = useNavigate(); // Hook para la navegación programática
    const location = useLocation(); // Hook para obtener información de la ruta actual

    // Efecto para actualizar la ruta actual en el componente App cuando cambia la ubicación.
    useEffect(() => {
        if (setCurrentPathForApp) {
            setCurrentPathForApp(location.pathname);
        }
    }, [location, setCurrentPathForApp]);

    return (
        <div className="flex flex-col min-h-screen font-sans">
            <header className="bg-gray-100 p-4 shadow">
                <nav className="flex justify-between items-center max-w-4xl mx-auto">
                    <div className="text-2xl font-bold">
                        <Link to="/" className="text-gray-800 no-underline">
                            MiAplicación
                        </Link>
                    </div>
                    <div className="flex space-x-4">
                        <Link
                            to="/"
                            className={`px-3 py-2 rounded ${location.pathname === '/' ? 'bg-blue-600 text-white' : 'text-gray-800 hover:bg-blue-500 hover:text-white'}`}
                        >
                            Inicio
                        </Link>
                        <Link
                            to="/about"
                            className={`px-3 py-2 rounded ${location.pathname === '/about' ? 'bg-blue-600 text-white' : 'text-gray-800 hover:bg-blue-500 hover:text-white'}`}
                        >
                            Sobre Nosotros
                        </Link>
                        <Link
                            to="/contact"
                            className={`px-3 py-2 rounded ${location.pathname === '/contact' ? 'bg-blue-600 text-white' : 'text-gray-800 hover:bg-blue-500 hover:text-white'}`}
                        >
                            Contacto
                        </Link>
                        <Link
                            to="/enlace-roto-demo" // Para probar la página 404
                            className={`px-3 py-2 rounded ${location.pathname === '/enlace-roto-demo' ? 'bg-blue-600 text-white' : 'text-gray-800 hover:bg-blue-500 hover:text-white'}`}
                        >
                            Probar 404
                        </Link>
                    </div>
                </nav>
            </header>

            {/* El contenido principal de la página se renderizará aquí */}
            <main className="flex-grow p-5 max-w-4xl mx-auto">
                <Outlet /> {/* Outlet renderiza el componente de la ruta hija coincidente */}
            </main>

            <footer className="bg-gray-800 text-white text-center p-4 mt-auto">
                <p>&copy; {new Date().getFullYear()} MiAplicación Inc. Todos los derechos reservados.</p>
            </footer>
        </div>
    );
}

export default Layout;
