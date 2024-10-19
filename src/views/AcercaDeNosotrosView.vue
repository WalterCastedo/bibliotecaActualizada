<template>
  <div class="container mx-auto mt-5">
    <div class="card text-center">
      <div class="card-header text-white">
        <ul class="nav nav-tabs card-header-tabs">
          <li class="nav-item">
            <a
              @click="valor = 0"
              :class="{ 'nav-link': true, 'active': valor === 0 }"
              href="#/AcercaDeNosotros"
            >Misión y Visión</a>
          </li>
          <li class="nav-item">
            <a
              @click="valor = -1"
              :class="{ 'nav-link': true, 'active': valor === -1 }"
              href="#/AcercaDeNosotros"
            >Derechos y Deberes</a>
          </li>
          <li class="nav-item">
            <a
              @click="valor = 1"
              :class="{ 'nav-link': true, 'active': valor === 1 }"
              href="#/AcercaDeNosotros"
            >Objetivos</a>
          </li>
          <li class="nav-item">
            <a
              @click="valor = 2"
              :class="{ 'nav-link': true, 'active': valor === 2 }"
              href="#/AcercaDeNosotros"
            >Servicios</a>
          </li>
        </ul>
      </div>
      <div class="card-body ">
        <transition name="fade" mode="out-in">
          <component :is="currentComponent"></component>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import Mision from "@/components/Mision.vue";
import Derecho from "@/components/Derecho.vue";
import Servicio from "@/components/Servicio.vue";
import Objetivo from "@/components/Objetivo.vue";

export default {
  name: "AcercaDeNosotrosView",
  data() {
    return {
      valor: 0,
    };
  },
  components: {
    Mision,
    Derecho,
    Servicio,
    Objetivo,
  },
  mounted() {
    if (![1, 2].includes(Number(localStorage.getItem("acceso")))) {
      this.$router.push({ name: "home" });
    }
  },
  created() {
    this.valor = 0;
  },
  computed: {
    currentComponent() {
      return this.valor === 0 ? "Mision" : this.valor === -1 ? "Derecho" : this.valor === 1 ? "Objetivo" : "Servicio";
    },
  },
};
</script>


