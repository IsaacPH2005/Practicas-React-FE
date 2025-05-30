import { useState } from 'react';

function ContactPage() {
    // Estado para almacenar los valores de los inputs
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    // Estado para almacenar las entradas enviadas
    const [entries, setEntries] = useState([]);

    // Manejador para el cambio de los inputs
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Manejador para el envío del formulario
    const handleSubmit = (event) => {
        event.preventDefault();

        // Agregar la nueva entrada a la lista de entradas
        setEntries(prevEntries => [...prevEntries, formData]);

        // Mostrar mensaje de éxito
        const messageDiv = document.getElementById('form-message');
        if (messageDiv) {
            messageDiv.textContent = 'Mensaje enviado (simulación). ¡Gracias!';
            messageDiv.style.color = 'green';
            messageDiv.style.marginTop = '10px';
        }

        // Limpiar el formulario después de enviar
        setFormData({
            name: '',
            email: '',
            message: ''
        });
    };

    return (
        <div style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", padding: '20px', backgroundColor: '#f5f8fa', minHeight: '100vh' }}>
            <h1 style={{ color: '#333' }}>Contáctanos</h1>
            <p>Ponte en contacto con nosotros a través del siguiente formulario (conceptual).</p>
            <form 
                onSubmit={handleSubmit} 
                style={{ marginTop: '20px', maxWidth: '600px', border: '1px solid #ccc', padding: '20px', borderRadius: '8px', backgroundColor: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
            >
                <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 15px' }}>
                    <tbody>
                        <tr>
                            <td style={{ width: '30%', verticalAlign: 'top' }}>
                                <label htmlFor="name" style={{ display: 'block', marginBottom: '5px', fontWeight: '600', color: '#555' }}>Nombre:</label>
                            </td>
                            <td>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '14px' }}
                                    placeholder="Tu Nombre Completo"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td style={{ verticalAlign: 'top' }}>
                                <label htmlFor="email" style={{ display: 'block', marginBottom: '5px', fontWeight:'600', color: '#555' }}>Correo Electrónico:</label>
                            </td>
                            <td>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '14px' }}
                                    placeholder="tu@ejemplo.com"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td style={{ verticalAlign: 'top' }}>
                                <label htmlFor="message" style={{ display: 'block', marginBottom: '5px', fontWeight:'600', color: '#555' }}>Mensaje:</label>
                            </td>
                            <td>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows="4"
                                    required
                                    value={formData.message}
                                    onChange={handleChange}
                                    style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '14px', resize: 'vertical' }}
                                    placeholder="Escribe tu mensaje aquí..."
                                ></textarea>
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <td>
                                <button 
                                    type="submit" 
                                    style={{ 
                                        padding: '10px 25px', 
                                        border: 'none', 
                                        backgroundColor: '#007bff', 
                                        color: 'white', 
                                        borderRadius: '4px', 
                                        cursor: 'pointer', 
                                        fontSize: '16px',
                                        fontWeight: '600',
                                        transition: 'background-color 0.3s ease'
                                    }}
                                    onMouseEnter={e => e.currentTarget.style.backgroundColor = '#0056b3'}
                                    onMouseLeave={e => e.currentTarget.style.backgroundColor = '#007bff'}
                                >
                                    Enviar Mensaje
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div id="form-message" style={{ marginTop: '15px', fontSize: '0.9em' }}></div>
            </form>

            {/* Tabla para mostrar las entradas enviadas */}
            {entries.length > 0 && (
                <div style={{ marginTop: '40px', maxWidth: '800px' }}>
                    <h2 style={{ color: '#333', marginBottom: '15px' }}>Mensajes Recibidos</h2>
                    <table style={{ width: '100%', borderCollapse: 'collapse', boxShadow: '0 2px 8px rgba(0,0,0,0.12)' }}>
                        <thead>
                            <tr style={{ backgroundColor: '#007bff', color: 'white', textAlign: 'left' }}>
                                <th style={{ padding: '10px', borderBottom: '2px solid #0056b3' }}>Nombre</th>
                                <th style={{ padding: '10px', borderBottom: '2px solid #0056b3' }}>Correo Electrónico</th>
                                <th style={{ padding: '10px', borderBottom: '2px solid #0056b3' }}>Mensaje</th>
                            </tr>
                        </thead>
                        <tbody>
                            {entries.map((entry, index) => (
                                <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#fff' }}>
                                    <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{entry.name}</td>
                                    <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{entry.email}</td>
                                    <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{entry.message}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default ContactPage;

