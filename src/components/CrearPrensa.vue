<template>
  <div
    class="container mx-auto d-flex justify-content-center align-items-center row"
  >
    <form v-on:submit.prevent="agregarPrensa" class="row">
      <div class="form-group col-6 col-sx-12">
        <div class="">
          <label for="titulo">Nombre de la medio de prensa digital</label>
          <br />
          <input
            required
            type="text"
            name="nombre"
            v-model="nombrePrensa"
            id="titulo"
            class="form-control mx-auto "
            placeholder="Nombre"
            aria-describedby="titulo"
          />
        </div>
        <br>
        <div class="">
          <label for="titulo">Url del medio de prensa (empezar con www)</label>

          <input
            required
            type="text"
            name="urlPrensa"
            v-model="urlPrensa"
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
            name="urlPrensa"
            v-model="urlImagenPrensa"
            id="titulo"
            class="form-control mx-auto "
            placeholder="Enlace de la imagen de la portada "
            aria-describedby="titulo"
          />
        </div>
      </div>
      
      <div  class="col-md-6 mx-auto col-sx-12 border" style="width: 300px; height: 300px; ">
        
        <img class="mx-auto d-block" style="width: 100%;" :src="urlImagenPrensa" alt="">
      </div>

      <br />

      <div class="row justify-content-center">
        <a
          v-if="variable < 0"
          v-on:click.stop="agregarPrensa()"
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
      nombrePrensa: "",
      urlImagenPrensa:"",
      urlPrensa:""
    };
  },
  props: {
    variable: {
      type: Number,
      default: 0,
    },
  },

  methods: {
    agregarPrensa() {
      if (
    this.nombrePrensa.trim() === "" ||
    this.urlPrensa.trim() === "" ||
    this.urlImagenPrensa.trim() === ""
  ) {
    alert("Por favor, complete todos los campos antes de continuar.");
    return;
  }
      axios
        .post(RUTA_SERVIDOR_LIBROS + "/prensa/", {
          nombre: this.nombrePrensa,
          urlPrensa:this.urlPrensa,
          urlImagenPrensa:this.urlImagenPrensa,
          activo:1,
          idEmpleado:parseInt(localStorage.getItem('id')),
        })
        .then(function (response) {
          console.log(response);
          location.reload();
        })
        .then(alert("El Prensa de material se agrego correctamente"))
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
