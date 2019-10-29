<template>
  <div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "app"
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  outline: 0;
  box-sizing: border-box;
  text-decoration: none;
  list-style: none;
  font-family: "Nanum Gothic", sans-serif;
}

html,
body,
#root {
  height: 100%;
}

div {
  height: 100%;
}
</style>
