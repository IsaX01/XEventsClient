<template>
    <Page class="page">
      <ActionBar :title="'Reservation for: ' + place.placeName" class="action-bar" />
      <GridLayout rows="*" columns="*" horizontalAlignment="center" verticalAlignment="center" >
        <StackLayout class="form">
          <Label text="Resevation Form" class="label-text"></Label>
          <TextField v-model="name" hint="Event Name" class="input-text"/>
          <TextField v-model="description" hint="Description" class="input-text"/>
          <DatePickerField
            :date="startDate"
            @dateChange="onStartDateChange"
            hint="Select Date Start"
            dateFormat="dd-MMMM-yyyy"
          />
          <TimePickerField
            :time="startTime"
            @timeChange="onStartTimeChange"
            hint="Select Time Start"
            timeFormat="HH:mm"
          />
          <DatePickerField
            :date="endDate"
            @dateChange="onEndDateChange"
            hint="Select Date End"
            dateFormat="dd-MMMM-yyyy"
          />
          <TimePickerField
            :time="endTime"
            @timeChange="onEndTimeChange"
            hint="Select Time End"
            timeFormat="HH:mm"
          />
          <!-- <DateTimePickerFields hintDate="select date" hintTime="select time" /> -->
          <PickerField
            :items="eventTypes"
            :selectedValue="selectedEventType"
            @selectedValueChange="onEventTypeChange"
            textField="name"
            valueField="value"
            hint="Choose Event Type:"
          />
          <TextField v-model="capacity" hint="Capacity" class="input-text" keyboardType="number"/>

          <Button text="Guardar" @tap="saveEvent" class="outline-button"></Button>
        </StackLayout>
      </GridLayout>

    </Page>
  </template>

  <script>
import { GridLayout, Label, TextField } from '@nativescript/core';
import { DatePickerField, TimePickerField } from '@nativescript/datetimepicker';

  export default {
    props: ['place'],
    // components: {
    //   DatePickerField,
    //   TimePickerField
    // },
    computed: {
      user() {
        return this.$store.state.user.user;
      },
    },
    data() {
      return {
        eventTypes: [
          { value: "conference", name: "Conference" },
          { value: "workshop", name: "Workshop" },
          { value: "meetup", name: "Meetup" },
          { value: "webinar", name: "Webinar" }
        ],
        selectedEventType: '',
        category: '',
        startDate: null,
        endDate: null,
        startTime: null,
        endTime: null,
        description: '',
        name: '',
      };
    },
    methods: {
      onStartDateChange(event) {
        this.startDate = event.value;
      },
      onStartTimeChange(event) {
        this.startTime = event.value;
      },
      onEndDateChange(event) {
        this.endDate = event.value;
      },
      onEndTimeChange(event) {
        this.endTime = event.value;
      },
      onEventTypeChange(event) {
        this.selectedEventType = event.value;
      },
      async saveEvent() {
        const startDateString = this.startDate
          ? this.startDate.toISOString().split('T')[0]
          : null;
        const endDateString = this.endDate
          ? this.endDate.toISOString().split('T')[0]
          : null;
        const startTimeString = this.startTime
          ? this.startTime.toTimeString().split(' ')[0]
          : null;
        const endTimeString = this.endTime
          ? this.endTime.toTimeString().split(' ')[0]
          : null;
        try {
          const response = await fetch('http://10.0.2.2:8080/api/events', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              // Authorization: `Bearer ${this.$store.getState().token}`,
            },
            body: JSON.stringify({
              placeId: this.place.id,
              userId: this.user.id,
              name: this.name,
              description: this.description,
              startDate: startDateString,
              startTime: startTimeString,
              endDate: endDateString,
              endTime: endTimeString,
              eventType: this.selectedEventType,
              capacity: this.capacity,
            }),
          });
          console.log(response);
          const data = await response.json();
          if (response.status == 201) {
            alert(`Created Event Successfully ${this.name}`);
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
    border-radius: 20;
    background-color: hsl(0, 0%, 9%);
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

.label-text-datetime {
  font-size: 16;
  color: white;
  margin-bottom: 20;
}

PickerPage {
  background-color: hsl(0, 0%, 9%);
  color: white;
}

PickerPage ActionBar {
  background-color: hsl(0, 0%, 6%);
  color: white;
}

PickerPage ListView {
  background-color: hsl(0, 0%, 9%);
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
  color: white;
}
  </style>
