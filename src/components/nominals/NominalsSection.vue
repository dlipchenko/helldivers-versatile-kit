<template>
  <v-container>
    <v-row class="text-center pb-2" style="border-bottom: dashed gray 1px;">
      <v-col cols="12" class="text-h5">
        Factions
      </v-col>
      <v-col cols="3" v-for="faction in factions" :key="`faction-raw-${faction.id}`" style="border-radius: 5px; border: 1px solid darkgrey">
        {{ faction }}
      </v-col>
    </v-row>
    <v-row class="text-center pb-2">
      <v-col cols="12" class="text-h5">
        Categories
      </v-col>
      <v-col cols="3" v-for="category in categories" :key="`category-raw-${category.id}`" style="border-radius: 5px; border: 1px solid darkgrey">
        {{ category }}
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'// import { mapGetters, mapState, mapMutations } from 'vuex';
  export default {
    name: 'EquipmentManagementTemplate',

    data: () => ({
    }),
    computed: {
      ...mapState({
        factions: (state) => state.types.factions,
        categories: (state) => state.types.categories,
      }),
    },
  }
</script>
