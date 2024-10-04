<template>
    <Page class="page">
      <ActionBar :title="'Reservation for: ' + place.placeName" class="action-bar" />
      <GridLayout rows="*" columns="*" horizontalAlignment="center" verticalAlignment="center" >
        <StackLayout class="form">
          <Label text="Resevation Form" class="label-text"></Label>
          <TextField v-model="name" hint="Event Name" class="input-text"/>
          <TextField v-model="description" hint="Description" class="input-text"/>
          <DatePickerField v-model="startDate" hint="Select Date Start" />
          <TimePickerField v-model="startTime" hint="Select Time Start" />
          <DatePickerField v-model="endDate" hint="Select Date End" />
          <TimePickerField v-model="endTime" hint="Select Time End" />
          <PickerField hint="Choose Event Type:" :items="pickerItems" textField="name"></PickerField>
          <TextField v-model="capacity" hint="Capacity" class="input-text" keyboardType="number"/>

          <Button text="Guardar" @tap="saveEvent" class="outline-button"></Button>
        </StackLayout>
      </GridLayout>
      
    </Page>
  </template>

  <script>
import { GridLayout, Label, TextField } from '@nativescript/core';

  export default {
    props: ['place'],
    data() {
      return {
        pickerItems: [
          { name: 'Conference' },
          { name: 'Workshop' },
          { name: 'Party' }
        ]
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
  width: 300rem;
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
  font-size: 24;
  color: white;
  margin-bottom: 20;
}

/* PickerPage {
} */

PickerPage ActionBar {
  background-color: hsl(0, 0%, 3%);
}

PickerPage ListView {
  background-color: hsl(0, 0%, 6%);
  color: white;
}

timepickerfield.apply-css,
datepickerfield.apply-css {
  border-radius: 5;
  padding: 5 10;
  height: 35rem;
  width: 300rem;
  background-color: #2e2e2e;
  color: white;
  font-size: 20;
  margin-bottom: 15;
}

timepickerfield,
datepickerfield,
pickerfield {
  padding: 12 4;
  margin-bottom: 15;
}
  </style>
