<template>
    <Page class="page">
      <ActionBar :title="'Reservar en ' + place.name" class="action-bar" />
      <StackLayout class="form">
        <TextField v-model="eventName" hint="Nombre del evento" />
        <DatePicker v-model="eventDate" />
        <TimePicker v-model="eventTime" />
        <Button text="Guardar" @tap="saveEvent" class="btn btn-primary" />
      </StackLayout>
    </Page>
  </template>

  <script>
  export default {
    props: ['place'],
    data() {
      return {
        eventName: '',
        eventDate: new Date(),
        eventTime: new Date(),
      };
    },
    methods: {
      async saveEvent() {
        try {
          const response = await fetch('http://127.0.0.1:8080/api/events', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${this.$store.getState().token}`,
            },
            body: JSON.stringify({
              placeId: this.place.id,
              name: this.eventName,
              date: this.eventDate,
              time: this.eventTime,
            }),
          });
          const data = await response.json();
          if (data.success) {
            alert('Reservación guardada con éxito');
            this.$navigateBack();
          } else {
            alert('Error al guardar la reservación');
          }
        } catch (error) {
          console.error(error);
        }
      },
    },
  };
  </script>

  <style scoped>
  .form {
    padding: 20;
  }
  </style>
