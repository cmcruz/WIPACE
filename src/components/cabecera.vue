<template>
    <mdb-navbar expand="large" dark color="elegant">
        <mdb-navbar-brand>
            <a href="https://www.ujaen.es/"><img :src="require('@/assets/img/logo.png')" height="50px" alt="Logo"></a>
        </mdb-navbar-brand>
        <mdb-navbar-toggler>
            <mdb-navbar-nav left>
                <mdb-nav-item class="text-center" router-link :to="espania()" v-on:click.native="cambiarIdioma(true)" :class="{'active' : idioma}" >
                    Español
                </mdb-nav-item>
                <mdb-nav-item class="text-center" router-link :to="england()" v-on:click.native="cambiarIdioma(false)" :class="{'active' : !idioma}">
                    English
                </mdb-nav-item>
            </mdb-navbar-nav>
            <mdb-navbar-nav right>
                <mdb-nav-item v-if="idioma" class="text-center" router-link to="/" v-on:click.native="cambiar('/')" :class="{'active': rut=='/' && idioma}" >
                    <mdb-icon icon="home" /> Inicio
                </mdb-nav-item>
                <mdb-nav-item v-if="!idioma" class="text-center" router-link to="/home" v-on:click.native="cambiar('/home')" :class="{'active': rut=='/home' && !idioma}" >
                    <mdb-icon icon="home" /> Home
                </mdb-nav-item>
                <mdb-nav-item v-if="idioma" class="text-center" router-link to="/ejercicios" v-on:click.native="cambiar('/ejercicios')" :class="{'active' : rut == '/ejercicios'}">
                    <mdb-icon icon="book" /> Ejercicios
                </mdb-nav-item>
                <mdb-nav-item v-if="!idioma" class="text-center" router-link to="/exercises" v-on:click.native="cambiar('/exercises')" :class="{'active' : rut == '/exercises'}">
                    <mdb-icon icon="book" /> Exercises
                </mdb-nav-item>
            </mdb-navbar-nav>
        </mdb-navbar-toggler>
    </mdb-navbar>
</template>

<script>
    import {   mdbNavbar, mdbNavbarBrand, mdbNavbarToggler, mdbNavbarNav, mdbNavItem, mdbIcon } from 'mdbvue';
    export default {
        name: 'Cabecera',
        components: {
            mdbNavbar,
            mdbNavbarBrand,
            mdbNavbarToggler,
            mdbNavbarNav,
            mdbNavItem,
            mdbIcon
        },
        data () {
            return {
                rut: '',
                idioma: true,
            };
        },
        methods:{
            cambiar(actual){
                this.rut = actual;
            },
            cambiarIdioma(lengua){   
                this.rut = this.$route.path;       
                this.idioma = this.idioma == lengua ? this.idioma : lengua;
            },
            espania(){
                if(this.$route.path == "/home" || this.$route.path == "/"){
                    return "/";
                }
                if(this.$route.path == "/exercises" || this.$route.path == "/ejercicios"){
                    return "/ejercicios";
                }
            },
            england(){
                if(this.$route.path == "/home" || this.$route.path == "/"){
                    return "/home";
                }
                if(this.$route.path == "/exercises" || this.$route.path == "/ejercicios"){
                    return "/exercises";
                }
            }
        },
        created: function(){
            this.rut = this.$route.path;
        }
    }
</script>