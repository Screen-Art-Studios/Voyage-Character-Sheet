<template>
  <div class="main">
    <h3 v-if="logged">Welcome Back {{user.name}}</h3>
    <h3 v-if="!logged">Welcome!</h3>
    <button v-on:click="$router.push('/characters')" v-if="logged">Characters</button>
    <button class="login" v-on:click="$router.push('/login')" v-if="!logged">Login</button>
    <button class="account" v-on:click="$router.push('/account')" v-if="logged">Account</button>
    <button class="register" v-on:click="$router.push('/register')" v-if="!logged">Register</button>
    <button class="logOut" v-on:click="$emit('logout')" v-if="logged">Log Out</button>
  </div>
</template>

<script>
export default {
  name: 'Index',
  props: ['user', 'logged']
}
</script>

<style scoped lang="less">
.main {
  background-image: url('../assets/noise2.jpg');
  height: 100%;
  width: 100%;
  background-repeat: repeat;
  margin-top: 80px;
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  grid-template-rows: repeat(10, 1fr);
  position: fixed;
}
h3 {
  font-size: 2.5em;
  text-align: center;
  grid-column-start: 1;
  grid-column-end: 11;
  font-weight: lighter;
}
button {
  height: 40px;
  text-align: center;
  grid-column-start: 2;
  grid-column-end: 10;
  background-position: left;
  background-image: url('../assets/noise.png');
  box-shadow: 0px 3px 4px black;
  color: white;
  font-size: 1.7em;
  font-weight: lighter;
}
</style>
