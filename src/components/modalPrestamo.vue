<template>
  <div class="row modalCompleto">
    <div v-if="solicitudRealizada" class="alert alert-success" align="center">
      Solicitud realizada con éxito.
    </div>
    <div class="col-md-6">
      <div>
        <label
          >Material solicitado: {{ material.nombreMaterial }}. <br />
          Tipo: {{ material.tipo }}. <br />
          Autor: {{ material.autor }}. <br />Editorial:
          {{ material.editorial }}.<br />
          Edición: {{ material.edicion }}</label
        >
      </div>

      <hr />
      <div class="form-group">
        <div v-if="idAdmin == 0 || idAdmin == null || idAdmin == undefined">
          <div>
            <label for=""
              >Nombre Completo: {{ usuario.nombre }} {{ usuario.apellidoP }}
              {{ usuario.apellidoM }}</label
            >
          </div>
          <div class="row">
            <div class="col-6">
              <label for="">Codigo de alumno</label>
              <input
                type="text"
                class="form-control"
                name="codigoUsuario"
                id="codigoUsuario"
                v-bind:value="usuario.cod_alum"
                aria-describedby="helpId"
                placeholder=""
                readonly
              />
            </div>
            <div class="col-6">
              <label for="">Ci/Pasaporte</label>
              <input
                type="password"
                class="form-control"
                name="ci"
                id="ci"
                v-bind:value="usuario.ci_pasaporte"
                aria-describedby="helpId"
                placeholder=""
                readonly
              />
            </div>
          </div>
          <br />

          <div>
            <label for="">Cantidad</label>
            <input
              type="number"
              class="form-control"
              name="cantidad"
              id="cantidad"
              disabled="true"
              v-bind:value="1"
              aria-describedby="helpId"
              placeholder=""
            />
          </div>
        </div>
        <div v-else>
          <div>
            <label for=""
              >Nombre Completo: {{ nombre }} {{ apellidoP }}
              {{ apellidoM }}</label
            >
          </div>
          <div class="row">
            <div class="col">
              <label for="">Codigo de alumno</label>
              <input
                type="text"
                class="form-control"
                name="codigoUsuario1"
                id="codigoUsuario1"
                v-on:keyup="buscarAlumno()"
                v-model="cod_alum"
                aria-describedby="helpId"
                placeholder=""
              />
            </div>
          </div>
          <br />

          <div>
            <label for="">Cantidad</label>
            <input
              type="number"
              class="form-control"
              name="cantidad1"
              id="cantidad1"
              disabled="true"
              v-bind:value="1"
              aria-describedby="helpId"
              placeholder=""
            />
          </div>
        </div>

        <div>
          <label for="">Fecha</label>
          <input
            type="date"
            v-model="fechas.inicio"
            class="form-control"
            aria-describedby="helpId"
            placeholder=""
            required
          />
        </div>
        <div class="row">
          <div class="col-6">
            <label for="">Hora de inico de prestamo</label>
            <input
              type="time"
              v-model="horas.horaInicio"
              class="form-control"
              aria-describedby="helpId"
              placeholder=""
              required
            />
          </div>
          <div class="col-6">
            <label for="">Hora de fin del prestamo </label>
            <input
              type="time"
              v-model="horas.horaFin"
              class="form-control"
              aria-describedby="helpId"
              placeholder=""
              required
            />
          </div>
        </div>
        <div>
          <label for="">Numero de whatsapp</label>
          <br />
          <input
            class="col-12"
            type="number"
            aria-describedby="helpId"
            placeholder="Notificara la confirmacion de la solicitud"
            v-model="telefono"
          />
        </div>
        <br />
      </div>
      <div v-if="idAdmin > 0">
        <button
          class="col-12 btn align-items-center btn-info"
          @click="VerificarAlumno(material.id)"
          id="solicitar"
          :disabled="desabilitado"
          v-bind:style="{ backgroundColor: colorBoton }"
        >
          {{ botonTexto }}
        </button>
      </div>
      <div v-else>
        <button
          class="col-12 btn align-items-center btn-info"
          @click="VerificarLogin(material.id)"
          id="solicitar"
          :disabled="desabilitado"
          v-bind:style="{ backgroundColor: colorBoton }"
        >
          {{ botonTexto }}
        </button>
      </div>

      <br />
    </div>

    <img class="col-md-6" v-bind:src="'' + material.urlPortada" />
  </div>
</template>

<script>
import axios from "axios";
export const RUTA_SERVIDOR_ALUMNOS = process.env.VUE_APP_RUTA_API_ALUMNOS;
export const RUTA_SERVIDOR_LIBROS = process.env.VUE_APP_RUTA_API_LIBROS;

export default {
  data() {
    return {
      colorBoton: "#56CCFF",
      botonTexto: "Solicitar material",
      desabilitado: false,

      idAdmin: localStorage.getItem("id"),
      usuario: {
        cod_alum: localStorage.getItem("cod_alum"),
        nombre: localStorage.getItem("nombre"),
        apellidoP: localStorage.getItem("ap_paterno"),
        apellidoM: localStorage.getItem("ap_materno"),
        ci_pasaporte: localStorage.getItem("ci_pasaporte"),
      },

      cod_alum: "",
      nombre: "",
      apellidoP: "",
      apellidoM: "",
      solicitudRealizada: false,
      fechas: {
        inicio: "",
        fin: "",
      },
      horas: {
        horaInicio: "",
        horaFin: "",
      },
      telefono: null,
    };
  },

  props: {
    material: {},
  },

  methods: {
    deudas(codigoAlumno, material) {
      fetch(RUTA_SERVIDOR_LIBROS + "/prestamos/deuda/" + codigoAlumno)
        .then((respuesta) => respuesta.json())
        .then((datosRespuesta) => {
          if (datosRespuesta != "") {
            this.desabilitado = false;
            this.botonTexto = "Solicitar material";
            alert("El alumno tiene material pendiente de devolución");
          } else {
            this.prestamo(material);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    prestamo(material) {
      var horaInicio = this.horas.horaInicio;
      var fechaPrestamo = this.formatFechaHora(this.fechas.inicio, horaInicio);
      var horaFin = this.horas.horaFin;
      var fechaDevolucion = this.formatFechaHora(this.fechas.inicio, horaFin);

      console.log('Fecha de préstamo:', fechaPrestamo);
      console.log('Fecha de devolución:', fechaDevolucion);

      fetch(RUTA_SERVIDOR_LIBROS + "/materialesDisponibles/" + material + "/" + fechaPrestamo + "/" + fechaDevolucion)
        .then((respuesta) => respuesta.json())
        .then((datosRespuesta) => {
          console.log('Disponibilidad del material:', datosRespuesta);
          if (datosRespuesta > 0) {
            axios
              .post(RUTA_SERVIDOR_LIBROS + "/prestamos/", {
                idEmpleado: parseInt(localStorage.getItem("id")),
                codigoUsuario: localStorage.getItem("cod_alum"),
                idMaterial: material,
                cantidad: 1,
                fechaPrestamo: fechaPrestamo,
                fechaDevolucion: fechaDevolucion,
                observacion: localStorage.getItem("acceso") == 2 ? "Préstamo aceptado por el bibliotecario" : "null",
                estado: localStorage.getItem("acceso") == 2 ? 2 : 1,
                activo: 1,
                telefono: this.telefono,
                idSubsede: localStorage.getItem("idSubsede"),
              })
              .then(
                function (response) {
                  console.log(response);
                },
                (this.botonTexto = "Solicitud enviada"),
                (this.colorBoton = "#00D12F"),
                (this.solicitudRealizada = true)
              )
              .catch(function (error) {
                console.log(error);
              });
          } else {
            alert("No hay copias disponibles para esas horas en específico");
          }
        })
        .catch(console.log);
    },

    formatFechaHora(fecha, hora) {
      return `${fecha} ${hora}:00`;
    },

    VerificarLogin(material) {
      console.log('Verificando login...');
      console.log('Fecha de inicio:', this.fechas.inicio);
      console.log('Fecha de fin:', this.fechas.fin);
      console.log('Teléfono:', this.telefono);

      if (
        this.fechas.inicio.trim() === "" ||
        this.telefono === null ||
        this.telefono.trim() === ""
      ) {
        alert("Por favor, complete todos los campos antes de solicitar el préstamo.");
        return;
      }

      fetch(
        RUTA_SERVIDOR_ALUMNOS +
          "/alumno/" +
          localStorage.getItem("cod_alum") +
          "/" +
          localStorage.getItem("ci_pasaporte")
      )
        .then((respuesta) => respuesta.json())
        .then((datosRespuesta) => {
          if (datosRespuesta != "") {
            var fechaActual = new Date();
            fechaActual.setUTCHours(0, 0, 0, 0);

            var fechaInicio = new Date(this.fechas.inicio + 'T00:00:00');
            fechaInicio.setUTCHours(0, 0, 0, 0);

            if (fechaInicio >= fechaActual) {
              var horaActual = fechaActual.getHours();
              var horaInicio = parseInt(this.horas.horaInicio.split(":")[0]);
              var horaFin = parseInt(this.horas.horaFin.split(":")[0]);

              if (fechaInicio.getTime() === fechaActual.getTime() && horaInicio >= horaActual) {
                alert("La fecha debe ser mayor o igual a la fecha actual");
              } else if (
                horaInicio >= 8 &&
                horaInicio <= 19 &&
                horaFin >= 8 &&
                horaFin <= 19 &&
                horaInicio < horaFin
              ) {
                this.prestamo(material);
              } else {
                alert("La hora de inicio y fin deben estar entre las 8:00 y las 19:00.");
              }
            } else {
              alert("La fecha debe ser mayor o igual a la fecha actual");
            }
          }
        })
        .catch(() => {
          localStorage.setItem("acceso", 0);
          localStorage.setItem("cod_alum", "");
          localStorage.setItem("ci_pasaporte", "");
          localStorage.setItem("nombre", "");
          localStorage.setItem("ap_paterno", "");
          localStorage.setItem("ap_materno", "");
          localStorage.setItem("sede", "");
          localStorage.setItem("id", 0);
          location.reload();
          this.$router.push("/");
        });
    },

    VerificarAlumno(material) {
      this.elemento = document.getElementById("solicitar");
      fetch(RUTA_SERVIDOR_ALUMNOS + "/alumno/" + this.cod_alum)
        .then((respuesta) => respuesta.json())
        .then((datosRespuesta) => {
          if (datosRespuesta != "") {
            var fechaActual = new Date();
            fechaActual.setUTCHours(0, 0, 0, 0);

            var fechaInicio = new Date(this.fechas.inicio + 'T00:00:00');
            fechaInicio.setUTCHours(0, 0, 0, 0);

            if (fechaInicio >= fechaActual) {
              var horaActual = fechaActual.getHours();
              var horaInicio = parseInt(this.horas.horaInicio.split(":")[0]);
              var horaFin = parseInt(this.horas.horaFin.split(":")[0]);

              if (fechaInicio.getTime() === fechaActual.getTime() && horaInicio >= horaActual) {
                alert("La fecha debe ser mayor o igual a la fecha actual");
              } else if (
                horaInicio >= 8 &&
                horaInicio <= 19 &&
                horaFin >= 8 &&
                horaFin <= 19 &&
                horaInicio < horaFin
              ) {
                this.prestamo(material);
              } else {
                alert("La hora de inicio y fin deben estar entre las 8:00 y las 19:00.");
              }
            } else {
              alert("La fecha debe ser mayor o igual a la fecha actual");
            }
          }
        })
        .catch(() => {
          alert("Existen datos incorrectos");
        });
    },

    buscarAlumno() {
      fetch(RUTA_SERVIDOR_ALUMNOS + "/alumno/" + this.cod_alum)
        .then((respuesta) => respuesta.json())
        .then((datosRespuesta) => {
          this.nombre = datosRespuesta.nombre;
          this.apellidoP = datosRespuesta.ap_paterno;
          this.apellidoM = datosRespuesta.ap_materno;
          localStorage.setItem("cod_alum", datosRespuesta.cod_alum);
        })
        .catch(() => {
          this.nombre = "Usuario no encontrado";
          this.apellidoP = "";
          this.apellidoM = "";
          localStorage.setItem("cod_alum", "");
        });
    },
  },
};
</script>


<style></style>
