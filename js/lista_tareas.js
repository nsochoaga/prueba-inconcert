/**
 * -------------------------------------------------------------
 * IMPLEMENTACIÓN DE LISTA DE TAREAS (JS NATIVO)
 * -------------------------------------------------------------
 * ANÁLISIS DE REQUISITOS:
 * 
 * 1. Se necesita una estructura de datos para almacenar tareas.
 * 2. Cada tarea debe tener título, prioridad y estado de completado.
 * 3. Se requiere crear, añadir, filtrar y marcar tareas.
 * 4. También debe generarse un resumen estadístico.
 * 
 * Solución:
 * - Se utiliza una clase Tarea para representar cada tarea.
 * - Se usa un array para almacenar todas las instancias de tareas.
 * - Se crean funciones auxiliares para crear, filtrar, marcar y resumir.
 * - El código es modular, reutilizable y fácil de leer.
 * 
 * -------------------------------------------------------------
 */

// 1. Clase Tarea (Título, prioridad, completada = false)
class Tarea {
  constructor(titulo, prioridad) {
    this.titulo = titulo;
    this.prioridad = prioridad.toLowerCase(); // alta, media, baja
    this.completada = false;
  }

  marcarComoCompletada() {
    this.completada = true;
  }
}

// 1.a Lista de tareas (estructura que almacena instancias de Tarea)
const listaTareas = [];

// 2. Función para crear y añadir una tarea a la lista
function crearTarea(titulo, prioridad) {
  const nuevaTarea = new Tarea(titulo, prioridad);
  listaTareas.push(nuevaTarea);
}

// 2. Función para filtrar tareas por prioridad
function filtrarPorPrioridad(prioridad) {
  return listaTareas.filter(t => t.prioridad === prioridad.toLowerCase());
}

// 3. Función para marcar una tarea como completada (por índice)
function marcarCompletada(index) {
  if (listaTareas[index]) {
    listaTareas[index].marcarComoCompletada();
  }
}

// 4. Función para obtener un resumen estadístico de las tareas
function resumenTareas() {
  const total = listaTareas.length;
  const completadas = listaTareas.filter(t => t.completada).length;
  const porPrioridad = {
    alta: listaTareas.filter(t => t.prioridad === 'alta').length,
    media: listaTareas.filter(t => t.prioridad === 'media').length,
    baja: listaTareas.filter(t => t.prioridad === 'baja').length,
  };

  return {
    total,
    completadas,
    porPrioridad
  };
}

// Ejemplo de uso
crearTarea("Estudiar SQL", "alta");
crearTarea("Leer documentación", "media");
crearTarea("Ir al gimnasio", "baja");

marcarCompletada(0);

console.log(filtrarPorPrioridad("alta")); // Tareas alta prioridad
console.log(resumenTareas()); // { total, completadas, porPrioridad }
