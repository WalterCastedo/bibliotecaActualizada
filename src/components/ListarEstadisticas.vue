<template>
  <div class="align-items-center">
    <div class="row align-items-center px-md-5 px-lg-5">
      <div
        align="center"
        class="px-md-5 px-lg-5 align-items-center-sm-12 col-md-6"
      >
        <div align="center">Material Fisico : {{ totalesM }}</div>
        <Doughnut
          v-if="chartDataL.labels.length"
          id="my-chart-id"
          :options="chartOptions"
          :data="chartDataL"
        />
      </div>
      <div align="center" class="px-md-5 px-lg-5 col-sm-12 col-md-6">
        <div align="center">Material Virtual {{ totalesP }}</div>
        <Doughnut
          v-if="chartDataP.labels.length"
          id="my-chart-id"
          :options="chartOptions"
          :data="chartDataP"
        />
      </div>

      <div
        v-if="dataBar.datasets[0].data.length"
        class="px-md-5 px-lg-5 col-sm-12 col-md-12"
      >
        <div align="center">
          Material Total: {{ this.totalesM }} / Disponible: {{ this.totalesD }}
        </div>
        <Bar :options="chartOptionsBar" :data="dataBar" />
       
        <Bar :options="chartOptionsBarTipos" :data="dataBarTipos" />
       
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
} from "chart.js";
import { Doughnut } from "vue-chartjs";
ChartJS.register(
  Title,
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);
export const RUTA_SERVIDOR_ALUMNOS = process.env.VUE_APP_RUTA_API_ALUMNOS;
export const RUTA_SERVIDOR_LIBROS = process.env.VUE_APP_RUTA_API_LIBROS;

export default {
  name: "ListarEstadisticas",

  components: {
    Bar,
    Doughnut,
  },

  data() {
    return {
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
      Materiales: [],
      tipos: [],

      totalesM: 0,
      totalesD: 0,
      totalesP: 0,
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

      dataBarTipos: {
        labels: [],
        datasets: [
          {
            backgroundColor: [],
            label: ["Tipos de Material"],
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
      chartOptionsBarTipos: {
        indexAxis: "x",
        maintainAspectRatio: true,
        responsive: true,
       
      },
    };
  },

  async mounted() {
    await this.consultarMaterlales();
    await this.consultarCantidad();
   
  },

  methods: {
    consultarCantidad() {
      fetch(RUTA_SERVIDOR_LIBROS + "/cantidadMateriales/" + this.subsede)
        .then((respuesta) => respuesta.json())
        .then((datosRespuesta) => {
          if (typeof datosRespuesta[0].success === "undefined") {
            for (let index = 0; index < datosRespuesta[1].length; index++) {
              if (
                datosRespuesta[1][index][0] == "Fisioterapia y Kinesiología"
              ) {
                this.chartDataL.labels.push(
                  "Fis. & Kin." + " : " + datosRespuesta[1][index][1]
                );
              } else if (
                datosRespuesta[1][index][0] == "Bioquímica y farmacia"
              ) {
                this.chartDataL.labels.push(
                  "Bio. & Far." + " : " + datosRespuesta[1][index][1]
                );
              } else if (
                datosRespuesta[1][index][0] == "Ingeniería de sistemas"
              ) {
                this.chartDataL.labels.push(
                  "Ing. sistem." + " : " + datosRespuesta[1][index][1]
                );
              } else {
                this.chartDataL.labels.push(
                  datosRespuesta[1][index][0] +
                    " : " +
                    datosRespuesta[1][index][1]
                );
              }
              this.chartDataL.datasets[0].data.push(
                datosRespuesta[1][index][1]
              );

              this.totalesM += datosRespuesta[1][index][1];
              this.totalesD += datosRespuesta[2][index][1];
              if (
                datosRespuesta[1][index][0] == "Fisioterapia y Kinesiología"
              ) {
                this.dataBar.labels.push("Fis. & Kin.");
              } else if (
                datosRespuesta[1][index][0] == "Bioquímica y farmacia"
              ) {
                this.dataBar.labels.push("Bio. & Far.");
              } else if (
                datosRespuesta[1][index][0] == "Ingeniería de sistemas"
              ) {
                this.dataBar.labels.push("Ing. sistem.");
              } else {
                this.dataBar.labels.push(datosRespuesta[1][index][0]);
              }

              this.dataBar.datasets[0].data.push(datosRespuesta[1][index][1]);
              this.dataBar.datasets[1].data.push(datosRespuesta[2][index][1]);
            }
            this.totalesP = 0;
            for (let index = 0; index < datosRespuesta[0].length; index++) {
              if (
                datosRespuesta[0][index][0] == "Fisioterapia y Kinesiología"
              ) {
                this.chartDataP.labels.push(
                  "Fis. & Kin." + " : " + datosRespuesta[0][index][1]
                );
              } else if (
                datosRespuesta[0][index][0] == "Bioquímica y farmacia"
              ) {
                this.chartDataP.labels.push(
                  "Bio. & Far." + " : " + datosRespuesta[0][index][1]
                );
              } else if (
                datosRespuesta[0][index][0] == "Ingeniería de sistemas"
              ) {
                this.chartDataP.labels.push(
                  "Ing. sistem." + " : " + datosRespuesta[0][index][1]
                );
              } else {
                this.chartDataP.labels.push(
                  datosRespuesta[0][index][0] +
                    " : " +
                    datosRespuesta[0][index][1]
                );
              }

              this.chartDataP.datasets[0].data.push(
                datosRespuesta[0][index][1]
              );
              this.totalesP = this.totalesP + datosRespuesta[0][index][1];
            }
          }
          this.dataBar.datasets[0].label.push("Material Total");
          this.dataBar.datasets[1].label.push("Material Disponible");
        })
        .catch(console.log);
    },

    consultarTipo() {
      return fetch(RUTA_SERVIDOR_LIBROS + "/tipos/")
        .then((respuesta) => respuesta.json())
        .then((datosRespuesta) => {
          if (typeof datosRespuesta[0].success === "undefined") {
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
              this.Materiales = datosRespuesta;
              this.tipos.cantidad = [];
              this.Materiales.forEach((material) => {
                const tipoAsociado = this.tipos.find(
                  (tipo) => tipo.id == material.idTipomaterial
                );
                if (tipoAsociado) {
                  material.tipo = tipoAsociado.tipo;
                  tipoAsociado.cantidad = (tipoAsociado.cantidad || 0) + 1;
                }
              });


              this.tipos.cantidad = this.tipos.map((tipo) => (tipo.cantidad || 0))

              const labelsConCantidad = this.tipos.map((tipo, index) => {
            return `${tipo.tipo} : ${this.tipos.cantidad[index]}`;
          }); 
          this.dataBarTipos.labels = labelsConCantidad;
          this.dataBarTipos.datasets[0].data = this.tipos.cantidad;

          // Generar colores aleatorios
          const coloresAleatorios = this.generarColoresAleatorios(this.tipos.length);
          this.dataBarTipos.datasets[0].backgroundColor = coloresAleatorios;
        }
      })
          .catch(console.log);
      });
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
}
  },
};
</script>
