<template>
    <mdb-card class="hoverable mb-2">
        <mdb-view :gradient="this.obtenerColor(this.dificultad)">
            <h2 class="card-header-title text-dark text-center mt-2">Ejercicio {{this.id}}</h2>
            <div class="text-center mb-2">
                <mdb-icon  v-for="n in parseInt(this.dificultad)" :key="n" icon="pencil-alt" />
            </div>
            
        </mdb-view>
        <mdb-card-body class="text-center">
            <mdb-card-text style="overflow: hidden; white-space: nowrap; text-overflow: ellipsis" v-html="this.descripcion"></mdb-card-text>
            <hr/>
            <router-link tag="button" class="btn btn-block elegant-color text-white" :to="{ name: 'Realizar', params: { tipo: this.enlace, id: this.id_bd }}" append >Realizar</router-link>
            <!--<router-link tag="button" v-show="prof" class="btn btn-block secondary-color text-white my-2" :to="{ path: 'modificar/'+this.enlace+'/'+this.id_bd}" append >Modificar</router-link>-->
            <router-link tag="button" v-show="prof" class="btn btn-block secondary-color text-white my-2" :to="{ name: 'Modificador', params: {tipo: this.enlace, id:this.id_bd}}" append >Modificar</router-link>
            <mdb-btn block class="my-2" color="danger" v-show="prof" @click="borrar">Borrar</mdb-btn>
        </mdb-card-body>
    </mdb-card>
</template>

<script>
import { mdbCard, mdbCardBody, mdbCardText, mdbView, mdbIcon, mdbBtn } from 'mdbvue';
import {profesor, getUser} from '@/assets/js/login/identificacion.js';
export default {
    name: 'tarjeta',
    props: {
        id: {
            type: Number,
            require: true
        },
        dificultad: {
            type: Number,
            require: true
        },
        descripcion: {
            type: String,
            require: true
        },
        enlace: {
            type: String,
            require: true
        },
        id_bd: {
            type: String,
            require: true
        }
    },
    components: {
        mdbCard, mdbCardBody, mdbCardText, mdbView, mdbIcon, mdbBtn
    },
    data(){
        return{
            prof: false
        }
    },
    methods:{
        obtenerColor(dificultad){
            switch(dificultad){
                case 1:
                    return "dusty-grass";
                case 2:
                    return "winter-neva";
                case 3:
                    return "warm-flame";
                default:
                    return "cloudy-knoxville";
            }
        },
        borrar(){
            this.$emit('borrar', this.id, this.id_bd, this.enlace);
        }
    },
    created(){
        getUser();
        this.prof = profesor;
    }
}
</script>