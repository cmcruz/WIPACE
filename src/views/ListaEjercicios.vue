<template>
    <mdb-container class="mt-4">
        <h1 class="text-muted text-center mb-4">Listado de ejercicios</h1>
        <div v-show="prof">
            <hr/>
            <router-link tag="button" class="btn btn-block success-color text-white" :to="{ path: 'nuevo' }" append><i class="fas fa-plus mr-1"></i>Crear ejercicio</router-link>
        </div>
        <mdb-btn block color="blue-grey" @click="cargarEjercicios"><mdb-icon icon="redo-alt" class="mr-1"/>Recargar ejercicios</mdb-btn>
        <hr/>        
        <tipo class="my-3" titulo="Diagramas de esfuerzos en vigas" color="aqua-gradient"></tipo>
        <mdb-row v-if="this.ejVigas.length > 0">
            <mdb-col col="md" v-for="(ej, i) in ejVigas" :key="ej.id">
                <tarjeta :id="i+1" :id_bd="ej.id" :dificultad="ej.dificultad"
                    :descripcion="ej.enunciado" enlace="viga" @borrar="borrar"></tarjeta>
            </mdb-col>
        </mdb-row>
        <div class="text-center my-5" v-else-if="this.ejVigas.length == 0">
            <h2>No existen ejercicios de diagramas de esfuerzos en vigas</h2>
        </div>

        <tipo class="my-3" titulo="Método matricial" color="peach-gradient"></tipo>
        <mdb-row v-if="this.ejMatrices.length > 0">
            <mdb-col col="md" v-for="(ej, i) in ejMatrices" :key="ej.id">
                <tarjeta :id="i+1" :id_bd="ej.id" :dificultad="ej.dificultad"
                    :descripcion="ej.enunciado" enlace="matriz" @borrar="borrar"></tarjeta>
            </mdb-col>
        </mdb-row>
        <div class="text-center my-5" v-else-if="this.ejMatrices.length == 0">
            <h2>No existen ejercicios de matrices</h2>
        </div>

        <tipo class="my-3" titulo="Círculos de Mohr" color="purple-gradient"></tipo>
        <mdb-row v-if="this.ejMohr.length > 0">
            <mdb-col col="md" v-for="(ej, i) in ejMohr" :key="ej.id">
                <tarjeta :id="i+1" :id_bd="ej.id" :dificultad="ej.dificultad"
                    :descripcion="ej.enunciado" enlace="mohr" @borrar="borrar"></tarjeta>
            </mdb-col>
        </mdb-row>
        <div class="text-center my-5" v-else-if="this.ejMohr.length == 0">
            <h2>No existen ejercicios de círculos de Mohr</h2>
        </div>

        <!--EJERCICIO NUEVO-->
        <tipo class="my-3" titulo="Cálculo a nivel de sección" color="peach-gradient"></tipo>
        <mdb-row>
            <mdb-col col="md">
                <mdb-card class="hoverable mb-2">
                    <mdb-view gradient="winter-neva">
                        <h2 class="card-header-title text-dark text-center mt-2">Ejercicio único</h2>
                        <div class="text-center mb-2">
                            <mdb-icon icon="pencil-alt" />
                            <mdb-icon icon="pencil-alt" />
                        </div>
                    </mdb-view>
                   <mdb-card-body class="text-center">
                        <mdb-card-text style="overflow: hidden; white-space: nowrap; text-overflow: ellipsis">
                            Cálculo de la fibra neutra y tensiones máximas y mínimas.
                        </mdb-card-text>
                        <hr/>
                        <router-link tag="button" class="btn btn-block elegant-color text-white" :to="{ name: 'Seccion'}" append >Realizar</router-link>
                    </mdb-card-body>
                </mdb-card>
            </mdb-col>
        </mdb-row>
    </mdb-container>
</template>

<script>
import tarjeta from '@/components/listado/TarjetaEjercicio';
import tipo from '@/components/listado/TipoEjercicios';
import { mdbContainer, mdbRow, mdbCol, mdbBtn, mdbIcon, mdbCard, mdbCardBody, mdbCardText, mdbView } from 'mdbvue';

import {vigas, matriz, mohr, cargarEjercicios, borrarEjercicio} from '@/assets/js/auxiliares/ejercicio.js';
import {profesor, getUser} from '@/assets/js/login/identificacion.js';
 
export default {
    components: {
        mdbContainer, mdbRow, mdbCol, mdbBtn, mdbIcon, mdbCard, mdbCardBody, mdbCardText, mdbView,
        tarjeta,
        tipo
    },
    data(){
        return{
            prof: false,
            ejVigas: vigas || [],
            ejMohr: mohr || [],
            ejMatrices: matriz || []
        }
    },
    methods:{
        borrar(num, id, tipo){
            if(confirm("¿Esta seguro de eliminar el ejercicio "+ num +"?"))
                if (!borrarEjercicio(id, tipo)) this.error();    
        },
        error(){
            this.$notify({
                group: 'app',
                title: '<i class="fas fa-2x fa-times"></i> <b class="h5">Error al borrar el ejercicio</b>',
                text: '<i style="font-size:15px"> Ocurrió un error al tratar de borrar el ejercicio, inténtelo de nuevo.</i>',
                duration: 7000,
                type: 'error'
            });
        },
        async cargarEjercicios(){
            if(!await cargarEjercicios()){
                this.$notify({
                    group: 'app',
                    title: '<i class="fas fa-2x fa-times"></i> <b class="h5">Error al cargar los ejercicios</b>',
                    text: '<i style="font-size:15px"> Ocurrió un error al tratar de cargar los ejercicios, recargue la página.</i>',
                    duration: 7000,
                    type: 'error'
                });
                this.$route.push('/');
            }
        }
    },
    created(){
        getUser();
        this.prof = profesor;
    },
    beforeMount(){
        this.cargarEjercicios();
    }
}
</script>