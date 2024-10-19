<template>
  <div>
    <div class="px-5">
      <h1>Derechos</h1>
      <div v-if="acceso == 2">

        <textarea
        name="
        "
        id=""
        cols="30"
        rows="10"
        style="width: 100%"
        v-model="datos.derechos"
        >
     
      </textarea>
    
      </div>
      <div v-else>
        <pre style="overflow: auto; white-space: pre-wrap; text-indent: 0;">

       {{datos.derechos}}
        </pre>
      </div>
    </div>
    <br>
    <div class="px-5">
      <h1>Deberes</h1>
      <div v-if="acceso == 2">

        <textarea
        name="
        "
        id=""
        cols="30"
        rows="10"
        style="width: 100%"
        v-model="datos.deberes"
        ></textarea>
        <br>
        <br>
        <div @click="actualizar()" class="btn btn-info">Guardar Cambios</div>
      </div>
      <div v-else>
        <pre style="overflow: auto; white-space: pre-wrap; text-indent: 0;">

         {{datos.deberes }}
        </pre>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export const RUTA_SERVIDOR_LIBROS = process.env.VUE_APP_RUTA_API_LIBROS
export default {
  name: "Derechos",

  data() {
    return {
      acceso: localStorage.getItem("acceso"),
      datos:{
            derechos:"",
            deberes:"",
      }
     
    }
  },
  mounted() {
    this.obtenerDatos();
  },

  methods: {

      obtenerDatos(){
        fetch(RUTA_SERVIDOR_LIBROS+"/acerca")
        .then((respuesta) => respuesta.json())
        .then((datosRespuesta) => {
          console.log(datosRespuesta)
          this.datos=datosRespuesta[0]
            })
          
        .catch(console.log);
      },



      actualizar(){

        if (
          this.datos.derechos.trim() === "" ||
          this.datos.deberes.trim() === ""
  
  ) {
    alert('Por favor, los campos no pueden estar vacios.');
    return;
  }

        const confirmacion = window.confirm(
    '¿Estás seguro de que deseas actualizar estos datos?'
  );

  if (confirmacion) {
        axios
        .put(RUTA_SERVIDOR_LIBROS+"/acerca/" + 1, {
          derechos:this.datos.derechos,
          deberes:this.datos.deberes
        })
        .then(function (response) {
          console.log(response);
          location.reload();
        })
        .then(alert("El tipo de material bibliotecario se actualizo correctamente"))
        .catch(function (error) {
          console.log(error);
          // console.log(this.libro);
        });}
      },
     
  }
  
}
</script>