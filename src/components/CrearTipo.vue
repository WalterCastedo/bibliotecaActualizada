<template>
  <div class="container mx-auto d-flex justify-content-center align-items-center">
    <form v-on:submit.prevent="agregarTipo" class="col">
      <div class="form-group text-center">
       
        <label for="titulo">Tipo de material bibliotecario</label>
        <br>
        <br>
        <input
          required
          type="text"
          name="nombre"
          v-model="nombreTipo"
          id="titulo"
          class="form-control mx-auto text-center"
          placeholder="Tipo de material"
          aria-describedby="titulo"
        />
      </div>

      <br />
      <div class="row justify-content-center">
        <a v-if="variable < 0" v-on:click.stop="agregarTipo()" class="btn btn-success m-2 col-5">
          Agregar
        </a>
        <a v-on:click.stop="volver()" class="btn btn-danger m-2 col-5">Cancelar</a>
      </div>
    </form>
  </div>
</template>

<script>
  export const RUTA_SERVIDOR_ALUMNOS = process.env.VUE_APP_RUTA_API_ALUMNOS;
export const RUTA_SERVIDOR_LIBROS = process.env.VUE_APP_RUTA_API_LIBROS;

import axios from "axios";
export default {
  data() {
    return {
      nombreTipo: "",
    };
  },
  props: {
    variable: {
      type: Number,
      default: 0,
    },
  },



  methods: {
    

    agregarTipo() {
      if (
        this.nombreTipo.trim() === "" 
  
  ) {
    alert('Por favor, el campo de tipo no pueden estar vacio.');
    return}
      axios
        .post(RUTA_SERVIDOR_LIBROS+"/tipos/", {
          tipo: this.nombreTipo,
         
        })
        .then(function (response) {
          console.log(response);
          location.reload();
        })
        .then(alert("El Tipo de material se agrego correctamente"))
        .catch(function (error) {
          console.log(error);
        });
    },

    reset() {
      Object.assign(this.$data, this.$options.data());
    
    },
    volver() {
      location.reload();
    },
    
   
  },
};
</script>
<style>

</style>