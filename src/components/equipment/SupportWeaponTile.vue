<template>
  <div 
    class="tile hover pa-3"
    :style="`background-image: url('${supportWeapon.imageSource}'); background-size: cover; background-position: top; background-size: 100%; ${!editing ? 'cursor: pointer;' : ''}`">
    <v-row style="height: 200px;" @click="handleTileClick">
      <v-col cols="5" style="text-align: initial;">
        <div 
          class="pb-3"
          >
          
          <p class="text-h5 mb-0">
            {{ supportWeapon.name }}
          </p>
          <span>{{ supportWeapon.type }}</span>
        </div>

      </v-col>
      <v-col cols="7">
        <vue-apex-charts type="radar" height="100%" :options="chartOptions" :series="series"></vue-apex-charts>

      </v-col>
    </v-row>
    <v-row v-show="editing" style="border-top: 3px dashed rgb(150,150,0)" class="mt-6">
      <v-col cols="6" class="d-flex align-center">
        <p class="text-h4 mb-0 ">Capabilities</p>
      </v-col>
      <v-col cols="6" class="d-flex align-center">
        <v-btn class="success mr-2" @click="saveSupportWeapon()" >
          Save
        </v-btn>
        <v-btn class="error" @click="cancelEdit()">
          Cancel
        </v-btn>
      </v-col>
      <v-col v-for="category in categories" :key="`edit-support-weapon-${supportWeapon.id}-category-${category.id}`" cols="12" class="pt-0 pb-0">
        <div  v-if="weaponCapabilityIndex(category) > -1" style="display: flex;">
          <v-tooltip right max-width="350px">
            <template v-slot:activator="{ on, attrs }">
              <span
                v-bind="attrs"
                v-on="on">
                {{ category.shortName }}
              </span>
            </template>
            <span>{{ category.name }} - {{ category.description.find(x => x.factionId == selectedFaction.id).text }}</span>
          </v-tooltip>
          
          <v-slider 
            v-model="supportWeaponEdit.stats[factionIndex].capabilities[weaponCapabilityIndex(category)].value" 
            min="0" 
            max="5"
            :tick-labels="['0','1','2','3','4','5']"
            class="ml-4"
            ticks="always"
          ></v-slider>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
  import VueApexCharts from 'vue-apexcharts'
  import { mapState } from 'vuex'// import { mapGetters, mapState, mapMutations } from 'vuex';
  export default {
    name: 'SupportWeaponTile',
    components: {
      VueApexCharts
    },
    data: () => ({
      editing: false,
      supportWeaponEdit: null
    }),
    props: {
      supportWeapon: {
        type: Object,
        default: () => {}
      }
    },
    watch: {
      supportWeapon: {
        immediate: true,
        handler(){
          this.copySupportWeapon()
        },
      }
    },
    computed: {
      ...mapState({
        categories: (state) => state.types.categories,
        supportWeapons: (state) => state.equipment.supportWeapons,
        selectedFaction: (state) => state.types.selectedFaction,
      }),
      factionIndex() {
        return this.supportWeaponEdit.stats.findIndex(x => x.factionId == this.selectedFaction.id)
      },
      series() {
        if (!this.supportWeaponEdit || !this.supportWeaponEdit.stats || !this.supportWeaponEdit.stats.length) return []
        
        let capabilities = [...this.supportWeaponEdit.stats.find(x => x.factionId == this.selectedFaction.id).capabilities]
        capabilities = capabilities.sort((a,b) => a.id > b.id)
        capabilities = capabilities.map(x => { return x.value })
        return [{
          name: 'Series 1',
          data: capabilities
        }]
        
      },
      chartOptions() {
        let categories = [...this.categories]
        categories = categories.sort((a,b) => a.id > b.id)
        categories = categories.map(x => { return x.shortName })
        const options = {
          mode: 'dark',
          chart: {
            height: 200,
            type: 'radar',
            toolbar: {
              show: false
            },
          },
          plotOptions: {
            radar: {
              polygons: {
                strokeColors: '#000000',
                connectorColors: '#000000',
                fill: {
                    colors: ['rgba(255,255,0,0.1)','rgba(255,255,0,0.2)']
                }
              }
            }
          },
          yaxis: {
            min: null,
            max: 5,
            stepSize: 1,
            labels: {
              show: false,
            }
          },
          xaxis: {
            categories: categories,
            labels: {
              show: true,
              style: {
                colors: categories.map(() => {return '#ffff00'}),
                fontSize: "11px",
                fontFamily: 'Arial',
                fontWeight: 'bold'
              }
            },
          },
          tooltip: {
            enabled: false
          }
        }
        return options
      },
    },
    methods: {
      copySupportWeapon() {
        const supportWeaponJson = JSON.stringify(this.supportWeapon)
        this.supportWeaponEdit = JSON.parse(supportWeaponJson)
      },
      weaponCapabilityIndex (category) {
        if (!this.supportWeaponEdit) return -1
        return this.supportWeaponEdit.stats[this.factionIndex].capabilities.findIndex(x => x.categoryId == category.id)
      },
      saveSupportWeapon() {
        const supportWeaponIndex = this.supportWeapons.findIndex(x => x.id == this.supportWeaponEdit.id)
        this.$store.dispatch('equipment/spliceSupportWeaponArray', { index: supportWeaponIndex, delete: 1, data: this.supportWeaponEdit})
        this.copySupportWeapon()
        this.editing = false
      },
      cancelEdit() {
        this.copySupportWeapon()
        this.editing = false
      },
      handleTileClick() {
        console.log('handle');
        if (!this.editing) this.editing = true;
      }
    }
  }
</script>
<style>
  .tile {
    border-radius: 10px;
    min-height: 200px;
    border: solid 2px rgb(0,0,0);
    box-shadow: 0px 0px 5px 2px rgba(255,255,0,0) inset, 0px 0px 12px 10px rgba(255,255,0,0) inset, -5px 5px 5px 2px rgba(255,255,255,0.2) inset, 6px -6px 6px 4px rgba(0,0,0,0.2) inset;
    transition: box-shadow 0.5s;
  }
  .tile:hover {
    border: solid 2px rgb(200,200,0);
    box-shadow: 0px 0px 5px 2px rgba(255,255,0,0.6) inset, 0px 0px 12px 10px rgba(255,255,0,0.3) inset, -5px 5px 5px 2px rgba(255,255,255,0.2) inset, 6px -6px 6px 4px rgba(0,0,0,0.2) inset;
    transition: box-shadow 0.5s;
  }
</style>