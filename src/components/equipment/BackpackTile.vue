<template>
  <div 
    class="tile equipment-tile hover pa-3"
    :style="`background-color: rgb(23,23,23) ;background-image: url('${backpack.imageSource}'); background-size: cover; background-position: top; background-size: 416px; ${!editing ? 'cursor: pointer;' : ''}`">
    <v-row :style="`height: 214px;${editing ? 'border-bottom: 3px dashed rgb(150,150,0);' : ''}`" @click="handleTileClick">
      <v-col cols="5" style="text-align: initial;">
        <div 
          class="pb-3"
          >
          
          <p class="text-h5 mb-0">
            {{ backpack.name }}
          </p>
          <span>{{ backpack.type }}</span>
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
          <v-btn class="success mr-2" @click="saveBackpack()" >
            Save
          </v-btn>
          <v-btn class="error mr-3" @click="cancelEdit()">
            Cancel
          </v-btn>
        </v-col>
        <v-col v-for="category in categories" :key="`edit-support-weapon-${backpack.id}-category-${category.id}`" cols="12" class="pt-0 pb-0">
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
              v-model="backpackEdit.stats[factionIndex].capabilities[weaponCapabilityIndex(category)].value" 
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
    name: 'BackpackTile',
    components: {
      VueApexCharts
    },
    data: () => ({
      editing: false,
      backpackEdit: null
    }),
    props: {
      backpack: {
        type: Object,
        default: () => {}
      }
    },
    watch: {
      backpack: {
        immediate: true,
        handler(){
          this.copyBackpack()
        },
      }
    },
    computed: {
      ...mapState({
        categories: (state) => state.types.categories,
        backpacks: (state) => state.equipment.backpacks,
        selectedFaction: (state) => state.types.selectedFaction,
      }),
      factionIndex() {
        return this.backpackEdit.stats.findIndex(x => x.factionId == this.selectedFaction.id)
      },
      series() {
        if (!this.backpackEdit || !this.backpackEdit.stats || !this.backpackEdit.stats.length) return []
        
        let capabilities = [...this.backpackEdit.stats.find(x => x.factionId == this.selectedFaction.id).capabilities]
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
      copyBackpack() {
        const backpackJson = JSON.stringify(this.backpack)
        this.backpackEdit = JSON.parse(backpackJson)
      },
      weaponCapabilityIndex (category) {
        if (!this.backpackEdit) return -1
        return this.backpackEdit.stats[this.factionIndex].capabilities.findIndex(x => x.categoryId == category.id)
      },
      saveBackpack() {
        const backpackIndex = this.backpacks.findIndex(x => x.id == this.backpackEdit.id)
        this.backpackEdit.modified = true
        this.$store.dispatch('equipment/spliceBackpackArray', { index: backpackIndex, delete: 1, data: this.backpackEdit})
        this.copyBackpack()
        this.editing = false
      },
      cancelEdit() {
        this.copyBackpack()
        this.editing = false
      },
      handleTileClick() {
        console.log('handle');
        if (!this.editing) this.editing = true;
      }
    }
  }
</script>