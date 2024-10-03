<template>
    <Page class="page">
      <ActionBar :title="'Reservation for: ' + place.placeName" class="action-bar" />
      <GridLayout rows="*" columns="*" horizontalAlignment="center" verticalAlignment="center" >
        <StackLayout class="form">
          <TextField v-model="eventName" hint="Event Name" class="input-text"/>
          <Label class="label-text" text="Date and Time Start"></Label>
          <DatePicker v-model="startDate" class="input-time"/>
          <TimePicker v-model="startTime" class="input-time"/>
          <Label class="label-text" text="Date and Time End"></Label>
          <DatePicker v-model="endDate" class="input-time"/>
          <TimePicker v-model="endTime" class="input-time"/>
          <TextField v-model="capacity" hint="Capacity" class="input-text" keyboardType="number"/>

          <Button text="Guardar" @tap="saveEvent" class="outline-button"></Button>
        </StackLayout>
      </GridLayout>
      
    </Page>
  </template>

  <script>
import { GridLayout, TextField } from '@nativescript/core';

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
          const response = await fetch('http://10.0.2.2:8080/api/events', {
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

  .page {
    background-color: hsl(0, 0%, 3%);
  }

  .action-bar {
    background-color: hsl(0, 0%, 9%);;
    color: white;
  }

.input-text {
  height: 40rem; /* Adjust as needed */
  color: white;
  border-radius: 20rem;
  border-width: 0;
  background-color: hsl(0, 0%, 18%);
  font-size: 15rem;
  box-shadow: 3px 3px 5px 1px rgba(0, 0, 0, 0.7);
  padding: 10rem;
  margin-bottom: 15rem;
}


.outline-button {
  display: flex;
  text-align: center;
  box-shadow: none;
  font-weight: 600;
  padding: 0.486rem 0.8rem;
  font-size: 15rem;
  line-height: 1.45;
  border-radius: 15rem;
  height: 35rem;
  width: 200rem;
  align-items: center;
  justify-content: center;
  border-width: 0;
  background-color: #4cbeeb;
  color: white;
}

.alter-button{
  background-color: #1084b9;
  width: 150rem;
}


.label-text {
  font-size: 16;
  color: white;
}

.input-time {
  border-radius: 5;
  padding: 5 10;
  height: 35;
  /* background-color: #2e2e2e; */
  color: white;
  font-size: 15;
  margin-bottom: 15;
}
  </style>
