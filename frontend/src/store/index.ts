import { createStore } from 'vuex';

const store = createStore({
  state: {
    // Define el estado global de la aplicación aquí
  },
  mutations: {
    // Define las mutaciones para modificar el estado aquí
  },
  actions: {
    // Define las acciones para realizar operaciones asíncronas aquí
  },
  getters: {
    // Define los getters para acceder al estado aquí
  }
});

export default store;

// Archivo vacío o re-exporta desde stores si es necesario
export {};