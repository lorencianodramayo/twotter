<template>
  <div id="app">
    <div class="app__header">
      <router-link to="/">
        <div class="app__title">Twootter</div>
      </router-link>
      <div class="app__user" v-if="user">
        {{ user.username }}
      </div>
    </div>
    <router-view/>
  </div>
</template>

<script>
import { useStore } from 'vuex';
import { computed } from 'vue';
export default {
  name: 'App',
  setup(){
    const store = useStore();
    const user = computed(() => store.state.User.user);

    return {
      user
    }
  }
}
</script>

<style lang="scss" scoped>
#app{
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    min-height:100vh;
    background-color: #F3F5FA;

    .app__header{
      padding: 20px 5%;
      background: #191919;
      color: #FFF;
      font-weight: bold;
      display: flex;
      justify-content: space-between;
    }
}
</style>