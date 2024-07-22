<template>
    <mdb-card class="mb-3">
        <mdb-row class="my-3" style="box-sizing: none;">
            <mdb-col class="my-2" md="6" col="md" ref="seccion">
                <!--<h4 class="text-center mt-3"><small class="text-dark">Esfuerzos</small></h4>-->
                <mdb-row>
                    <mdb-col md="12">
                        <h4 class="text-align mt-3" style="margin: 10px;"><small class="text-muted">Stresses:</small></h4>
                        <div class="md-form input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text md-addon"><b>N:</b></span>
                            </div>
                            <input type="number" min="0" step="0.1" label="N" class="form-control" placeholder="" v-model="N">
                            <div class="input-group-prepend">
                                <span class="input-group-text md-addon text-muted"><b>kN</b></span>
                            </div>
                            <div class="input-group-prepend">
                                <span class="input-group-text md-addon"><b>My:</b></span>
                            </div>
                            <input type="number" min="0" step="0.1" label="My" class="form-control" placeholder="" v-model="My">
                            <div class="input-group-prepend">
                                <span class="input-group-text md-addon text-muted"><b>kN·m</b></span>
                            </div>
                            <div class="input-group-prepend">
                                <span class="input-group-text md-addon"><b>Mz:</b></span>
                            </div>
                            <input type="number" min="0" step="0.1" label="Mz" class="form-control" placeholder="" v-model="Mz">
                            <div class="input-group-prepend">
                                <span class="input-group-text md-addon text-muted"><b>kN·m</b></span>
                            </div>
                        </div>
                    </mdb-col>
                </mdb-row>
                <!--<h4 class="text-center mt-3"><small class="text-dark">Datos de la sección</small></h4>-->
                <mdb-row>
                    <mdb-col md="12">
                        <h4 class="text-align mt-3" style="margin: 10px;"><small class="text-muted">Section data:</small></h4>
                        <div class="md-form input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text md-addon"><b>b:</b></span>
                                <span class="input-group-text md-addon" v-show="b != null">{{ b }}</span>
                                <span class="input-group-text md-addon text-muted"><b> mm</b></span>
                            </div>
                            <div class="input-group-prepend">
                                <span class="input-group-text md-addon"><b>h:</b></span>
                                <span class="input-group-text md-addon" v-show="h != null">{{ h }}</span>
                                <span class="input-group-text md-addon text-muted"><b> mm</b></span>
                            </div>
                            <div class="input-group-prepend">
                                <span class="input-group-text md-addon"><b>A:</b></span>
                                <span class="input-group-text md-addon" v-show="A != null">{{ A }}</span>
                                <span class="input-group-text md-addon text-muted"><b> cm<sup>2</sup></b></span>
                            </div>
                        </div>
                        <div class="md-form input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text md-addon"><b>Iy:</b></span>
                                <span class="input-group-text md-addon" v-show="Iy != null">{{ Iy }}</span>
                                <span class="input-group-text md-addon text-muted"><b> cm<sup>4</sup></b></span>
                            </div>
                            <div class="input-group-prepend">
                                <span class="input-group-text md-addon"><b>Iz:</b></span>
                                <span class="input-group-text md-addon" v-show="Iz != null">{{ Iz }}</span>
                                <span class="input-group-text md-addon text-muted"><b> cm<sup>4</sup></b></span>
                            </div>
                        </div>
                    </mdb-col>
                </mdb-row>
                <h4 class="text-center mt-3"><small class="text-dark">Results</small></h4>
                <mdb-row>
                    <mdb-col md="12">
                        <h4 class="text-align mt-3" style="margin: 10px;"><small class="text-muted">Neutral axis:</small></h4>
                        <div class="md-form input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text md-addon"><b>Y-axis cut:</b></span>
                                <span class="input-group-text md-addon" v-show="corteY != null">{{ corteY }} mm</span>
                            </div>
                            <div class="input-group-prepend">
                                <span class="input-group-text md-addon"><b>Z-axix cut:</b></span>
                                <span class="input-group-text md-addon" v-show="corteZ != null">{{ corteZ }} mm</span>
                            </div>
                        </div>
                        <h4 class="text-align mt-3" style="margin: 10px;"><small class="text-muted">Extreme normal stresses:</small></h4>
                        <div class="md-form input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text md-addon"><b>Maximum: </b></span>
                                <span class="input-group-text md-addon" v-show="tensionMaxima != null">{{ tensionMaxima }} MPa</span>
                            </div>
                            <div class="input-group-prepend">
                                <span class="input-group-text md-addon"><b>Minimum:</b></span>
                                <span class="input-group-text md-addon" v-show="tensionMinima != null">{{ tensionMinima }} MPa</span>
                            </div>
                        </div>
                    </mdb-col>
                </mdb-row>
            </mdb-col>
            <mdb-col class="my-2" md="6" col="md" ref="seccion">
                <canvas id="seccion" style="border: 3px solid rgb(211,211,211); margin-top: 35px;">
                    <img :src="getSrc(archivo)" id="tipo-a">
                </canvas>
            </mdb-col>
        </mdb-row>
    </mdb-card>
</template>

<script>
import { mdbRow, mdbCol, mdbCard } from 'mdbvue';
import * as sec from '@/assets/js/seccion/auxSeccion.js';
export default {
name: 'PerfilENG',
props: [
    "clase"
],
components: { mdbRow, mdbCol, mdbCard },
data(){
    return{
        archivo: "IPE100.png",
        N:  null,
        My: null,
        Mz: null,
        h:  null,
        b:  null,
        A:  null,
        Iy: null,
        Iz: null,
        //archivo: "TipoA.png"
        tensionMaxima: null,
        tensionMinima: null,
        corteY: null,
        corteZ: null,
    }
},
watch:{
    N(){
        const resultados = sec.recibirValores(this.N, this.My, this.Mz, this.h, this.b, this.A, this.Iy, this.Iz);
        this.actResultados(resultados);
    },
    My(){
        const resultados = sec.recibirValores(this.N, this.My, this.Mz, this.h, this.b, this.A, this.Iy, this.Iz);
        this.actResultados(resultados);
    },
    Mz(){
        const resultados = sec.recibirValores(this.N, this.My, this.Mz, this.h, this.b, this.A, this.Iy, this.Iz);
        this.actResultados(resultados);
    },
},
methods: {
    resize(){
        sec.resizeCanvas(this.$refs.seccion);
        sec.recibirValores(this.N, this.My, this.Mz, this.h, this.b, this.A, this.Iy, this.Iz);
    },
    getSrc(name) {
        let images = require.context('../../../assets/img/imgSeccion/', false, /\.png$/);
        return images('./' + name);
    },
    actResultados(resultados){
        if(resultados){
            console.log(resultados);
            this.tensionMaxima = resultados.tensionMaxima;
            this.tensionMinima = resultados.tensionMinima;
            this.corteY = resultados.corteEjeY;
            this.corteZ = resultados.corteEjeZ;
        }
    },
    setParametros(clase){
        switch(clase){
            case '100':
                this.h = 100;
                this.b = 55;
                this.A = 10.32;
                this.Iy = 171;
                this.Iz = 15.92;
                break;
            case '120':
                this.h = 120;
                this.b = 64;
                this.A = 13.21;
                this.Iy = 317.8;
                this.Iz = 27.67;
                break;
            case '140':
                this.h = 140;
                this.b = 73;
                this.A = 16.43;
                this.Iy = 541.2;
                this.Iz = 44.92;
                break;
            case '160':
                this.h = 160;
                this.b = 82;
                this.A = 20.09;
                this.Iy = 869.3;
                this.Iz = 68.31;
                break;
            case '180':
                this.h = 180;
                this.b = 91;
                this.A = 23.95;
                this.Iy = 1317;
                this.Iz = 100.9;
                break;
            case '200':
                this.h = 200;
                this.b = 100;
                this.A = 28.48;
                this.Iy = 1943;
                this.Iz = 142.4;
                break;
            case '220':
                this.h = 220;
                this.b = 110;
                this.A = 33.37;
                this.Iy = 2772;
                this.Iz = 204.9;
                break;
            case '240':
                this.h = 240;
                this.b = 120;
                this.A = 39.12;
                this.Iy = 3892;
                this.Iz = 283.6;
                break;
            case '270':
                this.h = 270;
                this.b = 135;
                this.A = 45.95;
                this.Iy = 5790;
                this.Iz = 419.9;
                break;
            case '300':
                this.h = 300;
                this.b = 150;
                this.A = 53.81;
                this.Iy = 8356;
                this.Iz = 603.8;
                break;
            case '330':
                this.h = 330;
                this.b = 160;
                this.A = 62.61;
                this.Iy = 11770;
                this.Iz = 788.1;
                break;
            case '360':
                this.h = 360;
                this.b = 170;
                this.A = 72.73;
                this.Iy = 16270;
                this.Iz = 1043;
                break;
            case '400':
                this.h = 400;
                this.b = 180;
                this.A = 84.46;
                this.Iy = 23130;
                this.Iz = 1318;
                break;
            case '450':
                this.h = 450;
                this.b = 190;
                this.A = 98.82;
                this.Iy = 33740;
                this.Iz = 1676;
                break;
            case '500':
                this.h = 500;
                this.b = 200;
                this.A = 115.52;
                this.Iy = 48200;
                this.Iz = 2142;
                break;
        }
    }
},
mounted(){
    sec.vinculaCanvas(this.$refs.seccion);
    // Redimensionar
    window.addEventListener('resize', () => this.resize());
},
beforeDestroy(){
    window.removeEventListener('resize', () => this.resize());
},
created(){
    //console.log(this.clase)
    this.archivo = "IPE"+this.clase+".png";
    console.log(this.archivo);
    this.setParametros(this.clase);
}
}
</script>