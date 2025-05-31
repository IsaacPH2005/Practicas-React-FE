import axios from "axios"
import { Buffer } from "buffer"

// Para entorno de desarrollo local
export const urlBase = import.meta.env.VITE_API_URL || "http://practicas-be-app.test/api/"
export const urlBaseAsset = import.meta.env.VITE_ASSET_URL || "http://practicas-be-app.test/"

// ===== CONFIGURACIÓN BASE DE AXIOS =====
// Configuración común para todas las instancias de axios
const baseConfig = {
  timeout: 15000, // 15 segundos de tiempo límite para todas las peticiones
  headers: {
    Accept: "application/json", // Cabecera Accept por defecto
  },
}

// ===== GESTIÓN DE TOKENS =====
/**
 * Obtiene el token de autenticación desde localStorage
 * El token se almacena en formato base64 y se decodifica antes de usarlo
 * @returns {string} El token de autenticación decodificado o cadena vacía si no se encuentra
 */
const getToken = () => {
  const storedToken = localStorage.getItem("token")
  return storedToken ? Buffer.from(storedToken, "base64").toString("ascii") : ""
}

// ===== MANEJO DE ERRORES =====
/**
 * Manejador global de errores para todas las peticiones axios
 * Maneja errores 401 No Autorizado limpiando localStorage y redirigiendo al login
 * Maneja errores 403 Forbidden mostrando mensaje y redirigiendo a página de acceso denegado
 * @param {Error} error - El objeto de error de axios
 * @returns {Promise} Promesa rechazada con el error
 */
const handleError = (error) => {
  if (error.response?.status === 401) {
    // Si no está autorizado, limpia todo el almacenamiento local y redirige al login
    localStorage.clear()
    window.location.href = "/login"
  } 
  else if (error.response?.status === 403) {
    // Si está prohibido (no tiene permisos), redirige a la página de acceso denegado
    // Opcionalmente puedes mostrar un mensaje antes de redirigir
    const errorMessage = error.response.data?.mensaje || 'No tienes permiso para acceder a este recurso';
    
    // Si estás usando alguna librería de notificaciones como toast, puedes mostrar el mensaje:
    // toast.error(errorMessage);
    
    // También puedes guardar el mensaje en localStorage para mostrarlo en la página de destino
    localStorage.setItem('errorMessage', errorMessage);
    
    // Redirige a la página de acceso denegado
    window.location.href = "/unauthorized";
  }
  
  return Promise.reject(error)
}
// ===== FÁBRICA DE INTERCEPTORES AXIOS =====
/**
 * Crea una instancia de axios con configuración personalizada e interceptores
 * Añade automáticamente el token de autenticación si está disponible
 * @param {Object} customConfig - Configuración personalizada de axios para fusionar con la configuración base
 * @returns {AxiosInstance} Instancia de axios configurada
 */
const createInterceptor = (customConfig = {}) => {
  const token = getToken()
  const config = {
    ...baseConfig,
    ...customConfig,
  }

  // Añade cabecera de autorización si existe el token
  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    }
  }

  // Crea instancia de axios con la configuración fusionada
  const interceptor = axios.create(config)

  // Añade interceptor de respuesta para manejo global de errores
  interceptor.interceptors.response.use((response) => response, handleError)

  return interceptor
}

// ===== CLIENTES HTTP ESPECIALIZADOS =====

/**
 * Cliente HTTP estándar con tipo de contenido JSON y autenticación
 * Usar para la mayoría de peticiones API que envían y reciben JSON
 */
export const http = () =>
  createInterceptor({
    headers: {
      "Content-Type": "application/json",
    },
  })

/**
 * Cliente HTTP para subida de archivos con multipart/form-data
 * Usar cuando se suben archivos o datos de formulario con archivos
 */
export const httpAsset = () =>
  createInterceptor({
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })

/**
 * Cliente HTTP sin token de autenticación
 * Usar para endpoints API públicos que no requieren autenticación
 */
export const httpNotToken = () => createInterceptor()

/**
 * Cliente HTTP para descargar archivos con autenticación
 * La respuesta se devuelve como un Blob para descargas de archivos
 */
export const httpDownload = () =>
  createInterceptor({
    headers: {
      "Content-Type": "application/json",
    },
    responseType: "blob",
  })

/**
 * Cliente HTTP para descargar archivos sin autenticación
 * Usar para descargas de archivos públicos que no requieren autenticación
 */
export const httpDownloadWithoutToken = () =>
  createInterceptor({
    headers: {
      "Content-Type": "application/json",
    },
    responseType: "blob",
  })