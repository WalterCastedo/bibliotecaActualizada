import { mount, createLocalVue } from "@vue/test-utils";
import LoginComponent from "@/components/LoginComponent.vue";
import Vuex from "vuex";
import fetchMock from "jest-fetch-mock";

const localVue = createLocalVue();
localVue.use(Vuex);

fetchMock.enableMocks();

describe("LoginComponent", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(LoginComponent, {
      localVue,
      // Aquí puedes proporcionar mocks y store si es necesario para tu prueba.
    });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("debería renderizar el formulario de inicio de sesión correctamente", () => {
    // Asegúrate de que el formulario de inicio de sesión se renderice correctamente.
    expect(wrapper.find("form").exists()).toBe(true);
    expect(wrapper.find("input[name='cod_alum']").exists()).toBe(true);
    expect(wrapper.find("input[name='ca']").exists()).toBe(true);
    expect(wrapper.find("button[name='button']").exists()).toBe(true);
  });

//   it("debería llamar al método de inicio de sesión al enviar el formulario", async () => {
//     fetchMock.mockResponse(JSON.stringify({ cod_alum: "2018wcs0524" }));
  
//     // Simula valores para los campos del formulario.
//     wrapper.setData({ usuario: { cod_alum: "2018wcs0524", ci_pasaporte: "8157165" } });

//     // Simula el envío del formulario.
//     await wrapper.find("form").trigger("submit.prevent");

//     // Asegúrate de que el método de inicio de sesión se haya llamado.
//     // Puedes agregar una verificación aquí basada en el comportamiento esperado.
//   });

  // Agrega más pruebas según tus necesidades.
});
