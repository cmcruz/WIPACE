<template>
<div>
    <!-- Jumbotron con el enunciado del problema -->
    <mdb-jumbotron class="mb-0 text-center">
        <mdb-card-title class="pb-2 h4"><strong>Exercise of {{this.cab}}</strong></mdb-card-title>
        <p class="card-text" v-html="datos.enunciadoENG"></p>
        <mdb-row class="justify-content-center">
            <mdb-col col="md" class="my-2" v-show="datos.ayuda && datos.ayuda.length !== 0">
                <mdb-btn block color="elegant" @click.native="modal1 = true"><mdb-icon class="align-middle" size="2x" icon="journal-whills" /> Explanation</mdb-btn>
            </mdb-col>
            <mdb-col col="md" class="my-2" v-show="datos.video && datos.video.length !== 0">
                <mdb-btn block color="secondary" @click.native="modal2 = true"><mdb-icon class="align-middle" fab size="2x" icon="youtube" /> Explanation video</mdb-btn>
            </mdb-col>
        </mdb-row>
    </mdb-jumbotron>

    <!-- Modal de la explicación -->
    <mdb-modal size="lg" v-if="datos.ayuda && datos.ayuda.length !== 0"  :show="modal1" @close="modal1 = false">
        <mdb-modal-header>
            <mdb-modal-title>Explanation</mdb-modal-title>
        </mdb-modal-header>
        <mdb-modal-body v-html="datos.ayuda">
        </mdb-modal-body>
        <mdb-modal-footer>
            <mdb-btn color="danger" @click.native="modal1 = false">Close</mdb-btn>
        </mdb-modal-footer>
    </mdb-modal>



    <!-- Modal del vídeo -->
    <mdb-modal size="lg" v-if="datos.video && datos.video.length !== 0" :show="modal2" @close="modal2 = false">
        <mdb-modal-body class="p-0">
            <div class="embed-responsive embed-responsive-16by9 z-depth-1-half">
            <iframe class="embed-responsive embed-responsive-16by9 z-depth-1-half"
                        :src="'https://www.youtube.com/embed/'
                            +((datos.video.match(/(?:v=|\.be\/|embed\/)(?<url>\w+)/) 
                            && datos.video.match(/(?:v=|\.be\/|embed\/)(?<url>\w+)/).groups.url) 
                            || 'YgGzAKP_HuM')" 
                        allowfullscreen></iframe>
            </div>
        </mdb-modal-body>
        <mdb-modal-footer >
            <mdb-btn color="danger" @click.native="modal2 = false">Close</mdb-btn>
        </mdb-modal-footer>
    </mdb-modal>

    <viga v-if="this.tipo === 'viga'"/>
    <mohr v-if="this.tipo === 'mohr'"/>
    <matriz v-if="this.tipo === 'matriz'"/>
</div>
</template>

<script>
import { mdbJumbotron, mdbCardTitle, mdbBtn, mdbRow, mdbCol, 
         mdbModal, mdbModalBody, mdbIcon,
         mdbModalTitle, mdbModalFooter, mdbModalHeader, 
        } from 'mdbvue';
import viga from '@/components/visualizar/vigas/vigaENG';
import mohr from '@/components/visualizar/circulosMohr/mohrENG';
import matriz from '@/components/visualizar/matrices/matrizENG';
import { cargaEjercicio, ejViga, ejMatriz, ejMohr, limpiar } from '@/assets/js/auxiliares/ejercicioJSON.js';
export default {
    name: "EjercicioViga",
    components:{
        mdbJumbotron, mdbCardTitle, mdbBtn, mdbRow, 
        mdbCol, mdbModal, mdbModalHeader, mdbIcon,
        mdbModalTitle, mdbModalBody, mdbModalFooter, 
        viga, mohr, matriz
    },
    data(){
        return {
            tipo: this.$route.params.tipo,
            cab: '',
            datos: undefined
        };
    },
    async beforeRouteEnter (to, from, next) {
        await cargaEjercicio(to.params.id, to.params.tipo);
        next();
    },
    beforeMount(){
        switch (this.tipo){
            case 'viga':
                this.datos = ejViga;
                this.cab = 'beam diagrams';
                break;
            case 'matriz':
                this.datos = ejMatriz;
                this.cab = 'matrix method';
                break;
            case 'mohr':
                this.datos = ejMohr;
                this.cab = 'Mohr\'s circles';
                break;
            default:
                this.$notify({
                    group: 'app',
                    title: '<i class="fas fa-2x fa-times"></i> <b class="h5">Error during exercise loading</b>',
                    text: '<i style="font-size:15px"> An error occurred. Reload the exercises and try again.</i>',
                    duration: 7000,
                    type: 'error'
                });
                this.$route.push('/ejercicios');
                break;
        }
    },
    mounted(){
        this.$notify({
        group: 'log',
        title: '<i class="fas fa-2x fa-info-circle"></i></i> <b class="h3">Help</b>',
        text: '<i style="font-size:12px"> If any data is not displayed correctly, please reload the page.</i>',
        duration: 7000,
        });
    },
    beforeDestroy(){
        limpiar();
    }
}
</script>