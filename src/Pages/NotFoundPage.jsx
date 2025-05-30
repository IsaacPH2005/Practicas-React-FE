// -------------------------------------------------------------------
// Archivo: src/pages/NotFoundPage.jsx
// -------------------------------------------------------------------
import { Link } from 'react-router';

function NotFoundPage() {
  return (
    <div style={{ textAlign: 'center', padding: '40px 20px' }}>
      <h1 style={{ fontSize: '2.5em', color: '#dc3545', marginBottom: '20px' }}>404 - Página No Encontrada</h1>
      <p style={{ fontSize: '1.2em', marginBottom: '30px' }}>¡Ups! La página que estás buscando no existe o ha sido movida.</p>
      <img
        src="https://placehold.co/400x300/FFCDD2/B71C1C?text=Error+404"
        alt="Error 404 - Página no encontrada"
        style={{ marginTop: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', maxWidth: '100%', height: 'auto', marginBottom: '30px' }}
        onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/400x300/EEEEEE/BDBDBD?text=Error+al+cargar+imagen"; }}
      />
      <div>
        <Link
          to="/"
          style={{
            padding: '12px 25px',
            backgroundColor: '#007bff',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '5px',
            fontSize: '1em',
            transition: 'background-color 0.3s ease'
          }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#0056b3'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#007bff'}
        >
          Ir a la Página de Inicio
        </Link>
      </div>
    </div>
  );
}

export default NotFoundPage;