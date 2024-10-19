<template>
  <div>
    <div class="px-5">
      <h1>Servicios</h1>
      <div v-if="acceso == 2">

        <textarea
        name="
        "
        id=""
        cols="30"
        rows="20"
        style="width: 100%"
        v-model="datos.servicios"
        >
     
      </textarea>
      <br><br>
      <div @click="actualizar()" class="btn btn-info">Guardar Cambios</div>
      </div>
      <div v-else>
        <pre style="overflow: auto; white-space: pre-wrap; text-indent: 0;">

       {{datos.servicios}}
        </pre>
      </div>
    </div>
    <br>
    
  </div>
</template>
<script>
import axios from "axios";
export const RUTA_SERVIDOR_LIBROS = process.env.VUE_APP_RUTA_API_LIBROS
export default {
  name: "Servicios",

  data() {
    return {
      acceso: localStorage.getItem("acceso"),
      datos:{
            servicios:"",
      
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
          this.datos.servicios.trim() === "" 
  
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
          servicios:this.datos.servicios,
         
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