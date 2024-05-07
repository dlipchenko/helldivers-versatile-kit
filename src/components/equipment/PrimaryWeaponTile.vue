<template>
  <div 
    class="tile equipment-tile hover pa-3"
    :style="`background-color: rgb(23,23,23) ;background-image: url('${primaryWeapon.imageSource}'); background-size: cover; background-position: top; background-size: 416px; ${!editing ? 'cursor: pointer;' : ''}`">
    <v-row :style="`height: 216px;${editing ? 'border-bottom: 3px dashed rgb(150,150,0);' : ''}`" @click="handleTileClick">
      <v-col cols="5" style="text-align: initial;">
        <div 
          class="pb-3"
          >
          
          <p class="text-h5 mb-0">
            {{ primaryWeapon.name }}
          </p>
          <span>{{ primaryWeapon.type }}</span>
        </div>

      </v-col>
      <v-col cols="7">
        <vue-apex-charts type="radar" height="100%" :options="chartOptions" :series="series"></vue-apex-charts>

      </v-col>
    </v-row>
    <v-slide-y-transition>
      <v-row v-if="editing">
        <v-col cols="6" class="d-flex align-center">
          <p class="text-h4 mb-0 ">Capabilities</p>
        </v-col>
        <v-col cols="6" class="d-flex align-center justify-end">
          <v-btn class="success mr-2" @click="savePrimaryWeapon()" >
            Save
          </v-btn>
          <v-btn class="error mr-3" @click="cancelEdit()">
            Cancel
          </v-btn>
        </v-col>
        <v-col v-for="category in categories" :key="`edit-primary-weapon-${primaryWeapon.id}-category-${category.id}`" cols="12" class="pt-0 pb-0">
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
              v-model="primaryWeaponEdit.stats[factionIndex].capabilities[weaponCapabilityIndex(category)].value" 
              min="0" 
              max="5"
              :tick-labels="['0','1','2','3','4','5']"
              class="ml-4"
              ticks="always"
            ></v-slider>
          </div>
        </v-col>
      </v-row>
    </v-slide-y-transition>
  </div>
</template>

<script>
  import VueApexCharts from 'vue-apexcharts'
  import { mapState } from 'vuex'// import { mapGetters, mapState, mapMutations } from 'vuex';
  export default {
    name: 'PrimaryWeaponTile',
    components: {
      VueApexCharts
    },
    data: () => ({
      editing: false,
      primaryWeaponEdit: null
    }),
    props: {
      primaryWeapon: {
        type: Object,
        default: () => {}
      }
    },
    watch: {
      primaryWeapon: {
        immediate: true,
        handler(){
          this.copyPrimaryWeapon()
        },
      }
    },
    computed: {
      ...mapState({
        categories: (state) => state.types.categories,
        primaryWeapons: (state) => state.equipment.primaryWeapons,
        selectedFaction: (state) => state.types.selectedFaction,
      }),
      factionIndex() {
        return this.primaryWeaponEdit.stats.findIndex(x => x.factionId == this.selectedFaction.id)
      },
      series() {
        if (!this.primaryWeaponEdit || !this.primaryWeaponEdit.stats || !this.primaryWeaponEdit.stats.length) return []
        
        let capabilities = [...this.primaryWeaponEdit.stats.find(x => x.factionId == this.selectedFaction.id).capabilities]
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
      copyPrimaryWeapon() {
        const primaryWeaponJson = JSON.stringify(this.primaryWeapon)
        this.primaryWeaponEdit = JSON.parse(primaryWeaponJson)
      },
      weaponCapabilityIndex (category) {
        if (!this.primaryWeaponEdit) return -1
        return this.primaryWeaponEdit.stats[this.factionIndex].capabilities.findIndex(x => x.categoryId == category.id)
      },
      savePrimaryWeapon() {
        const primaryWeaponIndex = this.primaryWeapons.findIndex(x => x.id == this.primaryWeaponEdit.id)
        this.primaryWeaponEdit.modified = true
        this.$store.dispatch('equipment/splicePrimaryWeaponArray', { index: primaryWeaponIndex, delete: 1, data: this.primaryWeaponEdit})
        this.copyPrimaryWeapon()
        this.editing = false
      },
      cancelEdit() {
        this.copyPrimaryWeapon()
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
    transition: box-shadow 0.5s, border 0.5s;
    border-radius: 10px;
    border: solid 2px rgb(0,0,0);
    box-shadow: 0px 0px 5px 2px rgba(255,255,0,0) inset, 0px 0px 12px 10px rgba(255,255,0,0) inset, -5px 5px 5px 2px rgba(255,255,255,0.2) inset, 6px -6px 6px 4px rgba(0,0,0,0.2) inset;

  }
  .tile:hover {
    transition: box-shadow 0.5s, border 0.5s;
    border: solid 2px rgb(200,200,0);
    box-shadow: 0px 0px 5px 2px rgba(255,255,0,0.6) inset, 0px 0px 12px 10px rgba(255,255,0,0.3) inset, -5px 5px 5px 2px rgba(255,255,255,0.2) inset, 6px -6px 6px 4px rgba(0,0,0,0.2) inset;

  }
  .equipment-tile {
    min-height: 200px;
    transition: height 5s;
  }
</style>