import Vue from 'nativescript-vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    user: null,
    categories: [],
    places: []
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
    },
    SET_CATEGORIES(state, categories) {
      state.categories = categories;
    },
    SET_PLACES(state, places) {
      state.places = places;
    }
  },
  actions: {
    setUser({ commit }, user) {
      commit('SET_USER', user);
    },
    setCategories({ commit }, categories) {
      commit('SET_CATEGORIES', categories);
    },
    setPlaces({ commit }, places) {
      commit('SET_PLACES', places);
    }
  },
  getters: {
    user: (state) => state.user,
    categories: (state) => state.categories,
    places: (state) => state.places
  }
});

export default store;
