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
              href="#/Editoriales"
              >Listado</a
            >
          </li>
          <li class="nav-item">
            <a
              v-on:click="valor = -1"
              class="nav-link"
              v-bind:class="crear()"
              href="#/Editoriales"
              name="1"
              >Nuevo</a
            >
          </li>
        </ul>
      </div>
      <div class="card-body bg-white">
        <!-- <CrearLibro v-show="valor==1" variable=1></CrearLibro>
       <CrearLibro v-show="valor==2" variable=2></CrearLibro> -->
        <ListarEditorial v-show="valor == 0"> </ListarEditorial>
        <CrearEditorial
          v-if="valor < 0"
          v-bind:variable="valor"
        ></CrearEditorial>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import ListarEditorial from "@/components/ListarEditorial.vue";
import CrearEditorial from "@/components/CrearEditorial.vue";

export default {
  name: "EditorialesView",

  data() {
    return {
      valor: 0,
      name: 0,
    };
  },
  components: {
    ListarEditorial,
    CrearEditorial,
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
