import Vue from 'nativescript-vue';
import Vuex from 'vuex';
import App from './components//pages/Login.vue';
import store from './redux/store';
import DateTimePicker from '@nativescript/datetimepicker/vue'
import PickerField from '@nativescript/picker/vue'
import { firebase } from '@nativescript/firebase-core';
import { Dialogs, Utils } from '@nativescript/core';
import '@nativescript/firebase-messaging';

firebase().initializeApp().then(() => {
  console.log('Firebase inicializado y callback registrado');
  firebase().messaging().requestPermission().then(() => {
      console.log('Permiso de notificaciones concedido');
      firebase().messaging().onMessage(message => {
        if (message.notification) {
          Dialogs.alert({
            title: message.notification.title,
            message: message.notification.body,
            okButtonText: "Accept"
          });
        } else if (message.data && message.data.addToCalendarUrl) {
          Dialogs.confirm({
            title: message.data.title || "Nueva Notificación",
            message: message.data.body || "Tienes una nueva notificación.",
            okButtonText: "Add to Google Calendar",
            cancelButtonText: "Close"
          }).then(result => {
            if (result) {
              Utils.openUrl(message.data.addToCalendarUrl);
            }
          });
        } else {
          Dialogs.alert({
            title: message.data.title || "Nueva Notificación",
            message: message.data.body || "Tienes una nueva notificación.",
            okButtonText: "Accept"
          });
        }
      });
  }).catch(error => {
      console.log('Error al solicitar permiso de notificaciones:', error);
  });
}).catch(error => {
  console.log(`Error al inicializar Firebase: ${error}`);
});

Vue.use(Vuex);
Vue.use(DateTimePicker);
Vue.use(PickerField);

new Vue({
  store,
  render: (h) => h('frame', [h(App)]),
}).$start();
