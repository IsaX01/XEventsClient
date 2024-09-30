import Vue from 'nativescript-vue';
import Vuex from 'vuex';
import App from './components//pages/Login.vue';
import store from './redux/store';

Vue.use(Vuex);

new Vue({
  store,
  render: (h) => h('frame', [h(App)]),
}).$start();
