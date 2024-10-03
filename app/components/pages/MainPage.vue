<template>
    <Page class="page">
      <ActionBar :title="'Welcome, ' + user.user" class="action-bar" />
      <GridLayout rows="auto, auto, *" class="main-layout" padding="15">
        <!-- Menú -->
        <GridLayout row="0" columns="auto, *, auto" rows="auto" class="search-container">
          <Button text="☰" @tap="openMenu" col="0" class="outline-button icon-button"></Button>
          <TextField v-model="searchQuery" hint="Search..." col="1" class="input-text"/>
          <Button text="🔍" @tap="search" col="2" class="outline-button icon-button"></Button>
        </GridLayout>

        <ActivityIndicator row="1" v-if="isLoading" busy="true" horizontalAlignment="center" verticalAlignment="center" />
        <Label row="1" v-else-if="error" :text="'Error: ' + error" class="error-message" horizontalAlignment="center"></Label>
        <!-- Categorías -->
        <!-- <ScrollView row="2" orientation="horizontal">
          <StackLayout orientation="horizontal" class="categories">
            <Button
              v-for="category in categories"
              :key="category.id"
              :text="category.category"
              @tap="selectCategory(category)"
              class="btn btn-category"
            ></Button>
          </StackLayout>
        </ScrollView> -->

        <ScrollView row="2">
          <StackLayout>
            <GridLayout
              v-for="(place, index) in places"
              :key="index"
              columns="auto, auto"
              rows="auto, auto"
              class="card"
              padding="10"
            >
              <AbsoluteLayout row="0" columnSpan="2" >
                <Image :src="getImageSource(place.image)" class="place-image" left="0" top="0"/>
                <Image :src="getImageSource(place.image)" class="place-image" left="60" top="0"/>
                <Image :src="getImageSource(place.image)" class="place-image" left="120" top="0"/>
                <Image :src="getImageSource(place.image)" class="place-image" left="180" top="0"/>
              </AbsoluteLayout>
              <StackLayout row="1" col="0">
                <Label :text="place.placeName" class="card-title"></Label>
                <Label :text="place.description" class="card-description"></Label>
                <Label :text="place.location" class="card-location"></Label>
              </StackLayout>
              <StackLayout row="1" col="1"  horizontalAlignment="right">
                <Button text="Add Event" @tap="() => addEvent(place)" class="outline-button alter-button"></Button>
                <Button text="Review Place" @tap="() => giveReview(place)" class="outline-button alter-button"></Button>
              </StackLayout>
            </GridLayout>
          </StackLayout>
        </ScrollView>

        <!-- Lista de lugares -->
        <!-- <ListView row="2" :items="places" @itemTap="viewPlace">
          <v-template>
            <GridLayout columns="auto, auto" rows="auto, auto" class="card">
              <AbsoluteLayout row="0" columnSpan="2" >
                <Image :src="getImageSource(item.image)" class="place-image" left="10" right="10"/>
                <Image :src="getImageSource(item.image)" class="place-image" left="10" right="30"/>
                <Image :src="getImageSource(item.image)" class="place-image" left="10" right="50"/>

              </AbsoluteLayout>
              <StackLayout row="1" col="0">
                <Label :text="item.placeName" class="card-title"></Label>
                <Label :text="item.description" class="card-description"></Label>
                <Label :text="item.location" class="card-location"></Label>
              </StackLayout>
              <StackLayout row="1" col="1">
                <Button text="Add Event" @tap="() => addEvent(item)" class="outline-button alter-button"></Button>
                <Button text="Review Place" @tap="() => giveReview(item)" class="outline-button alter-button"></Button>
              </StackLayout>
            </GridLayout>
          </v-template>
        </ListView> -->

      </GridLayout>
    </Page>
  </template>

  <script>
  import { mapState } from 'vuex';
  import { AbsoluteLayout, GridLayout, Label, ListView } from '@nativescript/core';
  import AddEventPage from './AddEventPage';
  import ReviewPage from './ReviewPage';

  export default {
    name: 'MainPage',
    computed: {
      // user() {
      //   return this.$store.state.user;
      // },
      // categories() {
      //   return this.$store.state.categories;
      // },
      // places() {
      //   return this.$store.state.places;
      // },
      ...mapState(['user', 'categories', 'places']),
    },
    data() {
      return {
        searchQuery: '',
        isLoading: true,
        error: null,
        // places: [
        //   {
        //     id: 1,
        //     placeName: 'Test Place 1',
        //     description: 'Description 1',
        //     location: 'Location 1',
        //   },
        //   {
        //     id: 2,
        //     placeName: 'Test Place 2',
        //     description: 'Description 2',
        //     location: 'Location 2',
        //   },
        // ],
      };
    },
    created() {
      // this.fetchCategories();
      this.fetchPlaces();
    },
    methods: {
      openMenu() {
        // Lógica para abrir el menú lateral
      },
      async fetchCategories() {
        try {
          const response = await fetch('http://10.0.2.2:8080/api/inventories/categories');
          const data = await response.json();
          this.$store.commit('SET_CATEGORIES', { categories: data });
          console.log('Ctg:', this.$store.state.categories);
        } catch (error) {
          console.error(error);
        }
      },
      async fetchPlaces() {
        this.isLoading = true;
        this.error = null;
        try {
          const response = await fetch('http://10.0.2.2:8080/api/places');
          const data = await response.json();
          console.log("data", data);
          this.$store.commit('SET_PLACES', { places: data });
          console.log('places:', this.$store.state.places);
        } catch (error) {
          console.error(error);
          this.error = error.message;
        } finally {
          this.isLoading = false;
        }
      },
      getImageSource(image) {
        if (image && image !== '') {
          return image; // Or construct the full URL if necessary
        } else {
          return 'https://www.coalitionrc.com/wp-content/uploads/2017/01/placeholder.jpg';
        }
      },
      selectCategory(category) {
        // Filtra los lugares según la categoría seleccionada
      },
      search() {
        // Lógica para buscar lugares
      },
      addEvent(place) {
        this.$navigateTo(AddEventPage, { props: { place } });
      },
      giveReview(place) {
        this.$navigateTo(ReviewPage, { props: { place } });
      },
      viewPlace({ item }) {
        console.log('Selected place:', item);
      },
    },
  };
  </script>

  <style scoped>
  .page {
    background-color: hsl(0, 0%, 3%);
  }

  .action-bar {
    background-color: hsl(0, 0%, 9%);;
    color: white;
  }
/*
  .categories {
    padding: 10;
  }

  .btn-category {
    margin-right: 10;
    width: 8rem;
  } */

  .card {
    padding: 15;
    margin: 5 15;
    background-color: hsl(0, 0%, 9%);
    border-radius: 10;
  }

  .card-title {
    font-size: 18;
    font-weight: bold;
    color: white;
  }

  .card-description {
    font-size: 14;
    color: white;
  }

  .card-location {
    font-size: 14;
    color: white;
  }

  .error-message {
    color: red;
    text-align: center;
  }


.search-container {
  /* background-color: hsl(0, 0%, 12%); */
  padding: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #1084b9;
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
  /* margin-bottom: 15rem; */
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

.icon-button {
  width: 50;
  background-color: #1084b9;

}

.place-image {
  width: 100%;
  height: 150;
  margin-bottom: 10;
}

</style>
