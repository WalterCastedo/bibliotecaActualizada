<template class="fondo">
  <div class="row align-items-center">
    <div class="col">
      <div class=" align-items-center">
        <div class="form-group text-center">
          <label for="">Ingresa el nombre del administrador</label>
          <input
            v-on:keyup="filtrarAdmin()"
            v-model="nombreEmpleado"
            type="text"
            class="form-control text-center"
            placeholder="Nombre del empleado"
          />
        </div>
        <label>Registros por página</label>
    <select v-model="elementosPorPagina" @change="cambiarRegistrosPorPagina">
      <option value="5" selected>5</option>
      <option value="10">10</option>
      <option value="20">20</option>
      <option value="999999">Todos</option>
    </select>
    <button
      type="button"
      class="btn"
      @click="imprimirAdmin()"
    >
    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAqCAYAAADFw8lbAAAACXBIWXMAAAsTAAALEwEAmpwYAAAChklEQVR4nO2Z22vTcBTH+08UrcpASE1SrQ1ug9i5sU1l4pQpE2XTubeBoOANxSdFUcELClNURGhZH0TFMh+com4Im+iDQ0HmEPVBENKbcfSS3tav/H5j6VYzy1zSVsmBz0M5/NJPT8/v5JfWYjGjROFkWafLzvXojcA4dugq6mK4g4KdhyEw3IV/Q9TOw8VwF3UXvSNUYaB6yYIY9t6G/8QhrF3B5WXt/HldRUdqbJBE64JIjY4gfvcWBqttcM+UZfhLFSkqiVZ9ZY0UlfSUNVpU0pAVGP5yRYpKmrLcybKLKk8fINzV9Bsvt9WhlnVMyw6VXfRPsblxQ2WIBltXIrR9zZy0OCqkolIRWljWFIVZ0fmE2aOiuZl4dTyFO9ZBedGvEvNdQ6i9Rt1UyjO/mks88mHi9H4E6peq+fDe5lnrCfLxbv3H0499bfQuQm6FRCTzdRy5eBSh9lqax2QWqbfDSPi9SL56jlxSQebTBwQ3sTQvH+mcWv/4Hl1PkA93GCcaahPoa1KtbOA7Yp4rqujEmQP5Cu5yY1KOQHlyf5ZocKPd2IFfKCq5FyH77QvivuuaopJoRbT3FHKpJP1Q06JkfaB5OYVcwzDRmPcqojfOIvV6EMikae/NJSof65qq4pZVqujMCHfWGyea+TyG9Md3dDNEelpVKWhV9OY55JQEpDqbKkquE+leTwk0LCvBV18ACkSJSC76Ewm/p8w9qiGaHhullU6/f0PbgpxDaS+WUjS0U6SjR+uNCImHHponxPp6IR/dA8m9OD8Fdjcg0d+HQGOVecyDeXAWzRO+1XxmEhY6nvT42XGgCE16zNESM/R/ijoN+rPBVYTVDLt1XqJmWP4ufgGVhSpkgRcCwgAAAABJRU5ErkJggg==">  </button> 
     <button
      type="button"
      class="btn"
      @click="exportarAExcel()"
    >
    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAACTUlEQVR4nO2ZW0sUYRjH5xvkRcieRnfNPZhtuTNBalgNaemaRUWQ6a5p2slq14Uyd6edGTpQKBFhRQXiTV0pXnQhEmLuTF/E+h7/eN+VocBK2Tks8v7hf/E+8w48v3kON8NxTExMu1/id61X1NWfoqGhUtc+Tc45DiDo2g8rkieukSXUFKTnjgKIFiVvAjgNIdoB4CSEaBeA7BCErQCyAxC2A8g2QzgCINsI4RiAbBOElQB7n3T/F2JPQVKrFqBpKbMtiNoXfXNVCbATcwxgU6wCBmuhyrRrW2jfs0vgJ07hwMIEPTd/Gqfn2MdRxBey4DOd2D9/8493Di7lUD/VC//YMfivH0d45op7APHFLDypVgQLfRB0FYG7J2liiVUZzZ/vwDN4BLH3I+Z9csc32kEdfTOE6OwQwi8H3F2jDdoFChGe6acJN83fKFdjC4CWr3ka4zNdENaK7rcQTWolD+9wO4Won0ya8a0AiEm1SNw31oHI6xTEkuIuwKEvD+BJt8Gbbit/2ZL6TwBxXaEx/60T9HlIPusigK6i7n4PfMNHEZlNlxN+e/XvAOtK2WQevhURuC3Bm2qls+EKQOzDNZpk5NWgOcQEJrEyZQLU5U4jpJ2nJpspMC6hcbofjdOXaeX4bJdLFSgpCBXPIZg/g8TaI3ONBieTiL4bQXwxR2fid5MVSoaerFf+XicaHl9Ey/JDd2fATnMMYFOsAgZrocrEWshgLVSZWAsZrIWq5xfTdi0Y6gZnlQ7rWo+TEIKhbiRKSrdlAExMTFzV6hfz8wpqDZBppQAAAABJRU5ErkJggg==">
    </button>
<br>
<nav aria-label="Page navigation example" class="pagination-nav">
      <ul class="pagination">
        <li class="page-item" v-on:click="paginaPrevia()">
          <a class="page-link" href="#">anterior</a>
        </li>
        <li
          v-for="paginaE in totalPaginas()"
          :key="paginaE"
          class="page-item"
          v-bind:class="activo(paginaE)"
        >
          <a class="page-link" href="#" v-on:click="ObtenerDatosPag(paginaE)">{{
            paginaE
          }}</a>
        </li>
        <li class="page-item" v-on:click="paginaSiguiente()">
          <a class="page-link" href="#">siguiente</a>
        </li>
      </ul>
    </nav>
        <div class=" d-md-block table-responsive table-sm small ">
          <table class="table table-striped border text-center tableMb">
            <thead>
              <tr>
                <!-- <th>ID</th> -->
                <th>NOMBRE</th>
                <th>CARGO</th>
                <th>SUBSEDE</th>
                <th>ACCIONES</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="admin in datosPaginados" :key="admin.id">
                <td>{{ admin.nombre }}</td>
                <td>{{ admin.cargo }}</td>
                 <td>{{NombreSubSede[admin.id]}} </td>
                <td>
                  <div class="btn-group" role="group" aria-label="">
                   <div v-if="idAdmin==1 || idAdmin==admin.id " >
                   <button
                      v-b-modal.modal-center
                      @click="obtenerAdmin(admin)"
                      class="btn btn-info"
                    >
                    <font-awesome-icon icon="fa-solid fa-pen-to-square" />
                    </button>
                    </div>
<div v-else>No hay accion disponible</div>
                    <div v-if="idAdmin==1">
                    <button
                      type="button"
                      @click="eliminar(admin)"
                      class="btn btn-danger"
                    >
                    <font-awesome-icon icon="fa-solid fa-trash-can"  />
                    </button>
                    </div>
                    
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

 

    <b-modal id="modal-center" ref="modalCenter" centered title="Modificar admin" hide-footer hide-close-button> 
      <template #modal-title>
    <button @click="closeModal" class="btn btn-sm btn-danger close-button">X</button>
    <h5 class="modal-title">Modificar Administrador</h5>
  </template>
      <div class="form-group d-flex flex-column">
        <label for="">Nombre del Administrador</label>
        <input
          v-model="empleadoEditar.nombre"
          type="text"
          name=""
          id="nombre"
          class="form-control"
          placeholder="empleadoEditar.nombre"
          aria-describedby="helpId"
        />
         <label for="">Usuario del Administrador</label>
        <input
          v-model="empleadoEditar.usuario"
          type="text"
          name=""
          id="usuario"
          class="form-control"
          placeholder="empleadoEditar.usuario"
          aria-describedby="helpId"
        />
         <label for="">Cargo del Administrador</label>
        <input
          v-model="empleadoEditar.cargo"
          type="text"
          name=""
          id="cargo"
          class="form-control"
          placeholder="empleadoEditar.cargo"
          aria-describedby="helpId"
        />
         <label for="">Contraseña del Administrador</label>
        <input
          v-model="empleadoEditar.password"
          type="password"
          name="password"
          id="password"
          class="form-control"
          placeholder="empleadoEditar.password"
          aria-describedby="helpId"
        />
         <label for="">Repetir contraseña </label>
        <input
          v-model="empleadoEditar.password2"
          type="password"
          name="password2"
          id="password2"
          class="form-control"
          placeholder="contraseña"
          aria-describedby="helpId"
        />
        <br>
        <button class="btn align-items-center btn-info"  @click="actualizar()">Actualizar datos</button>
      </div>
    </b-modal>
  </div>
</template>

<script>
import axios from "axios";
export const RUTA_SERVIDOR_ALUMNOS = process.env.VUE_APP_RUTA_API_ALUMNOS;
export const RUTA_SERVIDOR_LIBROS = process.env.VUE_APP_RUTA_API_LIBROS;
import { jsPDF } from "jspdf";
import "jspdf-autotable";
export default {
  name: "ListarEmpleados",
  data() {
    return {
      idAdmin:localStorage.getItem('id'),
      totalEmpleados: [],
      nombreEmpleado: "",
      empleados: [],
      elementosPorPagina: 10,
      datosPaginados: [],
      paginaActual: 1,
      empleadoEditar: {
        nombre: "",
        id: 0,
        cargo:'',
        usuario:'',
        password:'',
        password2:'',
        idSubsede:'',
      },
      NombreSubSede:[],
    };
  },

  created: function () {
    this.consultarEmpleados();
  },
  mounted() {
    this.ObtenerDatosPag(1);
  },
  methods: {
    consultarEmpleados() {
      fetch(RUTA_SERVIDOR_LIBROS+"/empleados")
        .then((respuesta) => respuesta.json())
        .then((datosRespuesta) => {
          
            this.empleados = datosRespuesta;
            })
             .then(() => {
           for (let index = 0; index < this.empleados.length; index++) {
       this.asignarNombre(this.empleados[index].idSubsede,this.empleados[index].id)
       
      } 
        })
        .catch(console.log);
    },

    asignarNombre(idSubsede,index){
      
      if(this.NombreSubSede[index]==undefined){
       
      fetch(RUTA_SERVIDOR_ALUMNOS+"/subsede/"+idSubsede)
      .then((respuesta) => respuesta.json(),)
      .then((datosRespuesta) => {   
       this.filtrarAdmin();
       this.NombreSubSede[index]=''+datosRespuesta[0].subsede;
  
     })
      }
      else{
      return 
      }
      },

    filtrarAdmin() {
      if (this.estado == -1) {
        this.totalEmpleados = this.solicitudes;
        this.ObtenerDatosPag(1);
      } else {
      this.totalEmpleados = [];
      for (let index = 0; index < this.empleados.length; index++) {
        if (
          this.empleados[index].activo === 1 &&
          this.empleados[index].nombre
            .toUpperCase()
            .includes(this.nombreEmpleado.toUpperCase())
        ) {
          this.totalEmpleados = this.totalEmpleados.concat(this.empleados[index]);
          this.ObtenerDatosPag(1);
        }
      }
      if (this.totalEmpleados.length === 0) {
        this.paginaPrevia();
        //this.paginaActual=0;
      }
      }
    },

    eliminar(empleado) {
      const confirmacion = window.confirm(
    '¿Estás seguro de que deseas eliminar este administrador?'
  );

  if (confirmacion) {
      axios
        .put(RUTA_SERVIDOR_LIBROS+"/empleados/" + empleado.id, {
          nombre: empleado.nombre,
          idEmpleado: empleado.idEmpleado,
          activo: 0,
          usuario:empleado.usuario,
          cargo:empleado.cargo,
          password:empleado.password,
          idSubsede:empleado.idSubsede
        })
        .then(function (response) {
          console.log(response);
          location.reload();
        })
        .catch(function (error) {
          console.log(error);
          // console.log(this.libro);
        });}
    },

    cambiarRegistrosPorPagina() {
      this.paginaActual=1
      this.ObtenerDatosPag(this.paginaActual);
    },
    totalPaginas() {
      if (this.elementosPorPagina === -1) {
        return 1; // Mostrar todo en una sola página
      }
      return Math.ceil(
        this.totalEmpleados.length / this.elementosPorPagina
      );
    },
    ObtenerDatosPag(noPag) {
  this.paginaActual = noPag;
  this.datosPaginados = [];

 
    let ini = noPag * this.elementosPorPagina - this.elementosPorPagina;
    let fin = noPag * this.elementosPorPagina;
    this.datosPaginados = this.totalEmpleados.slice(ini, fin);
  
},

    paginaPrevia() {
      if (this.paginaActual > 1) {
        this.paginaActual--;
      }
      this.ObtenerDatosPag(this.paginaActual);
    },
    paginaSiguiente() {
      if (this.paginaActual < this.totalPaginas()) {
        this.paginaActual++;
      }
      this.ObtenerDatosPag(this.paginaActual);
    },
    activo(noPoag) {
      return noPoag === this.paginaActual ? "active" : "";
    },


    obtenerAdmin(Admin) {
      this.empleadoEditar.nombre = Admin.nombre;
      this.empleadoEditar.id = Admin.id;
      this.empleadoEditar.usuario = Admin.usuario;
      this.empleadoEditar.password = Admin.password;
      this.empleadoEditar.cargo = Admin.cargo;
      this.empleadoEditar.idSubsede=Admin.idSubsede;

     

    },
    actualizar() {

      if (
        this.empleadoEditar.nombre.trim() === "" ||
        this.empleadoEditar.usuario.trim() === "" ||
        this.empleadoEditar.cargo.trim() === "" ||
        this.empleadoEditar.password.trim() === "" ||
        this.empleadoEditar.password2.trim() === ""
  ) {
    alert('Por favor, los campos no pueden estar vacio.');
    return}
      if(this.empleadoEditar.password==this.empleadoEditar.password2){

    
      axios
        .put(RUTA_SERVIDOR_LIBROS+"/empleados/" + this.empleadoEditar.id, {
          nombre: this.empleadoEditar.nombre,
          idEmpleado: parseInt(localStorage.getItem('id')),
          activo: 1,
          usuario:this.empleadoEditar.usuario,
          cargo:this.empleadoEditar.cargo,
          password:this.empleadoEditar.password,
          idSubsede:this.empleadoEditar.idSubsede
        })
        .then(function (response) {
          console.log(response);
          location.reload();
        })
        .then(alert("El Administrador se actualizo correctamente"))
        .catch(function (error) {
          console.log(error);
          // console.log(this.libro);
        });
          }
        else{
          alert('Las contraseñas no coinciden');
        }
    },


    exportarAExcel() {
      // Crear una tabla HTML con los datos que deseas exportar
      const tabla = document.createElement("table");
      const thead = tabla.createTHead();
      const tbody = tabla.createTBody();

      // Agregar encabezados de columna a la tabla
      const encabezados = [
        "Nombre",
        "Cargo",
        "SubSede",
      ];
      const encabezadosRow = thead.insertRow();
      encabezados.forEach((encabezado) => {
        const th = document.createElement("th");
        th.innerText = encabezado;
        encabezadosRow.appendChild(th);
      });

      // Agregar filas de datos a la tabla
      this.datosPaginados.forEach((admin) => {
        const fila = tbody.insertRow();
      
        fila.insertCell().innerText = admin.nombre;
        fila.insertCell().innerText = admin.cargo;
        fila.insertCell().innerText = this.NombreSubSede[admin.id]
        
      });

      // Crear un archivo Blob para la tabla HTML
      const blob = new Blob([tabla.outerHTML], {
        type: "application/vnd.ms-excel",
      });

      // Crear un enlace para descargar el archivo Excel
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "administradores.xls";

      // Simular un clic en el enlace para iniciar la descarga
      link.click();
    },

imprimirAdmin() {
  // Crear un nuevo documento PDF
  var doc = new jsPDF();

  // Obtener la tabla visible
  var table = document.querySelector('.tableMb');
//titulo
doc.setFontSize(16);
  var title = "Administradores";
  var titleWidth = doc.getStringUnitWidth(title) * doc.internal.getFontSize() / doc.internal.scaleFactor;
  var pageWidth = doc.internal.pageSize.getWidth();
  var x = (pageWidth - titleWidth) / 2;
  doc.text(title, x, 10);
  // Obtener la tabla visible
  var table = document.querySelector('.tableMb');

  // Configurar los estilos de la tabla
  var styles = {
    overflow: 'linebreak',
    fontSize: 8, // Tamaño de fuente reducido
    lineWidth: 0.1,
    lineColor: [0, 0, 0], // Color de las líneas
    font: 'helvetica',
    fontStyle: 'normal',
    halign: 'center', // Alineación horizontal
    valign: 'middle', // Alineación vertical
    cellPadding: 2,
    tableWidth: 'auto',
    tableBorder: 1,
    tableLineColor: [0, 0, 0], // Color del borde de la tabla
    tableFillColor: [255, 255, 255], // Color de fondo de la tabla
    textColor: 0,
    cellWidth: 'auto', // Ajustar el ancho de la celda automáticamente
  };

  // Ocultar la última columna (Acción) antes de agregar la tabla al documento PDF
  var actionColumn = table.querySelector('th:last-child, td:last-child');
  if (actionColumn) {
    actionColumn.style.display = 'none';
  }

  // Agregar la tabla al documento PDF
  doc.autoTable({ html: table, startY: 20, styles });

  // Mostrar la última columna nuevamente
  if (actionColumn) {
    actionColumn.style.display = 'table-cell';
  }

  // Guardar el PDF
  doc.save('administradores.pdf');
},
closeModal() {
      this.$refs.modalCenter.hide();
    },

    
  }
};
</script>
<style>
.pagination-nav {
    max-width: 100%; /* Puedes ajustar este valor según tus necesidades */
    overflow-x: auto; /* Agrega una barra de desplazamiento horizontal si es necesario */
}
</style>