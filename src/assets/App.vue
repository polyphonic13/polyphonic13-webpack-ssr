<template>
    <v-app>
        <v-navigation-drawer
            fixed
            clipped
            app
            hide-overlay
            v-model="drawer"
        >
             <v-list dense>
                <v-list-tile>
                    <v-list-tile-action>
                        <v-icon>local_shipping</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content class="title">
                        Delivery
                    </v-list-tile-content>
                </v-list-tile>
                <v-list-group v-for="item in navbarItems" :value="item.active" v-bind:key="item.title">
                    <v-list-tile slot="item" @click="">
                        <v-list-tile-action>
                            <v-icon>{{ item.action }}</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title>
                                {{ item.title }}
                            </v-list-tile-title>
                        </v-list-tile-content>
                        <v-list-tile-action>
                            <v-icon>keyboard_arrow_down</v-icon>
                        </v-list-tile-action>
                    </v-list-tile>
                    <v-list-tile v-for="subItem in item.items" v-bind:key="subItem.title" @click="" dense>
                        <v-list-tile-content>
                            <v-list-tile-title>
                                {{ subItem.title }}
                            </v-list-tile-title>
                        </v-list-tile-content>

                        <v-list-tile-action>
                            <v-icon>{{ subItem.action }}</v-icon>
                        </v-list-tile-action>
                    </v-list-tile>
                </v-list-group>
            </v-list>
       </v-navigation-drawer>
        <v-toolbar
            color="blue-grey"
            dark
            app
            clipped-left
            fixed
        >
            <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
            <v-toolbar-title class="pr-2">
                <!-- <v-avatar>
                    <img src="static/pol-logo-01.png" alt="polaris-avatar" />
                </v-avatar> -->
                Polaris
            </v-toolbar-title>
            <v-toolbar-items class='hidden-sm-and-down'>
                <v-btn flat href='campaigns.html' class='btn--active'>Delivery</v-btn>
                <v-btn flat href='reports.html'>Reports</v-btn>
                <v-btn flat href='network.html'>Network</v-btn>
                <v-menu offset-y>
                    <v-btn flat href='admin.html' slot="activator">
                        Admin               
                        <v-icon>arrow_drop_down</v-icon>             
                    </v-btn>
                    <v-list>
                        <v-list-tile v-for="item in adminItems" :key="item.title" @click="">
                            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                        </v-list-tile>
                    </v-list>
                </v-menu>
            </v-toolbar-items>
            <v-spacer></v-spacer>
            <v-text-field
                 light
                 solo
                 prepend-icon='search'
                 placeholder='Search...'>
            </v-text-field>
            <v-tooltip bottom>
                <v-btn icon slot="activator">
                    <v-icon>account_circle</v-icon>
                </v-btn>
                <span>Logout</span>
            </v-tooltip>
       </v-toolbar>
        <v-content>
            <v-container fluid fill-height>
                <v-layout justify-center align-center>
                <v-tooltip right>
                    <v-btn icon large target="_blank" slot="activator">
                    <v-icon large>code</v-icon>
                    </v-btn>
                    <span>Source is here</span>
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
  data: () => ({
    drawer: null,
    adminItems: [
      { title: "Home", icon: "dashboard" },
      { title: "About", icon: "question_answer" }
    ],
    navbarItems: [
      {
        action: "card_giftcard",
        title: "Campaigns",
        href: "campaigns.html",
        active: true,
        items: [
          { title: "My Campaigns", href: "campaigns.html", active: true },
          { title: "Delivering", href: "campaigns.html" },
          { title: "Starting Soon", href: "campaigns.html" },
          { title: "Ending Soon", href: "campaigns.html" },
          { title: "Draft", href: "campaigns.html" },
          { title: "Archived", href: "campaigns.html" }
        ]
      },
      {
        action: "list",
        title: "Line Items",
        href: "line_items.html",
        items: [
          { title: "My Line Items", href: "line_items.html" },
          { title: "Delivering", href: "line_items.html" },
          { title: "Starting Soon", href: "line_items.html" },
          { title: "Ending Soon", href: "line_items.html" },
          { title: "Draft", href: "line_items.html" },
          { title: "Archived", href: "line_items.html" }
        ]
      },
      {
        action: "web_asset",
        title: "Creatives",
        href: "creatives.html",
        items: [
          { title: "My Creatives", href: "creatives.html" },
          { title: "Delivering", href: "creatives.html" },
          { title: "Starting Soon", href: "creatives.html" },
          { title: "Ending Soon", href: "creatives.html" },
          { title: "Draft", href: "creatives.html" },
          { title: "Archived", href: "creatives.html" }
        ]
      },
      {
        action: "insert_photo",
        title: "Assets",
        href: "assets.html",
        items: [
          { title: "All Assets", href: "assets.html" },
          { title: "Images", href: "assets.html" },
          { title: "Videos", href: "assets.html" },
          { title: "iFrames", href: "assets.html" },
          { title: "Audios", href: "assets.html" },
          { title: "Shoppers", href: "assets.html" },
          { title: "Archived", href: "assets.html" }
        ]
      },
      {
        action: "library_books",
        title: "Content",
        href: "content.html",
        items: [{ title: "All Content", href: "content.html" }]
      }
    ]
  }),
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
