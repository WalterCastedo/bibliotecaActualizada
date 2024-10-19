<template>
  <div class="container row" ref="accionEditar">
    
    <form v-on:submit.prevent="agregarMaterial" class="col-sm-12">
      <div class="row align-items-center">
        <div class="form-group col-sm">
          <label for="titulo">Titulo *</label>
          <input
            required
            type="text"
            name="titulo"
            v-model="material.titulo"
            id="titulo"
            class="form-control"
            placeholder="Titulo del material"
            aria-describedby="titulo"
          />
        </div>

        <div class="form-group col-sm">
          <label for="autor">Autor *</label>
          <select
            required
            class="form-select"
            v-model="material.idAutor"
            aria-label="Default select example"
            id="autor"
            @change="obterAutor()"
          >
            <option v-for="nautor in autor" :key="nautor.id" :value="nautor.id">
              {{ nautor.nombre }}
            </option>
          </select>
        </div>

        <div class="form-group col-sm">
          <!-- <div class="form-group">
                      <label for="autor">Autor</label> 
                      <input v-model="libro.idAutor" type="text" required
                        class="form-control" name="autor" id="autor" aria-describedby="helpId" placeholder="selecciona el autor"  list="my-list-id">
                      
                      <datalist required  id="my-list-id" >
                    <option  required v-for="nautor in autor " :key="nautor.id" >{{nautor.nombre}}</option>
                    </datalist>
                    </div> -->
          <label for="">Carrera *</label>
          <select
            v-model="material.idCarrera"
            required
            class="form-select"
            name="carrera"
            id="carrera"
          >
            <option
              v-for="carrera in carreras"
              :key="carrera.id"
              :value="carrera.id"
            >
              {{ carrera.nombreCarrera }}
            </option>
          </select>
        </div>
      </div>

      <div class="row align-items-center">
        <div class="form-group col-sm">
          <label for="editorial">Editorial *</label>
          <select
            required
            class="form-select"
            v-model="material.idEditorial"
            aria-label="Default select example"
          >
            <option
              v-for="editorial in editoriales"
              :key="editorial.id"
              :value="editorial.id"
            >
              {{ editorial.nombreEditorial }}
            </option>
          </select>
        </div>

        <div class="form-group col-sm">
          <label for="edicion">Edicion *</label>
          <input
            required
            type="number"
            name="edicion"
            v-model="material.edicion"
            id="edicion"
            class="form-control"
            placeholder="Edicion del material"
            aria-describedby="edicion"
          />
        </div>

        <div class="form-group col-sm">
          <label for="tipo">Tipo *</label>
          <select
            required
            class="form-select"
            v-model="material.idTipomaterial"
            aria-label="Default select example"
          >
            <option
              v-for="tipo in tipos"
              :key="tipo.id"
              :value="tipo.id"
            >
              {{ tipo.tipo}}
            </option>
          </select>
        </div>
      </div>

      <div class="row align-items-center">
        <div class="col-sm">
          <label for="codigo">Código *</label>
          <input
            required
            type="text"
            name="codigo"
            v-model="material.codigo"
            id="codigo"
            class="form-control"
            placeholder="Codigo del material"
            aria-describedby="codigo"
          />
        </div>

        <div class="col-sm">
          <label for="copias">Cópias *</label>
          <input
            required
            type="number"
            name="copias"
            v-model="material.copias"
            id="copias"
            class="form-control"
            placeholder="Cantidad de copias"
            aria-describedby="copias"
          />
        </div>

        <div class="col-sm">
          <label for="copias">Cópias disponibles *</label>
          <input
            required
            type="number"
            name="copias"
            v-model="material.copiasDisponibles"
            id="copias"
            class="form-control"
            placeholder="Cantidad de copias"
            aria-describedby="copias"
          />
        </div>
      </div>

      <div class="form-group col-sm">
  <label for="copias">Url portada</label>
  
    <input
      
      type="text"
      name="copias"
      v-model="material.urlPortada"
      id="url"
      class="form-control"
      placeholder="Imagen portada"
      aria-describedby="url"
    />
  
    <br>
    <img :src="material.urlPortada" alt="" style="width: 180px; height: 250px;">

<div class="col-sm">
          <label for="pdf">agraga un documento pdf</label>
          
          <input
            
            type="file"
            name="pdf"
            enctype="multipart/form-data"
            
            @change="buscarArchivo"
            accept="application/pdf"
          />
        </div>

        <label for="observacion">Observacion</label>
        <textarea
          required
          class="form-control"
          id="observacion"
          v-model="material.observacion"
          rows="4"
          placeholder="Observacion del material"
          aria-describedby="observacion"
        ></textarea>
      </div>
      <br />

      <div class="container row mx-1" align="center" raria-label="">
        <a 
          v-if="variable < 0"
          v-on:click.stop="agregarMaterial()"
          class="btn btn-success col-5"
        >
        Agregar </a>
        <a v-else v-on:click.stop="actualizar()" class="btn btn-success col-5">
          Actualizar        </a>
        <span class="col-2"></span>
        <!-- <a
          v-if="variable < 0"
          v-on:click.stop="reset()"
          class="btn btn-danger col-5"
          >Resetear Formulario</a
        > -->
        <a v-on:click.stop="volver()" class="btn btn-danger col-5"
          >Cancelar</a
        >
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
      pdf:'',
      carreras: [],
      autor: [],
      tipos:[],
      material: {
        titulo: "",
        copias: "",
        copiasDisponibles: "",
        idTipomaterial: 1,
        edicion: "",
        codigo: "",
        observacion: "",
        idAutor: 1,
        idEmpleado: "",
        idSubsede: 0,
        urlPortada: "",
        idCarrera: 1,
        idEditorial: "",
        activo: 1,
      },

      nautor: {
        nombre: "",
        id: 0,
      },
      editoriales: [
        {
          nombreEditorial: "",
        },
      ],
      preNombre: "",
    };
  },
  props: {
    variable: {
      type: Number,
      default: 0,
    },
  },

  beforeMount() {
    this.consultarEditorial();
    this.consultarAutor();
    this.consultarCarreras();
    this.consultarMaterial();
    this.consultarTipo();
    this.resetMaterial()
  },

  methods: {
    resetMaterial() {
      
      this.nombreEditorial= "",
      this.pdf='',
      this.carreras= [],
      this.autor= [],
      this.tipos=[],
      this.material= {
        titulo: "",
        copias: "",
        copiasDisponibles: "",
        idTipomaterial: 1,
        edicion: "",
        codigo: "",
        observacion: "",
        idAutor: 1,
        idEmpleado: "",
        idSubsede: 0,
        urlPortada: "",
        idCarrera: 1,
        idEditorial: "",
        activo: 1,
      };
    },
    consultarMaterial() {
      if (this.variable > 0) {
        fetch(RUTA_SERVIDOR_LIBROS+"/materiales/" + this.variable)
          .then((respuesta) => respuesta.json())
          .then((datosRespuesta) => {
            this.material = [];
            this.material.id = datosRespuesta.id;
            this.material.titulo = datosRespuesta.titulo;
            this.material.copias = datosRespuesta.copias;
            this.material.copiasDisponibles = datosRespuesta.copiasDisponibles;
            this.material.idTipomaterial = datosRespuesta.idTipomaterial;
            this.material.edicion = datosRespuesta.edicion;
            this.material.codigo = datosRespuesta.codigo;
            this.material.observacion = datosRespuesta.observacion;
            this.material.idAutor = datosRespuesta.idAutor;
            this.material.idEmpleado = datosRespuesta.idEmpleado;
            this.material.idCarrera = datosRespuesta.idCarrera;
            this.material.urlPortada = datosRespuesta.urlPortada;
            this.material.idEditorial = datosRespuesta.idEditorial;
            this.material.activo = datosRespuesta.activo;
            this.obterAutor();
          })
          .catch(console.log);
      } else {
        this.consultarEditorial();
        this.consultarAutor();
        this.consultarCarreras();
      }
    },

    agregarMaterial() {
      if(this.material.copias<this.material.copiasDisponibles) {
    alert('Por favor, La cantidad de cópias disponibles no puede ser mayor a la cantidad de copías.');
    return;
  }
  if(this.material.copias<0 || this.material.copiasDisponibles<0) {
    alert('Por favor, La cantidad de cópias disponibles y la cantidad de copías no pueden ser negativas.');
    return;
  }
      if (
    this.material.titulo.trim() === "" ||
    this.material.copias === "" ||
    this.material.copiasDisponibles === "" ||
    this.material.idTipomaterial === "" ||
    this.material.edicion === "" ||
    this.material.codigo.trim() === "" ||
    this.material.idAutor === "" ||
    this.material.idEditorial === "" ||
    this.material.idCarrera === ""
  
  ) {
    alert('Por favor, complete todos los campos obligatorios marcados con * antes de agregar material.');
    return;
  }

      let formData = new FormData();
      formData.append("titulo", this.material.titulo);
      formData.append("copias", this.material.copias);
      formData.append("copiasDisponibles", this.material.copiasDisponibles);
      formData.append("idTipomaterial", this.material.idTipomaterial);
      formData.append("edicion", this.material.edicion);
      formData.append("codigo", this.material.codigo);
      formData.append("observacion", this.material.observacion);
      formData.append("idAutor", this.material.idAutor);
      formData.append("idEmpleado", localStorage.getItem('id'));
      formData.append("idCarrera", this.material.idCarrera);
      formData.append("urlPortada", this.material.urlPortada);
      formData.append("idEditorial", this.material.idEditorial);
      formData.append("activo", this.material.activo);
      formData.append("documento", this.pdf);
      formData.append("idSubsede", localStorage.getItem("idSubsede"));
      axios
        .post(RUTA_SERVIDOR_LIBROS+"/materiales/", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(function (response) {
          location.reload();
        }) 
        .then(alert("El material se creó correctamente"))
        .catch(function (error) {
          console.log(error);
        });
      
    },

    actualizar() {
      if(this.material.copias<this.material.copiasDisponibles) {
    alert('Por favor, La cantidad de cópias disponibles no puede ser mayor a la cantidad de cópias.');
    return;
  }
  if(this.material.copias<0 || this.material.copiasDisponibles<0) {
    alert('Por favor, La cantidad de cópias disponibles y la cantidad de cópias no pueden ser negativas.');
    return;
  }
      if (
    this.material.titulo.trim() === "" ||
    this.material.copias === "" ||
    this.material.copiasDisponibles === "" ||
    this.material.idTipomaterial === "" ||
    this.material.edicion === "" ||
    this.material.codigo.trim() === "" ||
    this.material.idAutor === "" ||
    this.material.idEditorial === "" ||
    this.material.idCarrera === ""
  
  ) {
    alert('Por favor, complete todos los campos obligatorios marcados con * antes de actualizar el material.');
    return;
  }
  const confirmacion = window.confirm(
    '¿Estás seguro de que deseas actualizar estos datos?'
  );

  if (confirmacion) {
      axios
        .put(RUTA_SERVIDOR_LIBROS+"/materiales/" + this.material.id, {
          titulo: this.material.titulo,
          copias: this.material.copias,
          copiasDisponibles: this.material.copiasDisponibles,
          idTipomaterial: this.material.idTipomaterial,
          edicion: this.material.edicion,
          codigo: this.material.codigo,
          idAutor: parseInt(this.material.idAutor),
          idEmpleado: this.material.idEmpleado,
          idSubsede: localStorage.getItem("idSubsede"),
          idEditorial: parseInt(this.material.idEditorial),
          idCarrera: parseInt(this.material.idCarrera),
          urlPortada: this.material.urlPortada.trim(),
          observacion: this.material.observacion,
          activo: 1,
        })
        .then(function (response) {
          location.reload();
        })  .then(alert("El material se actualizo correctamente"))
        .catch(function (error) {
          console.log(error);
          // console.log(this.material);
        });}
    },
    consultarTipo() {
      fetch(RUTA_SERVIDOR_LIBROS+"/tipos/")
        .then((respuesta) => respuesta.json())
        .then((datosRespuesta) => {
          if (typeof datosRespuesta[0].success === "undefined") {
            datosRespuesta.sort((a, b) => {
              if (a.tipo.toUpperCase() == b.tipo.toUpperCase()) {
                return 0;
              }
              if (a.tipo.toUpperCase() > b.tipo.toUpperCase()) {
                return 1;
              }
              if (a.tipo.toUpperCase() < b.tipo.toUpperCase()) {
                return -1;
              }
            });
            this.tipos = datosRespuesta;
         
            console.log(this.tipos)
           
          }
        })
        .catch(console.log);
    },
    consultarAutor() {
      fetch(RUTA_SERVIDOR_LIBROS+"/autor/")
        .then((respuesta) => respuesta.json())
        .then((datosRespuesta) => {
          if (typeof datosRespuesta[0].success === "undefined") {
            datosRespuesta.sort((a, b) => {
              if (a.nombre.toUpperCase() == b.nombre.toUpperCase()) {
                return 0;
              }
              if (a.nombre.toUpperCase() > b.nombre.toUpperCase()) {
                return 1;
              }
              if (a.nombre.toUpperCase() < b.nombre.toUpperCase()) {
                return -1;
              }
            });
            this.autor = datosRespuesta;
            this.material.idAutor = this.autor[0].id;
            this.material.idEditorial = this.editoriales[0].id;
          }
        })
        .catch(console.log);
    },
    consultarCarreras() {
      fetch(RUTA_SERVIDOR_LIBROS+"/carreras")
        .then((respuesta) => respuesta.json())
        .then((datosRespuesta) => {
          this.carreras = [];
          if (typeof datosRespuesta[0].success === "undefined") {
            this.carreras = datosRespuesta;
          }
        })
        .catch(console.log);
    },
    consultarEditorial() {
      fetch(RUTA_SERVIDOR_LIBROS+"/editoriales/")
        .then((respuesta) => respuesta.json())
        .then((datosRespuesta) => {
          if (typeof datosRespuesta[0].success === "undefined") {
            datosRespuesta.sort((a, b) => {
              if (
                a.nombreEditorial.toUpperCase() ==
                b.nombreEditorial.toUpperCase()
              ) {
                return 0;
              }
              if (
                a.nombreEditorial.toUpperCase() >
                b.nombreEditorial.toUpperCase()
              ) {
                return 1;
              }
              if (
                a.nombreEditorial.toUpperCase() <
                b.nombreEditorial.toUpperCase()
              ) {
                return -1;
              }
            });
            this.editoriales = datosRespuesta;
          }
        })
        .catch(console.log);
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
        (x) => x.id == this.material.idAutor
      ).nombre;
    },
    Previa() {
      let index = 0;
      while (index != this.material.idAutor) {
        if (this.material.idAutor == this.autor[index].id) {
          this.preNombre = this.autor[index].nombre;
          index = this.material.idAutor;
        } else {
          index++;
        }
      }
    },

    buscarArchivo(event){
      this.pdf= event.target.files[0];
      
    },
  



  },
};
</script>
