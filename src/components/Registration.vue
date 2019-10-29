<template>
  <div id="template-main">
    <form id="login">
      <h6>Registrar</h6>
      <input v-model="name" type="text" placeholder="Nome" />
      <input v-model="email" type="text" placeholder="Email" />
      <input v-model="password" type="password" placeholder="Senha" />
      <input v-model="password_repeat" type="password" placeholder="Digite a senha novamente" />
      <button id="btn" v-on:click="entry">Criar conta</button>
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
      password: "",
      password_repeat: ""
    };
  },
  methods: {
    async entry(event) {
      event.preventDefault();

      if (!this.email || !this.name || !this.password) {
        alert("Preencha todos os campos para completar o cadastro");
        return;
      }

      if (this.password !== this.password_repeat) {
        alert("As senhas digitadas são diferentes");
        return;
      }

      try {
        const res = await api.post("/users", {
          name: this.name,
          email: this.email,
          password: this.password
        });

        this.$router.push("/");

        window.console.log(res.data);
      } catch ({ message }) {
        if (message === "Request failed with status code 400") {
          alert("A senha precisa ter no minimo 6 caracteres");
          return;
        }
        window.alert("Email ja cadastrado! ");
      }
    }
  }
};
</script>