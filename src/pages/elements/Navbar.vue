<template>
  <div class="main" v-on:click="$router.push('/')">
    <h1>Tusk Mk1</h1>
    <h2>Neverend Edition</h2>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  props: ['logged'],
  data () {
    return {}
  }
}
</script>

<style scoped lang="less">
.main {
  height: 120px;
  width: 100%;
  background-image: url('../../assets/noise.png');
  background-repeat: repeat;
  position: fixed;
  top: 0;
  box-shadow: 0px 3px 4px black;
  z-index: 10;
}
  h1 {
    color: #fff;
    font-size: 1.7em;
    text-align: center;
  }
  h2 {
    color: #fff;
    font-size: 1.3em;
    text-align: center;
    line-height: 0px;
  }
</style>
