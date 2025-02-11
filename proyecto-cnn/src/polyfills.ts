/**
 * Este archivo incluye polyfills necesarios para Angular y se carga antes de la aplicación.
 * Puedes agregar tus propios polyfills adicionales a este archivo.
 *
 * Este archivo está dividido en 2 secciones:
 *   1. Polyfills de navegador. Estos se aplican antes de cargar ZoneJS y son ordenados por navegadores.
 *   2. Importaciones de aplicación. Archivos importados después de ZoneJS que deben cargarse antes de tu aplicación.
 */

/***************************************************************************************************
 * BROWSER POLYFILLS
 */
import 'zone.js/dist/zone';  // Incluido con Angular CLI.
