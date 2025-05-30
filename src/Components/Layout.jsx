// Define la estructura visual común (encabezado, pie de página, navegación).
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

    // Manejador de navegación (opcional, Link ya maneja la navegación básica).
    // Puede ser útil para lógica adicional antes o después de navegar.
    const handleNavigate = (path) => {
        navigate(path);
    };

    // Estilos en línea para los enlaces de navegación (ejemplo)
    // En una aplicación real, podrías usar clases CSS o un sistema de componentes estilizados.
    const navLinkStyle = {
        padding: '8px 12px',
        borderRadius: '4px',
        textDecoration: 'none',
        color: '#333', // Color de enlace normal
        margin: '0 5px',
        display: 'inline-block' // Para que el padding y margin funcionen bien
    };

    const activeLinkStyle = {
        ...navLinkStyle,
        backgroundColor: '#007bff', // Color de fondo para enlace activo
        color: 'white', // Color de texto para enlace activo
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', fontFamily: 'Arial, sans-serif' }}>
            <header style={{ backgroundColor: '#f0f0f0', padding: '10px 20px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', maxWidth: '960px', margin: '0 auto' }}>
                    <div style={{ fontSize: '1.5em', fontWeight: 'bold' }}>
                        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                            MiAplicación
                        </Link>
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
                        <Link
                            to="/"
                            style={location.pathname === '/' ? activeLinkStyle : navLinkStyle}
                        >
                            Inicio
                        </Link>
                        <Link
                            to="/about"
                            style={location.pathname === '/about' ? activeLinkStyle : navLinkStyle}
                        >
                            Sobre Nosotros
                        </Link>
                        <Link
                            to="/contact"
                            style={location.pathname === '/contact' ? activeLinkStyle : navLinkStyle}
                        >
                            Contacto
                        </Link>
                        <Link
                            to="/enlace-roto-demo" // Para probar la página 404
                            style={location.pathname === '/enlace-roto-demo' ? activeLinkStyle : navLinkStyle}
                        >
                            Probar 404
                        </Link>
                    </div>
                </nav>
            </header>

            {/* El contenido principal de la página se renderizará aquí */}
            <main style={{ flexGrow: 1, padding: '20px', maxWidth: '960px', width: '100%', margin: '0 auto', boxSizing: 'border-box' }}>
                <Outlet /> {/* Outlet renderiza el componente de la ruta hija coincidente */}
            </main>

            <footer style={{ backgroundColor: '#333', color: 'white', textAlign: 'center', padding: '15px 0', marginTop: 'auto' }}>
                <p>&copy; {new Date().getFullYear()} MiAplicación Inc. Todos los derechos reservados.</p>
            </footer>
        </div>
    );
}

export default Layout;
