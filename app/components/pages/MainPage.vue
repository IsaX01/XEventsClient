<template>
    <Page class="page">
      <ActionBar :title="'Welcome, ' + user.user" class="action-bar" />
      <GridLayout rows="auto, 50, auto, *" class="main-layout">
        <!-- Menú -->
        <GridLayout row="0" columns="auto, *, auto" rows="auto">
          <Button text="☰" @tap="openMenu" col="0"></Button>
          <TextField v-model="searchQuery" hint="Buscar" col="1" />
          <Button text="🔍" @tap="search" col="2"></Button>
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

        <Label v-for="place in places" :text="place.placeName"></Label>

        <!-- Lista de lugares -->
        <ListView row="2" :items="places" @itemTap="viewPlace">
          <v-template>
            <GridLayout columns="*, auto" rows="auto" class="card">
              <StackLayout col="0">
                <Label :text="item.placeName" class="card-title"></Label>
                <Label :text="item.description" class="card-description"></Label>
                <Label :text="item.location" class="card-location"></Label>
              </StackLayout>
              <StackLayout col="1">
                <Button text="Agregar Evento" @tap="() => addEvent(place)"></Button>
                <Button text="Dar Review" @tap="() => giveReview(place)"></Button>
              </StackLayout>
            </GridLayout>
          </v-template>
        </ListView>
      </GridLayout>
    </Page>
  </template>

  <script>
  import { mapState } from 'vuex';
  import { GridLayout, Label, ListView } from '@nativescript/core';
  import AddEventPage from './AddEventPage';
  import ReviewPage from './ReviewPage';

  export default {
    name: 'MainPage',
    computed: {
      ...mapState(['user', 'categories', 'places']),
      user() {
        return this.$store.state.user;
      },
      categories() {
        return this.$store.state.categories;
      },
      places() {
        return this.$store.state.places;
      },
    },
    data() {
      return {
        searchQuery: '',
        isLoading: true,
        error: null,
      };
    },
    created() {
      this.fetchCategories();
      this.fetchPlaces();
    },
    methods: {
      openMenu() {
        // Lógica para abrir el menú lateral
      },
      async fetchCategories() {
        this.isLoading = true;
        this.error = null;
        try {
          const response = await fetch('http://10.0.2.2:8080/api/inventories/categories');
          const data = await response.json();
          this.$store.commit('SET_CATEGORIES', { categories: data });
          console.log('Ctg:', this.$store.state.categories);
        } catch (error) {
          console.error(error);
          this.error = error.message;
        } finally {
          this.isLoading = false;
        }
      },
      async fetchPlaces() {
        this.isLoading = true;
        this.error = null;
        try {
          const response = await fetch('http://10.0.2.2:8080/api/places');
          const data = await response.json();
          this.$store.commit('SET_PLACES', { places: data });
          console.log('places:', this.$store.state.places);
        } catch (error) {
          console.error(error);
          this.error = error.message;
        } finally {
          this.isLoading = false;
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
        // Navega a la vista detallada del lugar
      },
    },
  };
  </script>

  <style scoped>
  .page {
    background-color: #f0f0f0;
  }

  .action-bar {
    background-color: #3498db;
    color: white;
  }

  .categories {
    padding: 10;
  }

  .btn-category {
    margin-right: 10;
    width: 8rem;
  }

  .card {
    padding: 10;
    margin: 5;
    background-color: white;
    border-radius: 5;
  }

  .card-title {
    font-size: 18;
    font-weight: bold;
  }

  .card-description {
    font-size: 14;
    color: #555;
  }

  .card-location {
    font-size: 12;
    color: #888;
  }

  .error-message {
    color: red;
    text-align: center;
  }
  </style>
