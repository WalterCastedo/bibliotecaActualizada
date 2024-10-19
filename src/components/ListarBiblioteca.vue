<template class="fondo">
  <div class="row align-items-center">
    <div class="col">
      <div class="align-items-center">
        <div class="form-group text-center">
          <label for="">Buscar biblioteca</label>
          <br>        <br>
          <input
            v-on:keyup="filtrarBiblioteca()"
            v-model="nombreBiblioteca"
            type="text"
            class="form-control text-center"
            placeholder="Nombre"
          />
        </div>

        <br>
        <br />
        <div class="carrusel row">
          <div
         
            align="center"
            class="listado col-xs-12 col-md-6 col-xl-4"
            v-for="biblioteca in totalBibliotecas"
            :key="biblioteca.id"
          
          >
            <div>
              <div
                class="icon-container-2"
                @click="abrirEnlace(biblioteca.urlBiblioteca)"
                v-bind:style="{
                  backgroundImage: 'url(' + biblioteca.urlImagenBiblioteca + ')',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  height: '300px',
                  width: '300px',
                }"
              >
                
              </div>
            </div>
            <div class="titulo" @click="abrirEnlace(biblioteca.urlBiblioteca)">
              {{ biblioteca.nombre }}
            </div>
            <div class="autor" style="margin-bottom: 0px;" @click="abrirEnlace(biblioteca.urlBiblioteca)">
              {{ biblioteca.urlBiblioteca }}
            </div>
            <div v-if="acceso==2" class="row justify-content-center align-items-center" >
              <div
              v-b-modal.modal-center
                      @click="obtenerBiblioteca(biblioteca)"
                class="btn btn-info col-sx-12 col-6"
                style="width: 140px;
                margin-right: 10px;"
              >
                Editar
              </div>
              <div
                @click="eliminar(biblioteca)"
                class="btn btn-danger col-sx-12 col-6"
                style="width: 140px;
                margin-left: 10px;"
              >
                Eliminar
              </div>
            </div>
            <br>
            <br>
          </div>
        </div>
      </div>
    </div>

    <b-modal
      id="modal-center"
      ref="modalCenter"
      centered
      title="Modificar Biblioteca"
      hide-footer
      hide-close-button
    >
      <template #modal-title>
        <button @click="closeModal" class="btn btn-sm btn-danger close-button">
          X
        </button>
        <h5 class="modal-title">Modificar Biblioteca</h5>
      </template>
      <div class="form-group d-flex flex-column">
        <label for="">Nombre del medio de Biblioteca</label>
        <input
          v-model="bibliotecasEditar.nombre"
          type="text"
          name=""
          id="nombre"
          class="form-control"
          placeholder="Nombre"
          aria-describedby="helpId"
        />
        <br />
        <label for="">Url del medio de biblioteca (empezar con www)</label>
        <input
          v-model="bibliotecasEditar.urlBiblioteca"
          type="text"
          name=""
          id="urlBiblioteca"
          class="form-control"
          placeholder="Enlace"
          aria-describedby="helpId"
        />
        <br />
        <label for="">Url del la imagen de portada (Mejor si es formato cuadrada)</label>
        <input
          v-model="bibliotecasEditar.urlImagenBiblioteca"
          type="text"
          name=""
          id="urlImagenBiblioteca"
          class="form-control"
          placeholder="Imagen del medio"
          aria-describedby="helpId"
        />
        <br />
        <img :src="bibliotecasEditar.urlImagenBiblioteca" alt="">
        
        <br />
        <button class="btn align-items-center btn-info" @click="actualizar()">
          Actualizar datos
        </button>
      </div>
    </b-modal>
  </div>
</template>

<script>
import axios from "axios";
export const RUTA_SERVIDOR_ALUMNOS = process.env.VUE_APP_RUTA_API_ALUMNOS;
export const RUTA_SERVIDOR_LIBROS = process.env.VUE_APP_RUTA_API_LIBROS;
import { jsPDF } from "jspdf";
import "jspdf-autotable";
export default {
  name: "ListarBiblioteca",
  data() {
    return {
      acceso: localStorage.getItem("acceso"),
      idAdmin: localStorage.getItem("id"),
      nombreBiblioteca: "",
      Bibliotecas: [],
      elementosPorPagina: 10,
      datosPaginados: [],
      paginaActual: 1,
      totalBibliotecas: [],
      bibliotecasEditar: {
        nombre: "",
        id: 0,
        urlBiblioteca:"",
        urlImagenBiblioteca:""

      },
    };
  },

  created: function () {
    this.consultarBiblioteca();
  },
  mounted() {},
  methods: {
    abrirEnlace(enlace) {
      window.open("http://" + enlace, "_blank");
    },

    consultarBiblioteca() {
      fetch(RUTA_SERVIDOR_LIBROS + "/biblioteca")
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
            this.Bibliotecas = datosRespuesta;
            console.log(this.Bibliotecas);
            this.filtrarBiblioteca();
          }
        })
        .catch(console.log);
    },

    filtrarBiblioteca() {
      this.totalBibliotecas = [];
      for (let index = 0; index < this.Bibliotecas.length; index++) {
        if (
          this.Bibliotecas[index].activo === 1 &&
          this.Bibliotecas[index].nombre
            .toUpperCase()
            .includes(this.nombreBiblioteca.toUpperCase())
        ) {
          this.totalBibliotecas = this.totalBibliotecas.concat(this.Bibliotecas[index]);
        }
      }
      console.log(this.totalBibliotecas);
    },

    eliminar(biblioteca) {
      const confirmacion = window.confirm(
        "¿Estás seguro de que deseas eliminar esta biblioteca?"
      );

      if (confirmacion) {
        axios
          .put(RUTA_SERVIDOR_LIBROS + "/biblioteca/" + biblioteca.id, {
            nombre: biblioteca.nombre,
            idEmpleado: parseInt(localStorage.getItem('id')),
            urlImagenBiblioteca:biblioteca.urlImagenBiblioteca,
            urlBiblioteca:biblioteca.urlBiblioteca,
            activo: 0,
          })
          .then(function (response) {
            console.log(response);
            location.reload();
          })
          .catch(function (error) {
            console.log(error);
            // console.log(this.libro);
          });
      }
    },

    activo(noPoag) {
      return noPoag === this.paginaActual ? "active" : "";
    },

    obtenerBiblioteca(biblioteca) {
      this.bibliotecasEditar.nombre = biblioteca.nombre;
      this.bibliotecasEditar.id = biblioteca.id;
      this.bibliotecasEditar.urlImagenBiblioteca = biblioteca.urlImagenBiblioteca;
      this.bibliotecasEditar.urlBiblioteca = biblioteca.urlBiblioteca;

    },
    actualizar() {
      if (
    this.bibliotecasEditar.nombre.trim() === "" ||
    this.bibliotecasEditar.urlBiblioteca.trim() === "" ||
    this.bibliotecasEditar.urlImagenBiblioteca.trim() === ""
  ) {
    alert("Por favor, complete todos los campos antes de actualizar.");
    return;
  }
      axios
        .put(RUTA_SERVIDOR_LIBROS + "/biblioteca/" + this.bibliotecasEditar.id, {
             nombre: this.bibliotecasEditar.nombre,
            idEmpleado: parseInt(localStorage.getItem('id')),
            urlImagenBiblioteca:this.bibliotecasEditar.urlImagenBiblioteca,
            urlBiblioteca:this.bibliotecasEditar.urlBiblioteca,
            activo: 1,
        })
        .then(function (response) {
          console.log(response);
          location.reload();
        })
        .then(
          alert(
            "La biblioteca se actualizo correctamente"
          )
        )
        .catch(function (error) {
          console.log(error);
          // console.log(this.libro);
        });
    },

    exportarAExcel() {
      const tabla = document.createElement("table");
      const tbody = tabla.createTBody();
      // Crear una tabla HTML con los datos que deseas exportar
      const cabeceraFila = document.createElement("tr");
      const cabeceraCelda = document.createElement("th");
      cabeceraCelda.innerText = "Bibliotecas de materiales biblotecarios";
      cabeceraFila.appendChild(cabeceraCelda);
      tbody.appendChild(cabeceraFila);

      // Agregar filas de datos a la tabla
      this.datosPaginados.forEach((biblioteca) => {
        const fila = tbody.insertRow();
        const nombreCell = fila.insertCell(0); // 0 es la primera columna
        nombreCell.innerText = biblioteca.biblioteca;
      });

      // Crear un archivo Blob para la tabla HTML
      const blob = new Blob([tabla.outerHTML], {
        type: "application/vnd.ms-excel",
      });

      // Crear un enlace para descargar el archivo Excel
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "BibliotecasMaterial.xls";

      // Simular un clic en el enlace para iniciar la descarga
      link.click();
    },
    imprimirBibliotecas() {
      // Crear un nuevo documento PDF
      var doc = new jsPDF();

      // Obtener la tabla visible
      var table = document.querySelector(".tableMb");
      //titulo
      doc.setFontSize(16);
      var title = "Bibliotecas";
      var titleWidth =
        (doc.getStringUnitWidth(title) * doc.internal.getFontSize()) /
        doc.internal.scaleFactor;
      var pageWidth = doc.internal.pageSize.getWidth();
      var x = (pageWidth - titleWidth) / 2;
      doc.text(title, x, 10);
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
      doc.save("BibliotecasMaterial.pdf");
    },
    closeModal() {
      this.$refs.modalCenter.hide();
    },
  },
};
</script>
