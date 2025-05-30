function HomePage() {
  return (
    <div>
      <h1>¡Bienvenido a la Página de Inicio!</h1>
      <p>Esta es la página principal de nuestra increíble aplicación.</p>
      <img
        src="https://placehold.co/600x300/E1F5FE/0277BD?text=Banner+Página+Inicio"
        alt="Banner Página de Inicio"
        style={{ marginTop: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', maxWidth: '100%', height: 'auto' }}
        onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/600x300/EEEEEE/BDBDBD?text=Error+al+cargar+imagen"; }}
      />
    </div>
  );
}

export default HomePage;