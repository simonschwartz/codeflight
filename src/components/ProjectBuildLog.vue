<template>
  <div>
    <h2>Project logs here</h2>
    <ul id="example-1">
      <li v-for="item in progress">
        <span v-if="item.loading">loading</span>
        <span v-if="item.completed">completed</span>
        <span v-else>waiting</span>
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>

<script>

export default {
  data() {
    return {
    }
  },
  props: ['progress']
}
</script>

<style lang="scss" scoped>

ul {
  list-style-type: none;
  padding-left: 0;
}

</style>
