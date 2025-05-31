// AdminUsers.jsx
import { useState } from 'react';
import UserModal from '../../Components/UserModal';// Asegúrate de que la ruta sea correcta

function AdminUsers() {
  // Datos de ejemplo para usuarios
  const [users, setUsers] = useState([
    { id: 1, name: 'Alice Smith', email: 'alice@example.com', role: 'Admin', status: 'Activo' },
    { id: 2, name: 'Bob Johnson', email: 'bob@example.com', role: 'Usuario', status: 'Pendiente' },
    { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', role: 'Usuario', status: 'Activo' },
    { id: 4, name: 'Diana Prince', email: 'diana@example.com', role: 'Admin', status: 'Activo' },
    { id: 5, name: 'Eve Adams', email: 'eve@example.com', role: 'Usuario', status: 'Inactivo' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null); // Almacena el usuario que se está editando

  // --- Funciones para el CRUD ---

  const handleNewUserClick = () => {
    setEditingUser(null); // No hay usuario para editar, es uno nuevo
    setIsModalOpen(true);
  };

  const handleEditUser = (user) => {
    setEditingUser(user); // Establece el usuario que se va a editar
    setIsModalOpen(true);
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
      setUsers(users.filter((user) => user.id !== userId));
    }
  };

  const handleSaveUser = (userToSave) => {
    if (userToSave.id) {
      // Editar usuario existente
      setUsers(
        users.map((user) => (user.id === userToSave.id ? userToSave : user))
      );
    } else {
      // Crear nuevo usuario
      const newId = users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1;
      setUsers([...users, { ...userToSave, id: newId }]);
    }
    setIsModalOpen(false); // Cierra el modal
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingUser(null); // Limpiar el usuario de edición al cerrar
  };

  const getStatusClasses = (status) => {
    switch (status) {
      case 'Activo':
        return 'bg-green-100 text-green-800 dark:bg-green-700 dark:text-green-100';
      case 'Pendiente':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-700 dark:text-yellow-100';
      case 'Inactivo':
        return 'bg-red-100 text-red-800 dark:bg-red-700 dark:text-red-100';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100';
    }
  };

  return (
    <div className="space-y-6 p-4 md:p-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Gestión de Usuarios
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Administra los usuarios del sistema: añade, edita o elimina usuarios.
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2 sm:mb-0">
            Lista de Usuarios
          </h3>
          <button
            onClick={handleNewUserClick}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Nuevo Usuario
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Nombre
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Rol
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {users.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-gray-500 dark:text-gray-300">
                    No hay usuarios para mostrar.
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      #{user.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {user.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      {user.role}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusClasses(user.status)}`}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleEditUser(user)}
                        className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-600 mr-3 transition duration-200"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-600 transition duration-200"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <UserModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveUser}
        userToEdit={editingUser}
      />
    </div>
  );
}

export default AdminUsers;