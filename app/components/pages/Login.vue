<template>
  <Page class="page">
    <ActionBar title="Login X-Events" class="action-bar" />
    <StackLayout class="form">
      <TextField v-model="username" hint="Username" />
      <TextField v-model="password" hint="Password" secure="true" />
      <Button text="Enter" @tap="login" class="btn btn-primary"></Button>
    </StackLayout>
  </Page>
</template>

<script>
import MainPage from './MainPage.vue';
export default {
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    async login() {
      console.log("HI")
      try {
        const response = await fetch('http://10.0.2.2:8080/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: this.username,
            password: this.password,
          }),
        });
        console.log(response)
        if (!response.ok) {
          throw new Error('Credenciales incorrectas');
        }
        const data = await response.json();
        console.log(response.status)
        if (response.status == 200) {
          console.log("its ok")
          this.$store.commit('SET_USER', {
            user: data.username,
            token: data.token,
          });
          console.log('User:', this.$store.state.user);
          this.$navigateTo(MainPage).catch(err => {
            console.error('Error al navegar:', err);
          });
          
        }
      } catch (error) {
        console.error(error.stack)
        console.error(error.message);
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
