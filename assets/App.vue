<template>
    <v-app id="polaris">   
        <v-navigation-drawer 
          class="blue-grey lighten-4"
          fixed
          clipped
          app
          hide-overlay
          v-model="drawer">                    
            <v-list dense>
                <v-list-tile>
                    <v-list-tile-action>
                        <v-icon>local_shipping</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content class="title">
                        Delivery
                    </v-list-tile-content>
                </v-list-tile>
                <v-list-group v-for="item in sidebarNavItems" :value="item.active" v-bind:key="item.title">
                    <v-list-tile slot="item">
                        <v-list-tile-action>
                            <v-icon>{{ item.action }}</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title>
                                <a :href="item.href">{{ item.title }}</a>
                            </v-list-tile-title>
                        </v-list-tile-content>
                        <v-list-tile-action>
                            <v-icon>keyboard_arrow_down</v-icon>
                        </v-list-tile-action>
                    </v-list-tile>
                    <v-list-tile v-for="subItem in item.items" v-bind:key="subItem.title" dense>
                        <v-list-tile-content>
                            <v-list-tile-title>
                                <a :href="subItem.href">{{ subItem.title }}</a>
                            </v-list-tile-title>
                        </v-list-tile-content>
                        <v-list-tile-action>
                            <v-icon>{{ subItem.action }}</v-icon>
                        </v-list-tile-action>
                    </v-list-tile>
                </v-list-group>
            </v-list>
        </v-navigation-drawer>
        <v-toolbar dark clipped-left fixed app color="blue-grey">
            <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
            <v-toolbar-title class="pr-2">
                <v-icon>explore</v-icon>
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
                        <v-list-tile v-for="item in adminItems" :key="item.title">
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
            <v-container grid-list-xl>
                <v-layout row wrap text-xs-left>
                    <v-flex xs12>
                        <!-- <h1 class="title">Campaign Detail Screen (Add/Edit)</h1> -->
                        <v-breadcrumbs>
                            <v-icon slot="divider">chevron_right</v-icon>
                            <v-breadcrumbs-item 
                                v-for="item in breadcrumbs" :key="item.text"
                                :disabled="item.disabled"
                            >
                                {{ item.text }}
                            </v-breadcrumbs-item>
                        </v-breadcrumbs>                    
                    </v-flex>
                </v-layout>
                <v-tabs scrollable>
                    <v-tabs-bar color="grey lighten-4">
                        <v-tabs-item href="#settings" ripple>
                            Settings
                        </v-tabs-item>
                        <v-tabs-item href="#line-items" ripple>
                            Line Items
                        </v-tabs-item>
                        <v-tabs-item href="#creatives" ripple>
                            Creatives
                        </v-tabs-item>
                        <v-tabs-item href="#assets" ripple>
                            Assets
                        </v-tabs-item>
                        <v-tabs-item href="#events" ripple>
                            3rd Party Tracker Event Mapping
                        </v-tabs-item>
                        <v-tabs-slider></v-tabs-slider>
                    </v-tabs-bar>
                    <v-tabs-items class="mt-3">
                        <v-tabs-content id="settings">
                            <v-form v-model="valid">   
                                <v-layout row wrap>
                                    <v-flex xs12>     
                                        <v-text-field
                                            name="campaignName"
                                            label="Campaign Name"
                                            id="campaignName"
                                            placeholder="Name"
                                            required
                                            value="Campaign of Ultimate Muppet Floppiness"
                                        ></v-text-field>
                                    </v-flex>
                                    <v-flex xs12 md6>
                                        <v-select
                                            placeholder="Type to pick an advertiser..."
                                            label="Advertiser"
                                            id="advertiser"
                                            name="advertiser"
                                            value="Henson Company"
                                            autocomplete
                                            disabled
                                        ></v-select>                        
                                    </v-flex>
                                    <v-flex xs12 md6>
                                        <v-text-field
                                            name="operativeId"
                                            label="Operative ID"
                                            id="operativeId"
                                            hint="Manually entered or auto-added from Operative or csv export."
                                            persistent-hint
                                            placeholder="Operative ID"
                                            value="123456"
                                        ></v-text-field>
                                    </v-flex>
                                    <v-flex xs12>
                                        <v-text-field
                                            name="budget"
                                            label="Budget"
                                            id="budget"
                                            prefix="$"
                                            placeholder="50,000"
                                            value="100,000"
                                        ></v-text-field>
                                    </v-flex>
                                </v-layout>
                                <v-layout row wrap>
                                    <v-flex xs4> 
                                        <v-select
                                            v-bind:items="timeZones"
                                            v-model="timeZoneDefault"
                                            label="Time Zone"
                                            id="timeZone"
                                        ></v-select>
                                    </v-flex>
                                    <v-flex xs4> 
                                        <v-menu
                                            lazy
                                            :close-on-content-click="false"
                                            v-model="startDateMenu"
                                            transition="scale-transition"
                                            offset-y
                                            full-width
                                            :nudge-right="40"
                                            max-width="290px"
                                            min-width="290px"
                                          >
                                            <v-text-field
                                                slot="activator"
                                                id="startDate"
                                                name="startDate"
                                                label="Start Date"
                                                v-model="startDate"
                                                prepend-icon="event"
                                                placeholder="YYYY-MM-DD"
                                                readonly
                                            ></v-text-field>
                                            <v-date-picker v-model="startDate" no-title scrollable actions>
                                                <template slot-scope="{ save, cancel }">
                                                    <v-card-actions>
                                                    <v-spacer></v-spacer>
                                                    <v-btn flat color="primary" @click="cancel">Cancel</v-btn>
                                                    <v-btn flat color="primary" @click="save">OK</v-btn>
                                                    </v-card-actions>
                                                </template>
                                            </v-date-picker>
                                        </v-menu>
                                    </v-flex>
                                    <v-flex xs4> 
                                        <v-menu
                                            lazy
                                            :close-on-content-click="false"
                                            v-model="endDateMenu"
                                            transition="scale-transition"
                                            offset-y
                                            full-width
                                            :nudge-right="40"
                                            max-width="290px"
                                            min-width="290px"
                                          >
                                            <v-text-field
                                                slot="activator"
                                                id="endDate"
                                                name="endDate"
                                                label="End Date"
                                                v-model="endDate"
                                                prepend-icon="event"
                                                placeholder="YYYY-MM-DD"
                                                readonly
                                            ></v-text-field>
                                            <v-date-picker v-model="endDate" no-title scrollable actions>
                                                <template slot-scope="{ save, cancel }">
                                                    <v-card-actions>
                                                    <v-spacer></v-spacer>
                                                    <v-btn flat color="primary" @click="cancel">Cancel</v-btn>
                                                    <v-btn flat color="primary" @click="save">OK</v-btn>
                                                    </v-card-actions>
                                                </template>
                                            </v-date-picker>
                                        </v-menu>
                                    </v-flex>
                                </v-layout>

                                <!-- <v-subheader>Team Information</v-subheader> -->
                                <v-layout row wrap> 
                                    <v-flex xs6> 
                                        <v-select
                                            v-bind:items="agencies"
                                            v-model="agencyDefault"
                                            placeholder="Type to pick an agency..."
                                            label="Agency"
                                            id="agency"
                                            name="agency"
                                            combobox
                                        ></v-select>
                                    </v-flex>
                                    <v-flex xs6> 
                                        <v-select
                                            v-bind:items="clients"
                                            v-model="clientDefault"
                                            placeholder="Type to pick a client or create a new one..."
                                            label="Client"
                                            id="client"
                                            name="clients"
                                            combobox
                                        ></v-select>
                                    </v-flex>
                                    <v-flex xs6> 
                                        <v-select
                                            :items="brands"
                                            v-model="brandDefault"
                                            placeholder="Type to pick a brand or create a new one..."
                                            label="Brand"
                                            id="brand"
                                            name="brand"
                                            combobox
                                          ></v-select>
                                    </v-flex>
                                    <v-flex xs6> 
                                        <v-select
                                            :items="sellers"
                                            v-model="sellerDefault"
                                            placeholder="Type to pick a seller or create a new one..."
                                            label="Seller"
                                            id="seller"
                                            name="seller"
                                            combobox
                                          ></v-select>
                                    </v-flex>
                                    <v-flex xs6> 
                                        <v-select
                                            :items="traffickers"
                                            v-model="traffickerDefault"
                                            placeholder="Type to pick a trafficker or create a new one..."
                                            label="Trafficker"
                                            id="trafficker"
                                            name="trafficker"
                                            combobox
                                          ></v-select>
                                    </v-flex>
                                    <v-flex xs6> 
                                        <v-select
                                            :items="csms"
                                            v-model="csmDefault"
                                            placeholder="Type to pick a client services manager or create a new one..."
                                            label="Client Services Manager"
                                            id="csm"
                                            name="csm"
                                            combobox
                                          ></v-select>
                                    </v-flex>
                                </v-layout>

                                    
                            </v-form>
                        </v-tabs-content>
                        <v-tabs-content id="line-items">
                            <v-data-table
                                v-bind:headers="liTableHeaders" 
                                v-bind:items="liTableItems" 
                                v-bind:pagination.sync="liTablePagination" 
                                item-key="name" 
                                class="elevation-1" 
                            >
                                <template slot="headers" slot-scope="props">
                                    <tr>
                                        <th v-for="header in props.headers" :key="header.text" 
                                            :class="['column sortable', liTablePagination.descending ? 'desc' : 'asc', header.value === liTablePagination.sortBy ? 'active' : '', header.align ? 'text-xs-'+header.align : 'text-xs-left']" 
                                            @click="changeSort(header.value)" 
                                        >
                                                <v-icon>arrow_upward</v-icon>
                                                {{ header.text }}
                                        </th>
                                    </tr>
                                </template>
                                <template slot="items" slot-scope="props">
                                    <tr>
                                        <td>{{ props.item.id }}</td>
                                        <td><a href="line_item_edit.html">{{ props.item.name }}</a></td>
                                        <td class="text-xs-center">{{ props.item.start_date }}</td>
                                        <td class="text-xs-center">{{ props.item.end_date }}</td>
                                        <td class="text-xs-center">
                                            <v-btn dark :class="[props.item.status === 'active' ? 'green' : 'grey']">{{ props.item.status === 'active' ? 'Active' : 'Inactive' }}</v-btn>
                                        </td>
                                        <td class="text-xs-center">
                                            <a href="#creatives">{{ props.item.creative_associations }}</a>
                                        </td>
                                        <td>{{ props.item.priority }}</td>
                                        <td class="text-xs-center red lighten-3">
                                            <span class="d-inline-flex"> 
                                                {{ props.item.goal_delivered }}/{{ props.item.goal_amount }} ({{ props.item.goal_delivered_percentage }}%)<br /> 
                                                {{ props.item.goal_type }}
                                            </span>
                                        </td>
                                        <td class="text-xs-center">
                                            <v-tooltip top>
                                                <v-btn flat icon fab small color="grey" slot="activator">
                                                    <v-icon>content_copy</v-icon>
                                                </v-btn>
                                                <span>Clone</span>
                                            </v-tooltip>
                                        </td>
                                        <td>{{ props.item.modified_date }}</td>                                        
                                    </tr>
                                </template>
                            </v-data-table>
                        </v-tabs-content>
                        <v-tabs-content id="creatives">
                            <v-data-table
                                v-bind:headers="creativeTableHeaders" 
                                v-bind:items="creativeTableItems" 
                                v-bind:pagination.sync="creativeTablePagination" 
                                item-key="name" 
                                class="elevation-1" 
                            >
                                <template slot="headers" slot-scope="props">
                                    <tr>
                                        <th v-for="header in props.headers" :key="header.text" 
                                            :class="['column sortable', creativeTablePagination.descending ? 'desc' : 'asc', header.value === creativeTablePagination.sortBy ? 'active' : '', header.align ? 'text-xs-'+header.align : 'text-xs-left']" 
                                            @click="changeSort(header.value)" 
                                        >
                                                <v-icon>arrow_upward</v-icon>
                                                {{ header.text }}
                                        </th>
                                    </tr>
                                </template>
                                <template slot="items" slot-scope="props">
                                    <tr>
                                        <td>{{ props.item.id }}</td>
                                        <td><a href="#creatives">{{ props.item.name }}</a></td>
                                        <td>{{ props.item.type }}</td>
                                        <td>{{ props.item.advertiser }}</td>
                                        <td>
                                            <v-tooltip top>
                                                <v-btn flat icon fab small color="grey" slot="activator">
                                                    <v-icon>remove_red_eye</v-icon>
                                                </v-btn>
                                                <span>Preview</span>
                                            </v-tooltip>
                                            <v-tooltip top>
                                                <v-btn flat icon fab small color="grey" slot="activator">
                                                    <v-icon>content_copy</v-icon>
                                                </v-btn>
                                                <span>Clone</span>
                                            </v-tooltip>
                                            <v-tooltip top>                                                    
                                                <v-btn flat icon fab small color="grey" slot="activator">
                                                    <v-icon>delete</v-icon>
                                                </v-btn>                                                
                                                <span>Delete</span>
                                            </v-tooltip>
                                        </td>
                                        <td>{{ props.item.modified_date }}</td>                                        
                                    </tr>
                                </template>
                            </v-data-table>
                        </v-tabs-content>
                        <v-tabs-content id="assets">
                            <v-data-table
                                v-bind:headers="assetTableHeaders" 
                                v-bind:items="assetTableItems" 
                                v-bind:pagination.sync="assetTablePagination" 
                                item-key="name" 
                                class="elevation-1" 
                            >
                                <template slot="headers" slot-scope="props">
                                    <tr>
                                        <th v-for="header in props.headers" :key="header.text" 
                                            :class="['column sortable', assetTablePagination.descending ? 'desc' : 'asc', header.value === assetTablePagination.sortBy ? 'active' : '', header.align ? 'text-xs-'+header.align : 'text-xs-left']" 
                                            @click="changeSort(header.value)" 
                                        >
                                                <v-icon>arrow_upward</v-icon>
                                                {{ header.text }}
                                        </th>
                                    </tr>
                                </template>
                                <template slot="items" slot-scope="props">
                                    <tr>
                                        <td>{{ props.item.id }}</td>
                                        <td class="text-xs-center">
                                            <img v-if="props.item.type == 'image'" :src="props.item.thumbnail" :alt="props.item.name" class="mt-1">
                                            <v-icon v-if="props.item.type == 'video'">videocam</v-icon>
                                            <v-icon v-if="props.item.type == 'audio'">audiotrack</v-icon>
                                            <v-icon v-if="props.item.type == 'iframe'">picture_in_picture</v-icon>
                                            <v-icon v-if="props.item.type == 'shopper'">shopping_cart</v-icon>
                                        </td>
                                        <td><a href="asset_edit.html">{{ props.item.name }}</a></td>
                                        <td>{{ props.item.type }}</td>
                                        <td class="text-xs-center">
                                            <v-btn dark :class="[props.item.status === 'active' ? 'green' : 'grey']">{{ props.item.status === 'active' ? 'Active' : 'Inactive' }}</v-btn>
                                        </td>
                                        <td class="text-xs-center">
                                            <a href="asset_edit.html#/creatives">{{ props.item.creative_associations }}</a>
                                        </td>
                                        <td>{{ props.item.modified_date }}</td>                                        
                                    </tr>
                                </template>
                            </v-data-table>
                        </v-tabs-content>
                        <v-tabs-content id="events">
                            3rd Party Event Tracker Mapping Tab
                        </v-tabs-content>
                    </v-tabs-items>
                </v-tabs>
                <v-footer>
                    <v-btn
                        @click="submit"
                        :disabled="!valid"
                        dark
                        color="primary"
                    >
                        Save
                    </v-btn>
                    <v-btn
                        @click="pause"
                        color="secondary"
                    >
                        Pause
                    </v-btn>
                </v-footer>
            </v-container>
        </v-content>
        <v-footer app>
            <span>&copy; 2017</span>
        </v-footer>
    </v-app>
</template>

<script>
import Meta from "mixins/meta";
import { mapState } from "vuex";
export default {
  mixins: [Meta],

  data() {
    return {
      valid: true,
      drawer: true,
      clipped: false,
      fixed: false,
      items: [
        { icon: "apps", title: "Welcome", to: "/" },
        { icon: "bubble_chart", title: "Inspire", to: "/inspire" },
        { icon: "list", title: "Todo", to: "/todo" }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "Polaris Console",
      timeZoneDefault: "EST",
      timeZones: ["EST", "CST", "PST", "GMT"],
      startDate: null,
      startDateMenu: false,
      endDate: null,
      endDateMenu: false,
      agencyDefault: null,
      agencies: [
        "The First Order",
        "The Rebel Alliance",
        "The Empire",
        "The Imperial Senate",
        "The Galactic Republic"
      ],
      brandDefault: null,
      brands: ["Disney", "Lucasfilm", "Proctor & Gamble", "Nabisco"],
      clientDefault: null,
      clients: [
        "Poe Dameron",
        "Luke Skywalker",
        "Qui-Gon Jinn",
        "Unkar Plutt",
        "Jabba the Hutt"
      ],
      csmDefault: null,
      csms: ["Tom", "Jerry", "Frank", "Lisa"],
      sellerDefault: null,
      sellers: ["Tom", "Jerry", "Frank", "Lisa"],
      traffickerDefault: null,
      traffickers: ["Tom", "Jerry", "Frank", "Lisa"],

      breadcrumbs: [
        {
          text: "Henson Company",
          disabled: false
        },
        {
          text: "Campaign of Ultimate Muppet Floppiness",
          disabled: true
        }
      ],

      // line items table
      liTablePagination: {
        sortBy: "modified_date",
        descending: true
      },
      liTableHeaders: [
        { text: "ID", value: "id" },
        {
          text: "Name",
          align: "left",
          value: "name"
        },
        { text: "Start Date", value: "start_date" },
        { text: "End Date", value: "end_date" },
        { text: "Status", value: "status", align: "center" },
        { text: "Creatives", value: "creative_associations", align: "center" },
        { text: "Priority", value: "priority" },
        { text: "Delivery", value: "goal_delivered_percentage" },
        { text: "Actions" },
        { text: "Modified", value: "modified_date" }
      ],
      liTableItems: [
        {
          value: false,
          id: "123456",
          name: "Line Item of Ultimate Greatness",
          start_date: "2017-10-01",
          end_date: "2017-10-09",
          modified_date: "2017-12-14",
          status: "active",
          priority: "House",
          goal_delivered: "21K",
          goal_amount: "300K",
          goal_delivered_percentage: "8",
          goal_type: "Video Completes",
          creative_associations: "15"
        },
        {
          value: false,
          id: "098435",
          name: "Line Item of Ultimate Clingwrap",
          start_date: "2017-08-31",
          end_date: "2017-09-05",
          modified_date: "2017-12-13",
          status: "inactive",
          priority: "Sponsorship",
          goal_delivered: "21K",
          goal_amount: "300K",
          goal_delivered_percentage: "8",
          goal_type: "Video Completes",
          creative_associations: "15"
        },
        {
          value: false,
          id: "345298",
          name: "Line Item of Ultimate Fullness",
          start_date: "2017-09-15",
          end_date: "2017-10-01",
          modified_date: "2017-10-01",
          status: "inactive",
          priority: "House",
          goal_delivered: "21K",
          goal_amount: "300K",
          goal_type: "Video Completes",
          goal_delivered_percentage: "8",
          creative_associations: "15"
        },
        {
          value: false,
          id: "345298",
          name: "Line Item of Ultimate Gumminess",
          start_date: "2017-10-01",
          end_date: "2017-10-08",
          modified_date: "2017-10-01",
          status: "active",
          priority: "House",
          goal_delivered: "21K",
          goal_amount: "300K",
          goal_type: "Video Completes",
          goal_delivered_percentage: "8",
          creative_associations: "15"
        },
        {
          value: false,
          id: "345298",
          name: "Line Item of Ultimate Crispness",
          start_date: "2017-09-30",
          end_date: "2017-10-02",
          modified_date: "2017-10-01",
          status: "active",
          priority: "House",
          goal_delivered: "21K",
          goal_amount: "300K",
          goal_type: "Video Completes",
          goal_delivered_percentage: "8",
          creative_associations: "15"
        }
      ],

      // creatives table
      creativeTablePagination: {
        sortBy: "modified_date",
        descending: true
      },
      creativeTableActions: null,
      creativeTableHeaders: [
        { text: "ID", value: "id" },
        {
          text: "Name",
          align: "left",
          value: "name"
        },
        { text: "Type", value: "type" },
        { text: "Advertiser", value: "advertiser" },
        { text: "Actions" },
        { text: "Modified", value: "modified_date" }
      ],
      creativeTableItems: [
        {
          value: false,
          id: "123456",
          name: "Creative of Ultimate Greatness",
          modified_date: "2017-12-14",
          type: "SPU",
          advertiser: "Henson Co."
        },
        {
          value: false,
          id: "098435",
          name: "Creative of Ultimate Clingwrap",
          modified_date: "2017-12-13",
          type: "SPU",
          advertiser: "Henson Co."
        },
        {
          value: false,
          id: "345298",
          name: "Creative of Ultimate Fullness",
          modified_date: "2017-10-01",
          type: "SPU",
          advertiser: "Henson Co."
        },
        {
          value: false,
          id: "345298",
          name: "Creative of Ultimate Gumminess",
          modified_date: "2017-10-01",
          type: "SPU",
          advertiser: "Henson Co."
        },
        {
          value: false,
          id: "345298",
          name: "Creative of Ultimate Crispness",
          modified_date: "2017-10-01",
          type: "SPU",
          advertiser: "Henson Co."
        }
      ],

      // assets table
      assetTablePagination: {
        sortBy: "modified_date",
        descending: true
      },
      assetTableActions: null,
      assetTableHeaders: [
        { text: "ID", value: "id" },
        { text: "Thumbnail", value: "thumbnail", align: "center" },
        {
          text: "Name",
          align: "left",
          value: "name"
        },
        { text: "Type", value: "type" },
        { text: "Status", value: "status", align: "center" },
        { text: "Creatives", value: "creative associations" },
        { text: "Modified", value: "modified_date" }
      ],
      assetTableItems: [
        {
          value: false,
          id: "123456",
          advertiser: "Cards Against Humanity",
          thumbnail: "http://via.placeholder.com/50x50",
          name: "Image of Exploding Kittens",
          modified_date: "2017-12-14",
          type: "image",
          status: "active",
          creative_associations: 15
        },
        {
          value: false,
          id: "123456",
          advertiser: "Cards Against Humanity",
          thumbnail: null,
          name: "Video of Exploding Kittens",
          modified_date: "2017-12-14",
          type: "video",
          status: "active",
          creative_associations: 15
        },
        {
          value: false,
          id: "123456",
          advertiser: "Cards Against Humanity",
          thumbnail: null,
          name: "Shopper Asset",
          modified_date: "2017-12-14",
          type: "shopper",
          status: "active",
          creative_associations: 15
        },
        {
          value: false,
          id: "123456",
          advertiser: "Cards Against Humanity",
          thumbnail: null,
          name: "Audio of Exploding Kittens",
          modified_date: "2017-12-14",
          type: "audio",
          status: "active",
          creative_associations: 5
        },
        {
          value: false,
          id: "123456",
          advertiser: "Cards Against Humanity",
          thumbnail: null,
          name: "iFrame of Exploding Kittens",
          modified_date: "2017-12-14",
          type: "iframe",
          status: "active",
          creative_associations: 15
        },
        {
          value: false,
          id: "123456",
          advertiser: "Cards Against Humanity",
          thumbnail: "http://via.placeholder.com/50x50",
          name: "Image of Exploding Kittens",
          modified_date: "2017-12-14",
          type: "image",
          status: "active",
          creative_associations: 15
        }
      ],

      adminItems: [
        { title: "Home", icon: "dashboard" },
        { title: "About", icon: "question_answer" }
      ],
      sidebarNavItems: [
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
    };
  },
  computed: mapState({
    error: state => state.error
  }),
  methods: {
    submit() {
      // submit code foes here
    },
    pause() {
      // pause code goes here.
    },
    updateDrawer() {
      drawer = !drawer;
      console.log('drawer now = ' + drawer);
    }
  }
};
</script>
