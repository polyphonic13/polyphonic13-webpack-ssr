<template>
    <v-app>
        <v-navigation-drawer
            fixed
            clipped
            app
            v-model="drawer"
        >
        </v-navigation-drawer>
        <v-toolbar
            color="blue-grey"
            dark
            app
            clipped-left
        >
            <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
            <v-toolbar-title>TOOLBAR TITLE</v-toolbar-title>
        </v-toolbar>
        <v-content>
            <v-container fluid fill-height>
                <v-layout justify-center align-center>
                <v-tooltip right>
                    <v-btn icon large target="_blank" slot="activator">
                    <v-icon large>code</v-icon>
                    </v-btn>
                    <span>Source</span>
                </v-tooltip>
                </v-layout>
            </v-container>
        </v-content>
        <v-footer
            dark
            clipped-left
        >
            <p>footer</p>
        </v-footer>
    </v-app>
</template>

<script>
import Meta from "../mixins/meta";
import { mapState } from "vuex";
export default {
  mixins: [Meta],
  data() {
    return {
        drawer: true
    };
  },
  computed: mapState({
    error: state => state.error
  }),
  methods: {
    submit: function() {
      // submit code foes here
      console.log("submit");
    },
    pause: function() {
      // pause code goes here.
      console.log("pause");
    },
    cancel: function() {
      console.log("cancel");
    },
    updateDrawer: function() {
      this.drawer = !this.drawer;
      console.log("updateDrawer, drawer now = " + this.drawer);
    }
  }
};
</script>
