<template>
  <div class="pl-3 pr-3 mt-2">
    <v-slide-y-transition>
      <v-row v-if="selectedLoadout" class="text-center pb-2">
        <loadout-details :loadoutProp="selectedLoadout" @setSelectedLoadout="(setLoadout) => editLoadout(setLoadout)" />
      </v-row>
    </v-slide-y-transition>
    <v-row class="text-center pb-2">
      <v-col cols="12" xl="4" lg="6" md="12" v-for="loadout in loadouts" :key="`loadout-tile-${loadout.id}`">
        <loadout-tile 
          @loadoutClicked="(clickedLoadout) => editLoadout(clickedLoadout)" 
          :loadout="loadout" 
          :class="`${ selectedLoadout && selectedLoadout.id == loadout.id ? 'selected-tile' : 'tile' } mt-1`"
        />
      </v-col>
      <v-col cols="12" xl="4" lg="6" md="12">
        <div 
          class="tile loadout-tile d-flex align-center justify-center yellow--text mt-1" 
          style="cursor: pointer;"
          @click="newLoadout()"
        >
          Create New Loadout
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
  import { mapState } from 'vuex'// import { mapGetters, mapState, mapMutations } from 'vuex';
  import LoadoutDetails from '@/components/loadout/LoadoutDetails.vue';
  import LoadoutTile from '@/components/loadout/LoadoutTile.vue';
  export default {
    name: 'EquipmentManagementTemplate',
    components: {
      LoadoutDetails,
      LoadoutTile
    },
    data: () => ({
      selectedLoadout: null
    }),
    computed: {
      ...mapState({        
        loadouts: (state) => state.equipment.loadouts,
      }),
    },
    methods: {
      newLoadout() {
        this.selectedLoadout = { 
          name: null, 
          equipment: {
            primaryWeaponId: null,
            secondaryWeaponId: null,
            supportWeaponId: null,
            backpackId: null,
            grenadeId: null,
          } 
        }
      },
      editLoadout( loadout ) {
        this.selectedLoadout = loadout
      },
      clearLoadout() {
        this.selectedLoadout = null
      },
    }
  }
</script>
<style>
.v-tab.v-tab--active {
  color: rgb(200,200,0)
}
.v-tabs-slider {
  color: rgb(200,200,0)
}
</style>