<template>
  <Page class="page">
    <ActionBar title="Iniciar Sesión" class="action-bar" />
    <StackLayout class="form">
      <TextField v-model="username" hint="Nombre de usuario" />
      <TextField v-model="password" hint="Contraseña" secure="true" />
      <Button text="Ingresar" @tap="login" class="btn btn-primary" />
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
        const response = await fetch('https://tuapi.com/login', {
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
