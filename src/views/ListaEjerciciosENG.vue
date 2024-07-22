<template>
    <mdb-container class="mt-4">
        <h1 class="text-muted text-center mb-4">Exercise list</h1>
        <div v-show="prof">
            <hr/>
            <router-link tag="button" class="btn btn-block success-color text-white" :to="{ path: 'nuevo' }" append><i class="fas fa-plus mr-1"></i>Create new exercise</router-link>
        </div>
        <mdb-btn block color="blue-grey" @click="cargarEjercicios"><mdb-icon icon="redo-alt" class="mr-1"/>Reload exercises</mdb-btn>
        <hr/>        
        <tipo class="my-3" titulo="Beam diagrams" color="aqua-gradient"></tipo>
        <mdb-row v-if="this.ejVigas.length > 0">
            <mdb-col col="md" v-for="(ej, i) in ejVigas" :key="ej.id">
                <tarjeta :id="i+1" :id_bd="ej.id" :dificultad="ej.dificultad"
                    :descripcion="ej.enunciadoENG" enlace="viga" @borrar="borrar"></tarjeta>
            </mdb-col>
        </mdb-row>
        <div class="text-center my-5" v-else-if="this.ejVigas.length == 0">
            <h2>There are not Beam diagrams exercises</h2>
        </div>

        <tipo class="my-3" titulo="Matrix method" color="peach-gradient"></tipo>
        <mdb-row v-if="this.ejMatrices.length > 0">
            <mdb-col col="md" v-for="(ej, i) in ejMatrices" :key="ej.id">
                <tarjeta :id="i+1" :id_bd="ej.id" :dificultad="ej.dificultad"
                    :descripcion="ej.enunciadoENG" enlace="matriz" @borrar="borrar"></tarjeta>
            </mdb-col>
        </mdb-row>
        <div class="text-center my-5" v-else-if="this.ejMatrices.length == 0">
            <h2>There are not matrix exercises</h2>
        </div>

        <tipo class="my-3" titulo="Mohr's circles" color="purple-gradient"></tipo>
        <mdb-row v-if="this.ejMohr.length > 0">
            <mdb-col col="md" v-for="(ej, i) in ejMohr" :key="ej.id">
                <tarjeta :id="i+1" :id_bd="ej.id" :dificultad="ej.dificultad"
                    :descripcion="ej.enunciadoENG" enlace="mohr" @borrar="borrar"></tarjeta>
            </mdb-col>
        </mdb-row>
        <div class="text-center my-5" v-else-if="this.ejMohr.length == 0">
            <h2>There are not exercises of Mohr's circles</h2>
        </div>
        <!--EJERCICIO NUEVO-->
        <tipo class="my-3" titulo="Calculation at section level" color="peach-gradient"></tipo>
        <mdb-row>
            <mdb-col col="md">
                <mdb-card class="hoverable mb-2">
                    <mdb-view gradient="winter-neva">
                        <h2 class="card-header-title text-dark text-center mt-2">Unique exercise</h2>
                        <div class="text-center mb-2">
                            <mdb-icon icon="pencil-alt" />
                            <mdb-icon icon="pencil-alt" />
                        </div>
                    </mdb-view>
                   <mdb-card-body class="text-center">
                        <mdb-card-text style="overflow: hidden; white-space: nowrap; text-overflow: ellipsis">
                            Calculation of the neutral axis and maximum and minimum stresses.
                        </mdb-card-text>
                        <hr/>
                        <router-link tag="button" class="btn btn-block elegant-color text-white" :to="{ name: 'SeccionENG'}" append >Solve</router-link>
                    </mdb-card-body>
                </mdb-card>
            </mdb-col>
        </mdb-row>
    </mdb-container>
</template>

<script>
import tarjeta from '@/components/listado/TarjetaEjercicioENG';
import tipo from '@/components/listado/TipoEjercicios';
import {mdbContainer, mdbRow, mdbCol, mdbBtn, mdbIcon, mdbCard, mdbCardBody, mdbCardText, mdbView} from 'mdbvue';

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
            if(confirm("Are you sure you want to delete the exercise "+ num +"?"))
                if (!borrarEjercicio(id, tipo)) this.error();    
        },
        error(){
            this.$notify({
                group: 'app',
                title: '<i class="fas fa-2x fa-times"></i> <b class="h5">Error deleting the exercise</b>',
                text: '<i style="font-size:15px"> An error occur while deleting the exercise. Please, try again.</i>',
                duration: 7000,
                type: 'error'
            });
        },
        async cargarEjercicios(){
            if(!await cargarEjercicios()){
                this.$notify({
                    group: 'app',
                    title: '<i class="fas fa-2x fa-times"></i> <b class="h5">Error loading exercises</b>',
                    text: '<i style="font-size:15px"> An error occur while loading the exercise. Please, reload the page.</i>',
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
        //console.log(this.ejMatrices[0])
    },
    beforeMount(){
        this.cargarEjercicios();
        console.log(this.ejMatrices[0])
    }
}
</script>