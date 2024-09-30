<template>
  <Page class="page">
    <ActionBar title="Iniciar Sesión" class="action-bar" />
    <StackLayout class="form">
      <TextField v-model="username" hint="Username" />
      <TextField v-model="password" hint="Password" secure="true" />
      <Button text="Enter" @tap="login" class="btn btn-primary" />
    </StackLayout>
  </Page>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    async login() {
      try {
        const response = await fetch('http://127.0.0.1:8080/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: this.username,
            password: this.password,
          }),
        });
        const data = await response.json();
        if (data.success) {
          this.$store.dispatch({
            type: 'LOGIN_SUCCESS',
            payload: {
              user: data.user,
              token: data.token,
            },
          });
          this.$navigateTo(MainPage);
        } else {
          alert('Credenciales incorrectas');
        }
      } catch (error) {
        console.error(error);
        alert('Error al conectar con el servidor');
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
