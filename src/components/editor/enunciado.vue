<template>
<div class="my-3">
    <h4 class="text-center"><small class="text-muted">ENUNCIADO</small></h4>
    <mdb-card-text class="text-center">Selecciona el contenido que deseas añadir, las pestañas de explicación y vídeo son apoyos opcionales al ejercicio. Si no se desea añadir explicación o vídeo al ejercicio, dejar en blanco los campos.</mdb-card-text>
    <mdb-card-body class="pt-0">                
        <mdb-btn-group class="w-100">
            <mdb-btn color="primary" v-show="selecEnun" disabled class="mb-2" @click="selectEnun = false"><mdb-icon size="lg" icon="file-alt" /> Enunciado</mdb-btn>
            <mdb-btn color="primary" v-show="!selecEnun" class="mb-2" @click="selecEnun = true, selecVideo = false, selecExp = false"><mdb-icon size="lg" icon="file-alt" /> Enunciado</mdb-btn>
            <mdb-btn color="secondary" class="mb-2"  v-show="selecExp" disabled ><mdb-icon size="lg" icon="question-circle" /> Explicación </mdb-btn>
            <mdb-btn color="secondary" class="mb-2" v-show="!selecExp" @click="selecExp = true, selecEnun = false, selecVideo = false"><mdb-icon size="lg" icon="question-circle" /> Explicación </mdb-btn>
            <mdb-btn color="dark-green" class="mb-2" v-show="selecVideo" disabled><mdb-icon fab size="lg" icon="youtube" /> Vídeo</mdb-btn>
            <mdb-btn color="dark-green" class="mb-2" v-show="!selecVideo" @click="selecVideo = true, selecExp = false, selecEnun = false"><mdb-icon fab size="lg" icon="youtube" /> Vídeo</mdb-btn>                   
        </mdb-btn-group>
    </mdb-card-body>
    
    <div v-show="selecEnun"> <!-- Enunciado -->
        <editor @actualiza="actualizaEnunciado" :nTexto="enunciado" />
    </div>

    <div v-show="selecEnun"> <!-- EnunciadoENG -->
        <editor @actualiza="actualizaEnunciadoENG" :nTexto="enunciadoENG" />
    </div>

    <div v-show="selecExp"> <!-- Explicación -->
        <editor @actualiza="actualizaExplicacion" :nTexto="explicacion" />
    </div>

    <div v-show="selecVideo"> <!-- Vídeo -->
    <small class="text-muted"><mdb-icon icon="info-circle" /> La URL debe ser de YouTube.</small>
        <mdb-input label="URL del vídeo" @input="actualizaVideo" v-model="video"/>
    </div>
</div>
</template>

<script>
import {mdbCardBody, mdbIcon, mdbInput,
        mdbCardText, mdbBtn, mdbBtnGroup } from 'mdbvue';
import editor from '@/components/editor/editor';
import { ejercicio } from '@/assets/js/auxiliares/ejercicioJSON.js';
export default {
    name: 'editorTexto',
    components: {
        mdbCardBody, mdbIcon, mdbInput,
        mdbCardText, mdbBtn, mdbBtnGroup,
        editor
    },
    data(){
        return{
            enunciado: ejercicio.enunciado,
            enunciadoENG: ejercicio.enunciadoENG,
            explicacion: ejercicio.ayuda,
            video: ejercicio.video,
            selecEnun: true,
            selecExp: false,
            selecVideo: false,
            ctrl: false,
            modal: false,
            vprevia: false,
        }
    },
    methods:{
        actualizaEnunciado(texto){
            this.enunciado = texto;
            ejercicio.enunciado = texto;
        },
        actualizaEnunciadoENG(texto){
            this.enunciadoENG = texto;
            ejercicio.enunciadoENG = texto;
        },
        actualizaExplicacion(texto){
            this.explicacion = texto;
            ejercicio.ayuda = texto;
        },
        actualizaVideo(e){
            ejercicio.video = e;
        }
    }
}
</script>