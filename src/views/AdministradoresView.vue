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
              href="#/Administradores"
              >Listado</a
            >
          </li>
          <li class="nav-item">
            <a
              v-on:click="valor = -1"
              class="nav-link"
              v-bind:class="crear()"
              href="#/Administradores"
              name="1"
              >Nuevo</a
            >
          </li>
        </ul>
      </div>
      <div class="card-body bg-white">
   
        <ListarAdmin v-show="valor == 0"> </ListarAdmin>
        <CrearAdmin
          v-if="valor < 0"
          v-bind:variable="valor"
        ></CrearAdmin>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import ListarAdmin from "@/components/ListarAdmin.vue";
import CrearAdmin from "@/components/CrearAdmin.vue";

export default {
  name: "AdministradoresView",

  data() {
    return {
      valor: 0,
      name: 0,
      
    };
  },
  components: {
    ListarAdmin,
    CrearAdmin,
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
