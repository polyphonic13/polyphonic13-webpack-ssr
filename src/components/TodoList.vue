<template>
  <div>
    <v-list two-line>
      <template v-for="item in items">
        <v-subheader v-if="item.header" v-text="item.header"></v-subheader>
        <v-divider v-else-if="item.divider" v-bind:inset="item.inset"></v-divider>
        <v-list-tile avatar v-else v-bind:key="item.title" @click="">
          <v-list-tile-avatar>
            <img v-bind:src="item.avatar">
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title v-html="item.title"></v-list-tile-title>
            <v-list-tile-sub-title v-html="item.subtitle"></v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
      </template>
    </v-list>
    <v-btn @click="updateList" color="primary">Update</v-btn>
  </div>
</template>

<script>
  import { mapState } from 'vuex';

  export default {
    methods: {
      updateList: function() {
        this.$store.dispatch('GET_TODOS');
      }
    },
    computed: mapState({
        items: state => state.todos,
    }),
  };
</script>