<template>
  <div class="container row" ref="accionEditar">
  
    <form v-on:submit.prevent="agregarEditorial" class="col">
      <div class="row align-items-center">
        <div class="form-group col-sm">
          <label for="titulo">nombre del editorial</label>
          <input
            required
            type="text"
            name="nombre"
            v-model="nombreEditorial"
            id="titulo"
            class="form-control"
            placeholder="Nombre de la editorail"
            aria-describedby="titulo"
          />
        </div>
      </div>

      <br />
      <div class="container row justify-content-md-center" raria-label="">
        <a 
          v-if="variable < 0"
          v-on:click.stop="agregarEditorial()"
          class="btn btn-success col-3"
        >
          Agregar
        </a>
     
      
        <a v-on:click.stop="volver()" class="btn btn-danger col-3">Cancelar</a>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
export const RUTA_SERVIDOR_ALUMNOS = process.env.VUE_APP_RUTA_API_ALUMNOS;
export const RUTA_SERVIDOR_LIBROS = process.env.VUE_APP_RUTA_API_LIBROS;

export default {
  data() {
    return {
      nombreEditorial: "",
    };
  },
  props: {
    variable: {
      type: Number,
      default: 0,
    },
  },

  beforeMount() {},

  methods: {
    // consultarAutor() {
    //   if (this.variable > 0) {

    //     fetch(RUTA_SERVIDOR_LIBROS+"/autor/" + this.variable)
    //       .then((respuesta) => respuesta.json())
    //       .then((datosRespuesta) => {
    //         this.nombreEditorial = datosRespuesta.nombre;
    //       })
    //       .catch(console.log);

    //   }
    // },

    agregarEditorial() {
      if (
    this.nombreEditorial.trim() === "" 
  
  ) {
    alert('Por favor, El campo de nombre no pueden estar vacios.');
    return;
  }
      axios
        .post(RUTA_SERVIDOR_LIBROS+"/editoriales/", {
          nombreEditorial: this.nombreEditorial,
          idEmpleado: parseInt(localStorage.getItem('id')),
          activo: 1,
        })
        .then(function (response) {
          console.log(response);
          location.reload();
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    reset() {
      Object.assign(this.$data, this.$options.data());
      this.consultarEditorial();

      this.consultarCarreras();
    },
    volver() {
      location.reload();
    },
  },
};
</script>
