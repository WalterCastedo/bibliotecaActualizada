<template>
  <div class="container mx-auto mt-5">

    <div class="card text-cente">
      <div class="card-header">
        <ul class="nav nav-tabs card-header-tabs">
          <li class="nav-item">
            <a
              v-on:click="valor = 0"
              class="nav-link"
              v-bind:class="listar()"
              aria-current="true"
              href="#/Tipos"
              >Listado</a
            >
          </li>
          <li class="nav-item">
            <a
              v-on:click="valor = -1"
              class="nav-link"
              v-bind:class="crear()"
              href="#/Tipos"
              name="1"
              >Nuevo</a
            >
          </li>
        </ul>
      </div>
      <div class="card-body bg-white">
   
        <ListarTipo v-show="valor == 0"> </ListarTipo>
        <CrearTipo
          v-if="valor < 0"
          v-bind:variable="valor"
        ></CrearTipo>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import ListarTipo from "@/components/ListarTipos.vue";
import CrearTipo from "@/components/CrearTipo.vue";

export default {
  name: "AdministradoresView",

  data() {
    return {
      valor: 0,
      name: 0,
      
    };
  },
  components: {
    ListarTipo,
    CrearTipo,
  },
 
  mounted: function () {
    if (localStorage.getItem("acceso") != 2) {
      this.$router.push({ name: "home" });
    }
  },

  created: function () {
    this.valor = 0;
  },

  methods: {
    listar() {
      return this.valor === 0 ? "active" : "";
    },
    crear() {
      return this.valor === -1 ? "active" : "";
    },
  },
};
</script>
