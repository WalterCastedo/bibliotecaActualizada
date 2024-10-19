<template>
  <div class="solicitud px-md-5 px-2">
    Mis Solicitudes
    <div class="form-group text-center">
      <label>Seleccione el estado del prestamo</label><br />
      <select
        v-model="estado"
        @change="filtrarSolicitudes()"
        class="custom-select"
        name=""
        id=""
      >
        <option value="-1">Todos los estados</option>
        <option value="0">Solicitud rechazada</option>
        <option value="1">Pendiente de respuesta</option>
        <option value="2">Solicitud aceptada</option>
        <option value="3">Material devuelto</option>
        <option value="4">Pendiente de devolucion</option>
        <option value="5">Retrasado</option>
      </select>
    </div>
    <br>
    <div class="table-responsive">
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
    
    <table class="table  table-striped border text-center tableMb">
      <thead class="thMb">
        <tr class="trMb">
          <th>material solicitado</th>
          <th>Cantidad</th>
          <th>Fecha de prestamo</th>
          <th>Fecha de devolución</th>
          <th>estado</th>
          <th>Acción</th>
        </tr>
      </thead>
      <tbody>
        <tr class="trMb" v-for="solicitud in datosPaginados" :key="solicitud.id"
        :class="{ 'solicitud-aceptada': solicitud.estado === 2 ,
            'solicitud-rechazada': solicitud.estado === 0,
            'retrasado': solicitud.estado === 5,
            'pendiente': solicitud.estado === 4,
            
             }"
        >
          <td data-titulo="material solicitado: ">{{ solicitud.titulo }}</td>
          <td data-titulo="Cantidad: ">{{ solicitud.cantidad }}</td>
          <td data-titulo="Fecha de prestamo: ">{{ solicitud.fechaPrestamo }}</td>
          <td data-titulo="Fecha de devolución: ">{{ solicitud.fechaDevolucion }}</td>
          <td data-titulo="Estado:">
            <p v-if="solicitud.estado == 0" >
              Solicitud rechazada
            </p>
            <p v-if="solicitud.estado == 1">Pendiente de respuesta</p>
            <p v-if="solicitud.estado == 2" >
              Solicitud aceptada
            </p>
            <p v-if="solicitud.estado == 3">material devuelto</p>
            <p v-if="solicitud.estado == 4">Pendiente de devolucion</p>
            <p v-if="solicitud.estado == 5">Retrasado</p>
          </td>
          <td data-titulo="Acción: " v-if="solicitud.estado == 1 || solicitud.estado == 2">
            <a @click="confirmarEliminarSolicitud(solicitud)" class="btn btn-primary" role="button">Cancelar préstamo</a>

          </td>
          <td data-titulo="Acción: "  v-else>No hay accion disponible</td>
        </tr>
      </tbody>
    </table>
  </div>
  
 
  </div>
</template>

<script>
  export const RUTA_SERVIDOR_ALUMNOS = process.env.VUE_APP_RUTA_API_ALUMNOS;
export const RUTA_SERVIDOR_LIBROS = process.env.VUE_APP_RUTA_API_LIBROS;

import axios from "axios";
export default {
  data() {
    return {
      estado: -1,
      solicitudes: [],
      materials: [],
      preTitulo: {},
      usuario: {
        cod_alum: localStorage.getItem("cod_alum"),
        nombre: localStorage.getItem("nombre"),
        apellidoP: localStorage.getItem("ap_paterno"),
        apellidoM: localStorage.getItem("ap_materno"),
        ci_pasaporte: localStorage.getItem("ci_pasaporte"),
      },
      solicitudesFiltradas: [],
      elementosPorPagina: 8,
      datosPaginados: [],
      paginaActual: 1,
    };
  },
  mounted() {
    this.obtenersolicitudes();
  },

  methods: {
    obtenersolicitudes() {
      fetch(RUTA_SERVIDOR_LIBROS+"/prestamos/" + this.usuario.cod_alum)
        .then((respuesta) => respuesta.json())
        .then((datosRespuesta) => {
          this.solicitudes = datosRespuesta.reverse();
        })
        .then(this.filtrarSolicitudes)
        .catch(console.log);
    },

    filtrarSolicitudes() {
      if (this.estado == -1) {
        this.solicitudesFiltradas = this.solicitudes;
        this.ObtenerDatosPag(1);
      } else {
        this.solicitudesFiltradas = [];
        for (let index = 0; index < this.solicitudes.length; index++) {
          if (this.solicitudes[index].estado === parseInt(this.estado)) {
            this.solicitudesFiltradas.push(this.solicitudes[index]);
            this.ObtenerDatosPag(1);
          }
        }
        if (this.solicitudesFiltradas.length === 0) {
          this.paginaPrevia();
        }
      }
    },
    totalPaginas() {
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
    confirmarEliminarSolicitud(solicitud) {
      if (window.confirm("¿Estás seguro de que deseas cancelar este préstamo?")) {
        this.eliminarSolicitud(solicitud);
      }
    },
    eliminarSolicitud(solicitud) {
      console.log(solicitud);
      axios
        .put(RUTA_SERVIDOR_LIBROS+"/prestamos/" + solicitud.id, {
          idEmpleado: solicitud.idEmpleado,
          codigoUsuario: solicitud.codigoUsuario,
          idMaterial: solicitud.idMaterial,
          idSubsede:solicitud.idSubsede,
          cantidad: solicitud.cantidad,
          fechaPrestamo: solicitud.fechaPrestamo,
          fechaDevolucion: solicitud.fechaDevolucion,
          observacion: "Prestamo cancelado por el alumno",
          estado: solicitud.estado,
          activo: 0,
          telefono:solicitud.telefono,
        })
        .then((response) => {
          console.log(response);
          alert("Préstamo cancelado con éxito.");
          location.reload();
        })
        .catch((error) => {
          console.log(error);
          alert("Hubo un error al cancelar el préstamo.");
        });
    },
    
  },
};
</script>

<style>
@media (max-width:45em){
  .tableMb{
    width: 100%;
    
  }
  .trMb{
    display: flex;
    flex-direction: column;
    border: 1px solid;
    margin-bottom: 1em;
    text-align: left;
  }
  .thMb{
    display: none;
  }
  .tableMb td[data-titulo]{
      display:flex;

  }
  .tableMb td[data-titulo]::before{
      content:attr(data-titulo);
      width: 100px;
      
  }
 
}


</style>
