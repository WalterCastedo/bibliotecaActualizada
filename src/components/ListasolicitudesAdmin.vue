<template>
  <div class="solicitud px-md-5 px-2">
    <br />
    <div class="form-group" align="center">
      <b-row>
        <b-col>
          <label>Seleccione el estado del prestamo</label>
          <br />
          <select
            v-model="estado"
            @change="filtrarSolicitudes()"
            class="custom-select p-1 px-5"
            name=""
            id=""
          >
            <option align="center" value="-1">Todos los estados</option>
            <option align="center" value="0">Solicitud rechazada</option>
            <option align="center" value="1">Pendiente de respuesta</option>
            <option align="center" value="2">Solicitud aceptada</option>
            <option align="center" value="3">Material devuelto</option>
            <option align="center" value="4">Pendiente de devolucion</option>
            <option align="center" value="5">Retrasado</option>
          </select>
        </b-col>
        <br />
        <b-col>
          <label>Buscar por codigo / material</label>
          <input
            v-model="busquedaCodigo"
            @keyup="filtrarSolicitudes()"
            type="text"
            class="form-control"
            placeholder="Codigo/material"
          />
        </b-col>
      </b-row>
      <br />

      <label>Seleccione el rango de fechas</label><br />
      <b-row cols="2">
        <b-col>
          <input
            type="date"
            v-model="fechaInicio"
            @change="filtrarSolicitudes()"
            class="form-control"
            name=""
            id=""
          />
        </b-col>
        <b-col>
          <input
            type="date"
            v-model="fechaFin"
            @change="filtrarSolicitudes()"
            class="form-control"
            name=""
            id=""
          />
        </b-col>
      </b-row>
      <br />
    </div>

    <label>Registros por página</label>
    <select v-model="elementosPorPagina" @change="cambiarRegistrosPorPagina">
      <option value="5" selected>5</option>
      <option value="10">10</option>
      <option value="20">20</option>
      <option value="999999">Todos</option>
    </select>
    <button type="button" class="btn" @click="imprimirSolicitudes()">
      <img
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAqCAYAAADFw8lbAAAACXBIWXMAAAsTAAALEwEAmpwYAAAChklEQVR4nO2Z22vTcBTH+08UrcpASE1SrQ1ug9i5sU1l4pQpE2XTubeBoOANxSdFUcELClNURGhZH0TFMh+com4Im+iDQ0HmEPVBENKbcfSS3tav/H5j6VYzy1zSVsmBz0M5/NJPT8/v5JfWYjGjROFkWafLzvXojcA4dugq6mK4g4KdhyEw3IV/Q9TOw8VwF3UXvSNUYaB6yYIY9t6G/8QhrF3B5WXt/HldRUdqbJBE64JIjY4gfvcWBqttcM+UZfhLFSkqiVZ9ZY0UlfSUNVpU0pAVGP5yRYpKmrLcybKLKk8fINzV9Bsvt9WhlnVMyw6VXfRPsblxQ2WIBltXIrR9zZy0OCqkolIRWljWFIVZ0fmE2aOiuZl4dTyFO9ZBedGvEvNdQ6i9Rt1UyjO/mks88mHi9H4E6peq+fDe5lnrCfLxbv3H0499bfQuQm6FRCTzdRy5eBSh9lqax2QWqbfDSPi9SL56jlxSQebTBwQ3sTQvH+mcWv/4Hl1PkA93GCcaahPoa1KtbOA7Yp4rqujEmQP5Cu5yY1KOQHlyf5ZocKPd2IFfKCq5FyH77QvivuuaopJoRbT3FHKpJP1Q06JkfaB5OYVcwzDRmPcqojfOIvV6EMikae/NJSof65qq4pZVqujMCHfWGyea+TyG9Md3dDNEelpVKWhV9OY55JQEpDqbKkquE+leTwk0LCvBV18ACkSJSC76Ewm/p8w9qiGaHhullU6/f0PbgpxDaS+WUjS0U6SjR+uNCImHHponxPp6IR/dA8m9OD8Fdjcg0d+HQGOVecyDeXAWzRO+1XxmEhY6nvT42XGgCE16zNESM/R/ijoN+rPBVYTVDLt1XqJmWP4ufgGVhSpkgRcCwgAAAABJRU5ErkJggg=="
      />
    </button>
    <button type="button" class="btn" @click="exportarAExcel()">
      <img
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAACTUlEQVR4nO2ZW0sUYRjH5xvkRcieRnfNPZhtuTNBalgNaemaRUWQ6a5p2slq14Uyd6edGTpQKBFhRQXiTV0pXnQhEmLuTF/E+h7/eN+VocBK2Tks8v7hf/E+8w48v3kON8NxTExMu1/id61X1NWfoqGhUtc+Tc45DiDo2g8rkieukSXUFKTnjgKIFiVvAjgNIdoB4CSEaBeA7BCErQCyAxC2A8g2QzgCINsI4RiAbBOElQB7n3T/F2JPQVKrFqBpKbMtiNoXfXNVCbATcwxgU6wCBmuhyrRrW2jfs0vgJ07hwMIEPTd/Gqfn2MdRxBey4DOd2D9/8493Di7lUD/VC//YMfivH0d45op7APHFLDypVgQLfRB0FYG7J2liiVUZzZ/vwDN4BLH3I+Z9csc32kEdfTOE6OwQwi8H3F2jDdoFChGe6acJN83fKFdjC4CWr3ka4zNdENaK7rcQTWolD+9wO4Won0ya8a0AiEm1SNw31oHI6xTEkuIuwKEvD+BJt8Gbbit/2ZL6TwBxXaEx/60T9HlIPusigK6i7n4PfMNHEZlNlxN+e/XvAOtK2WQevhURuC3Bm2qls+EKQOzDNZpk5NWgOcQEJrEyZQLU5U4jpJ2nJpspMC6hcbofjdOXaeX4bJdLFSgpCBXPIZg/g8TaI3ONBieTiL4bQXwxR2fid5MVSoaerFf+XicaHl9Ey/JDd2fATnMMYFOsAgZrocrEWshgLVSZWAsZrIWq5xfTdi0Y6gZnlQ7rWo+TEIKhbiRKSrdlAExMTFzV6hfz8wpqDZBppQAAAABJRU5ErkJggg=="
      />
    </button>
    <br />
    <br />
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
    <div class="table-responsive">
      <table class="table table-striped border text-center tableMb">
        <thead class="thMb">
          <tr class="trMb">
            <th>Solicitante</th>
            <th>material solicitado</th>
            <th>cantidad</th>
            <th>Fecha de prestamo</th>
            <th>Fecha de devolucion</th>
            <th>estado</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="trMb"
            v-for="solicitud in datosPaginados"
            :key="solicitud.id"
            :class="{
              'solicitud-aceptada': solicitud.estado === 2,
              'solicitud-rechazada': solicitud.estado === 0,
              retrasado: solicitud.estado === 5,
              pendiente: solicitud.estado === 4,
            }"
          >
            <td data-titulo="Solicitante: ">
              {{ NombreSolicitate[solicitud.id] }}
            </td>
            <td data-titulo="material solicitado: ">{{ solicitud.titulo }}</td>
            <td data-titulo="Cantidad: ">{{ solicitud.cantidad }}</td>
            <td data-titulo="Fecha de prestamo: ">
              {{ solicitud.fechaPrestamo }}
            </td>
            <td data-titulo="Fecha de devolución: ">
              {{ solicitud.fechaDevolucion }}
            </td>
            <td data-titulo="Estado: ">
              <p v-if="solicitud.estado == 0">Solicitud rechazada</p>
              <p v-if="solicitud.estado == 1">Pendiente de respuesta</p>
              <p v-if="solicitud.estado == 2">Solicitud aceptada</p>
              <p v-if="solicitud.estado == 3">material devuelto</p>
              <p v-if="solicitud.estado == 4">Pendiente de devolucion</p>
              <p v-if="solicitud.estado == 5">Retrasado</p>
            </td>
            <td data-titulo="Acción: ">
              <a
                v-if="solicitud.estado == 1 || solicitud.estado == 2"
                @click="
                  eliminarSolicitud(solicitud, NombreSolicitate[solicitud.id])
                "
                class="btn btn-danger"
                role="button"
                >👎🏻</a
              >
              <a
                v-if="solicitud.estado == 0 || solicitud.estado == 1"
                @click="
                  aceptarSolicitud(solicitud, NombreSolicitate[solicitud.id])
                "
                class="btn btn-success"
                role="button"
              >
                👍🏻
              </a>

              <a
                v-if="solicitud.estado == 2"
                @click="entregarMaterial(solicitud)"
                class="btn btn-warning"
                role="button"
                >📦</a
              >
              <a
                v-if="solicitud.estado == 4 || solicitud.estado == 5"
                @click="devolverMaterial(solicitud)"
                class="btn btn-info"
                role="button"
                >🔙</a
              >
              <a
                v-if="solicitud.estado != 0"
                @click="
                  imprimirSolicitud(solicitud, NombreSolicitate[solicitud.id])
                "
                class="btn btn-primary"
                role="button"
                >🖨️</a
              >
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export const RUTA_SERVIDOR_ALUMNOS = process.env.VUE_APP_RUTA_API_ALUMNOS;
export const RUTA_SERVIDOR_LIBROS = process.env.VUE_APP_RUTA_API_LIBROS;
import { jsPDF } from "jspdf";
import "jspdf-autotable";
export default {
  data() {
    return {
      elementosPorPagina: 5,
      busquedaCodigo: "",
      fechaInicio: "",
      fechaFin: "",
      estado: -1,
      solicitudes: [],
      materiales: [],
      preTitulo: {},

      solicitudesFiltradas: [],
      datosPaginados: [],
      paginaActual: 1,
      NombreSolicitate: [],
    };
  },
  mounted() {
    this.obtenersolicitudes();
  },

  methods: {
    cambiarRegistrosPorPagina() {
      this.paginaActual = 1;
      this.ObtenerDatosPag(this.paginaActual);
    },
    obtenersolicitudes() {
      fetch(
        RUTA_SERVIDOR_LIBROS + "/prestamo/" + localStorage.getItem("idSubsede")
      )
        .then((respuesta) => respuesta.json())
        .then((datosRespuesta) => {
          this.solicitudes = datosRespuesta.reverse();
        })
        .then(() => {
          for (let index = 0; index < this.solicitudes.length; index++) {
            this.asignarNombre(
              this.solicitudes[index].codigoUsuario,
              this.solicitudes[index].id
            );
          }
        })
        .catch(console.log);
    },

    asignarNombre(codigoAlumnon, index) {
      if (this.NombreSolicitate[index] == undefined) {
        fetch(RUTA_SERVIDOR_ALUMNOS + "/alumno/" + codigoAlumnon)
          .then((respuesta) => respuesta.json())
          .then((datosRespuesta) => {
            this.filtrarSolicitudes();
            this.NombreSolicitate[index] =
              datosRespuesta.nombre +
              " " +
              datosRespuesta.ap_paterno +
              " " +
              datosRespuesta.ap_materno;
          });
      } else {
        return;
      }
    },
    quitarAcentosYMinusculas(cadena) {
      return cadena
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();
    },
    filtrarSolicitudes() {
      // Filtrar por estado
      let solicitudesFiltradas = this.solicitudes.filter((solicitud) => {
        return this.estado == -1 || solicitud.estado === parseInt(this.estado);
      });

      if (this.fechaInicio !== "" && this.fechaFin !== "") {
        solicitudesFiltradas = solicitudesFiltradas.filter((solicitud) => {
          return (
            solicitud.fechaPrestamo >= this.fechaInicio &&
            solicitud.fechaPrestamo <= this.fechaFin
          );
        });
      }

      // Filtrar por código de usuario (coincidencia parcial)
      if (this.busquedaCodigo !== "") {
        const busquedaNormalizada = this.quitarAcentosYMinusculas(
          this.busquedaCodigo
        );
        solicitudesFiltradas = solicitudesFiltradas.filter((solicitud) => {
          const codigoUsuarioNormalizado = this.quitarAcentosYMinusculas(
            solicitud.codigoUsuario
          );
          const tituloNormalizado = this.quitarAcentosYMinusculas(
            solicitud.titulo
          );
          return (
            codigoUsuarioNormalizado.includes(busquedaNormalizada) ||
            tituloNormalizado.includes(busquedaNormalizada)
          );
        });
        // No es necesario repetir el bloque de fecha aquí
      } else {
        // Si no hay cadena de búsqueda, mantener los filtros anteriores
        // (no es necesario cambiar nada aquí)
      }

      // El resto del código permanece igual
      this.solicitudesFiltradas = solicitudesFiltradas;

      // Realizar alguna acción, como obtener datos de una página
      this.ObtenerDatosPag(1);

      // Manejo de errores o retroceso de página si no se encontraron resultados
      if (solicitudesFiltradas.length === 0) {
        this.paginaPrevia();
      }
    },
    totalPaginas() {
      if (this.elementosPorPagina === -1) {
        return 1; // Mostrar todo en una sola página
      }
      return Math.ceil(
        this.solicitudesFiltradas.length / this.elementosPorPagina
      );
    },
    ObtenerDatosPag(noPag) {
      this.paginaActual = noPag;
      this.datosPaginados = [];

      let ini = noPag * this.elementosPorPagina - this.elementosPorPagina;
      let fin = noPag * this.elementosPorPagina;
      this.datosPaginados = this.solicitudesFiltradas.slice(ini, fin);
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

    eliminarSolicitud(solicitud, nombre) {
      const confirmacion = window.confirm(
        "¿Estás seguro de que deseas cancelar esta solicitud?"
      );

      if (confirmacion) {
        var valor;
        if (solicitud.estado == 2) {
          valor = 1;
        } else {
          valor = 0;
        }

        try {
          axios
            .put(RUTA_SERVIDOR_LIBROS + "/prestamos/" + solicitud.id, {
              idEmpleado: solicitud.idEmpleado,
              codigoUsuario: solicitud.codigoUsuario,
              idMaterial: solicitud.idMaterial,
              cantidad: solicitud.cantidad,
              fechaPrestamo: solicitud.fechaPrestamo,
              idSubsede: solicitud.idSubsede,
              fechaDevolucion: solicitud.fechaDevolucion,
              observacion: "Prestamo rechazado por el bibliotecario",
              estado: 0,
              activo: 1,
              telefono: solicitud.telefono,
            })
                      .then(function () {
                        if (solicitud.telefono != null) {
                          window.open(
                            "https://api.whatsapp.com/send?phone=591" +
                              solicitud.telefono +
                              "&text=Hola " +
                              nombre +
                              ", nos comunicamos desde la Universidad Nacional del Oriente sede " +
                              localStorage.getItem("Subsede") +
                              ', para informarte que tu solicitus del material "' +
                              solicitud.titulo +
                              '" a sido rechazada, lamentamos este inconveniente y te pedimos que puedas pasar personalmente por la universidad a realizar la solicitud'
                          );
                        }
                      })
                      .then(function () {
                        location.reload();
                      })

                      .catch(function (error) {
                        console.log(error);
                      });

          
  
        } catch (error) {
          console.log(error);
          // console.log(this.material);
        }
      }
    },

    aceptarSolicitud(solicitud, nombre) {
      const confirmacion = window.confirm(
        "¿Estás seguro de que deseas acptar esta solicitud?"
      );

      if (confirmacion) {
        try {
          axios
            .put(RUTA_SERVIDOR_LIBROS + "/prestamos/" + solicitud.id, {
              idEmpleado: solicitud.idEmpleado,
              codigoUsuario: solicitud.codigoUsuario,
              idMaterial: solicitud.idMaterial,
              cantidad: solicitud.cantidad,
              fechaPrestamo: solicitud.fechaPrestamo,
              idSubsede: solicitud.idSubsede,
              fechaDevolucion: solicitud.fechaDevolucion,
              observacion: "Prestamo aceptado por el bibliotecario",
              estado: 2,
              activo: 1,
              telefono: solicitud.telefono,
            })
            
                      .then(function () {
                        if (solicitud.telefono != null) {
                          window.open(
                            "https://api.whatsapp.com/send?phone=591" +
                              solicitud.telefono +
                              "&text=Hola%20" +
                              nombre +
                              ",nos comunicamos desde la Universidad Nacional del Oriente sede%20" +
                              localStorage.getItem("Subsede") +
                              ', para informarte que tu solicitus del material "' +
                              solicitud.titulo +
                              '" a sido aprobada, y puedes pasar a recogerlo en la fecha prevista.'
                          );
                        }
                      })
                      .then(function () {
                        location.reload();
                      })

                      .catch(function (error) {
                        console.log(error);
                      });
                  }
               
         catch (error) {
          console.log(error);
          // console.log(this.material);
        }
      }
    },

    devolverMaterial(solicitud) {
      const confirmacion = window.confirm(
        "¿Estás seguro de que deseas devolver el material?"
      );

      if (confirmacion) {
        var estado1 = 0;
        if (solicitud.estado == 3) {
          estado1 = 4;
        }
        if (solicitud.estado == 4 || solicitud.estado == 5) {
          estado1 = 3;
        }
        axios
          .put(RUTA_SERVIDOR_LIBROS + "/prestamos/" + solicitud.id, {
            idEmpleado: solicitud.idEmpleado,
            codigoUsuario: solicitud.codigoUsuario,
            idMaterial: solicitud.idMaterial,
            cantidad: solicitud.cantidad,
            idSubsede: solicitud.idSubsede,
            fechaPrestamo: solicitud.fechaPrestamo,
            fechaDevolucion: solicitud.fechaDevolucion,
            observacion: "material devulto",
            estado: estado1,
            activo: 1,
            telefono: solicitud.telefono,
          })
          .then(function () {
            if (estado1 == 3) {
              fetch(
                RUTA_SERVIDOR_LIBROS + "/materiales/" + solicitud.idMaterial
              )
                .then((respuesta) => respuesta.json())
                .then((datosRespuesta) => {
                  axios
                    .put(
                      RUTA_SERVIDOR_LIBROS +
                        "/materiales/" +
                        solicitud.idMaterial,
                      {
                        titulo: datosRespuesta.titulo,
                        copias: datosRespuesta.copias,
                        idTipomaterial: datosRespuesta.idTipomaterial,
                        copiasDisponibles: datosRespuesta.copiasDisponibles + 1,

                        edicion: datosRespuesta.edicion,
                        codigo: datosRespuesta.codigo,
                        idAutor: parseInt(datosRespuesta.idAutor),
                        idEmpleado: datosRespuesta.idEmpleado,
                        idEditorial: parseInt(datosRespuesta.idEditorial),
                        idCarrera: parseInt(datosRespuesta.idCarrera),
                        urlPortada: datosRespuesta.urlPortada,
                        observacion: datosRespuesta.observacion,
                        activo: 1,
                      }
                    )

                    .then(function () {
                      location.reload();
                    })

                    .catch(function (error) {
                      console.log(error);
                    });
                })
                .catch(console.log);
            } else {
              location.reload();
            }
          })
          .catch(function (error) {
            console.log(error);
            // console.log(this.material);
          });
      }
    },
    exportarAExcel() {
      // Crear una tabla HTML con los datos que deseas exportar
      const tabla = document.createElement("table");
      const thead = tabla.createTHead();
      const tbody = tabla.createTBody();

      // Agregar encabezados de columna a la tabla
      const encabezados = [
        "Solicitante",
        "material solicitado",
        "Cantidad",
        "Fecha de préstamo",
        "Fecha de devolución",
        "Estado",
      ];
      const encabezadosRow = thead.insertRow();
      encabezados.forEach((encabezado) => {
        const th = document.createElement("th");
        th.innerText = encabezado;
        encabezadosRow.appendChild(th);
      });

      // Agregar filas de datos a la tabla
      this.datosPaginados.forEach((solicitud) => {
        const fila = tbody.insertRow();
        fila.insertCell().innerText = this.NombreSolicitate[solicitud.id];
        fila.insertCell().innerText = solicitud.titulo;
        fila.insertCell().innerText = solicitud.cantidad;
        fila.insertCell().innerText = solicitud.fechaPrestamo;
        fila.insertCell().innerText = solicitud.fechaDevolucion;
        fila.insertCell().innerText =
          solicitud.estado === 0
            ? "Solicitud rechazada"
            : solicitud.estado === 1
            ? "Pendiente de respuesta"
            : solicitud.estado === 2
            ? "Solicitud aceptada"
            : solicitud.estado === 3
            ? "material devuelto"
            : solicitud.estado === 4
            ? "Pendiente de devolución"
            : solicitud.estado === 5
            ? "Retrasado"
            : "noc";
      });

      // Crear un archivo Blob para la tabla HTML
      const blob = new Blob([tabla.outerHTML], {
        type: "application/vnd.ms-excel",
      });

      // Crear un enlace para descargar el archivo Excel
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "solicitudes.xls";

      // Simular un clic en el enlace para iniciar la descarga
      link.click();
    },

    entregarMaterial(solicitud) {
  const confirmacion = window.confirm(
    "¿Estás seguro de que deseas entregar el material solicitado?"
  );

  if (confirmacion) {
    try {
      var estado1 = 0;
      if (solicitud.estado == 4) {
        estado1 = 2;
      }
      if (solicitud.estado == 2) {
        estado1 = 4;
      }

      // Primera llamada a Axios
      axios
        .put(RUTA_SERVIDOR_LIBROS + "/prestamos/" + solicitud.id, {
          idEmpleado: solicitud.idEmpleado,
          codigoUsuario: solicitud.codigoUsuario,
          idMaterial: solicitud.idMaterial,
          cantidad: solicitud.cantidad,
          idSubsede: solicitud.idSubsede,
          fechaPrestamo: solicitud.fechaPrestamo,
          fechaDevolucion: solicitud.fechaDevolucion,
          observacion: "material entregado por el bibliotecario",
          estado: estado1,
          activo: 1,
          telefono: solicitud.telefono,
        })
        .then(() => {
          // Segunda llamada a Fetch
          return fetch(
            RUTA_SERVIDOR_LIBROS + "/materiales/" + solicitud.idMaterial
          );
        })
        .then((respuesta) => respuesta.json())
        .then((datosRespuesta) => {
          const nuevasCopiasDisponibles = datosRespuesta.copiasDisponibles - 1;

          // Tercera llamada a Axios
          return axios.put(
            RUTA_SERVIDOR_LIBROS + "/materiales/" + solicitud.idMaterial,
            {
              titulo: datosRespuesta.titulo,
              copias: datosRespuesta.copias,
              idTipomaterial: datosRespuesta.idTipomaterial,
              copiasDisponibles: nuevasCopiasDisponibles,
              edicion: datosRespuesta.edicion,
              codigo: datosRespuesta.codigo,
              idAutor: parseInt(datosRespuesta.idAutor),
              idEmpleado: datosRespuesta.idEmpleado,
              idEditorial: parseInt(datosRespuesta.idEditorial),
              idCarrera: parseInt(datosRespuesta.idCarrera),
              urlPortada: datosRespuesta.urlPortada,
              observacion: datosRespuesta.observacion,
              activo: 1,
            }
          );
        })
        .then(() => {
          // Recargar la página después de que todas las operaciones asíncronas se completen
          location.reload();
        })
        .catch(function (error) {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  }
}
,
    imprimirSolicitud(solicitud, nombre) {
      //crear archivo pdf
      var doc = new jsPDF();
      doc.setFontSize(20);
      doc.text(20, 20, "Solicitud de prestamo");
      //colocar logo
      doc.addImage;
      doc.text(180, 20, "UNO");
      doc.setFontSize(12);
      doc.text(20, 30, "Nombre: " + nombre);
      doc.text(20, 40, "Codigo de usuario: " + solicitud.codigoUsuario);
      doc.text(20, 50, "material: " + solicitud.titulo);
      doc.text(20, 60, "Cantidad: " + solicitud.cantidad);
      doc.text(20, 70, "Fecha de prestamo: " + solicitud.fechaPrestamo);
      doc.text(20, 80, "Fecha de devolucion: " + solicitud.fechaDevolucion);
      doc.text(20, 100, "Firma del alumno:______________________");
      doc.text(
        0,
        140,
        "----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------"
      );

      doc.setFontSize(20);
      doc.text(20, 170, "Solicitud de prestamo");
      doc.text(180, 170, "UNO");
      doc.setFontSize(12);
      doc.text(20, 180, "Nombre: " + nombre);
      doc.text(20, 190, "Codigo de usuario: " + solicitud.codigoUsuario);
      doc.text(20, 200, "material: " + solicitud.titulo);
      doc.text(20, 210, "Cantidad: " + solicitud.cantidad);
      doc.text(20, 220, "Fecha de prestamo: " + solicitud.fechaPrestamo);
      doc.text(20, 230, "Fecha de devolucion: " + solicitud.fechaDevolucion);
      doc.text(20, 250, "Firma del alumno:______________________");
      // doc.text(20, 90, "Observacion: " + solicitud.observacion);
      // doc.text(20, 100, "Estado: " + solicitud.estado);
      // doc.text(20, 110, "Subsede: " + solicitud.subsede);
      // doc.text(20, 120, "Telefono: " + solicitud.telefono);
      doc.save("solicitud.pdf");
    },

    imprimirSolicitudes() {
      // Crear un nuevo documento PDF
      var doc = new jsPDF();
      //titulo
      doc.setFontSize(16);
      var title = "Solicitudes";
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
      doc.save("solicitudes.pdf");
    },
  },
};
</script>
<style>
.solicitud-aceptada {
  background-color: rgb(154, 255, 166); /* Color verde claro */
}
.solicitud-rechazada {
  background-color: rgb(255, 182, 182); /* Color verde claro */
}
.retrasado {
  background-color: rgb(255, 87, 87);
}
.pendiente {
  background-color: rgb(157, 222, 255);
}
</style>
