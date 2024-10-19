<template>
  <div class="container mx-auto mt-5">
    <div class="card text-cente">
      <div class="card-header">
        <ul class="nav nav-tabs card-header-tabs">
          <div v-if="acceso == 2">
            <li class="nav-item">
              <a
                v-on:click="valor = 1"
                class="nav-link"
                v-bind:class="datos()"
                href="#Solicitudes"
                name="3"
                >Datos</a
              >
            </li>
          </div>
          <li class="nav-item">
            <a
              v-on:click="valor = 0"
              class="nav-link"
              v-bind:class="listar()"
              aria-current="true"
              href="#Solicitudes"
              >Listado</a
            >
          </li>
        </ul>
      </div>
      <div class="card-body bg-white">
        <div v-if="acceso == 2">
          <ListarEstadisticasS v-show="valor == 1" v-bind:variable="valor" />
        </div>

        <div v-if="acceso == 1">
          <Listarsolicitudes v-show="valor == 0" v-bind:variable="valor" />
        </div>
        <div v-else>
          <ListarsolicitudesAdmin v-show="valor == 0" v-bind:variable="valor" />
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>

<script>
// @ is an alias to /src
import ListarEstadisticasS from "@/components/ListarEstadisticasSolicitudes.vue";
import Listarsolicitudes from "@/components/ListasolicitudesComponent.vue";
import ListarsolicitudesAdmin from "@/components/ListasolicitudesAdmin.vue";
import ListarEstadisticas from "@/components/ListarEstadisticas.vue";

//import Vue from 'vue';

export default {
  name: "solicitudesView",

  data() {
    return {
      valor: 0,
      acceso: localStorage.getItem("acceso"),
      obtenerLibros: [],
    };
  },
  components: {
    Listarsolicitudes,
    ListarsolicitudesAdmin,
    ListarEstadisticas,
    ListarEstadisticasS,
  },

  mounted: function () {
    if (localStorage.getItem("acceso") == 0) {
      this.$router.push({ name: "home" });
    }
  },

  methods: {
    listar() {
      return this.valor === 0 ? "active" : "";
    },
    datos() {
      return this.valor === 1 ? "active" : "";
    },
    editar() {
      return this.valor != 0 && this.valor != -1 ? "active" : "";
    },
    variableLibro(value) {
      this.valor = value;
    },
  },
};
</script>

