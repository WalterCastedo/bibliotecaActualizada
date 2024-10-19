<template>
  <div class="container row" ref="accionEditar">
   
    <form v-on:submit.prevent="agregarAutor" class="col">
      <div class="row align-items-center">
        <div class="form-group col-sm">
          <label for="titulo">nombre del autor</label>
          <input
            required
            type="text"
            name="nombre"
            v-model="nombreAutor"
            id="titulo"
            class="form-control"
            placeholder="Nombre del autor"
            aria-describedby="titulo"
          />
        </div>
      </div>

      <br />
      <div class="container row justify-content-md-center" raria-label="">
        <a
          v-if="variable < 0"
          v-on:click.stop="agregarAutor()"
          class="btn btn-success col-3"
        >
          Agregar nuevo autor
        </a>
     
        
        <a v-on:click.stop="volver()" class="btn btn-danger col-3">Cancelar</a>
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
      nombreAutor: "",
    };
  },
  props: {
    variable: {
      type: Number,
      default: 0,
    },
  },



  methods: {
    consultarAutor() {
      if (this.variable > 0) {
        fetch(RUTA_SERVIDOR_LIBROS+"/autor/" + this.variable)
          .then((respuesta) => respuesta.json())
          .then((datosRespuesta) => {
            this.nombreAutor = datosRespuesta.nombre;
          })
          .catch(console.log);
      }
    },

    agregarAutor() {
      if (
    this.nombreAutor.trim() === "" 
  
  ) {
    alert('Por favor, El campo de nombre del autor no pueden estar vacios.');
    return;
  }

      axios
        .post(RUTA_SERVIDOR_LIBROS+"/autor/", {
          nombre: this.nombreAutor.toUpperCase(),
          idEmpleado: parseInt(localStorage.getItem('id')),
          activo: 1,
        })
        .then(function (response) {
          console.log(response);
          location.reload();
        })
        .then(alert("El autor se agrego correctamente"))
        .catch(function (error) {
          console.log(error);
        });
    },

    reset() {
      Object.assign(this.$data, this.$options.data());
      this.consultarEditorial();
      this.consultarAutor();
      this.consultarCarreras();
    },
    volver() {
      location.reload();
    },
    obterAutor() {
      this.preNombre = this.autor.find(
        (x) => x.id == this.libro.idAutor
      ).nombre;
    },
    Previa() {
      let index = 0;
      while (index != this.libro.idAutor) {
        if (this.libro.idAutor == this.autor[index].id) {
          this.preNombre = this.autor[index].nombre;
          index = this.libro.idAutor;
        } else {
          index++;
        }
      }
    },
  },
};
</script>
