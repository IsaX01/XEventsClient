<template>
    <Page class="page">
      <ActionBar :title="'Bienvenido, ' + user.name" class="action-bar" />
      <StackLayout>
        <!-- Menú -->
        <GridLayout columns="auto, *, auto" rows="auto">
          <Button text="☰" @tap="openMenu" col="0" />
          <TextField v-model="searchQuery" hint="Buscar" col="1" />
          <Button text="🔍" @tap="search" col="2" />
        </GridLayout>

        <!-- Categorías -->
        <ScrollView orientation="horizontal">
          <StackLayout orientation="horizontal" class="categories">
            <Button
              v-for="category in categories"
              :key="category.id"
              :text="category.name"
              @tap="selectCategory(category)"
              class="btn btn-category"
            />
          </StackLayout>
        </ScrollView>

        <!-- Lista de lugares -->
        <ListView for="(place, index) in places" @itemTap="viewPlace">
          <v-template>
            <GridLayout columns="*, auto" rows="auto" class="card">
              <StackLayout col="0">
                <Label :text="place.name" class="card-title" />
                <Label :text="place.description" class="card-description" />
              </StackLayout>
              <StackLayout col="1">
                <Button text="Agregar Evento" @tap="() => addEvent(place)" />
                <Button text="Dar Review" @tap="() => giveReview(place)" />
              </StackLayout>
            </GridLayout>
          </v-template>
        </ListView>
      </StackLayout>
    </Page>
  </template>

  <script>
  import { mapState } from 'nativescript-vue-redux';
  import AddEventPage from './AddEventPage';
  import ReviewPage from './ReviewPage';

  export default {
    computed: {
      ...mapState(['user', 'categories', 'places']),
    },
    data() {
      return {
        searchQuery: '',
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
        try {
          const response = await fetch('http://127.0.0.1:8080/api/inventories/categories');
          const data = await response.json();
          this.$store.dispatch({
            type: 'SET_CATEGORIES',
            payload: { categories: data.categories },
          });
        } catch (error) {
          console.error(error);
        }
      },
      async fetchPlaces() {
        try {
          const response = await fetch('http://127.0.0.1:8080/api/places');
          const data = await response.json();
          this.$store.dispatch({
            type: 'SET_PLACES',
            payload: { places: data.places },
          });
        } catch (error) {
          console.error(error);
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
  .categories {
    padding: 10 0;
  }
  .card {
    padding: 10;
    border-bottom-width: 1;
    border-color: #ccc;
  }
  .card-title {
    font-weight: bold;
  }
  .card-description {
    color: #666;
  }
  </style>
