<template>
  <div class="home">
    <Login class="login"/>
  </div>
</template>

<script>
import Login from "@/components/loginComponent.vue";
export default {
  name: "HomeView",
  components: {
    Login,
  },
  mounted: function () {
    if (localStorage.getItem("acceso") !=0) {
      this.$router.push({ name: "materiales" });
    }
  },
};
</script>
<style>



</style>
