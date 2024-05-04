<template>
  <div>
    <v-tabs v-model="selectedTab" class="d-flex justify-center">
      <v-tab key="loadouts">
        Loadouts
      </v-tab>
      <v-tab key="equipment">
        Equipment
      </v-tab>
      <!--<v-tab key="nominals">
        Nominals
      </v-tab>-->
    </v-tabs>
    <v-tabs-items v-model="selectedTab">
      <v-tab-item
        key="loadouts"
      >
        <loadout-section />
      </v-tab-item>
      <v-tab-item
        key="equipment"
      >
        <equipment-section />
      </v-tab-item>
      <v-tab-item
        key="nominals"
      >
        <nominals-section />
      </v-tab-item>
      <v-tab-item
        key="placeholder"
      >
        <!--placeholder to prevent tab items from being weird-->
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import NominalsSection from './nominals/NominalsSection.vue';
import EquipmentSection from './equipment/EquipmentSection.vue';
import LoadoutSection from './loadout/LoadoutSection.vue';

//import { mapState } from 'vuex'// import { mapGetters, mapState, mapMutations } from 'vuex';
  export default {
    name: 'EquipmentManagementTemplate',
    components: {
      NominalsSection,
      EquipmentSection,
      LoadoutSection
    },
    data: () => ({
      selectedTab: 0
    }),
    computed: {
    },
  }
</script>
