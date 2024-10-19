<template>
  <div>
    
      <div class="todo mt-5">
        <div class="user_card mt-5">
          <div class="d-flex justify-content-center">
            <div class="brand_logo_container">
              <img
                src="../img/image.webp"
                class="brand_logo"
                alt="Logo"
              />
            </div>
          </div>
          <div class="d-flex justify-content-center form_container">
            <form v-on:submit.prevent="login" class="col-sm-9">
              <div class="input-group mb-3">
                <div class="input-group-append">
                  <span class="input-group-text"
                    ><svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-person-circle"
                      viewBox="0 0 16 16"
                    >
                      <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                      <path
                        fill-rule="evenodd"
                        d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                      /></svg>
                      </span>
                </div>
                <input
                  v-model="usuario.cod_alum"
                  type="text"
                  name="cod_alum"
                  class="form-control input_user"
                  value=""
                  placeholder="Codigo de Alumno"
                />
              </div>
              <div class="input-group grupoInicio mb-2">
                <div class="input-group-append">
                  <span class="input-group-text"
                    ><svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-key-fill"
                      viewBox="0 0 16 16"
                    >
                      <path
                        d="M3.5 11.5a3.5 3.5 0 1 1 3.163-5H14L15.5 8 14 9.5l-1-1-1 1-1-1-1 1-1-1-1 1H6.663a3.5 3.5 0 0 1-3.163 2zM2.5 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/></svg></span>
                </div>
                <input
                  v-model="usuario.ci_pasaporte"
                  type="password"
                  name="ca"
                  class="form-control input_pass"
                  value=""
                  placeholder="Ci/Password"
                />
                <div class="input-group-append">
    <button @click="togglePasswordVisibility" class="ojo" type="button">
      <div v-if="showPassword" >
      👁️ 
      </div>
      <div v-else  >
      ➖  
      </div>
    </button>
  </div>
              </div>

              <div class="d-flex justify-content-center mt-3 login_container">
                <button text="Iniciar sesión" id="login" type="submit" name="button" class="btn login_btn mt-4">
                  Iniciar sesión
                </button>
              </div>
            </form>
          </div>

          <div class="mt-4"></div>
        </div>
      </div>
    <!-- Modal para mostrar mensaje de error -->
    <div class="modal fade" id="loginErrorModal" tabindex="-1" role="dialog" aria-labelledby="loginErrorModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="loginErrorModalLabel">Error de inicio de sesión</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="closeErrorModal">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            El inicio de sesión ha fallado. Verifica tus credenciales e inténtalo nuevamente.
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="closeErrorModal">Cerrar</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//import Vue from 'vue'
export const RUTA_SERVIDOR_ALUMNOS = process.env.VUE_APP_RUTA_API_ALUMNOS;
export const RUTA_SERVIDOR_LIBROS = process.env.VUE_APP_RUTA_API_LIBROS;

export default {
  name: "loginComponent",
  data() {
    return {
      showPassword: false,
      usuario: {
        cod_alum: "",
        ci_pasaporte: "",
        carrera: "",
        facultad: "",
        subsede: "",
      },
    };
  },

  methods: {
    async login() {
      // Validar que el código de alumno no contenga espacios ni caracteres especiales
    if (!/^[A-Za-z0-9]+$/.test(this.usuario.cod_alum)) {
      alert("Código de Alumno no válido. Debe contener solo letras y números.");
      return;
    }

    // Validar que el CI/Passport no contenga espacios ni caracteres especiales
    if (!/^[A-Za-z0-9]+$/.test(this.usuario.ci_pasaporte)) {
      alert("CI/Passport no válido. Debe contener solo letras y números.");
      return;
    }
  try {
    const alumnoResponse = await fetch(`${RUTA_SERVIDOR_ALUMNOS}/alumno/${this.usuario.cod_alum}/${this.usuario.ci_pasaporte}`);
    const datosRespuesta = await alumnoResponse.json();

    

    if (datosRespuesta) {
      // Almacenar datos del usuario en el almacenamiento local
      localStorage.setItem("acceso", 1);
      localStorage.setItem("cod_alum", datosRespuesta.cod_alum);
      localStorage.setItem("ci_pasaporte", datosRespuesta.ci_pasaporte);
      localStorage.setItem("nombre", datosRespuesta.nombre);
      localStorage.setItem("ap_paterno", datosRespuesta.ap_paterno);
      localStorage.setItem("ap_materno", datosRespuesta.ap_materno);
      localStorage.setItem("sede", datosRespuesta.sede);
      this.usuario.carrera = datosRespuesta.id_carrera;

      const carreraResponse = await fetch(`${RUTA_SERVIDOR_ALUMNOS}/carrera/${this.usuario.carrera}`);
      const carreraData = await carreraResponse.json();

      if (Array.isArray(carreraData) && carreraData.length > 0) {
        this.usuario.facultad = carreraData[0].id_facultad;
      } else {
        console.error("No se encontraron datos de carrera");
      }

      const facultadResponse = await fetch(`${RUTA_SERVIDOR_ALUMNOS}/facultad/${this.usuario.facultad}`);
      const facultadData = await facultadResponse.json();
      this.usuario.subsede = facultadData[0].id_subsede;

      const subsedeResponse = await fetch(`${RUTA_SERVIDOR_ALUMNOS}/subsede/${this.usuario.subsede}`);
      const subsedeData = await subsedeResponse.json();

      // Almacenar datos adicionales del usuario en el almacenamiento local
      localStorage.setItem("idCarrera", this.usuario.carrera);
      localStorage.setItem("idFacultad", this.usuario.facultad);
      localStorage.setItem("idSubsede", subsedeData[0].id);
      localStorage.setItem("Subsede", subsedeData[0].subsede);

      // Actualizar la página y navegar a la ruta "libros"
      location.reload();
      this.$router.push({ name: "materiales" });
    }
  } catch (error) {
    // Manejar errores aquí
    console.error("Ocurrió un error:", error);
  }

  // Llamada adicional para el acceso "empleado"
  try {
    const empleadoResponse = await fetch(`${RUTA_SERVIDOR_LIBROS}/empleado/${this.usuario.cod_alum}/${this.usuario.ci_pasaporte}`);
    const datosRespuestaEmpleado = await empleadoResponse.json();

    if (datosRespuestaEmpleado) {
      // Almacenar datos del empleado en el almacenamiento local
      localStorage.setItem("acceso", 2);
      localStorage.setItem("cod_alum", datosRespuestaEmpleado.cod_alum);
      localStorage.setItem("ci_pasaporte", datosRespuestaEmpleado.ci_pasaporte);
      localStorage.setItem("nombre", datosRespuestaEmpleado.nombre);
      localStorage.setItem("ap_paterno", datosRespuestaEmpleado.ap_paterno);
      localStorage.setItem("ap_materno", datosRespuestaEmpleado.ap_materno);
      localStorage.setItem("sede", datosRespuestaEmpleado.sede);
      localStorage.setItem("idSubsede", datosRespuestaEmpleado.idSubsede);
      localStorage.setItem("id", datosRespuestaEmpleado.id);
      
      const subsedeResponseEmpleado = await fetch(`${RUTA_SERVIDOR_ALUMNOS}/subsede/${localStorage.getItem("idSubsede")}`);
      const subsedeDataEmpleado = await subsedeResponseEmpleado.json();

      // Almacenar datos adicionales del empleado en el almacenamiento local
      localStorage.setItem("Subsede", subsedeDataEmpleado[0].subsede);

      // Actualizar la página y navegar a la ruta "libros"
      location.reload();
      this.$router.push({ name: "materiales" });
    }
   else {
        // Muestra el modal de error de inicio de sesión
        this.showErrorModal();
      }
  } catch (error) {
    // Manejar errores aquí
    this.showErrorModal();
    console.error("Ocurrió un error:", error);
  }
},
showErrorModal() {
    const errorModal = document.getElementById("loginErrorModal");
    if (errorModal) {
      errorModal.classList.add("show");
      errorModal.style.display = "block";
      errorModal.setAttribute("aria-hidden", "false");
    }
  },
  closeErrorModal() {
    const errorModal = document.getElementById("loginErrorModal");
    if (errorModal) {
      errorModal.classList.remove("show");
      errorModal.style.display = "none";
      errorModal.setAttribute("aria-hidden", "true");
    }
  },
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
    const input = document.querySelector('.input_pass');
    
    if (input) {
      if (this.showPassword) {
        // Si showPassword es verdadero, cambiamos el tipo de entrada a "text" para mostrar la contraseña.
        input.type = 'text';
      } else {
        // Si showPassword es falso, volvemos a cambiar el tipo de entrada a "password" para ocultar la contraseña.
        input.type = 'password';
      }
    }
  },
  },
};
</script>

<style>

.todo{

  /* centrar vertical y horizontalmente */
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.grupoInicio {
    position: relative;
  }

  .ojo {
    z-index: 10;
    position: absolute;
    right: 0;
   border-radius: 5rem 5  5 5rem !important;
    top: 0;
    height: 100%;
    border: none;
    background-color: transparent;
  }

.user_card {
  height: 400px;
  width: 350px;
  margin-top: auto;
  margin-bottom: auto;
  background: #003995;
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: column;
 
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  -webkit-box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2),
    0 6px 20px 0 rgba(0, 0, 0, 0.19);
  -moz-box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2),
    0 6px 20px 0 rgba(0, 0, 0, 0.19);
  border-radius: 5px;
}
.brand_logo_container {
  position: absolute;
  height: 170px;
  width: 170px;
  top: -75px;
  border-radius: 50%;
  background: #003995;
  padding: 10px;
  text-align: center;
}
.brand_logo {
  height: 150px;
  width: 150px;
  border-radius: 50%;
  border: 2px solid white;
}
.form_container {
  margin-top: 100px;
}
.login_btn {
  width: 100%;
  background: white !important;
  color: #003995 !important;
}
.login_btn:focus {
  box-shadow: none !important;
  outline: 0px !important;
}
.login_container {
  padding: 0 2rem;
}
.input-group-text {
  background: white !important;
  color: #003995 !important;
  border: 0 !important;
  border-radius: 0.25rem 0 0 0.25rem !important;
  height: 100%;
}
.input_pass{ border-radius: 0px 5px 5px 0px !important;}
.input_user,
.input_pass:focus {
  box-shadow: none !important;
  outline: 0px !important;
}
.input_pass {
    border-top-right-radius: 10;
    border-bottom-right-radius: 10;
  }
</style>
