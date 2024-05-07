<template>
  <div 
    @click="emitClicked()"
    :class="`ml-1 mr-1 pl-2 pr-2`" 
    :style="`width: 300px; min-width: 90px; height: 90px; align-content: center; text-justify: left !important; font-size: 14px; font-weight: bold; cursor: pointer;`">
    <!--{{ loadoutSeries.length ? loadoutSeries[0].data : '' }}-->
    <v-row>
      <v-col cols="5" class="pa-0 pl-3 justify-start align-start d-flex pt-5">
        <span>{{ equipment.name }}</span>
      </v-col>
      <v-col cols="7">
        <vue-apex-charts height="120px" class="compact-equipment-tile-graph" :series="series" :options=options />
      </v-col>
    </v-row>
    <!--{{ equipment.stats[0].capabilities.map(x => x.value) }}-->
  </div>
</template>

<script>
  import VueApexCharts from 'vue-apexcharts'
  import { mapState } from 'vuex'// import { mapGetters, mapState, mapMutations } from 'vuex';
  export default {
    name: 'CompactEquipmentTile',
    components: {
      VueApexCharts
    },
    data: () => ({
      options: {
        chart: {
          type: 'bar',
          toolbar: {
            show: false
          },
          sparkline: {
              enabled: false,
          },
        },
        dataLabels: {
          enabled: false
        },
        legend: {
          show: false
        },
        xaxis: {
          tooltip: {
            enabled: false
          }
        }
      }
    }),
    props: {
      equipment: {
        type: Object,
        default: () => {}
      },
      loadoutSeries: {
        type: Array,
        default: () => []
      }
    },
    computed: {
      ...mapState({
        categories: (state) => state.types.categories,
        primaryWeapons: (state) => state.equipment.primaryWeapons,
        secondaryWeapons: (state) => state.equipment.secondaryWeapons,
        supportWeapons: (state) => state.equipment.supportWeapons,
        backpacks: (state) => state.equipment.backpacks,
        grenades: (state) => state.equipment.grenades,
        selectedFaction: (state) => state.types.selectedFaction,
      }),
      series () {
        const series = []
        if (this.loadoutSeries.length) 
          series.push(this.loadoutSeries[0])

        const factionStat = this.equipment.stats.find(x => x.factionId == this.selectedFaction.id)
        const equipmentSeries = {
          name: 'Equipment',
          data: factionStat.capabilities.map((x, index) => {
            if (!this.loadoutSeries.length || !this.loadoutSeries[0].data.length || !this.loadoutSeries[0].data[index]) return x.value
            if ( x.value > this.loadoutSeries[0].data[index]) x.value - this.loadoutSeries[0].data[index]
            return 0
          })
        }
        series.push(equipmentSeries)
        return series
      }
    },
    methods: {
      emitClicked() {
        this.$emit('equipmentClicked', this.equipment.id)
      }
    }
  }
</script>
<style>
  .compact-equipment-tile-graph div svg g.apexcharts-yaxis {
    display: none;
  }
  .compact-equipment-tile-graph div svg g g.apexcharts-xaxis {
    display: none;
  }
  .compact-equipment-tile-graph div div.apexcharts-tooltip {
    display: none;
  }
</style>