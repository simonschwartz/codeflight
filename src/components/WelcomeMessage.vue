<template>
  <div>
    <h2 v-if="username">Welcome {{username}}</h2>
    <h2 v-else>Welcome {{userlogin}}</h2>
  </div>
</template>

<script>

export default {
  data() {
    return {
    }
  },
  props: ['username', 'userlogin']
}
</script>

<style lang="scss" scoped>

h2 {
  font-size: 1.55rem;
  font-weight: 400;
  margin-bottom: 1em;
}

</style>
