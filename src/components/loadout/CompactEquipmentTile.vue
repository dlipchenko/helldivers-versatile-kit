<template>
  <div 
    @click="emitClicked()"
    :class="`ml-1 mr-1 pl-2 pr-2`" 
    :style="`width: 100%; min-width: 300px; height: 70px; align-content: center; text-justify: left !important; font-size: 14px; font-weight: bold; cursor: pointer;`">
    <span>{{ equipment.name }}</span>
  </div>
</template>

<script>
  //import VueApexCharts from 'vue-apexcharts'
  import { mapState } from 'vuex'// import { mapGetters, mapState, mapMutations } from 'vuex';
  export default {
    name: 'CompactEquipmentTile',
    components: {
      //VueApexCharts
    },
    data: () => ({
    }),
    props: {
      equipment: {
        type: Object,
        default: () => {}
      },
    },
    computed: {
      ...mapState({
        categories: (state) => state.types.categories,
        primaryWeapons: (state) => state.equipment.primaryWeapons,
        secondaryWeapons: (state) => state.equipment.secondaryWeapons,
        supportWeapons: (state) => state.equipment.supportWeapons,
        backpacks: (state) => state.equipment.backpacks,
        grenades: (state) => state.equipment.grenades,
      }),
    },
    methods: {
      emitClicked() {
        this.$emit('equipmentClicked', this.equipment.id)
      }
    }
  }
</script>