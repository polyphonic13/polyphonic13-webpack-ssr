<template>
  <v-layout>
    <v-flex text-xs-center>
      <todo-list></todo-list>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  asyncData ({store, route}) {
    return store.dispatch('GET_TODOS');
  },
}
</script>

