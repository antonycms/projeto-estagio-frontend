<template>
  <div id="template-main">
    <form>
      <h6>Registrar</h6>
      <input v-model="name" type="text" placeholder="Nome" />
      <input v-model="email" type="text" placeholder="Email" />
      <input v-model="password" type="text" placeholder="Senha" />
      <button v-on:click="entry">Criar conta</button>
    </form>
  </div>
</template>

<script>
import api from "../services/api";

export default {
  data() {
    return {
      name: "",
      email: "",
      password: ""
    };
  },
  methods: {
    async entry(event) {
      event.preventDefault();
      window.console.log("rodou");
      try {
        const res = await api.post("/users", {
          name: this.name,
          email: this.email,
          password: this.password
        });

        this.$router.push("/");

        window.console.log(res.data);
      } catch ({ message }) {
        window.alert("Email ou senha invalidos!");
      }
    }
  }
};
</script>


<style>
#template-main {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

form {
  width: 100%;
  max-width: 300px;
  align-items: center;
  display: flex;
  flex-direction: column;
  font-family: Arial, Helvetica, sans-serif;
}
form > h6 {
  margin-bottom: 10px;
  font-size: 30px;
  text-transform: uppercase;
}
form > input {
  margin-top: 10px;
  width: 100%;
  padding: 0 20px;
  height: 44px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

form > button {
  margin-top: 20px;
  border: 0;
  border-radius: 4px;
  width: 100%;
  height: 48px;
  cursor: pointer;
  background-color: blueviolet;
  color: white;
  font-weight: bold;
}

form > a {
  color: gray;
  font-size: 15px;
  margin-top: 5px;
}
</style>