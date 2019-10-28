<template>
  <div id="template-main">
    <p>Logado com sucesso</p>
    <p>{{test()}}</p>
    <div id="mapid"></div>
  </div>
</template>

<script>
import Geolocation from "../services/geolocation";
import AdvisorWeather from "../services/advisor";

export default {
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    async test() {
      window.console.log(await Geolocation("Maceio"));
      window.console.log(await AdvisorWeather("Maceió"));
    }
  }
};
</script>


<style>
#template-main {
  height: 100%;
}

#mapid {
  height: 180px;
}
</style>