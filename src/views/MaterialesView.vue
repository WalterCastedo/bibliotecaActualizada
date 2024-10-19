<template>
<div class="container mx-auto mt-5">

    <h2 class="align-items-center text-center" style="background-color: rgb(255, 142, 142);"  v-if="deudor" >
      Tienes material pendiente por devolver
    </h2>
    <div class="card text-cente">
      <div class="card-header">
        <ul class="nav nav-tabs card-header-tabs">
          <div v-if="acceso==2">
            <li class="nav-item">
            <a
              v-on:click="valor= 3"
              class="nav-link"
              v-bind:class="datos()"
              href="#/Materiales"
              name="3"
              >Datos</a
            >
          </li>
        </div>
          <li class="nav-item">
            <a
              v-on:click="valor = 0"
              class="nav-link"
              v-bind:class="listar()"
              aria-current="true"
              href="#/Materiales"
              >Listado</a
            >
          </li>
          <div v-if="acceso==2">
            <li class="nav-item">
            <a
              v-on:click="valor = -1"
              class="nav-link"
              v-bind:class="crear()"
              href="#/Materiales"
              name="1"
              >Nuevo</a
            >
          </li>
        </div>
        <div v-if="acceso==2">
          <li class="nav-item">
            <a v-if="valor>0 && valor!=3"
             
              class="nav-link active"
             
              href="#/Materiales"
              >Editar</a
            >
            <a v-else
           
              class="nav-link disabled"
              
              href="#"
              >Editar</a
            >
          </li>
        </div>
          
        </ul>
      </div>
      <div class="card-body">
        <!-- <CrearLibro v-show="valor==1" variable=1></CrearLibro>
       <CrearLibro v-show="valor==2" variable=2></CrearLibro> -->

        
    <CrearMaterial
      @recibiendo="variableLibro"
      v-show="valor == -1"
      v-bind:variable="valor"
    ></CrearMaterial>
    <CrearMaterial
      @recibiendo="variableLibro"
      v-if="valor > 0 && valor!=3"
      v-bind:variable="valor"
    ></CrearMaterial>
    <ListarMaterial v-show="valor == 0"
      @recibiendo="variableLibro"
      v-if="valor == 0"
      v-bind:variable="valor"
      class="mx-2 mx-sm-5"
    >
    </ListarMaterial>
   
    <ListarEstadisticas
    @recibiendo="variableLibro"
      v-if="valor == 3 "
      v-bind:variable="valor"
    >
    </ListarEstadisticas>




      </div>
    </div>
  </div>







</template>

<style></style>

<script>
// @ is an alias to /src
import ListarMaterial from "@/components/ListarMaterial.vue";
import ListarEstadisticas from "@/components/ListarEstadisticas.vue";
import CrearMaterial from "@/components/CrearMaterial.vue";
export const RUTA_SERVIDOR_LIBROS = process.env.VUE_APP_RUTA_API_LIBROS;

// import Redes from "@/components/footeraComponent.vue";
//import Vue from 'vue';

export default {
  name: "MaterialesView",

  data() {
    return {
      deudor:false,
      valor: 0,
      acceso: localStorage.getItem("acceso"),
      obtenerLibros: [],
    };
  },
  components: {
    ListarMaterial,
    CrearMaterial,
    ListarEstadisticas,


    // Redes,
  },

  mounted: function () {
   
    if (localStorage.getItem("acceso") ==0) {
      this.$router.push({ name: "home" });
    }
    this.deudasPanel()
  },
  

  methods: {
    encryptData(data) {
  const encrypted = CryptoJS.AES.encrypt(data, RUTA_KEY_CRYPTO);
  return encrypted.toString();
},
decryptData(encryptedData) {
  const bytes = CryptoJS.AES.decrypt(encryptedData, RUTA_KEY_CRYPTO);
  return bytes.toString(CryptoJS.enc.Utf8);
},
    deudasPanel(){
      fetch(RUTA_SERVIDOR_LIBROS + "/prestamos/deuda/"+ localStorage.getItem("cod_alum")) 
        .then((respuesta) => respuesta.json())
        .then((datosRespuesta) => {
          if(datosRespuesta != ""){
            console.log(1)
           this.deudor=true
          }
          else{
           this.deudor=false
            
          }
        })

              .catch(function (error) {
                      });
    },

    
    variableLibro(value) {
      this.valor = value;
    },
   
    listar() {
      return this.valor === 0 ? "active" : "";
    },
    crear() {
      return this.valor === -1 ? "active" : "";
    },
    editar() {
      return this.valor === 1 ? "active" : "";
    },
    datos() {
      return this.valor === 3 ? "active" : "";
    },
  
  },
};
</script>

