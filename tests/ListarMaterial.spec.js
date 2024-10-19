import { mount, createLocalVue } from "@vue/test-utils";
import ListarMaterial from "@/components/ListarMaterial.vue";
import VueRouter from "vue-router";
import Vuex from "vuex";

const localVue = createLocalVue();
localVue.use(VueRouter);
localVue.use(Vuex);

// Mock de axios para simular llamadas a la API
const mockAxios = {
  get: jest.fn(() => Promise.resolve({ data: [] })),
  put: jest.fn(() => Promise.resolve({ data: {} })),
};

const router = new VueRouter();
const store = new Vuex.Store({
  // Definir tu estado de Vuex aquí
});

describe("ListarMaterial", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(ListarMaterial, {
      localVue,
      router,
      store,
      mocks: {
        $axios: mockAxios,
      },
    });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("debería renderizar el componente correctamente", () => {
    expect(wrapper.exists()).toBe(true);
  });

  // it("debería filtrar materiales correctamente", async () => {
  //   // Simula cambios en los filtros y espera a que se actualicen los materiales
  //   wrapper.setData({ materia: 2, nombreMaterial: "Libro 1", radioPdf: 1 });
  //   await wrapper.vm.filtrarMateriales();

  //   // Asegúrate de que los materiales se hayan filtrado correctamente
  //   expect(wrapper.vm.totalMateriales).toHaveLength(1);
  //   expect(wrapper.vm.totalMateriales[0].nombre).toBe("Autor 1");
  //   expect(wrapper.vm.totalMateriales[0].documento).not.toBeNull();
  // });

  // it("debería cambiar de página correctamente", () => {
  //   wrapper.setData({ elementosPorPagina: 5 });

  //   // Cambia a la segunda página
  //   wrapper.vm.paginaSiguiente();

  //   expect(wrapper.vm.paginaActual).toBe(2);

  //   // Cambia a la página anterior
  //   wrapper.vm.paginaPrevia();

  //   expect(wrapper.vm.paginaActual).toBe(1);
  // });

  // Agrega más pruebas según tus necesidades
});
