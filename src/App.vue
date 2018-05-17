<template>
  <div id="q-app">
    <div class="main">
    <navbar  :logged="loggedIn" :user="user"></navbar>
    <transition name="fade">
      <router-view v-on:login="login" v-on:logout="logOut" v-on:register="register" :logged="loggedIn" :user="user"/>
    </transition>
  </div>
</div>
</template>

<script>
import navbar from './pages/elements/Navbar'
export default {
  name: 'App',
  components: {
    'navbar': navbar
  },
  created () {
    let vue = this
    vue.user.token = localStorage.getItem('Tusktoken')
    vue.user.id = localStorage.getItem('TuskuserId')
    vue.user.name = localStorage.getItem('Tuskname')
    vue.user.admin = localStorage.getItem('Tuskadmin')
    if (vue.user.token !== null) {
      vue.loggedIn = true
    }
  },
  data: function () {
    return {
      loggedIn: false,
      user: {
        id: '',
        token: '',
        name: '',
        admin: false
      }
    }
  },
  methods: {
    login: function (user) {
      let vue = this
      vue.user.token = user.token
      vue.user.id = user.id
      vue.user.admin = user.admin
      vue.loggedIn = true
      vue.$router.push('/characters')
    },
    logOut: function () {
      let vue = this
      vue.user.token = ''
      vue.user.id = ''
      vue.loggedIn = false
      localStorage.removeItem('Tusktoken')
      localStorage.removeItem('TuskuserId')
      localStorage.removeItem('Tuskname')
      localStorage.removeItem('Tuskadmin')
      vue.$router.push('/')
    },
    register: function (user) {
      let vue = this
      console.log(user)
      vue.user.token = user.token
      vue.user.id = user.id
      vue.user.name = user.name
      vue.user.admin = user.admin
      vue.$router.push('/characters')
    }
  }
}
</script>

<style scoped lang="less">
  .fade-enter-active, .fade-leave-active {
    transition: all .25s ease;
    transition: all .25s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }

  .fade-enter, .fade-leave-active {
    opacity: 0;
    transform: translateY(20px);
  }
</style>
