<template>
  <div
    class="container mx-auto d-flex justify-content-center align-items-center row"
  >
    <form v-on:submit.prevent="agregarBiblioteca" class="row">
      <div class="form-group col-6 col-sx-12">
        <div class="">
          <label for="titulo">Nombre de la biblioteca libre</label>
          <br />
          <input
            required
            type="text"
            name="nombre"
            v-model="nombreBiblioteca"
            id="titulo"
            class="form-control mx-auto "
            placeholder="Nombre"
            aria-describedby="titulo"
          />
        </div>
        <br>
        <div class="">
          <label for="titulo">Url de la biblioteca libre (empezar con www)</label>

          <input
            required
            type="text"
            name="urlBiblioteca"
            v-model="urlBiblioteca"
            id="titulo"
            class="form-control mx-auto "
            placeholder="Enlace del medio"
            aria-describedby="titulo"
          />
        </div>
        <br>
        <div class="">
          <label for="titulo"
            >Url del la imagen de portada (Mejor si es formato cuadrada)</label
          >

          <input
            required
            type="text"
            name="urlBiblioteca"
            v-model="urlImagenBiblioteca"
            id="titulo"
            class="form-control mx-auto "
            placeholder="Enlace de la imagen de la portada "
            aria-describedby="titulo"
          />
        </div>
      </div>
      
      <div  class="col-md-6 mx-auto col-sx-12 border" style="width: 300px; height: 300px; ">
        
        <img class="mx-auto d-block" style="width: 100%;" :src="urlImagenBiblioteca" alt="">
      </div>

      <br />

      <div class="row justify-content-center">
        <a
          v-if="variable < 0"
          v-on:click.stop="agregarBiblioteca()"
          class="btn btn-success m-2 col-5"
        >
          Agregar
        </a>
        <a v-on:click.stop="volver()" class="btn btn-danger m-2 col-5"
          >Cancelar</a
        >
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
      nombreBiblioteca: "",
      urlImagenBiblioteca:"",
      urlBiblioteca:""
    };
  },
  props: {
    variable: {
      type: Number,
      default: 0,
    },
  },

  methods: {
    agregarBiblioteca() {
      if (
    this.nombreBiblioteca.trim() === "" ||
    this.urlBiblioteca.trim() === "" ||
    this.urlImagenBiblioteca.trim() === ""
  ) {
    alert("Por favor, complete todos los campos antes de continuar.");
    return;
  }
      axios
        .post(RUTA_SERVIDOR_LIBROS + "/biblioteca/", {
          nombre: this.nombreBiblioteca,
          urlBiblioteca:this.urlBiblioteca,
          urlImagenBiblioteca:this.urlImagenBiblioteca,
          activo:1,
          idEmpleado:parseInt(localStorage.getItem('id')),
        })
        .then(function (response) {
          console.log(response);
          location.reload();
        })
        .then(alert("La Biblioteca se agrego correctamente"))
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
<style></style>
