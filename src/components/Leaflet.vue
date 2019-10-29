<template>
  <main id="template-main">
    <form id="search">
      <input v-model="search" type="text" placeholder="Cidade" />
      <button @click="searchCity">Buscar</button>
      <button id="save" @click="saveCity">Salvar cidade</button>
    </form>
    <div id="map"></div>
  </main>
</template>

<script>
import Geolocation from "../services/geolocation.js";
import api from "../services/api";
import advisor from "../services/advisor";

export default {
  data() {
    return {
      search: "",
      city: "",
      state: "AL",
      lat: "",
      long: "",
      locale: {},
      temp: "0"
    };
  },
  methods: {
    async getTemperature(event) {
      event.preventDefault();

      advisor.weather(this.city);
    },
    async saveCity(event) {
      event.preventDefault();

      try {
        api.defaults.headers.authorization =
          "bearer " + window.$cookies.get("token");

        await api.post("/cities", {
          name: this.city,
          state: this.state
        });

        alert("Cidade Salva com sucesso!");
      } catch (error) {
        alert("A cidade ja foi salva no banco de dados");
      }
    },
    async searchCity(event) {
      event.preventDefault();

      if (!this.search.trim()) {
        alert("Preencha o campo para buscar uma cidade");
        this.search = "";

        return;
      }
      try {
        this.locale = await Geolocation(this.search);
        this.lat = this.locale.location.lat;
        this.long = this.locale.location.lng;
      } catch (error) {
        window.console.log({ err: error, error: error.message });
        return;
      }

      this.city = this.locale.formatted_address.split(" - ")[0];

      let ok = false;
      for (let [, obj] of Object.entries(this.locale.address_components)) {
        if (obj.short_name.length == 2 && ok == false) {
          ok = true;
          this.state = obj.short_name;
        }
      }

      if (this.state != "AL") {
        alert(
          "Apenas cidades pertencentes ao estado de Alagoas podem ser pesquisadas"
        );

        this.city = "";
        this.state = "";
        this.search = "";

        return;
      }

      this.mymap.setView([this.lat, this.long], 12);
      const marker = window.L.marker([this.lat, this.long]).addTo(this.mymap);

      marker.bindPopup(`${this.city} <br> temp: ${this.temp}°`);
    }
  },
  mounted() {
    this.mymap = window.L.map("map").setView([-9.6498487, -35.7089492], 9);

    window.L.tileLayer(
      "https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}",
      {
        maxZoom: 18,
        id: "mapbox.streets",
        accessToken:
          "pk.eyJ1IjoiYW50b255YzgyOCIsImEiOiJjazI5cjA4cWkwZWN1M2NvODJpb2JpOXp4In0.qnfSrdj-UnOsQjE-qMko8w"
      }
    ).addTo(this.mymap);
  }
};
</script>

<style>
.leaflet-popup-pane {
  height: 60px;
}
#map {
  height: 70vh;
  width: 90vw;
}

main > #search {
  display: flex;
  margin-bottom: 15px;
  justify-content: center;
  align-items: center;
  padding: 30px 0;
}

main > #search input {
  border: 1px solid #ddd;
  border-radius: 4px;
  max-width: 100%;
  width: 40vw;
  height: 40px;
  padding: 0 10px;
  margin: 0 5px;
}

main > #search button {
  border: 0;
  background-color: blueviolet;
  color: white;
  font-weight: bold;
  border-radius: 4px;
  height: 40px;
  padding: 0 30px;
  cursor: pointer;
  width: 10vw;
}

main > #search button:hover {
  background-color: #b366ff;
}

main > #search #save {
  margin: 0 5px;
  background-color: #00e673;
}

main > #search #save:hover {
  background-color: #66ff99;
}
</style>