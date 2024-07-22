<template>
  <div>
    <mdb-card class="card-image" v-bind:style="fondo">
      <div class="text-white text-center rgba-black-strong py-5 px-4">
        <div class="py-5">
          <h1 class="green-text"><mdb-icon icon="pencil-ruler" /> <b>W</b>eb <b>I</b>nteractiva <b>PA</b>ra el <b>C</b>álculo de <b>E</b>structuras</h1>
          <h2 class="card-title h2 my-4 py-2" v-show="!prof">Welcome to WIPACE!</h2>
          <p class="mb-4 pb-2 px-md-5 mx-md-5" v-show="!prof">In the <i>Exercises</i> section, located at the top right, you will be able to consult all the exercises available.</p>
          <h2 class="card-title h2 my-4 py-2" v-show="prof">Welcome professor!</h2>
          <p class="mb-4 pb-2 px-md-5 mx-md-5" v-show="prof">In the <i>Exercises</i> section, located at the top right, you will be to able to consult the management options</p>
          <mdb-btn class="blue-grey-text" tag="a" gradient="dusty-grass" icon="key" href="https://platea.ujaen.es/?lang=en" v-show="!prof">Platea</mdb-btn>

        </div>
      </div>
    </mdb-card>

    <mdb-container class="my-3">
      <mdb-jumbotron class="mb-0 text-center hoverable p-4">
        <mdb-row>
          <mdb-col md="3" offsetMd="1" class="m-3">
            <mdb-view class="animated pulse infinite" :src="require('@/assets/img/engineer.svg')" alt="Imagen del profesor">
              <mdb-mask waves overlay="white-slight"/>
            </mdb-view>
          </mdb-col>
          <mdb-col md="7" class="text-left ml-3 mt-3">
            <p class="h6 pb-1 indigo-text"><mdb-icon far icon="question-circle" class="pr-1"/> +Info</p>
            <h3 class="h3 mb-4">Authors</h3>
            <p class="font-weight-normal">
              <ul>
                <li>
                  <a href="https://www.ujaen.es/departamentos/ingmec/contactos/suarez-guerra-fernando">Fernando Suárez Guerra</a>
                </li>
                <li>
                  <a href="https://www.ujaen.es/departamentos/ingmec/contactos/fernandez-aceituno-javier">Javier Fernández Aceituno</a>
                </li>
                <li>
                  <a href="https://github.com/sjm00010">Sergio Jiménez Moreno</a>
                </li>
                <li>
                  <a href="https://github.com/L-a-s-s-y">José Antonio Laserna Beltrán</a>
                </li>
              </ul>
            </p>
            <p class="lead text-muted">This website has been created as part of the Teaching Innovation and Improvement Projects PIMED06_201921 and PIMED01_202224, funded by the University of Jaén.</p>
          </mdb-col>
        </mdb-row>
      </mdb-jumbotron>

      <mdb-btn block v-show="!prof" outline="danger" @click="verLogin"><p class="black-text my-0">Professor access</p></mdb-btn>
      <mdb-btn block v-show="prof" outline="warning" @click="logout"><p class="black-text my-0">Logout</p></mdb-btn>

      <mdb-modal centered :show="modal" @close="modal = false">
        <mdb-modal-header>
          <mdb-modal-title>Professor credentials</mdb-modal-title>
        </mdb-modal-header>
        <mdb-modal-body class="py-0 grey-text">
          <mdb-input label="Username" icon="user" v-model="user" />
          <mdb-input type="password" icon="lock" label="Password" v-model="pass" @keyup.enter.native="login"/>
        </mdb-modal-body>
        <div class="text-center my-3">
          <mdb-btn color="success" @click.native="login">Login</mdb-btn>
        </div>
      </mdb-modal>
    </mdb-container>
    <footermb/>
  </div>
</template>

<script>
import {  mdbCard, mdbBtn, mdbJumbotron, mdbRow, mdbCol, mdbView, mdbIcon, mdbMask, 
          mdbContainer, mdbModal, mdbModalHeader, mdbModalTitle, mdbModalBody, 
          mdbInput} from 'mdbvue';
import footermb from '@/components/footerENG';
import {profesor, getUser, logout} from '@/assets/js/login/identificacion.js';
import {URL} from '@/assets/js/auxiliares/api.config.js';
export default {
  name: 'Home',
  components: {
    mdbCard, mdbBtn, mdbJumbotron, mdbRow, mdbCol, mdbView, mdbIcon, mdbMask, 
    mdbContainer, mdbModal, mdbModalHeader, mdbModalTitle, mdbModalBody, 
    mdbInput,
    footermb
  },
  data() {
    return {
      modal: false,
      user: '',
      pass: '',
      error: false,
      prof: false
    }
  },
  computed: {
    fondo() {
      return {
        backgroundImage: `url(${require('@/assets/img/fondo.png')})`,
        backgroundSize: 'cover'
      };
    }
  },
  methods:{
    verLogin(){
      this.modal = true;
      this.error = false;
    },
    async login(){
      const respuesta = await fetch(URL+'/usuario/login', { 
        headers: {'Content-Type': 'application/json', 
                  'Authorization': "Basic " + btoa(this.user +':'+this.pass)
        },
        method: 'GET'
      });

      if(respuesta.ok){ // Usuario y contraseña válidos
        sessionStorage.setItem("user", this.user);
        sessionStorage.setItem("pass", this.pass);
        this.prof = true;
        this.modal = false;
        this.$notify({
          group: 'log',
          title: '<i class="fas fa-2x fa-user-circle"></i> <b class="h3">Welcome professor</b>',
          text: '<i style="font-size:15px"> Your authentication has been sucessful. The login button now is the logout button.</i>',
          duration: 8000,
          type: 'success'
        });
      }else{
        this.$notify({
          group: 'log',
          title: '<i class="fas fa-2x fa-times"></i> <b class="h3">Authentication error</b>',
          text: '<i style="font-size:15px"> The username or the password are incorrect.</i>',
          duration: 5000,
          type: 'error'
        });
      }
    },
    logout(){
      logout();
      this.prof = profesor;
    }
  },
  created(){
    getUser();
    this.prof = profesor;
  }
}
</script>