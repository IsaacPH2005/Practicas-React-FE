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
            messageDiv.className = 'text-green-600 mt-2'; // Usar Tailwind para el estilo
        }

        // Limpiar el formulario después de enviar
        setFormData({
            name: '',
            email: '',
            message: ''
        });
    };

    return (
        <div className="font-sans p-5 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Contáctanos</h1>
            <p className="mb-4">Ponte en contacto con nosotros a través del siguiente formulario (conceptual).</p>
            <form 
                onSubmit={handleSubmit} 
                className="mt-5 max-w-lg border border-gray-300 p-6 rounded-lg bg-white shadow-md"
            >
                <table className="w-full border-separate border-spacing-y-4">
                    <tbody>
                        <tr>
                            <td className="w-1/3 text-right">
                                <label htmlFor="name" className="block mb-1 font-semibold text-gray-700">Nombre:</label>
                            </td>
                            <td>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Tu Nombre Completo"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td className="text-right">
                                <label htmlFor="email" className="block mb-1 font-semibold text-gray-700">Correo Electrónico:</label>
                            </td>
                            <td>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="tu@ejemplo.com"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td className="text-right">
                                <label htmlFor="message" className="block mb-1 font-semibold text-gray-700">Mensaje:</label>
                            </td>
                            <td>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows="4"
                                    required
                                    value={formData.message}
                                    onChange={handleChange}
                                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                                    placeholder="Escribe tu mensaje aquí..."
                                ></textarea>
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <td>
                                <button 
                                    type="submit" 
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition duration-300"
                                >
                                    Enviar Mensaje
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div id="form-message" className="mt-2 text-sm"></div>
            </form>

            {/* Tabla para mostrar las entradas enviadas */}
            {entries.length > 0 && (
                <div className="mt-10 max-w-3xl">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Mensajes Recibidos</h2>
                    <table className="w-full border-collapse shadow-md">
                        <thead>
                            <tr className="bg-blue-600 text-white">
                                <th className="p-3 border-b">Nombre</th>
                                <th className="p-3 border-b">Correo Electrónico</th>
                                <th className="p-3 border-b">Mensaje</th>
                            </tr>
                        </thead>
                        <tbody>
                            {entries.map((entry, index) => (
                                <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                                    <td className="p-3 border-b">{entry.name}</td>
                                    <td className="p-3 border-b">{entry.email}</td>
                                    <td className="p-3 border-b">{entry.message}</td>
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
