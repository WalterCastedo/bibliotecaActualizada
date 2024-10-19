<template>
  <div id="app">

    
    <input type="checkbox" id="check" checked class="d-none d-sm-none d-md-block " v-if="acceso == 2 || acceso == 1"> 
    <label for="check" class="d-none d-sm-none d-md-block" v-if="acceso == 2 || acceso == 1">
      <i class="fas fa-bars" id="btn"></i>
      <i class="fas fa-times" id="cancel"></i>
    </label>
    <div class="sidebar d-none d-sm-none d-md-block" v-if="acceso == 2 || acceso == 1">
      
    <header>
      UNO
    </header>
    <ul>
    
      <li><router-link class="enlaces" v-if="acceso == 2 || acceso == 1 "  to="/AcercaDeNosotros"
        ><font-awesome-icon icon="fa-solid fa-user-large" class="iconos"/>Acerca de </router-link></li>
     <li>
      <router-link class="enlaces" v-if="acceso == 2 || acceso == 1"  to="/Solicitudes"
          ><font-awesome-icon icon="fa-solid fa-list-check" class="iconos" />Solicitudes</router-link></li>
          <li>
      <router-link  class="enlaces" v-if="acceso == 2 || acceso == 1"  to="/Materiales">
        <font-awesome-icon icon="fa-solid fa-book" class="iconos" />Materiales</router-link>
      </li>
     <li><router-link class="enlaces" v-if="acceso == 2 "  to="/Autores"
            ><i class="fas fa-stream"></i>Autores</router-link></li>
            
     <li><router-link class="enlaces" v-if="acceso == 2 "  to="/Editoriales">
      <i class="fas fa-calendar-week"></i>Editoriales</router-link></li>
      <li><router-link class="enlaces" v-if="acceso == 2 "  to="/Tipos"
            ><i class="fas fa-stream"></i>Tipos</router-link></li>
            <li><router-link class="enlaces" v-if="acceso == 2|| acceso == 1 "  to="/Bibliotecas"
        ><font-awesome-icon icon="fa-solid fa-user-large" class="iconos"/>Bibliotecas</router-link></li>
        <li><router-link class="enlaces" v-if="acceso == 2|| acceso == 1 "  to="/Prensa"
        ><font-awesome-icon icon="fa-solid fa-user-large" class="iconos"/>Prensa</router-link></li>
      <li><router-link class="enlaces" v-if="acceso == 2 "  to="/Administradores"
            ><font-awesome-icon icon="fa-solid fa-user-large" class="iconos"/>Admin</router-link></li>
            
      <li class="enlaces salir" v-on:click="cerrarSesion()"  >
      cerrar sesión
    </li> 
    </ul>
     
    
   </div>








  <b-navbar toggleable="lg" type="dark"  class=" menu d-block d-sm-block d-md-none" align="center">
    <b-navbar-brand  class=" unoSolo" align="center">
      <div class="nombreU">
        <div v-if="usuario.nombre">
      <div >
        UNO - {{ this.Nombresubsede }}
      </div>
    </div>
    <div v-else >
        UNO
    </div>
      </div>
      
    </b-navbar-brand>


  
    <b-navbar-toggle  target="nav-collapse" v-if="acceso == 2 || acceso == 1 "></b-navbar-toggle>




    <b-collapse id="nav-collapse" class=""   is-nav>
     

      
      <b-navbar-nav >
        <b-nav-item    v-if="acceso == 2 || acceso == 1"  to="/AcercaDeNosotros"
          >Acerca de
        </b-nav-item>
        <b-nav-item    v-if="acceso == 2 || acceso == 1"  to="/Solicitudes"
          >Solicitudes
        </b-nav-item>
        <b-nav-item   v-if="acceso == 2 || acceso == 1" to="/Materiales"
          >Materiales
        </b-nav-item>
        <b-nav-item  v-if="acceso == 2 "  to="/Autores"
            >Autores
        </b-nav-item>
        <b-nav-item   v-if="acceso == 2 "  to="/Editoriales"
            >Editoriales
        </b-nav-item>
        <b-nav-item   v-if="acceso == 2 "  to="/Tipos"
            >Tipos
        </b-nav-item>
        <b-nav-item   v-if="acceso == 2 "  to="/Prensa"
            >Prensa
        </b-nav-item>
        <b-nav-item   v-if="acceso == 2 "  to="/Bibliotecas"
            >Bibliotecas
        </b-nav-item>
        <b-nav-item   v-if="acceso == 2 "  to="/Administradores"
            >Administradores
        </b-nav-item>
       
        

      </b-navbar-nav>
   
    <div > 

    
      
      <b-navbar-nav  class="ml-auto" v-if="usuario.nombre">
       

        <b-nav-item-dropdown right>
         
          <template #button-content>
      
            <em v-if="acceso == 1">{{nombreUsuario}}</em>
            <em v-if="acceso == 2">{{nombreAdmin}}</em>
          </template>

          <b-dropdown-item v-on:click="cerrarSesion()"
              >Cerrar sesión</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </div>
    </b-collapse>
  </b-navbar>


    

   
    <div class="content">
        
      <div v-if="usuario.nombre && usuario.nombre.length > 0">
        <div class="NombreUno d-none d-sm-none d-md-block"> 
      <div align="center">
        UNIVERSIDAD NACIONAL DEL ORIENTE - {{ this.Nombresubsede }}
      </div>
    </div>
    </div>
    <div v-else class="NombreUno2 d-none d-sm-none d-md-block">
      <div align="center">
        UNIVERSIDAD NACIONAL DEL ORIENTE 
      </div>
    </div>
 

      <router-view class="contenido" />
    </div>


  </div>
</template>

<style> 

.menu{background-color: #003995;} 
@import url('https://fonts.googleapis.com/css?family=Roboto:300,400,400i,500');
*{
  padding: 0;
  margin: 0;
  list-style: none;
  text-decoration: none;
}
body {
  font-family: 'Roboto', sans-serif;

   background-image: url('../src/img/fondoLibros.jpg'); /* Ruta de tu imagen de fondo */
  background-size: cover; /* Ajustar la imagen para cubrir todo el contenedor */
  background-position: center; /* Centrar la imagen */
  background-repeat: repeat; /* Evitar que la imagen se repita */
  height: 100vh; /* Establecer la altura del contenedor al 100% de la altura de la ventana */


}
.iconos{
margin-right: 10%;
}
.sidebar {
  
  position: fixed;
  left: -250px;
  width: 250px;
  margin-top: -25px;
  height: 110%;
  background: #003995;
  transition: all .5s ease;
}
.sidebar header {
  font-size: 22px;
  color: rgba(0, 0, 0, 0);
  background-image: url("./img/logo-adelante-1.png");
  background-size: 40% 60%;
  background-repeat: no-repeat;
  background-position: center;
  /* background-size: cover; */
  text-align: center;
position: relative;
border-bottom: 1px solid black;
padding-top: 25px;
padding-bottom: 12px;

  user-select: none;
}
.sidebar ul .enlaces{
  text-decoration: none;
  display: block;
  height: 100%;
  width: 100%;
  line-height: 65px;
  font-size: 20px;
  color: white;
  padding-left: 00px;
  box-sizing: border-box;
  border-bottom: 1px solid black;
  border-top: 1px solid rgba(255,255,255,.1);
  transition: .4s;
}
ul li:hover .enlaces{
  padding-left: 50px;
}
.sidebar ul .enlaces i{
  margin-right: 16px;
}
#check{
  display: none;
  
}
label #btn,label #cancel{
  position: fixed;
  background: white;
 
  cursor: pointer;
}
label #btn{
  z-index: 2000;
  left:8px;
  top: 9px;
  font-size: 25px;
  color: 042965;
  padding: 6px 8px;
  transition: all .5s;
}
label #cancel{
  z-index: 1111;
  left: 8px;
  
  top: 8px;
  font-size: 40px;
  color: #003995;
  padding: 0px 6px;
  transition: all .5s ease;
}
#check:checked ~ .sidebar{
  left: 0;
}
#check:checked ~ label #btn{
  
  left: 250px;
  opacity: 0;
  pointer-events: none;
}
#check:checked ~ label #cancel{
  top: 8px;
  left: 250px;
}
#check:checked ~ .content{
  margin-left: 250px;
  transition: all .5s;
}

.NombreUno{
  position: -webkit-sticky; 
	position: sticky;
	top: 0;
  color:white;

margin-top: -13px;
padding-top: 19px;
padding-bottom: 16px;
  background:#003995 ;
 
}
.unoSolo{
  margin-right: 0px !important;
}
.NombreUno2{
  position: -webkit-sticky; 
	position: sticky;
	top: 0;
  color:white;
margin-top: 0px;
padding-top: 19px;
padding-bottom: 16px;
  background:#003995 ;
 
}
.salir{
  cursor: pointer;
  position: absolute;
top: 85%;
}
@media (max-width: 767px) {

  #check:checked ~ .content{
  margin-left: 0px;
  transition: all .5s;
}
.content{
transition: all .5s;

}
}
.content{
transition: all .5s;

}
.contenido{
  padding-bottom: 60px;
  padding-top: 40px;
}

</style>
<script>


//import Vue from 'vue';
export default {
    data() {
        return {
          
            usuario: {
                cod_alum: localStorage.getItem("cod_alum"),
                nombre: localStorage.getItem("nombre"),
                apellidoP: localStorage.getItem("ap_paterno"),
                apellidoM: localStorage.getItem("ap_materno"),
            },
            nombreAdmin:localStorage.getItem("nombre"),
            nombreUsuario: localStorage.getItem("nombre") +
                " " +
                localStorage.getItem("ap_paterno") +
                " " +
                localStorage.getItem("ap_materno"),
            acceso: localStorage.getItem("acceso"),
            Nombresubsede: localStorage.getItem("Subsede"),
        };
    },
   
    created: function () {
        let datosUsuario = localStorage.getItem("acceso");
        if (datosUsuario == null) {
            localStorage.setItem("acceso", 0);
            localStorage.setItem("cod_alum", "");
            localStorage.setItem("ci_pasaporte", "");
            localStorage.setItem("nombre", "");
            localStorage.setItem("ap_paterno", "");
            localStorage.setItem("ap_materno", "");
            localStorage.setItem("sede", "");
            localStorage.setItem("id", 0);
            localStorage.setItem("Subsede", "");
            localStorage.setItem("idSubsede", 0);
        }
    },
    methods: {
       
        cerrarSesion() {
            localStorage.setItem("acceso", 0);
            localStorage.setItem("cod_alum", "");
            localStorage.setItem("ci_pasaporte", "");
            localStorage.setItem("nombre", "");
            localStorage.setItem("ap_paterno", "");
            localStorage.setItem("ap_materno", "");
            localStorage.setItem("sede", "");
            localStorage.setItem("Subsede", "");
            localStorage.setItem("idSubsede", 0);
            localStorage.setItem("idCarrera", 0);
            localStorage.setItem("idFacultad", 0);
            localStorage.setItem("id", 0);
            location.reload();
            this.$router.push("/");
        },
    }
};
</script>


