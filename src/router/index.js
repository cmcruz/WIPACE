import Vue from 'vue';
import Router from 'vue-router';
import Inicio from '@/views/Inicio';
import Home from '@/views/InicioENG';
import ListaEjercicios from '@/views/ListaEjercicios';
import ListaEjerciciosENG from '@/views/ListaEjerciciosENG';
import Editor from '@/views/Editor';
import Modificador from '@/views/Modificador';
import Realizar from '@/views/Realizar';
import RealizarENG from '@/views/RealizarENG';
import Seccion from '@/views/SeleccionMetal';
import SeccionENG from '@/views/SeleccionMetalENG';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Inicio',
      component: Inicio
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/ejercicios',
      name: 'Lista',
      component: ListaEjercicios
    },
    {
      path: '/exercises',
      name: 'Exercises',
      component: ListaEjerciciosENG
    },
    {
      path: '/ejercicios/nuevo',
      name: 'Editor',
      component: Editor
    },
    {
      path: '/ejercicios/modificar/:tipo/:id',
      name: 'Modificador',
      component: Modificador
    },
    {
      path: '/ejercicios/:tipo/:id',
      name: 'Realizar',
      component: Realizar
    },
    {
      path: '/exercises/:tipo/:id',
      name: 'RealizarENG',
      component: RealizarENG
    },
    {
      path: '/ejercicio-seccion',
      name: 'Seccion',
      component: Seccion
    },
    {
      path: '/exercise-section',
      name: 'SeccionENG',
      component: SeccionENG
    }
  ]
});
