import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";

import Materiales from "../views/MaterialesView.vue";
import Tipos from "../views/TiposView.vue";
import Solicitudes from "../views/solicitudesView.vue";
import Autores from "../views/AutoresView.vue";
import Editoriales from "../views/EditorialesView.vue";
import Administradores from "../views/AdministradoresView.vue";
import AcercaDeNosotros from "../views/AcercaDeNosotrosView.vue"
import Prensa from "../views/PrensaView.vue";
 import Bibliotecas from "../views/BibliotecasView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/editoriales",
    name: "editoriales",
    component: Editoriales,
  },
  {
    path: "/administradores",
    name: "administradores",
    component: Administradores,
  },
  
  {
    path: "/Prensa",
    name: "prensa",
    component: Prensa,
  },
  {
    path: "/Bibliotecas",
    name: "bibliotecas",
    component: Bibliotecas,
  },

  {
    path: "/tipos",
    name: "tipos",
    component: Tipos,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/Materiales",
    name: "materiales",
    component: Materiales,
  },
  {
    path: "/Solicitudes",
    name: "librosolicitudess",
    component: Solicitudes,
  },
  {
    path: "/Autores",
    name: "autores",
    component: Autores,
  },
  {
    path: "/AcercaDeNosotros",
    name: "acercaDeNosotros",
    component: AcercaDeNosotros,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
