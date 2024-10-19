<template>
  
  <div class="align-items-center todoFondo">
    <transition name="fade">
      <div v-if="isLoading" class="loading-spinner">
        <div class="spinner"></div>
      </div>
    </transition>
      
    <div class="row rowS">
      <div class="form-group col-sm-4">
        <label for="">Titulo / autor</label>
        <input
          v-on:keyup="filtrarMateriales()"
          v-model="nombreMaterial"
          type="text"
          class="form-control"
          placeholder="Titulo o Autor"
        />
      </div>

      <div class="form-group col-sm-4">
        <label>Selecciona una carrera</label>
        <select
          v-model="materia"
          @change="cambiaC(materia)"
          class="form-control"
        >
          <option
            v-for="carrera in carreras"
            :key="carrera.id"
            v-bind:value="carrera.id"
          >
            {{ carrera.nombreCarrera }}
          </option>
        </select>
      </div>

      <div class="col-sm-2" @change="cambiaC(materia)">
        <b-form-group label="Formato: " v-slot="{ ariaDescribedby }">
          <b-form-radio
            v-model="radioPdf"
            :aria-describedby="ariaDescribedby"
            name="some-radios"
            value="0"
            >Material</b-form-radio
          >
          <b-form-radio
            v-model="radioPdf"
            :aria-describedby="ariaDescribedby"
            name="some-radios"
            value="1"
            >PDF</b-form-radio
          >
        </b-form-group>
      </div>

      <div class="col-sm-2">
        Tipo:
        <br/>
       
        <b-form-checkbox
          v-for="tipo in tipos"
          :key="tipo.id"
          v-model="tipo.stado"
          :id="`checkbox-${tipo.id}`"
          :name="`checkbox-${tipo.tipo}`"
          value="accepted"
          unchecked-value="not_accepted"
          @change="filtrarMateriales"
        >
          {{ tipo.tipo }}
        </b-form-checkbox>
      </div>
    </div>
    <br />
    <label>Registros por página</label>
    <select v-model="elementosPorPagina" @change="cambiarRegistrosPorPagina">
      <option value="5" selected>5</option>
      <option value="10">10</option>
      <option value="20">20</option>
      <option value="999999">Todos</option>
    </select>

    <button v-if="acceso == 2" type="button" class="btn" @click="exportPdf()">
      <img
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAqCAYAAADFw8lbAAAACXBIWXMAAAsTAAALEwEAmpwYAAAChklEQVR4nO2Z22vTcBTH+08UrcpASE1SrQ1ug9i5sU1l4pQpE2XTubeBoOANxSdFUcELClNURGhZH0TFMh+com4Im+iDQ0HmEPVBENKbcfSS3tav/H5j6VYzy1zSVsmBz0M5/NJPT8/v5JfWYjGjROFkWafLzvXojcA4dugq6mK4g4KdhyEw3IV/Q9TOw8VwF3UXvSNUYaB6yYIY9t6G/8QhrF3B5WXt/HldRUdqbJBE64JIjY4gfvcWBqttcM+UZfhLFSkqiVZ9ZY0UlfSUNVpU0pAVGP5yRYpKmrLcybKLKk8fINzV9Bsvt9WhlnVMyw6VXfRPsblxQ2WIBltXIrR9zZy0OCqkolIRWljWFIVZ0fmE2aOiuZl4dTyFO9ZBedGvEvNdQ6i9Rt1UyjO/mks88mHi9H4E6peq+fDe5lnrCfLxbv3H0499bfQuQm6FRCTzdRy5eBSh9lqax2QWqbfDSPi9SL56jlxSQebTBwQ3sTQvH+mcWv/4Hl1PkA93GCcaahPoa1KtbOA7Yp4rqujEmQP5Cu5yY1KOQHlyf5ZocKPd2IFfKCq5FyH77QvivuuaopJoRbT3FHKpJP1Q06JkfaB5OYVcwzDRmPcqojfOIvV6EMikae/NJSof65qq4pZVqujMCHfWGyea+TyG9Md3dDNEelpVKWhV9OY55JQEpDqbKkquE+leTwk0LCvBV18ACkSJSC76Ewm/p8w9qiGaHhullU6/f0PbgpxDaS+WUjS0U6SjR+uNCImHHponxPp6IR/dA8m9OD8Fdjcg0d+HQGOVecyDeXAWzRO+1XxmEhY6nvT42XGgCE16zNESM/R/ijoN+rPBVYTVDLt1XqJmWP4ufgGVhSpkgRcCwgAAAABJRU5ErkJggg=="
      />
    </button>
    <button v-if="acceso == 2" type="button" class="btn" @click="exportExcel()">
      <img
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAACTUlEQVR4nO2ZW0sUYRjH5xvkRcieRnfNPZhtuTNBalgNaemaRUWQ6a5p2slq14Uyd6edGTpQKBFhRQXiTV0pXnQhEmLuTF/E+h7/eN+VocBK2Tks8v7hf/E+8w48v3kON8NxTExMu1/id61X1NWfoqGhUtc+Tc45DiDo2g8rkieukSXUFKTnjgKIFiVvAjgNIdoB4CSEaBeA7BCErQCyAxC2A8g2QzgCINsI4RiAbBOElQB7n3T/F2JPQVKrFqBpKbMtiNoXfXNVCbATcwxgU6wCBmuhyrRrW2jfs0vgJ07hwMIEPTd/Gqfn2MdRxBey4DOd2D9/8493Di7lUD/VC//YMfivH0d45op7APHFLDypVgQLfRB0FYG7J2liiVUZzZ/vwDN4BLH3I+Z9csc32kEdfTOE6OwQwi8H3F2jDdoFChGe6acJN83fKFdjC4CWr3ka4zNdENaK7rcQTWolD+9wO4Won0ya8a0AiEm1SNw31oHI6xTEkuIuwKEvD+BJt8Gbbit/2ZL6TwBxXaEx/60T9HlIPusigK6i7n4PfMNHEZlNlxN+e/XvAOtK2WQevhURuC3Bm2qls+EKQOzDNZpk5NWgOcQEJrEyZQLU5U4jpJ2nJpspMC6hcbofjdOXaeX4bJdLFSgpCBXPIZg/g8TaI3ONBieTiL4bQXwxR2fid5MVSoaerFf+XicaHl9Ey/JDd2fATnMMYFOsAgZrocrEWshgLVSZWAsZrIWq5xfTdi0Y6gZnlQ7rWo+TEIKhbiRKSrdlAExMTFzV6hfz8wpqDZBppQAAAABJRU5ErkJggg=="
      />
    </button>
    <br v-if="acceso == 1" />
    <br v-if="acceso == 1" />
    <nav aria-label="Page navigation example" class="pagination-nav">
      <ul align="center" class="pagination">
        <li class="page-item" v-on:click="paginaPrevia()">
          <a class="page-link" href="#">anterior</a>
        </li>
        <li
          v-for="pagina in totalPaginas()"
          :key="pagina"
          class="page-item"
          v-bind:class="activo(pagina)"
        >
          <a class="page-link" href="#" v-on:click="ObtenerDatosPag(pagina)">{{
            pagina
          }}</a>
        </li>
        <li class="page-item" v-on:click="paginaSiguiente()">
          <a class="page-link" href="#">siguiente</a>
        </li>
      </ul>
    </nav>

    <div class="estudiante" v-if="acceso == 1">
      <div class="carrusel row">
        <div
          align="center"
          class="listado col-6 col-lg-3 col-md-4 col-xl-3"
          v-for="material in datosPaginados"
          :key="material.id"
        >
          <div v-if="material.documento == null">
            <div
              class="icon-container-2"
              v-bind:style="{
                backgroundImage: 'url(' + material.urlPortada + ')',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }"
              v-b-modal.modal-lg
              @click="
                obtenerMaterial(
                  material.id,
                  material.titulo,

                  material.nombre,
                  editoriales[[material.idEditorial] - 1].nombreEditorial,
                  material.edicion,
                  material.urlPortada,
                  material.tipo
                )
              "
            >
              <div v-if="acceso == 2">
                <div class="btn-material-1">
                  <div
                    align="center"
                    class="btn-material"
                    @click="Enviar(material.id)"
                  >
                    ✍🏻
                  </div>
                </div>
                <div class="btn-circle-2">
                  <div
                    v-on:click="confirmarEliminarSolicitud(material)"
                    class="btn-circle"
                  >
                    ❌
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div v-else>
            <div
              class="icon-container-2"
              v-bind:style="{
                backgroundImage: 'url(' + material.urlPortada + ')',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }"
              @click="redireccionaarPdf(material.documento)"
            >
              <div v-if="acceso == 2">
                <div class="btn-material-1">
                  <div
                    align="center"
                    class="btn-material"
                    @click="Enviar(material.id)"
                  >
                    ✍🏻
                  </div>
                </div>
                <div class="btn-circle-2">
                  <div
                    v-on:click="confirmarEliminarSolicitud(material)"
                    class="btn-circle"
                  >
                    ❌
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="titulo">{{ material.titulo }}</div>
          <div class="autor">
            <img
              src="https://img.icons8.com/ios-filled/18/000000/guest-male--v1.png"
            />
            {{ material.nombre }}
            <br />
            {{ material.tipo }}
            <div style="font-size: 100%">
              <div class="editorial" style="font-size: 100%"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="estudiante" v-if="acceso == 2">
      <div class="d-md-block table-responsive table-sm small border">
        <table class="table text-center table-striped tableMb" id="">
          <thead class="thMb">
            <tr class="trMb">
              <!-- <th>ID</th> -->
              <th>TITULO</th>
              <th>TIPO</th>
              <th>AUTOR</th>
              <th>EDITORIAL</th>
              <th>EDICION</th>
              <th>CODIGO</th>
              <th>COPIAS</th>
              <th>DISPONIBLES</th>
              <th>ACCION</th>
            </tr>
          </thead>
          <tbody>
            <tr
              class="trMb"
              v-for="material in datosPaginados"
              :key="material.id"
            >
              <td data-titulo="Titulo: ">{{ material.titulo }}</td>
              <td data-titulo="Tipo: ">{{ material.tipo }}</td>
              <td data-titulo="Autor">{{ material.nombre }}</td>
              <td data-titulo="Editorial: ">
                {{ editoriales[[material.idEditorial] - 1].nombreEditorial }}
              </td>
              <td data-titulo="Edición: ">{{ material.edicion }}</td>
              <td data-titulo="Codigo: ">{{ material.codigo }}</td>
              <td data-titulo="Copias: ">{{ material.copias }}</td>
              <td data-titulo="Disponibles: ">
                {{ material.copiasDisponibles }}
              </td>
              <td data-titulo="Accion: ">
                <div class="btn-group" role="group" aria-label="">
                  <div v-if="material.documento != null">
                    <button
                      @click="redireccionaarPdf(material.documento)"
                      class="btn btn-info"
                    >
                      Ver PDF
                    </button>
                  </div>
                  <div v-else>
                    <button
                      v-b-modal.modal-lg
                      @click="
                        obtenerMaterial(
                          material.id,
                          material.titulo,
                          material.nombre,
                          editoriales[[material.idEditorial] - 1]
                            .nombreEditorial,
                          material.edicion,
                          material.urlPortada,
                          material.tipo
                        )
                      "
                      class="btn btn-info"
                    >
                      <font-awesome-icon
                        icon="fa-solid fa-book"
                        style="color: white"
                        class="iconos"
                      />
                    </button>
                  </div>

                  <button
                    v-b-modal.modal-center
                    @click="Enviar(material.id)"
                    class="btn btn-success"
                  >
                    <font-awesome-icon icon="fa-solid fa-pen-to-square" />
                  </button>

                  <button
                    type="button"
                    @click="confirmarEliminarSolicitud(material)"
                    class="btn btn-danger"
                  >
                    <font-awesome-icon icon="fa-solid fa-trash-can" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <b-modal
      id="modal-lg"
      size="lg"
      centered
      title="Solicitud de prestamo"
      hide-footer
      hide-close-butto
      ref="modalCenter"
    >
    <template #modal-title>
    <button  @click="closeModal" class="btn btn-sm btn-danger close-button">X</button>
    <h5 class="modal-title">Prestamo de material</h5>
  </template>
      <modalPrestamo v-bind:material="this.prestamoMaterial">
       </modalPrestamo>
    </b-modal>

    <div class="estudiante" v-if="acceso == 2" style="display: none">
      <div class="d-none d-sm-none d-md-block table-responsive table-sm small">
        <table class="table" id="tablaMateriales">
          <thead>
            <tr>
              <th>ID</th>
              <th>TITULO</th>
              <th>AUTOR</th>
              <th>EDITORIAL</th>
              <th>EDICION</th>
              <th>CODIGO</th>
              <th>COPIAS</th>
              <th>DISPONIBLES</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(material, index) in dataToExport" :key="material.id">
              <td>{{ index + 1 }}</td>
              <td>{{ material.titulo }}</td>
              <td>{{ material.tipo }}</td>
              <td>{{ material.nombre }}</td>
              <td>
                {{ editoriales[[material.idEditorial] - 1].nombreEditorial }}
              </td>
              <td>{{ material.edicion }}</td>
              <td>{{ material.codigo }}</td>
              <td>{{ material.copias }}</td>
              <td>{{ material.copiasDisponibles }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
// import { Bar } from 'vue-chartjs'
// import { Chart as ChartJS,Title, ArcElement, Tooltip, Legend,BarElement, CategoryScale, LinearScale } from 'chart.js'
// import { Doughnut } from 'vue-chartjs'
// ChartJS.register(Title, ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
// Import component
import Loading from "vue-loading-overlay";
// Import stylesheet
import "vue-loading-overlay/dist/vue-loading.css";
// import * as XLSX from 'xlsx'
import * as saveAs from "file-saver";
import listar from "@/views/MaterialesView.vue";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
// import { Carousel, Slide } from 'vue-carousel';
import modalPrestamo from "@/components/modalPrestamo.vue";
import axios from "axios";
// import CrearLibro from '@/components/CrearLibro.vue'
export const RUTA_SERVIDOR_ALUMNOS = process.env.VUE_APP_RUTA_API_ALUMNOS;
export const RUTA_SERVIDOR_LIBROS = process.env.VUE_APP_RUTA_API_LIBROS;

export default {
  name: "ListarMaterial",

  components: {
    // Bar,
    // Doughnut,
    modalPrestamo,
    Loading,
  },

  data() {
    return {
      isLoading: true,
      fullPage: true,
      dataToExport: [],
      prestamoMaterial: {
        id: 0,
        nombreMaterial: "",
        autor: "",
        editorial: "",
        edicion: "",
        urlPortada: "",
      },
      tipos: [],
      subsede: localStorage.getItem("idSubsede"),
      totalMateriales: [],
      Materiales: [],
      autor: [],
      carreras: [],
      materia: 1,
      nombreMaterial: "",
      nombreAutor: 1,
      editoriales: [],
      elementosPorPagina: 10,
      datosPaginados: [],
      paginaActual: 1,
      acceso: localStorage.getItem("acceso"),

      radioPdf: 0,
    };
  },

  created: async function () {
    this.consultarAutor();
    await this.consultarEditorial();
    this.consultarTipo();

  },
  async mounted() {
    await this.consultarCarreras();
    // this.consultarCantidad();
    this.ObtenerDatosPag(1);
   
  },

  methods: {
    cambiarRegistrosPorPagina() {
      this.paginaActual = 1;
      this.ObtenerDatosPag(this.paginaActual);
    },
    redireccionaarPdf(pdf) {
      var a = document.createElement("a");
      a.target = "_blank";
      a.href = "http://192.168.1.134:8082/storage/documentos/" + pdf;
      a.click();
    },

    onCancel() {
      console.log("usuario cancelo la carga.");
    },

   
    consultarTipo() {
      return fetch(RUTA_SERVIDOR_LIBROS + "/tipos/")
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
            datosRespuesta.forEach((tipo) => {
          tipo.stado= "accepted"; // Puedes establecer el valor inicial como falso
        });
            this.tipos = datosRespuesta;
          }
        })
        .catch(console.log);
    },
    consultarMaterlales() {
      // Llama a consultarTipo() para obtener los tipos antes de consultar los materiales.
      return this.consultarTipo().then(() => {
        return fetch(
          RUTA_SERVIDOR_LIBROS + "/materialesSubsede/" + this.subsede
        )
          .then((respuesta) => respuesta.json())
          .then((datosRespuesta) => {
            this.Materiales = [];
            if (typeof datosRespuesta[0].success === "undefined") {
              datosRespuesta.sort((a, b) => {
                if (a.titulo.toUpperCase() == b.titulo.toUpperCase()) {
                  return 0;
                }
                if (a.titulo.toUpperCase() > b.titulo.toUpperCase()) {
                  return 1;
                }
                if (a.titulo.toUpperCase() < b.titulo.toUpperCase()) {
                  return -1;
                }
              });
              this.Materiales = datosRespuesta;

              this.Materiales.forEach((material) => {
                const tipoAsociado = this.tipos.find(
                  (tipo) => tipo.id == material.idTipomaterial
                );
                if (tipoAsociado) {
                  material.tipo = tipoAsociado.tipo;
                }
              });
              console.log(this.Materiales);

              for (let index = 0; index < this.Materiales.length; index++) {
                for (let index2 = 0; index2 < this.autor.length; index2++) {
                  if (this.autor[index2].id == this.Materiales[index].idAutor) {
                    var nombreAutor = this.autor[index2].nombre;
                    this.Materiales[index].nombre = nombreAutor;
                  }
                }
              }

              this.filtrarMateriales();
              this.filtrarArchivos();
            }
          })
          .catch(console.log);
      });
    },
    filtrarArchivos() {
      this.dataToExport = [];
      for (let index = 0; index < this.Materiales.length; index++) {
        if (
          this.Materiales[index].idCarrera === this.materia &&
          this.Materiales[index].activo === 1 &&
          this.Materiales[index].documento != null &&
          this.radioPdf == 1
        ) {
          this.dataToExport = this.dataToExport.concat(this.Materiales[index]);
        } else {
          if (
            this.Materiales[index].idCarrera === this.materia &&
            this.Materiales[index].activo === 1 &&
            this.Materiales[index].documento == null &&
            this.radioPdf == 0
          ) {
            this.dataToExport = this.dataToExport.concat(
              this.Materiales[index]
            );
          }
        }
      }
      this.isLoading = false;
    },

    filtrarMateriales() {
      this.totalMateriales = [];
      for (let index = 0; index < this.Materiales.length; index++) {
        if (
          this.Materiales[index].idCarrera === this.materia &&
          this.Materiales[index].activo === 1 &&
          (this.Materiales[index].titulo
            .toUpperCase()
            .includes(this.nombreMaterial.toUpperCase()) ||
            this.Materiales[index].nombre
              .toUpperCase()
              .includes(this.nombreMaterial.toUpperCase())) &&
          this.Materiales[index].documento != null &&
          this.radioPdf == 1
        ) {
         
          if (this.tipos.some(tipo => tipo.stado == "accepted" && tipo.id == this.Materiales[index].idTipomaterial)) {
        this.totalMateriales = this.totalMateriales.concat(this.Materiales[index]);
        this.ObtenerDatosPag(1);
          }
        
        } else {
          if (
            this.Materiales[index].idCarrera === this.materia &&
            this.Materiales[index].activo === 1 &&
            (this.Materiales[index].titulo
              .toUpperCase()
              .includes(this.nombreMaterial.toUpperCase()) ||
              this.Materiales[index].nombre
                .toUpperCase()
                .includes(this.nombreMaterial.toUpperCase())) &&
            this.Materiales[index].documento == null &&
            this.radioPdf == 0
          ) {
            
            if (this.tipos.some(tipo => tipo.stado == "accepted" && tipo.id == this.Materiales[index].idTipomaterial)) {
        this.totalMateriales = this.totalMateriales.concat(this.Materiales[index]);
        this.ObtenerDatosPag(1);
          }
          

    
          }
        }
      }

      if (this.totalMateriales.length === 0) {
        this.paginaPrevia();
        //this.paginaActual=0;
      }
    },

    consultarAutor() {
      fetch(RUTA_SERVIDOR_LIBROS + "/autor/")
        .then((respuesta) => respuesta.json())
        .then((datosRespuesta) => {
          this.autor = datosRespuesta;

          this.consultarMaterlales();
        })
        .catch(console.log);
    },

    consultarEditorial() {
      fetch(RUTA_SERVIDOR_LIBROS + "/editoriales/")
        .then((respuesta) => respuesta.json())
        .then((datosRespuesta) => {
          if (typeof datosRespuesta[0].success === "undefined") {
            this.editoriales = datosRespuesta;
          }
        })
        .catch(console.log);
    },

    Enviar(id) {
      this.$emit("recibiendo", id);
      listar.editar();
    },
    confirmarEliminarSolicitud(material) {
      if (
        window.confirm("¿Estás seguro de que deseas eliminar este material?")
      ) {
        this.eliminar(material);
      }
    },
    eliminar(material) {
      axios
        .put(RUTA_SERVIDOR_LIBROS + "/materiales/" + material.id, {
          titulo: material.titulo,
          copias: material.copias,
          copiasDisponibles: material.copiasDisponibles,
          idTipomaterial: material.idTipomaterial,
          edicion: material.edicion,
          codigo: material.codigo,
          idAutor: parseInt(material.idAutor),
          idEmpleado: material.idEmpleado,
          idEditorial: parseInt(material.idEditorial),
          idCarrera: parseInt(material.idCarrera),
          urlPortada: material.urlPortada,
          observacion: material.observacion,
          documento: material.documento,
          activo: 0,
        })
        .then(function (response) {
          location.reload();
        })
        .catch(function (error) {
          console.log(error);
          // console.log(this.material);
        });
    },
    obtenerMaterial(id, nombre, autor, editorial, edicion, urlPortada, tipo) {
      this.prestamoMaterial = {
        id: id,

        nombreMaterial: nombre,
        autor: autor,
        editorial: editorial,
        edicion: edicion,
        urlPortada: urlPortada,
        tipo: tipo,
      };
    },

    consultarCarreras() {
      fetch(RUTA_SERVIDOR_LIBROS + "/carreras")
        .then((respuesta) => respuesta.json())
        .then((datosRespuesta) => {
          this.carreras = [];
          if (typeof datosRespuesta[0].success === "undefined") {
            this.carreras = datosRespuesta;
          }
          
        })
        .catch(console.log);
    },

    consultarCantidad() {
      fetch(RUTA_SERVIDOR_LIBROS + "/cantidadMateriales/" + this.subsede)
        .then((respuesta) => respuesta.json())
        .then((datosRespuesta) => {
          if (typeof datosRespuesta[0].success === "undefined") {
            for (let index = 0; index < datosRespuesta[1].length; index++) {
              this.chartDataL.labels.push(
                datosRespuesta[1][index][0] +
                  " : " +
                  datosRespuesta[1][index][1]
              );
              this.chartDataL.datasets[0].data.push(
                datosRespuesta[1][index][1]
              );

              this.totalesL += datosRespuesta[1][index][1];
              this.totalesD += datosRespuesta[2][index][1];
              this.dataBar.labels.push(datosRespuesta[1][index][0]);

              this.dataBar.datasets[0].data.push(datosRespuesta[1][index][1]);
              this.dataBar.datasets[1].data.push(datosRespuesta[2][index][1]);
            }
            // this.data.labels.push(datosRespuesta[1][index][0]+ ' : '+datosRespuesta[1][index][1] )
            for (let index = 0; index < datosRespuesta[0].length; index++) {
              this.chartDataP.labels.push(
                datosRespuesta[0][index][0] +
                  " : " +
                  datosRespuesta[0][index][1]
              );
              this.chartDataP.datasets[0].data.push(
                datosRespuesta[0][index][1]
              );
            }
          }
          this.dataBar.datasets[0].label.push(
            "Materiales Totales : " + this.totalesL
          );
          this.dataBar.datasets[1].label.push(
            "Materiales Disponibles : " + this.totalesD
          );
        })
        .catch(console.log);
    },

    totalPaginas() {
      if (this.elementosPorPagina === -1) {
        return 1; // Mostrar todo en una sola página
      }
      return Math.ceil(this.totalMateriales.length / this.elementosPorPagina);
    },
    ObtenerDatosPag(noPag) {
      this.paginaActual = noPag;
      this.datosPaginados = [];

      let ini = noPag * this.elementosPorPagina - this.elementosPorPagina;
      let fin = noPag * this.elementosPorPagina;
      this.datosPaginados = this.totalMateriales.slice(ini, fin);
    },

    paginaPrevia() {
      if (this.paginaActual > 1) {
        this.paginaActual--;
      }
      this.ObtenerDatosPag(this.paginaActual);
    },
    paginaSiguiente() {
      if (this.paginaActual < this.totalPaginas()) {
        this.paginaActual++;
      }
      this.ObtenerDatosPag(this.paginaActual);
    },
    activo(noPoag) {
      return noPoag === this.paginaActual ? "active" : "";
    },
    precionadoBoton(id) {
      console.log(id);
    },
    cambiaC(carrera) {
      this.materia = carrera;
      this.filtrarMateriales();
      this.filtrarArchivos();
    },

    exportExcel() {
      const tabla = document.createElement("table");
      const thead = tabla.createTHead();
      const tbody = tabla.createTBody();

      // Agregar encabezados de columna a la tabla
      const encabezados = [
        "Id",
        "Tipo",
        "Titulo",
        "Autor",
        "Editorial",
        "Edicion",
        "Codigo",
        "Copias",
        "Disponibles",
      ];
      const encabezadosRow = thead.insertRow();
      encabezados.forEach((encabezado) => {
        const th = document.createElement("th");
        th.innerText = encabezado;
        encabezadosRow.appendChild(th);
      });

      // Agregar filas de datos a la tabla
      this.datosPaginados.forEach((material) => {
        const fila = tbody.insertRow();
        fila.insertCell().innerText = material.id;
        fila.insertCell().innerText = material.tipo;
        
        fila.insertCell().innerText = material.titulo;
        fila.insertCell().innerText = material.nombre;
        (fila.insertCell().innerText =
          this.editoriales[[material.idEditorial] - 1].nombreEditorial),
          (fila.insertCell().innerText = material.edicion);
        fila.insertCell().innerText = material.codigo;
        fila.insertCell().innerText = material.copias;
        fila.insertCell().innerText = material.copiasDisponibles;
      });

      // Crear un archivo Blob para la tabla HTML
      const blob = new Blob([tabla.outerHTML], {
        type: "application/vnd.ms-excel",
      });

      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "Materiales.xls";

      link.click();
    },

    exportPdf() {
      var doc = new jsPDF();
      //titulo
      doc.setFontSize(16);
      var title = "Materiales";
      var titleWidth =
        (doc.getStringUnitWidth(title) * doc.internal.getFontSize()) /
        doc.internal.scaleFactor;
      var pageWidth = doc.internal.pageSize.getWidth();
      var x = (pageWidth - titleWidth) / 2;
      doc.text(title, x, 10);
      // Obtener la tabla visible
      var table = document.querySelector(".tableMb");

      // Obtener la tabla visible
      var table = document.querySelector(".tableMb");

      // Configurar los estilos de la tabla
      var styles = {
        overflow: "linebreak",
        fontSize: 8, // Tamaño de fuente reducido
        lineWidth: 0.1,
        lineColor: [0, 0, 0], // Color de las líneas
        font: "helvetica",
        fontStyle: "normal",
        halign: "center", // Alineación horizontal
        valign: "middle", // Alineación vertical
        cellPadding: 2,
        tableWidth: "auto",
        tableBorder: 1,
        tableLineColor: [0, 0, 0], // Color del borde de la tabla
        tableFillColor: [255, 255, 255], // Color de fondo de la tabla
        textColor: 0,
        cellWidth: "auto", // Ajustar el ancho de la celda automáticamente
      };

      // Ocultar la última columna (Acción) antes de agregar la tabla al documento PDF
      var actionColumn = table.querySelector("th:last-child, td:last-child");
      if (actionColumn) {
        actionColumn.style.display = "none";
      }

      // Agregar la tabla al documento PDF
      doc.autoTable({ html: table, startY: 20, styles });

      // Mostrar la última columna nuevamente
      if (actionColumn) {
        actionColumn.style.display = "table-cell";
      }

      // Guardar el PDF
      doc.save("Materiales.pdf");
    },
    closeModal() {
      this.$refs.modalCenter.hide();
    },
  },
};
</script>

<style>

.todoFondo{
  position: relative;
}
.loading-spinner {
  position:absolute;
  

  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgb(255, 255, 255); /* Fondo semi-transparente */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left: 4px solid #000000;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 3s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 5s; /* La duración de la transición */
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.my-chart-id {
  width: 30px;
  height: 30px;
}

.groupB {
  width: 8rem;
}

.btn-circle-2,
.btn-material-1,
.btn-material-2 {
  position: absolute;
  bottom: 0.5rem;
  left: 0.5rem;
  width: 2.5rem;
  height: 2.5rem;

  text-align: center;
  line-height: 1.8rem;
  cursor: pointer;
  /* background: #e1e1e1;

  box-shadow:  5px 5px 10px #a9a9a9,
             -5px -5px 10px #dddddd; */
}

.btn-circle,
.btn-material {
  position: absolute;

  width: 2rem;
  height: 2rem;
  border-radius: 50%;

  background-color: rgb(237, 237, 237);
  border: rgb(118, 118, 118) 0.07rem solid;

  text-align: center;
  line-height: 1.8rem;
  cursor: pointer;

  transition: all 0.2s ease-in-out;
}

.btn-material-1 {
  left: 8rem;
}
.btn-material-2 {
  left: 4.25rem;
}
.btn-circle:active,
.btn-material:active {
  box-shadow: inset 4px 4px 8px #a9a9a9, inset -4px -4px 8px #ffffff;
  font-size: 1.4em;
}

.titulo {
  width: 10rem;
  font-size: 12px;
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.editorial {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.autor {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding-top: 0rem;
  padding-bottom: 0.5rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  overflow: hidden;
  width: 10rem;
  font-size: 12px;

  margin-bottom: 2rem;
}

.icon-container-2 {
  position: relative;
  width: 10rem;
  height: 16rem;
  padding: 0;

  padding-top: 0.5rem;
}

.icon-container-2 {
  transition: all 0.3s ease;
  color: #41403e;
  font-size: 2rem;
  letter-spacing: 1px;
  outline: none;
  box-shadow: 20px 38px 34px -26px hsla(0, 0%, 0%, 0.2);
  border-color: #a9a9a9;
  border: solid;
}
.icon-container-2:hover {
  box-shadow: 2px 8px 4px -6px rgba(0, 0, 0, 0.501);
  -webkit-transform: scale(0.98);
  -ms-transform: scale(0.98);
  transform: scale(0.98);
}
.icon-container-2.lined.thin {
  border: solid 2px #282828;
}

@media screen and (max-width: 480px) {
  .titulo {
    margin-top: 0;
    padding-top: 0.5rem;

    font-size: 12px;
  }
  .autor {
    overflow: hidden;

    font-size: 12px;
  }

  .icon-container-2 {
    width: 9.5rem;
    height: 16rem;
    padding: 0;

    padding-top: 0.5rem;
  }

  .btn-circle,
  .btn-material {
    position: absolute;

    width: 2rem;
    height: 2rem;

    background-color: rgb(255, 255, 255);

    text-align: center;
    line-height: 1.8rem;
    cursor: pointer;

    transition: all 0.2s ease-in-out;
  }

  .btn-material-1 {
    left: 6.5rem;
  }
  .btn-material-2 {
    left: 3.5rem;
  }
}
</style>
