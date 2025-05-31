// UserModal.jsx
import { useState, useEffect } from 'react';

function UserModal({ isOpen, onClose, onSave, userToEdit }) {
  const [user, setUser] = useState({
    id: null,
    name: '',
    email: '',
    role: 'Usuario',
    status: 'Activo',
  });

  // Efecto para cargar los datos del usuario cuando se abre el modal para editar
  useEffect(() => {
    if (userToEdit) {
      setUser(userToEdit);
    } else {
      // Limpiar el formulario si es para un nuevo usuario
      setUser({
        id: null,
        name: '',
        email: '',
        role: 'Usuario',
        status: 'Activo',
      });
    }
  }, [userToEdit, isOpen]);

  // Si el modal no está abierto, no renderiza nada.
  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validación básica
    if (!user.name || !user.email) {
      alert('Por favor, completa todos los campos.');
      return;
    }
    onSave(user); // Llama a la función onSave del componente padre
    onClose(); // Cierra el modal después de guardar
  };

  return (
  // DIV DEL FONDO (OVERLAY)
    <div
      className="fixed inset-0 bg-blue-900 bg-opacity-50 flex items-center justify-center 
                 z-[9999]
                 transition-opacity duration-300 ease-out"
    >
      {/* DIV DEL CONTENIDO DEL MODAL */}
      <div
        className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-md m-4
                   transform transition-all duration-300 ease-out scale-100 opacity-100"
      >
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          {userToEdit ? 'Editar Usuario' : 'Nuevo Usuario'}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Nombre
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={user.name}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="role"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Rol
            </label>
            <select
              id="role"
              name="role"
              value={user.role}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="Usuario">Usuario</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="status"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Estado
            </label>
            <select
              id="status"
              name="status"
              value={user.status}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="Activo">Activo</option>
              <option value="Inactivo">Inactivo</option>
              <option value="Pendiente">Pendiente</option>
            </select>
          </div>
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 dark:bg-gray-600 dark:text-white dark:hover:bg-gray-700"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              {userToEdit ? 'Guardar Cambios' : 'Crear Usuario'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserModal;