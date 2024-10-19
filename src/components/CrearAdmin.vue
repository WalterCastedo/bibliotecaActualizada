<template>
  <div class="container row" ref="accionEditar">
    <form v-on:submit.prevent="agregarAdmin" class="col">
      <div class="row align-items-center text-center">
        <div class="form-group col-sm">
          <label for="titulo">Ingrese el nombre del administrador</label>
          <input
            required
            type="text"
            name="nombre"
            v-model="nombreAdmin"
            id="nombreAdmin"
            class="form-control text-center"
            placeholder="Nombre del administrador"
            aria-describedby="nombreAdmin"
          />
          <label for="titulo">Ingrese su nuevo usuario</label>
          <input
            required
            type="text"
            name="usuarioA"
            v-model="usuarioA"
            id="usuarioA"
            class="form-control text-center"
            placeholder="usuario para iniciar sesión"
            aria-describedby="usuarioA"
          />
          <label for="titulo">Ingrese la contraseña</label>
          <input
            required
            type="current-password"
            name="contra1"
            v-model="contra1"
            id="contra1"
            class="form-control text-center"
            placeholder="contraseña"
            aria-describedby="contra1"
          />
          <label for="titulo">Ingrese otra vez la contraseña</label>
          <input
            required
            type="current-password"
            name="contra2"
            v-model="contra2"
            id="contra2"
            class="form-control text-center"
            placeholder="contraseña"
            aria-describedby="contra2"
          />
          <label for="titulo">Ingrese el cargo del administrador</label>
          <input
            required
            type="text"
            name="cargo"
            v-model="cargo"
            id="cargo"
            class="form-control text-center"
            placeholder="cargo"
            aria-describedby="cargo"
          />
         
           
           
           <div  class="form-group col text-center">
        <label>Selecciona una subsede</label>
        <select
          v-model="subSede"
          class="form-control text-center"
        > 
          <option 
            v-for="sub in subsedes"
            :key="sub.id"
            v-bind:value="sub.id"
          >
            {{ sub.subsede }}
          </option>
        </select>
       
      </div>



        </div>
      </div>

      <br />
      <div class="container row" raria-label="">
        <a
          v-if="variable < 0"
          v-on:click.stop="agregarAdmin()"
          class="btn btn-success col-5"
        >
          Agregar nuevo autor
        </a>
        <span class="col-2"></span>
       
        <a v-on:click.stop="volver()" class="btn btn-danger col-5">Cancelar</a>
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
      idAdmin:localStorage.getItem('idSubsede'),
      nombreAdmin: "",
       subsedes: [],
       subSede:localStorage.getItem('idSubsede'),
       usuarioA:'',
       contra1:'',
       contra2:'',
       cargo:'',
       idAdminSubsede:{},
    };
  },
  props: {
    variable: {
      type: Number,
      default: 0,
    },
  },
    
 created: function () {
   this.consultarSubsedes();
  },


  methods: {
   


    agregarAdmin() {
      if (
        this.nombreAdmin.trim() === "" ||
        this.usuarioA.trim() === "" ||
        this.cargo.trim() === "" ||
        this.contra2.trim() === "" ||
        this.contra1.trim() === ""
  ) {
    alert('Por favor, los campos no pueden estar vacio.');
    return}
      if(this.contra1==this.contra2){
axios
        .post(RUTA_SERVIDOR_LIBROS+"/empleados/", {
          nombre: this.nombreAdmin,
          idEmpleado: parseInt(localStorage.getItem('id')),
          activo: 1,
          usuario:this.usuarioA,
          cargo:this.cargo,
          password:this.contra1,
          idSubsede:this.subSede

        })
        .then(function (response) {
            location.reload();
          console.log(response);
          
        })
        .catch(function (error) {
          console.log(error);
        });
      }
      else{
        alert("Las contraseñas no coinciden")
      }
      
    },

   
    volver() {
      location.reload();
    },
  
    


    consultarSubsedes() {
      if(this.idAdmin==1){
 fetch(RUTA_SERVIDOR_ALUMNOS+"/subsedes")
        .then((respuesta) => respuesta.json())
        .then((datosRespuesta) => {
          this.subsedes = [];
          if (typeof datosRespuesta[0].success === "undefined") {
            this.subsedes = datosRespuesta;
      
          }
        })
        .catch(console.log);
    }
    else{
      fetch(RUTA_SERVIDOR_ALUMNOS+"/subsede/"+this.idAdmin)
        .then((respuesta) => respuesta.json())
        .then((datosRespuesta) => {
          this.subsedes = [];
          if (typeof datosRespuesta[0].success === "undefined") {
            this.subsedes = datosRespuesta;
      
          }
        })
        .catch(console.log);
    }


      }
     

  },
};
</script>
