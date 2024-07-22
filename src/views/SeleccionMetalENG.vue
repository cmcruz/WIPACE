<template>
    <mdb-container class="my-3">
        <mdb-card class="mb-3">
            <mdb-card-body>
                <mdb-card-title>Choose a section type</mdb-card-title>
                <mdb-card-text>Select one of the available section types</mdb-card-text>
                    <select class="browser-default custom-select custom-select-lg mb-3" v-model="tipo">
                        <option value="" selected>Select a section type</option>
                        <option value="100">IPE100</option>
                        <option value="120">IPE120</option>
                        <option value="140">IPE140</option>
                        <option value="160">IPE160</option>
                        <option value="180">IPE180</option>
                        <option value="200">IPE200</option>
                        <option value="220">IPE220</option>
                        <option value="240">IPE240</option>
                        <option value="270">IPE270</option>
                        <option value="300">IPE300</option>
                        <option value="330">IPE330</option>
                        <option value="360">IPE360</option>
                        <option value="400">IPE400</option>
                        <option value="450">IPE450</option>
                        <option value="500">IPE500</option>
                        <!--<option value="550">IPE550</option>-->
                        <!--<option value="600">IPE600</option>-->
                    </select>
            </mdb-card-body>
        </mdb-card>
        <perfilENG v-if="tipo != ''" :clase="tipo" :key="tipo"></perfilENG>
    </mdb-container>
</template>

<script>
import { mdbContainer, mdbCardBody, mdbCardTitle, mdbCardText, mdbCard } from 'mdbvue';

import PerfilENG from '../components/visualizar/seccion_metal/SeccionDeVigaENG.vue';
export default {
    name: 'SeccionENG',
    components: { 
        mdbContainer, mdbCardBody, mdbCardTitle, mdbCardText, mdbCard, PerfilENG,
    },
    data(){
        return{
            tipo: ''
        }
    },
    watch:{
        tipo(value){
            console.log(value);
            this.$forceUpdate();
        }
    },
    created(){
        console.log(this.tipo);
    },
}
</script>