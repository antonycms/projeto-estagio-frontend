<template>
  <div id="template-home">
    <section id="header">
      <h2>Bem vindo {{username}}</h2>
      <button @click="logout">Logout</button>
    </section>
    <main>
      <LeafletVue />
    </main>
  </div>
</template>

<script>
import LeafletVue from "./Leaflet.vue";

export default {
  data() {
    return {
      username: ""
    };
  },
  mounted() {
    this.username = window.$cookies.get("user");
  },
  components: {
    LeafletVue
  },
  methods: {
    async logout() {
      window.$cookies.remove("token");
      window.$cookies.remove("user");

      this.$router.push("/");
    }
  }
};
</script>


<style>
#header {
  display: flex;
  justify-content: space-between;
  padding: 20px 5vw;
  text-transform: capitalize;
  color: gray;
  font-family: Arial, Helvetica, sans-serif;
  align-items: center;
}

#header > h2 {
  font-weight: lighter;
  font-size: 24px;
}

#header > button {
  cursor: pointer;
  background-color: blueviolet;
  color: white;
  border: 0;
  border-radius: 4px;
  padding: 8px;
  font-size: 18px;
  font-weight: bold;
}

#header > button:hover {
  background-color: #b366ff;
}

LeafletVue {
  height: 100%;
}
</style>