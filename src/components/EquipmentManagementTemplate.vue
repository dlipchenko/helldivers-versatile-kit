<template>
  <v-container>
    <v-tabs v-model="selectedTab">
      <v-tab key="equipment">
        Equipment
      </v-tab>
      <v-tab key="nominals">
        Nominals
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="selectedTab">
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
    </v-tabs-items>
  </v-container>
</template>

<script>
import NominalsSection from './nominals/NominalsSection.vue';
import EquipmentSection from './equipment/EquipmentSection.vue';

//import { mapState } from 'vuex'// import { mapGetters, mapState, mapMutations } from 'vuex';
  export default {
    name: 'EquipmentManagementTemplate',
    components: {
      NominalsSection,
      EquipmentSection
    },
    data: () => ({
      selectedTab: 0
    }),
    computed: {
    },
  }
</script>
