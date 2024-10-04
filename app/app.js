import Vue from 'nativescript-vue';
import Vuex from 'vuex';
import App from './components//pages/Login.vue';
import store from './redux/store';
import DateTimePicker from '@nativescript/datetimepicker/vue'
import PickerField from '@nativescript/picker/vue'

Vue.use(Vuex);
Vue.use(DateTimePicker);
Vue.use(PickerField);

new Vue({
  store,
  render: (h) => h('frame', [h(App)]),
}).$start();
