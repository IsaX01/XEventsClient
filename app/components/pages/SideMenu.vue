<template>
    <Drawer>
      <StackLayout>
        <Button text="Mis Reservaciones" @tap="goToReservations" />
        <Button text="Mi Usuario" @tap="goToProfile" />
        <Button text="Condiciones de Uso" @tap="goToTerms" />
      </StackLayout>
    </Drawer>
  </template>

  <script>
  export default {
    methods: {
      goToReservations() {
        this.$navigateTo(ReservationsPage);
      },
      goToProfile() {
        this.$navigateTo(ProfilePage);
      },
      goToTerms() {
        this.$navigateTo(TermsPage);
      },
    },
  };
  </script>
