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
              href="#/Bibliotecas"
              >Listado</a
            >
          </li>
          <li v-if="acceso==2" class="nav-item">
            <a
              v-on:click="valor = -1"
              class="nav-link"
              v-bind:class="crear()"
              href="#/Bibliotecas"
              name="1"
              >Nuevo</a
            >
          </li>
        </ul>
      </div>
      <div class="card-body bg-white">
   
        <ListarBiblioteca v-show="valor == 0"> </ListarBiblioteca>
        <CrearBiblioteca
          v-if="valor < 0"
          v-bind:variable="valor"
        ></CrearBiblioteca>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import ListarBiblioteca from "@/components/ListarBiblioteca.vue";
import CrearBiblioteca from "@/components/CrearBiblioteca.vue";

export default {
  name: "BibliotecasView",

  data() {
    return {
      valor: 0,
      name: 0,
      acceso:localStorage.getItem("acceso") 
    };
  },
  components: {
    ListarBiblioteca,
    CrearBiblioteca,
  },
 
  mounted: function () {
    if (localStorage.getItem("acceso") != 2 && localStorage.getItem("acceso") !=1 ) {
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
