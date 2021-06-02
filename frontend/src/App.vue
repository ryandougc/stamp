<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script setup>

</script>

<style>
* { 
  margin: 0;
  padding: 0;
}

#app {
  font-family: 'Satoshi', sans-serif;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #555555;
  width: 100%;
}

svg {
    width: 25px;
    height: 25px;
    fill: none;
    stroke: #999;
}

svg path {
    width: 12px;
    height: 12px;
}
</style>