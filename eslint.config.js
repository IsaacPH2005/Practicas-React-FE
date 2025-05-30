// eslint.config.js
// Asegúrate de tener instalados los siguientes paquetes:
// npm install -D eslint eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-react-refresh eslint-plugin-jsx-a11y @eslint/js globals

import eslintJs from '@eslint/js';
import globals from 'globals';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import pluginReactRefresh from 'eslint-plugin-react-refresh';
import pluginJsxA11y from 'eslint-plugin-jsx-a11y';

export default [
  {
    // Ignora directorios específicos como 'dist' o 'node_modules'
    ignores: ['dist', 'node_modules', 'build', '.turbo', '.next'],
  },
  {
    // Configuración base para todos los archivos JS/JSX
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest', // Utiliza la última versión de ECMAScript
      sourceType: 'module', // Habilita módulos ES
      parserOptions: {
        ecmaFeatures: {
          jsx: true, // Habilita JSX
        },
      },
      globals: {
        ...globals.browser, // Variables globales del navegador (window, document, etc.)
        ...globals.node,    // Variables globales de Node.js (si aplica, ej. para scripts)
        ...globals.es2021,  // Variables globales de ES2021
        // Agrega aquí cualquier otra variable global que necesites
        // process: 'readonly', // Ejemplo si usas process.env
      },
    },
    plugins: {
      'react': pluginReact,
      'react-hooks': pluginReactHooks,
      'react-refresh': pluginReactRefresh,
      'jsx-a11y': pluginJsxA11y,
    },
    settings: {
      react: {
        version: 'detect', // Detecta automáticamente la versión de React
      },
    },
    rules: {
      // Reglas recomendadas por ESLint
      ...eslintJs.configs.recommended.rules,
      // Reglas recomendadas por eslint-plugin-react
      ...pluginReact.configs.recommended.rules,
      // Reglas recomendadas por eslint-plugin-react-hooks
      ...pluginReactHooks.configs.recommended.rules,
      // Reglas recomendadas por eslint-plugin-jsx-a11y (puedes elegir 'strict' o 'recommended')
      ...pluginJsxA11y.configs.recommended.rules,

      // Reglas específicas de react-refresh (generalmente para Vite)
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],

      // Personalizaciones y mejoras comunes:
      'no-unused-vars': [
        'warn', // Cambiado a 'warn' para desarrollo, puedes usar 'error' para producción
        {
          args: 'after-used',
          ignoreRestSiblings: true,
          varsIgnorePattern: '^_', // Ignorar variables que comienzan con _
          argsIgnorePattern: '^_',  // Ignorar argumentos que comienzan con _
        },
      ],
      'no-console': ['warn', { allow: ['warn', 'error'] }], // Advierte sobre console.log, permite console.warn/error
      'react/prop-types': 'off', // Deshabilitado si usas TypeScript o prefieres no usar prop-types
      'react/react-in-jsx-scope': 'off', // No es necesario con el nuevo transform de JSX
      'react/jsx-uses-react': 'off', // No es necesario con el nuevo transform de JSX
      
      // Ejemplos de otras reglas útiles (descomenta y ajusta según necesites):
      // 'react/jsx-filename-extension': [1, { 'extensions': ['.js', '.jsx'] }], // Asegura extensiones correctas
      // 'react/jsx-props-no-spreading': 'off', // Permite el spread de props, ajusta si prefieres ser más estricto
      // 'jsx-a11y/anchor-is-valid': ['error', { // Configuración para validación de anclas con react-router
      //   'components': ['Link'],
      //   'specialLink': ['to']
      // }],
      // 'jsx-a11y/label-has-associated-control': ['error', { // Mejora la accesibilidad de los labels
      //   'labelComponents': [],
      //   'labelAttributes': [],
      //   'controlComponents': [],
      //   'assert': 'either', // 'nesting' o 'htmlFor'
      //   'depth': 25
      // }],
      // 'quotes': ['warn', 'single'], // Prefiere comillas simples
      // 'semi': ['warn', 'always'], // Requiere punto y coma
    },
  },
  // Puedes añadir más objetos de configuración aquí para archivos específicos
  // Por ejemplo, para archivos de test, configuración, etc.
  // {
  //   files: ['**/*.test.{js,jsx}', '**/*.spec.{js,jsx}'],
  //   languageOptions: {
  //     globals: {
  //       ...globals.jest, // O globals.mocha, etc.
  //     }
  //   },
  //   rules: {
  //     // Reglas específicas para tests
  //   }
  // }
];