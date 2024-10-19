<template>
  <div class="px-md-5 px-2">
    <br />
    <!-- <div class="form-group" align="center">
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
          <label>Buscar por codigo</label>
          <input
            v-model="busquedaCodigo"
            @keyup="filtrarSolicitudes()"
            type="text"
            class="form-control"
            placeholder="Buscar por Codigo"
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
    <br /> -->

    <div class="row">
      <div class="col-12 px-md-5">
        <LineChartGenerator
          :options="chartOptionsMeses"
          :data="chartDataMeses"
          :width="width"
          :height="height"
        />
      </div>

      <div class="col-sm-6 col-md-6 mt-5">
        <div align="center">Prestamos totales : {{ totalesM }}</div>
        <Doughnut
          v-if="chartDataL.labels.length"
          id="my-chart-id"
          :options="chartOptions"
          :data="chartDataL"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
} from "chart.js";
import { Doughnut } from "vue-chartjs";
import { Line as LineChartGenerator } from "vue-chartjs";
ChartJS.register(
  Title,
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement
);

import axios from "axios";
export const RUTA_SERVIDOR_ALUMNOS = process.env.VUE_APP_RUTA_API_ALUMNOS;
export const RUTA_SERVIDOR_LIBROS = process.env.VUE_APP_RUTA_API_LIBROS;
export default {
  name: "ListarEstadisticas",

  components: {
    Bar,
    Doughnut,
    LineChartGenerator,

    // modalPrestamo,
    // Loading
    // CrearLibro,
    // Carousel,
    // Slide
  },
  props: {
    chartId: {
      type: String,
      default: "line-chart",
    },
    datasetIdKey: {
      type: String,
      default: "label",
    },
    width: {
      type: Number,
      default: 400,
    },
    height: {
      type: Number,
      default: 400,
    },
    cssClasses: {
      default: "",
      type: String,
    },
    styles: {
      type: Object,
      default: () => {},
    },
    plugins: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      fechaInicio: "",
      fechaFin: "",
      estado: -1,
      solicitudes: [],
      materiales: [],
      preTitulo: {},

      solicitudesFiltradas: [],
      NombreSolicitate: [],
      busquedaCodigo: "",
      subsede: localStorage.getItem("idSubsede"),
      acceso: localStorage.getItem("acceso"),
      chartDataL: {
        labels: [],
        datasets: [
          {
            backgroundColor: [
              "#41B883",
              "#E46651",
              "#00D8FF",
              "#DD1B16",
              "#E412351",
              "#45D8FF",
              "#aa1B16",
            ],
            data: [],
          },
        ],
      },
      chartDataP: {
        labels: [],
        datasets: [
          {
            backgroundColor: [
              "#41B883",
              "#E46651",
              "#00D8FF",
              "#DD1B16",
              "#E412351",
              "#45D8FF",
              "#aa1B16",
            ],
            data: [],
          },
        ],
      },

      totalesM: 0,
      totalesD: 0,
      dataBar: {
        labels: [],
        datasets: [
          {
            backgroundColor: "#33C4FF",
            label: [],
            data: [],
          },
          {
            backgroundColor: "#54FF7E",
            label: [],
            data: [],
          },
        ],
      },

      chartOptions: {
        maintainAspectRatio: true,
        responsive: true,
        plugins: {
          chartAreaBorder: {
            borderColor: "red",
            borderWidth: 2,
            borderDash: [5, 5],
            borderDashOffset: 2,
          },
        },
      },
      chartOptionsBar: {
        indexAxis: "y",
        maintainAspectRatio: true,
        responsive: true,
      },
      //////
      // Almacenar las solicitudes aceptadas por mes
      solicitudesAceptadasPorMes: [],

      // Almacenar las solicitudes rechazadas por mes
      solicitudesRechazadasPorMes: [],

      chartDataMeses: {
        labels: [
          "Enero",
          "Febrero",
          "Marzo",
          "Abril",
          "Mayo",
          "Junio",
          "Julio",
          "Agosto",
          "Septiembre",
          "Octubre",
          "Noviembre",
          "Diciembre",
        ],
        datasets: [
          {
            label: "Solicitudes aceptadas",
            backgroundColor: "rgba(75, 192, 192, 0.6)", // Cambia el color de fondo
            borderColor: "rgba(75, 192, 192, 1)", // Cambia el color de la línea
            borderWidth: 1, // Ancho de la línea
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          },
          {
            label: "Solicitudes Rechazadas",
            backgroundColor: "rgba(255, 0, 0, 0.6)", // Cambia el color de fondo
            borderColor: "rgba(255, 0, 0, 1)", // Cambia el color de la línea
            borderWidth: 1, // Ancho de la línea
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          },
        ],
      },
      chartOptionsMeses: {
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },

  beforeMount() {
    this.obtenersolicitudes();
  },

  methods: {
    obtenersolicitudes() {
      fetch(
        RUTA_SERVIDOR_LIBROS + "/prestamo/" + localStorage.getItem("idSubsede")
      )
        .then((respuesta) => respuesta.json())
        .then((datosRespuesta) => {
          this.solicitudes = datosRespuesta.reverse();
          const solicitudesAceptadas = datosRespuesta.filter(
            (solicitud) =>
              solicitud.estado === 2 ||
              solicitud.estado === 3 ||
              solicitud.estado === 4 ||
              solicitud.estado === 5
          );

          const solicitudesRechazadas = datosRespuesta.filter(
            (solicitud) => solicitud.estado === 0 // Cambiar el estado al que corresponde a "Solicitud rechazada"
          );

          // Almacenar las solicitudes aceptadas y rechazadas en variables separadas
          this.solicitudesAceptadas = solicitudesAceptadas;
          this.solicitudesRechazadas = solicitudesRechazadas;

          // Agrupar las solicitudes por mes
          this.solicitudesAceptadasPorMes =
            this.groupSolicitudesPorMes(solicitudesAceptadas);
          this.solicitudesRechazadasPorMes = this.groupSolicitudesPorMes(
            solicitudesRechazadas
          );
        })
        .then(() => {
          const cantidadAceptadasPorMes = Object.values(
            this.solicitudesAceptadasPorMes
          ).map((mes) => mes.length);
          this.chartDataMeses.datasets[0].data.map((data, index) => {
            this.chartDataMeses.datasets[0].data[index] =
              cantidadAceptadasPorMes[index];
          });

          const cantidadRechazadaPorMes = Object.values(
            this.solicitudesRechazadasPorMes
          ).map((mes) => mes.length);
          this.chartDataMeses.datasets[1].data.map((data, index) => {
            this.chartDataMeses.datasets[1].data[index] =
              cantidadRechazadaPorMes[index];
          });

          console.log(this.chartDataMeses);
          for (let index = 0; index < this.solicitudes.length; index++) {
            this.asignarNombre(
              this.solicitudes[index].codigoUsuario,
              this.solicitudes[index].id
            );
          }
        })
        .catch(console.log);
    },

    groupSolicitudesPorMes(solicitudes) {
      const solicitudesPorMes = {};

      const yearActual = new Date().getFullYear();

      // Inicializar el objeto con todas las fechas de los meses del año actual
      for (let month = 0; month < 12; month++) {
        const mesKey = `${yearActual}-${month + 1}`;
        solicitudesPorMes[mesKey] = [];
      }

      solicitudes.forEach((solicitud) => {
        const fechaPrestamo = new Date(solicitud.fechaPrestamo);
        const mes = fechaPrestamo.getMonth();
        const year = fechaPrestamo.getFullYear();

        if (year === yearActual) {
          const mesKey = `${year}-${mes + 1}`;

          solicitudesPorMes[mesKey].push(solicitud);
        }
      });

      return solicitudesPorMes;
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

    filtrarSolicitudes() {
      // Filtrar por estado
      let solicitudesFiltradas = this.solicitudes.filter((solicitud) => {
        return this.estado == -1 || solicitud.estado === parseInt(this.estado);
      });
      solicitudesFiltradas = solicitudesFiltradas.filter((solicitud) => {
        // Comprobar si el código de usuario o el título contiene la cadena de búsqueda
        return (
          solicitud.estado === 2 ||
          solicitud.estado === 3 ||
          solicitud.estado === 4 ||
          solicitud.estado === 5
        );
      });
      if (this.fechaInicio !== "" && this.fechaFin !== "") {
        solicitudesFiltradas = solicitudesFiltradas.filter((solicitud) => {
          return (
            solicitud.fechaPrestamo >= this.fechaInicio &&
            solicitud.fechaPrestamo <= this.fechaFin
          );
        });
      }
      // Filtrar por fecha de préstamo si se proporcionan fechas válidas
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
        solicitudesFiltradas = solicitudesFiltradas.filter((solicitud) => {
          // Comprobar si el código de usuario o el título contiene la cadena de búsqueda
          return (
            solicitud.codigoUsuario.includes(this.busquedaCodigo) ||
            solicitud.titulo.includes(this.busquedaCodigo)
          );
        });
      } else {
        // Si no hay cadena de búsqueda, mantener los filtros anteriores
        // (no es necesario cambiar nada aquí)
      }

      // El resto del código permanece igual
      this.solicitudesFiltradas = solicitudesFiltradas;

      this.consultarCantidad();
    },

    consultarCantidad() {
      this.totalesM = 0;

      const repetir = {};
      const nombresUnicos = []; // Un arreglo para almacenar los nombres únicos

      for (let i = 0; i < this.solicitudesFiltradas.length; i++) {
        const obj = this.solicitudesFiltradas[i];
        const nombre = obj.titulo;

        if (repetir[nombre]) {
          repetir[nombre]++;
        } else {
          repetir[nombre] = 1;
          nombresUnicos.push(nombre); // Agregar el nombre único al arreglo
        }
        this.totalesM++;
      }
      this.chartDataL.datasets[0].data = [];
      this.chartDataL.labels = [];
      this.chartDataL.datasets[0].backgroundColor = [];
      const coloresAleatorios = this.generarColoresAleatorios(
        nombresUnicos.length
      );

      // Limpia el array de labels antes de agregar el nuevo resultado
      this.chartDataL.labels = nombresUnicos.map(
        (nombre) => `${nombre}: ${repetir[nombre]}`
      ); // Almacena los nombres únicos
      this.chartDataL.datasets[0].data = nombresUnicos.map(
        (nombre) => repetir[nombre]
      ); // Almacena la cantidad de repeticiones para cada nombre

      this.chartDataL.datasets[0].backgroundColor = coloresAleatorios;
    },
    generarColoresAleatorios(cantidad) {
      const colores = [];
      for (let i = 0; i < cantidad; i++) {
        const r = Math.floor(Math.random() * 100) + 155; // Componente rojo en el rango de 155 a 255
        const g = Math.floor(Math.random() * 100) + 155; // Componente verde en el rango de 155 a 255
        const b = Math.floor(Math.random() * 100) + 155; // Componente azul en el rango de 155 a 255

        const color = `rgb(${r},${g},${b})`;
        colores.push(color);
      }

      return colores;
    },
  },
};
</script>
