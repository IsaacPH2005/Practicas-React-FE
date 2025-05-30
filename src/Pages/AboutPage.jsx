// -------------------------------------------------------------------
// Archivo: src/pages/AboutPage.jsx
// -------------------------------------------------------------------

function AboutPage() {
  return (
    <div>
      <h1>Sobre Nosotros</h1>
      <p>Aprende más sobre nuestra misión y equipo en esta página.</p>
      <p style={{ marginTop: '10px' }}>¡Estamos dedicados a proveer excelentes ejemplos de React!</p>
      <img
        src="https://placehold.co/600x300/E8F5E9/2E7D32?text=Info+Sobre+Nosotros"
        alt="Información Sobre Nosotros"
        style={{ marginTop: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', maxWidth: '100%', height: 'auto' }}
        onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/600x300/EEEEEE/BDBDBD?text=Error+al+cargar+imagen"; }}
      />
    </div>
  );
}

export default AboutPage;
