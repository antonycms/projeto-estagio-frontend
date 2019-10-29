<template>
  <div id="template-main">
    <form id="login">
      <h6>Login</h6>
      <input v-model="email" type="text" placeholder="Email" />
      <input v-model="password" type="text" placeholder="Senha" />
      <button id="btn" v-on:click="entry">Entrar</button>
      <a v-on:click="register">Criar conta</a>
    </form>
  </div>
</template>

<script>
import api from "../services/api";
import jwt from "jsonwebtoken";

export default {
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    register(event) {
      event.preventDefault();

      this.$router.push("/registration");
    },
    async entry(event) {
      event.preventDefault();

      if (!this.email.trim() || !this.password.trim()) {
        alert("Preencha todos os campos");
        this.email = "";
        this.password = "";
        return;
      }

      try {
        const res = await api.post("/sessions", {
          email: this.email,
          password: this.password
        });

        api.defaults.headers.authorizathion = "bearer " + res.data.token;

        const name = jwt.decode(res.data.token).name;

        this.$cookies.set("token", res.data.token, "1d");
        this.$cookies.set("user", name);

        this.$router.push({ path: "/home" });
      } catch ({ message }) {
        window.alert("Email ou senha invalidos! " + message);
      }
    }
  }
};
</script>


<style>
#template-main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

#login {
  width: 100%;
  max-width: 300px;
  align-items: center;
  display: flex;
  flex-direction: column;
}
#login > h6 {
  margin-bottom: 10px;
  font-size: 30px;
  text-transform: capitalize;
}
#login > input {
  margin-top: 10px;
  width: 100%;
  padding: 0 20px;
  height: 44px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

#login > #btn {
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

#login > #btn:hover {
  background-color: #b366ff;
}

#login > a {
  color: gray;
  font-size: 15px;
  margin-top: 5px;
  cursor: pointer;
}

#login > a:hover {
  color: #b366ff;
}
</style>