<template>
  <Page class="page">
    <ActionBar title="" class="action-bar" />
    <GridLayout rows="*" columns="*" horizontalAlignment="center" verticalAlignment="center">
      <StackLayout class="form" horizontalAlignment="center" verticalAlignment="center">
        <Label class="label-text" text="X-Events"></Label>
        <Label class="label-subtext" text="Best app to find better places"></Label>
        <TextField v-model="username" hint="Username" class="input-text"/>
        <TextField v-model="password" hint="Password" secure="true" class="input-text"/>
        <Button text="Enter" @tap="login" class="outline-button"></Button>
      </StackLayout>
    </GridLayout>
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
  padding: 20rem;
  width: 80%;
  display: flex;
  gap: 5rem;
}

.container {
  width: 100%;
  height: 100%;
}

.page {
  background-color: hsl(0, 0%, 3%);
}

.action-bar {
  background-color: hsl(0, 0%, 3%);
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

.label-text {
  color: white;
  font-size: 40rem;
  padding: 0rem 10rem;
}

.label-subtext {
  color: lightgray;
  font-size: 20rem;
  padding: 0rem 10rem;
  margin-bottom: 40rem;
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

@font-face {
  font-family: 'FontAwesome';
  src: url('~/fonts/fontawesome-webfont.ttf');
}

.fa {
  font-family: 'FontAwesome';
}

</style>
