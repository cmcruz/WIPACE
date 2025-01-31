import {Ejercicio, Viga, Mohr, Matriz} from '@/assets/js/auxiliares/ejercicio.js';
import {URL} from '@/assets/js/auxiliares/api.config.js';

// Variables para almacenar cada tipo de ejercicio
export let ejercicio = new Ejercicio();
export let ejViga = new Viga();
export let ejMohr = new Mohr();
export let ejMatriz = new Matriz();

/**
 * Función que inicializa de nuevo las variables de los ejercicios
 */
export function limpiar(){
    ejercicio = new Ejercicio();
    ejViga = new Viga();
    ejMohr = new Mohr();
    ejMatriz = new Matriz();
}

/**
 * Función para carcar la información de cada tipo de ejercicio
 * @param {String} id Identificador del ejercicio
 * @param {String} tipo Tipo de ejercicio que se desea cargar
 * @returns True si se cargo con exito, False si hubo un error
 */
export async function cargaEjercicio(id, tipo){

    let url = '';

    switch(tipo){
        case 'Vigas':
        case 'viga':
            url = URL+'/ejercicio/viga/'+id;
            break;
        case 'Mohr':
        case 'mohr':
            url = URL+'/ejercicio/mohr/'+id;
            break;
        case 'Matriz':
        case 'matriz':
            url = URL+'/ejercicio/matriz/'+id;
            break;
    }

    if(url != ''){
        const ej = await fetch(url, { 
            headers: {'Content-Type': 'application/json'},
            method: 'GET'
        });

        if(ej.ok){
            switch(tipo){
                case 'Vigas':
                case 'viga':
                    ejViga = await ej.json();
                    cargaDatos(ejViga);
                    break;
                case 'Mohr':
                case 'mohr':
                    ejMohr = await ej.json();
                    cargaDatos(ejMohr);
                    break;
                case 'Matriz':
                case 'matriz':
                    ejMatriz = await ej.json();
                    cargaDatos(ejMatriz);
                    break;
            }
            return true;
        }else {
            return false;
        }
    }else{
        return false;
    }  
}

/**
 * Funcion auxiliar que carga los datos del enunciado
 * @param {Object} datos Objeto con los datos del enunciado
 */
function cargaDatos(datos){
    ejercicio.enunciado = datos.enunciado;
    ejercicio.enunciadoENG = datos.enunciadoENG;
    ejercicio.video = datos.video;
    ejercicio.ayuda = datos.ayuda;
}