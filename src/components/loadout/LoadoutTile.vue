<template>
  <div class="loadout-tile d-flex align-center pl-2" @click="clicked()" style="cursor:pointer;">
    <v-row>
      <v-col cols="5" style="text-align: initial; align-content: center;">
        <p class="text-h5 mb-0 ml-2" style="color: rgb(150,150,150)">
          {{ loadout.id }}. {{ loadout.name ? loadout.name : 'Unnamed Loadout' }} 
        </p>
      </v-col>
      <v-col cols="7" style="max-height: 70px;">
        <vue-apex-charts class="compact-column-chart" style="margin-top: -26px; min-height: 0px !important; max-height: 70px !important;" :options="chartOptions" :series="series"></vue-apex-charts>

      </v-col>
    </v-row>
  </div>
</template>

<script>
  import VueApexCharts from 'vue-apexcharts'
  import { mapState } from 'vuex'// import { mapGetters, mapState, mapMutations } from 'vuex';
  export default {
    name: 'LoadoutTile',
    components: {
      VueApexCharts
    },
    data: () => ({
    }),
    props: {
      loadout: {
        type: Object,
        default: () => {}
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
      selectedPrimaryWeapon() {
        if (!this.loadout || !this.loadout.equipment || !this.loadout.equipment.primaryWeaponId) return null
        return this.primaryWeapons.find(x => x.id == this.loadout.equipment.primaryWeaponId)
      },
      selectedSecondaryWeapon() {
        if (!this.loadout || !this.loadout.equipment || !this.loadout.equipment.secondaryWeaponId) return null
        return this.secondaryWeapons.find(x => x.id == this.loadout.equipment.secondaryWeaponId)
      },
      selectedSupportWeapon() {
        if (!this.loadout || !this.loadout.equipment || !this.loadout.equipment.supportWeaponId) return null
        return this.supportWeapons.find(x => x.id == this.loadout.equipment.supportWeaponId)
      },
      selectedBackpack() {
        if (!this.loadout || !this.loadout.equipment || !this.loadout.equipment.backpackId) return null
        return this.backpacks.find(x => x.id == this.loadout.equipment.backpackId)
      },
      selectedGrenade() {
        if (!this.loadout || !this.loadout.equipment || !this.loadout.equipment.grenadeId) return null
        return this.grenades.find(x => x.id == this.loadout.equipment.grenadeId)
      },
      series() {
        const categoriesJson = JSON.stringify(this.categories)
        let categories = JSON.parse(categoriesJson)
        categories = categories.sort((a,b) => a.id > b.id)
        if (this.selectedPrimaryWeapon) {
          const factionStats = this.selectedPrimaryWeapon.stats.find(x => x.factionId == this.selectedFaction.id)
          categories.forEach(cat => {
            const capability = factionStats.capabilities.find(fscap => fscap.categoryId == cat.id)
            if (capability) cat.value = capability.value
          })
        }
        if (this.selectedSecondaryWeapon) {
          const factionStats = this.selectedSecondaryWeapon.stats.find(x => x.factionId == this.selectedFaction.id)
          categories.forEach(cat => {
            const capability = factionStats.capabilities.find(fscap => fscap.categoryId == cat.id)
            if (capability && (cat.value == null || capability.value > cat.value)) cat.value = capability.value
          })
        }
        if (this.selectedSupportWeapon) {
          const factionStats = this.selectedSupportWeapon.stats.find(x => x.factionId == this.selectedFaction.id)
          categories.forEach(cat => {
            //console.log(cat);
            const capability = factionStats.capabilities.find(fscap => fscap.categoryId == cat.id)
            if (capability && (cat.value == null || capability.value > cat.value)) cat.value = capability.value
          })
        }
        if (this.selectedBackpack) {
          const factionStats = this.selectedBackpack.stats.find(x => x.factionId == this.selectedFaction.id)
          categories.forEach(cat => {
            const capability = factionStats.capabilities.find(fscap => fscap.categoryId == cat.id)
            if (capability && (cat.value == null || capability.value > cat.value)) cat.value = capability.value
          })
        }
        if (this.selectedGrenade) {
          const factionStats = this.selectedGrenade.stats.find(x => x.factionId == this.selectedFaction.id)
          categories.forEach(cat => {
            const capability = factionStats.capabilities.find(fscap => fscap.categoryId == cat.id)
            if (capability && (cat.value == null || capability.value > cat.value)) cat.value = capability.value
          })
        }
        categories.forEach(cat => {
            if (cat.value == null) cat.value = 0
          })
        const loadoutCapabilities = categories.map(x => { return x.value })
        //console.log(loadoutCapabilities);
        return [{
          name: 'Series 1',
          data: loadoutCapabilities
        }]
      },
      chartOptions() {
        return {
          chart: {
            type: 'bar',
            toolbar: {
              show: false
            }
          },
          dataLabels: {
            enabled: false
          },
          legend: {
            show: false
          },
          colors: [
            function ({ value }) {
              console.log(value);
                  switch(value) {
                  case 0: return '#000000'
                  case 1: return 'rgb(175,0,0)'
                  case 2: return 'rgb(175,50,0)'
                  case 3: return 'rgb(175,100,0)'
                  case 4: return 'rgb(150,150,0)'
                  case 5: return 'rgb(25,100,0)'
                }
              }
          ],
          xaxis: {
            categories: [
              [...this.categories].sort((a,b) => a.id > b.id).map(x => x.id)
            ],
            tooltip: {
              enabled: false
            }
          }

        }
      }
    },
    methods: {
      clicked() {
        this.$emit('loadoutClicked', this.loadout)
      }
    }
  }
</script>
<style>
  .loadout-tile {
    min-height: 90px;
    transition: height 5s;
  }
  .compact-column-chart div svg g g.apexcharts-xaxis {
    display: none;
  }
  .compact-column-chart div svg g.apexcharts-yaxis {
    display: none;
  }
  .compact-column-chart div svg g line.apexcharts-xaxis-tick {
    display: none;
  }
  .compact-column-chart div div.apexcharts-yaxistooltip {
    display: none;
  }
  .compact-column-chart div svg.apexcharts-svg foreignObject {
    max-height: 100px !important;
    height: 100px !important;
  }
  .compact-column-chart div svg.apexcharts-svg {
    max-height: 100px !important;
    height: 100px !important;
  }
  .compact-column-chart div {
    max-height: 100px !important;
    height: 100px !important;
  }
  .compact-column-chart div div.apexcharts-tooltip {
    display: none;
  }
</style>