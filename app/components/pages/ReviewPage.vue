
<template>
    <Page class="page">
      <ActionBar :title="'Reseñar ' + place.name" class="action-bar" />
      <StackLayout class="form">
        <StackLayout orientation="horizontal">
          <Label text="Calificación: "></Label>
          <!-- Implementa tu componente de estrellas aquí -->
          <!-- <RatingStar v-model="rating" max="5" /> -->
        </StackLayout>
        <TextView v-model="comment" hint="Escribe tu comentario" />
        <Button text="Enviar" @tap="submitReview" class="btn btn-primary"></Button>
      </StackLayout>
    </Page>
  </template>

  <script>
  // import RatingStar from './RatingStar';

  export default {
    components: {
      // RatingStar,
    },
    props: ['place'],
    data() {
      return {
        rating: 0,
        comment: '',
      };
    },
    methods: {
      async submitReview() {
        try {
          const response = await fetch(`https://10.0.2.2:8080/places/${this.place.id}/reviews`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${this.$store.getState().token}`,
            },
            body: JSON.stringify({
              rating: this.rating,
              comment: this.comment,
            }),
          });
          const data = await response.json();
          if (data.success) {
            alert('Reseña enviada con éxito');
            this.$navigateBack();
          } else {
            alert('Error al enviar la reseña');
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
