<template>
  <q-layout>
    <q-transition>
      <router-view :user="user"/>
    </q-transition>
  </q-layout>
</template>

<script>
export default {
  name: 'LayoutDefault',
  props: ['user'],
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>

<style scoped lang="less">
</style>
