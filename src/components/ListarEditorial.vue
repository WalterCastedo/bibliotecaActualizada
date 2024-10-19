<template class="fondo">
  <div class="row align-items-center">
    <div class="col">
      <div class=" align-items-center">
        <div class="form-group text-center">
          <label for="">Ingresa el nombre de la editorial</label>
          <br>
          <input
            v-on:keyup="filtrarEditoriales()"
            v-model="nombreEditorial"
            type="text"
            class="form-control text-center"
            placeholder="Nombre de la editorial"
          />
        </div> <label>Registros por página</label>
    <select v-model="elementosPorPagina" @change="cambiarRegistrosPorPagina">
      <option value="5" selected>5</option>
      <option value="10">10</option>
      <option value="20">20</option>
      <option value="999999">Todos</option>
    </select>
    <button
      type="button"
      class="btn"
      @click="imprimirEditoriales()"
    >
    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAqCAYAAADFw8lbAAAACXBIWXMAAAsTAAALEwEAmpwYAAAChklEQVR4nO2Z22vTcBTH+08UrcpASE1SrQ1ug9i5sU1l4pQpE2XTubeBoOANxSdFUcELClNURGhZH0TFMh+com4Im+iDQ0HmEPVBENKbcfSS3tav/H5j6VYzy1zSVsmBz0M5/NJPT8/v5JfWYjGjROFkWafLzvXojcA4dugq6mK4g4KdhyEw3IV/Q9TOw8VwF3UXvSNUYaB6yYIY9t6G/8QhrF3B5WXt/HldRUdqbJBE64JIjY4gfvcWBqttcM+UZfhLFSkqiVZ9ZY0UlfSUNVpU0pAVGP5yRYpKmrLcybKLKk8fINzV9Bsvt9WhlnVMyw6VXfRPsblxQ2WIBltXIrR9zZy0OCqkolIRWljWFIVZ0fmE2aOiuZl4dTyFO9ZBedGvEvNdQ6i9Rt1UyjO/mks88mHi9H4E6peq+fDe5lnrCfLxbv3H0499bfQuQm6FRCTzdRy5eBSh9lqax2QWqbfDSPi9SL56jlxSQebTBwQ3sTQvH+mcWv/4Hl1PkA93GCcaahPoa1KtbOA7Yp4rqujEmQP5Cu5yY1KOQHlyf5ZocKPd2IFfKCq5FyH77QvivuuaopJoRbT3FHKpJP1Q06JkfaB5OYVcwzDRmPcqojfOIvV6EMikae/NJSof65qq4pZVqujMCHfWGyea+TyG9Md3dDNEelpVKWhV9OY55JQEpDqbKkquE+leTwk0LCvBV18ACkSJSC76Ewm/p8w9qiGaHhullU6/f0PbgpxDaS+WUjS0U6SjR+uNCImHHponxPp6IR/dA8m9OD8Fdjcg0d+HQGOVecyDeXAWzRO+1XxmEhY6nvT42XGgCE16zNESM/R/ijoN+rPBVYTVDLt1XqJmWP4ufgGVhSpkgRcCwgAAAABJRU5ErkJggg==">  </button> 
     <button
      type="button"
      class="btn"
      @click="exportarAExcel()"
    >
    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAACTUlEQVR4nO2ZW0sUYRjH5xvkRcieRnfNPZhtuTNBalgNaemaRUWQ6a5p2slq14Uyd6edGTpQKBFhRQXiTV0pXnQhEmLuTF/E+h7/eN+VocBK2Tks8v7hf/E+8w48v3kON8NxTExMu1/id61X1NWfoqGhUtc+Tc45DiDo2g8rkieukSXUFKTnjgKIFiVvAjgNIdoB4CSEaBeA7BCErQCyAxC2A8g2QzgCINsI4RiAbBOElQB7n3T/F2JPQVKrFqBpKbMtiNoXfXNVCbATcwxgU6wCBmuhyrRrW2jfs0vgJ07hwMIEPTd/Gqfn2MdRxBey4DOd2D9/8493Di7lUD/VC//YMfivH0d45op7APHFLDypVgQLfRB0FYG7J2liiVUZzZ/vwDN4BLH3I+Z9csc32kEdfTOE6OwQwi8H3F2jDdoFChGe6acJN83fKFdjC4CWr3ka4zNdENaK7rcQTWolD+9wO4Won0ya8a0AiEm1SNw31oHI6xTEkuIuwKEvD+BJt8Gbbit/2ZL6TwBxXaEx/60T9HlIPusigK6i7n4PfMNHEZlNlxN+e/XvAOtK2WQevhURuC3Bm2qls+EKQOzDNZpk5NWgOcQEJrEyZQLU5U4jpJ2nJpspMC6hcbofjdOXaeX4bJdLFSgpCBXPIZg/g8TaI3ONBieTiL4bQXwxR2fid5MVSoaerFf+XicaHl9Ey/JDd2fATnMMYFOsAgZrocrEWshgLVSZWAsZrIWq5xfTdi0Y6gZnlQ7rWo+TEIKhbiRKSrdlAExMTFzV6hfz8wpqDZBppQAAAABJRU5ErkJggg==">
    </button>
<br>
<nav aria-label="Page navigation example" class="pagination-nav">
      <ul class="pagination">
        <li class="page-item" v-on:click="paginaPrevia()">
          <a class="page-link" href="#">anterior</a>
        </li>
        <li
          v-for="paginaE in totalPaginas()"
          :key="paginaE"
          class="page-item"
          v-bind:class="activo(paginaE)"
        >
          <a class="page-link" href="#" v-on:click="ObtenerDatosPag(paginaE)">{{
            paginaE
          }}</a>
        </li>
        <li class="page-item" v-on:click="paginaSiguiente()">
          <a class="page-link" href="#">siguiente</a>
        </li>
      </ul>
    </nav>

        <div class="d-md-block table-responsive">
          <table class="table table-striped border text-center tableMb">
            <thead>
              <tr>
                <!-- <th>ID</th> -->
                <th>NOMBRE</th>
                <th>ACCIONES</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="editorial in datosPaginados" :key="editorial.id">
                <!-- <td>{{ libro.id }}</td> -->
                <td>{{ editorial.nombreEditorial }}</td>
                <!-- <td>{{ libro.codigo }}</td>
                    <td>{{ libro.copias }}</td>
                    <td>{{ libro.categoria }}</td>
                    <td>{{ libro.edicion }}</td>
                    <td>{{ autor[[libro.idAutor] - 1].nombre }}</td>
                    <td>{{ editoriales[[libro.idEditorial] - 1].nombreEditorial }}</td>
                    <td>{{ carreras[[libro.idCarrera] - 1].nombreCarrera }}</td>
                    <td>{{ libro.observacion }}</td> -->
                <td>
                  <div class="btn-group" role="group" aria-label="">
                    <button
                      v-b-modal.modal-center
                      @click="obtenerAutor(editorial)"
                      class="btn btn-info"
                    >
                    <font-awesome-icon icon="fa-solid fa-pen-to-square" />
                    </button>
                    <button
                      type="button"
                      @click="eliminar(editorial)"
                      class="btn btn-danger"
                    >
                    <font-awesome-icon icon="fa-solid fa-trash-can"  />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

   

    <b-modal id="modal-center" ref="modalCenter" centered title="Modificar editorial" hide-footer hide-close-button> 
      <template #modal-title>
    <button @click="closeModal" class="btn btn-sm btn-danger close-button">X</button>
    <h5 class="modal-title">Modificar Editorial</h5>
  </template>
      <div class="form-group d-flex flex-column">
        <label for="">nombre de la editorial</label>
        <input
          v-model="editorialEditar.nombre"
          type="text"
          class="form-control"
          placeholder="Nombre"
          aria-describedby="helpId"
        />
        <br>
        <button class="btn align-items-center btn-info" @click="actualizar()">Actualizar</button>
     </div>
    </b-modal>
  </div>
</template>

<script>
  export const RUTA_SERVIDOR_ALUMNOS = process.env.VUE_APP_RUTA_API_ALUMNOS;
export const RUTA_SERVIDOR_LIBROS = process.env.VUE_APP_RUTA_API_LIBROS;
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import axios from "axios";

export default {
  name: "ListarEditorial",
  data() {
    return {
      totalEditoriales: [],
      nombreEditorial: "",
      editoriales: [],
      elementosPorPagina: 10,
      datosPaginados: [],
      paginaActual: 1,
      editorialEditar: {
        nombre: "",
        id: 0,
      },
    };
  },

  created: function () {
    this.consultarEditoriales();
  },
  mounted() {
    this.ObtenerDatosPag(1);
  },
  methods: {
    consultarEditoriales() {
      fetch(RUTA_SERVIDOR_LIBROS+"/editoriales")
        .then((respuesta) => respuesta.json())
        .then((datosRespuesta) => {
          this.libros = [];
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
            this.filtrarEditoriales();
          }
        })
        .catch(console.log);
    },

    filtrarEditoriales() {
      this.totalEditoriales = [];
      for (let index = 0; index < this.editoriales.length; index++) {
        if (
          this.editoriales[index].activo === 1 &&
          this.editoriales[index].nombreEditorial
            .toUpperCase()
            .includes(this.nombreEditorial.toUpperCase())
        ) {
          this.totalEditoriales = this.totalEditoriales.concat(
            this.editoriales[index]
          );
          this.ObtenerDatosPag(1);
        }
      }
      if (this.totalEditoriales.length === 0) {
        this.paginaPrevia();
        //this.paginaActual=0;
      }
    },

    eliminar(editorial) {
      const confirmacion = window.confirm(
    '¿Estás seguro de que deseas eliminar esta editorial?'
  );

  if (confirmacion) {
      axios
        .put(RUTA_SERVIDOR_LIBROS+"/editoriales/" + editorial.id, {
          nombreEditorial: editorial.nombreEditorial,
          idEmpleado: editorial.idEmpleado,
          activo: 0,
        })
        .then(function (response) {
          console.log(response);
          location.reload();
        })
        .catch(function (error) {
          console.log(error);
          // console.log(this.libro);
        });}
    },

    cambiarRegistrosPorPagina() {
      this.paginaActual=1
      this.ObtenerDatosPag(this.paginaActual);
    },
    totalPaginas() {
      if (this.elementosPorPagina === -1) {
        return 1; // Mostrar todo en una sola página
      }
      return Math.ceil(
        this.totalEditoriales.length / this.elementosPorPagina
      );
    },
    ObtenerDatosPag(noPag) {
  this.paginaActual = noPag;
  this.datosPaginados = [];

 
    let ini = noPag * this.elementosPorPagina - this.elementosPorPagina;
    let fin = noPag * this.elementosPorPagina;
    this.datosPaginados = this.totalEditoriales.slice(ini, fin);
  
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

    obtenerAutor(idEditorial) {
      this.editorialEditar.nombre = idEditorial.nombreEditorial;
      this.editorialEditar.id = idEditorial.id;
    },
    actualizar() {
      if (
        this.editorialEditar.nombre.trim() === "" 
  
  ) {
    alert('Por favor, el campo de nombre no pueden estar vacio.');
    return;
  }
      axios
        .put(
          RUTA_SERVIDOR_LIBROS+"/editoriales/" + this.editorialEditar.id,
          {
            nombreEditorial: this.editorialEditar.nombre,
           idEmpleado: parseInt(localStorage.getItem('id')),
            activo: 1,
          }
        )
        .then(function (response) {
          console.log(response);
          location.reload();
        })
        .then(alert("La editorial se actualizo correctamente"))
        .catch(function (error) {
          console.log(error);
          // console.log(this.libro);
        });
    },

    exportarAExcel() {
  // Crear una tabla HTML con los datos que deseas exportar
  const tabla = document.createElement('table');
  const tbody = tabla.createTBody();

  // Agregar el título "Editoriales"
  

  // Agregar la cabecera de la columna "nombre"
  const cabeceraFila = document.createElement('tr');
  const cabeceraCelda = document.createElement('th');
  cabeceraCelda.innerText = 'Editoriales Nombre';
  cabeceraFila.appendChild(cabeceraCelda);
  tbody.appendChild(cabeceraFila);

  // Agregar filas de datos a la tabla
  this.datosPaginados.forEach(editorial => {
    const fila = tbody.insertRow();
    const nombreEditorialCell = fila.insertCell(0); // 0 es la primera columna
    nombreEditorialCell.innerText = editorial.nombreEditorial;
  });

  // Crear un archivo Blob para la tabla HTML
  const blob = new Blob([tabla.outerHTML], { type: 'application/vnd.ms-excel' });

  // Crear un enlace para descargar el archivo Excel
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'editoriales.xls';

  // Simular un clic en el enlace para iniciar la descarga
  link.click();
},
imprimirEditoriales() {
  // Crear un nuevo documento PDF
  var doc = new jsPDF();

  //  Agregar la imagen en la esquina derecha
  //  var imgRight = new Image();
  // imgRight.src = '.../imglogo2.jpg'; // Reemplaza 'url_de_la_imagen' con la URL de tu imagen
  // imgRight.onload = function () {
  //   var imgWidth = 50; // Ancho de la imagen
  //   var imgHeight = (imgRight.height * imgWidth) / imgRight.width;
  //   var pageWidth = doc.internal.pageSize.getWidth();
  //   var x = pageWidth - imgWidth - 10; // Ajusta la posición según tu preferencia
  //   doc.addImage(imgRight, 'JPEG', x, 10, imgWidth, imgHeight);
  // }
  //titulo
  doc.setFontSize(16);
  var title = "Editoriales";
  var titleWidth = doc.getStringUnitWidth(title) * doc.internal.getFontSize() / doc.internal.scaleFactor;
  var pageWidth = doc.internal.pageSize.getWidth();
  var x = (pageWidth - titleWidth) / 2;
  doc.text(title, x, 10);
  // Obtener la tabla visible
  var table = document.querySelector('.tableMb');

  // Configurar los estilos de la tabla
  var styles = {
    overflow: 'linebreak',
    fontSize: 8, // Tamaño de fuente reducido
    lineWidth: 0.1,
    lineColor: [0, 0, 0], // Color de las líneas
    font: 'helvetica',
    fontStyle: 'normal',
    halign: 'center', // Alineación horizontal
    valign: 'middle', // Alineación vertical
    cellPadding: 2,
    tableWidth: 'auto',
    tableBorder: 1,
    tableLineColor: [0, 0, 0], // Color del borde de la tabla
    tableFillColor: [255, 255, 255], // Color de fondo de la tabla
    textColor: 0,
    cellWidth: 'auto', // Ajustar el ancho de la celda automáticamente
  };

  // Ocultar la última columna (Acción) antes de agregar la tabla al documento PDF
  var actionColumn = table.querySelector('th:last-child, td:last-child');
  if (actionColumn) {
    actionColumn.style.display = 'none';
  }

  // Agregar la tabla al documento PDF
  doc.autoTable({ html: table, startY: 20, styles });

  // Mostrar la última columna nuevamente
  if (actionColumn) {
    actionColumn.style.display = 'table-cell';
  }

  // Guardar el PDF
  doc.save('editoriales.pdf');
},
closeModal() {
      this.$refs.modalCenter.hide();
    },
  },
};
</script>

  <style >
    .close-button {
      position: absolute;
      top: 14px;
      right: 10px;
    }
    .modal-header .close {
      display: none;
    }
</style>