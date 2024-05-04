<template>
  <div style="border-radius: 8px; border: rgb(150,150,0) dashed 3px; width: 100%;" class="mt-2 ml-1 mr-1 pa-2">
    <v-row>
      <v-col v-if="loadoutEdit" cols="12" style="text-align: center;" class="text-h4 mt-1 d-flex justify-center align-center pb-0">
        <v-text-field 
          placeholder="Loadout Name" 
          v-model="loadoutEdit.name" 
          outlined
          dense
          class="loadout-name-text-field"
          hide-details
          />
          <v-btn @click="saveLoadout()" color="success" class="ml-1">Save</v-btn>
      </v-col>
      <v-col cols="12" class="d-flex justify-center pb-0 pt-0">
        <vue-apex-charts type="radar" width="400px" height="300px" :options="chartOptions" :series="series"></vue-apex-charts>
      </v-col>
      <v-col v-if="loadoutEdit" cols="12" style="text-align: center;" class="d-flex justify-center align-center pt-0">
        <v-row>
          <v-col class="d-flex justify-center">
            <div 
              v-if="!selectedPrimaryWeapon"
              @click="openEquipmentDialog('Primary Weapon')"
              class="loadout-input-slot ml-1 mr-1" 
              :style="`width: 100%; height: 70px; align-content: center; font-size: 26px; font-weight: bold; ${loadoutEdit.equipment && loadoutEdit.equipment.primaryWeaponId ? '' : 'cursor: pointer;'}`">
              <span>Primary</span>
            </div>
            <compact-equipment-tile 
              v-else 
              @equipmentClicked="openEquipmentDialog('Primary Weapon')" 
              class="tile" 
              :equipment="selectedPrimaryWeapon" 
            />
          </v-col>
          <v-col class="d-flex justify-center">
            <div
              v-if="!selectedSecondaryWeapon" 
              @click="openEquipmentDialog('Secondary Weapon')"
              class="loadout-input-slot ml-1 mr-1" 
              :style="`width: 100%; height: 70px; align-content: center; font-size: 26px; font-weight: bold; ${loadoutEdit.equipment && loadoutEdit.equipment.secondaryWeaponId ? '' : 'cursor: pointer;'}`">
              <span>Secondary</span>
            </div>
            <compact-equipment-tile 
              v-else 
              @equipmentClicked="openEquipmentDialog('Secondary Weapon')" 
              class="tile" 
              :equipment="selectedSecondaryWeapon" 
            />
          </v-col>
          <v-col class="d-flex justify-center">
            <div 
              v-if="!selectedSupportWeapon"
              @click="openEquipmentDialog('Support Weapon')"
              class="loadout-input-slot ml-1 mr-1" 
              :style="`width: 100%; height: 70px; align-content: center; font-size: 26px; font-weight: bold; ${loadoutEdit.equipment && loadoutEdit.equipment.supportWeaponId ? '' : 'cursor: pointer;'}`">
              <span>Support</span>
            </div>
            <compact-equipment-tile 
              v-else 
              @equipmentClicked="openEquipmentDialog('Support Weapon')" 
              class="tile" 
              :equipment="selectedSupportWeapon" 
            />
          </v-col>
          <v-col class="d-flex justify-center">
            <div 
              v-if="!selectedBackpack"
              @click="openEquipmentDialog('Backpack')"
              :class="`${!selectedSupportWeapon || !selectedSupportWeapon.backpackAmmunition ? 'loadout-input-slot' : 'loadout-input-slot-disabled'} ml-1 mr-1`" 
              :style="`width: 100%; height: 70px; align-content: center; font-size: 26px; font-weight: bold; ${(loadoutEdit.equipment && loadoutEdit.equipment.backpackId) || (selectedSupportWeapon && selectedSupportWeapon.backpackAmmunition) ? '' : 'cursor: pointer;'}`">
              <span>Backpack</span>
            </div>
            <compact-equipment-tile 
              v-else 
              @equipmentClicked="openEquipmentDialog('Backpack')" 
              class="tile" 
              :equipment="selectedBackpack" 
            />
          </v-col>
          <v-col class="d-flex justify-center">
            <div
              v-if="!selectedGrenade" 
              @click="openEquipmentDialog('Grenade')"
              class="loadout-input-slot ml-1 mr-1" 
              :style="`width: 100%; height: 70px; align-content: center; font-size: 26px; font-weight: bold; ${loadoutEdit.equipment && loadoutEdit.equipment.grenadeId ? '' : 'cursor: pointer;'}`">
              <span>Grenade</span>
            </div>
            <compact-equipment-tile 
              v-else 
              @equipmentClicked="openEquipmentDialog('Grenade')" 
              class="tile" 
              :equipment="selectedGrenade" 
            />
          </v-col>
        </v-row>
        <!--<div style="max-width: 300px;">

        </div>-->
      </v-col>
    </v-row>
    <v-dialog v-model="showEquipmentSelectionDialog" scrollable max-width="350px">
      <v-card>
        <v-card-title class="yellow--text">Select {{ selectingEquipmentType }}</v-card-title>
        <v-divider></v-divider>
        <v-card-text style="min-height: 300px;">
          <compact-equipment-tile 
            v-for="item in selectedDialogArray"
            :key="`dialog-array-item-${item.id}`"
            @equipmentClicked="(id) => selectEquipment(id)"
            :equipment="item" 
            :class="`${ selectedEquipmentId == item.id ? 'selected-tile' : 'tile' } mt-1`"
          />
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions class="justify-end d-flex">
          <v-btn
            color="success"
            text
            @click="setEquipment()"
          >
            Select
          </v-btn>
          <v-btn
            color="error"
            text
            @click="closeEquipmentDialog()"
          >
            Cancel
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  import VueApexCharts from 'vue-apexcharts'
  import { mapState } from 'vuex'// import { mapGetters, mapState, mapMutations } from 'vuex';
  import CompactEquipmentTile from '@/components/loadout/CompactEquipmentTile.vue';
  export default {
    name: 'LoadoutDetails',
    components: {
      CompactEquipmentTile,
      VueApexCharts
    },
    data: () => ({
      editing: false,
      loadoutEdit: null,
      showEquipmentSelectionDialog: false,
      selectingEquipmentType: null,
      selectedEquipmentId: null,
    }),
    props: {
      loadoutProp: {
        type: Object,
        default: () => {}
      }
    },
    watch: {
      loadoutProp: {
        immediate: true,
        handler(){
          this.copyLoadout()
        },
      }
    },
    computed: {
      ...mapState({
        loadouts: (state) => state.equipment.loadouts,
        primaryWeapons: (state) => state.equipment.primaryWeapons,
        secondaryWeapons: (state) => state.equipment.secondaryWeapons,
        supportWeapons: (state) => state.equipment.supportWeapons,
        backpacks: (state) => state.equipment.backpacks,
        grenades: (state) => state.equipment.grenades,
        categories: (state) => state.types.categories,
        selectedFaction: (state) => state.types.selectedFaction,
      }),
      selectedDialogArray() {
        switch (this.selectingEquipmentType) {
          case 'Primary Weapon':
            return this.primaryWeapons
          case 'Secondary Weapon':
            return this.secondaryWeapons
          case 'Support Weapon':
            return this.supportWeapons
          case 'Backpack':
            return this.backpacks
          case 'Grenade':
            return this.grenades
          default:
            return []
        }
      },
      selectedPrimaryWeapon() {
        if (!this.loadoutEdit || !this.loadoutEdit.equipment || !this.loadoutEdit.equipment.primaryWeaponId) return null
        return this.primaryWeapons.find(x => x.id == this.loadoutEdit.equipment.primaryWeaponId)
      },
      selectedSecondaryWeapon() {
        if (!this.loadoutEdit || !this.loadoutEdit.equipment || !this.loadoutEdit.equipment.secondaryWeaponId) return null
        return this.secondaryWeapons.find(x => x.id == this.loadoutEdit.equipment.secondaryWeaponId)
      },
      selectedSupportWeapon() {
        if (!this.loadoutEdit || !this.loadoutEdit.equipment || !this.loadoutEdit.equipment.supportWeaponId) return null
        return this.supportWeapons.find(x => x.id == this.loadoutEdit.equipment.supportWeaponId)
      },
      selectedBackpack() {
        if (!this.loadoutEdit || !this.loadoutEdit.equipment || !this.loadoutEdit.equipment.backpackId) return null
        return this.backpacks.find(x => x.id == this.loadoutEdit.equipment.backpackId)
      },
      selectedGrenade() {
        if (!this.loadoutEdit || !this.loadoutEdit.equipment || !this.loadoutEdit.equipment.grenadeId) return null
        return this.grenades.find(x => x.id == this.loadoutEdit.equipment.grenadeId)
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
        let categories = [...this.categories]
        categories = categories.sort((a,b) => a.id > b.id)
        categories = categories.map(x => { return x.name })
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
      copyLoadout() {
        this.loadoutEdit = { ...this.loadoutProp }
      },
      saveLoadout() {
        if (this.loadoutEdit.id == null) {
          let lastId = 0 
          this.loadouts.forEach(x => {
            if (x.id > lastId) lastId = x.id
          })
          this.loadoutEdit.id = lastId + 1
          this.$store.dispatch('equipment/addLoadout', this.loadoutEdit)
        } else {
          this.$store.dispatch('equipment/updateLoadout', this.loadoutEdit)
        }
        this.$emit('setSelectedLoadout', this.loadoutEdit)
      },
      openEquipmentDialog(equipmentType) {
        if (equipmentType == 'Backpack' && this.selectedSupportWeapon != null && this.selectedSupportWeapon.backpackAmmunition) return;
        this.selectingEquipmentType = equipmentType
        this.showEquipmentSelectionDialog = true
      },
      setEquipment() {
        switch(this.selectingEquipmentType) {
          case 'Primary Weapon':
            this.loadoutEdit.equipment.primaryWeaponId = this.selectedEquipmentId
            break
          case 'Secondary Weapon':
            this.loadoutEdit.equipment.secondaryWeaponId = this.selectedEquipmentId
            break
          case 'Support Weapon':
            this.loadoutEdit.equipment.supportWeaponId = this.selectedEquipmentId
            if (this.supportWeapons.find(x => x.id == this.selectedEquipmentId)) this.loadoutEdit.equipment.backpackId = null
            break
          case 'Backpack':
            this.loadoutEdit.equipment.backpackId = this.selectedEquipmentId
            break
          case 'Grenade':
            this.loadoutEdit.equipment.grenadeId = this.selectedEquipmentId
            break
        }
        console.log(this.loadoutEdit);
        this.closeEquipmentDialog()
      },
      closeEquipmentDialog() {
        this.selectingEquipmentType = null
        this.selectedEquipmentId = null
        this.showEquipmentSelectionDialog = false
      },
      selectEquipment(id) {
        this.selectedEquipmentId = id
      }
    }
  }

</script>
<style>
  .loadout-name-text-field {
    max-width: 300px;
  }
  .loadout-input-slot {
    -webkit-text-stroke: 1px black;
    width: 300px !important;
    border: black 1px solid;
    transition: color 1s, box-shadow 1s;
    color: black;
    box-shadow: 0px 0px 5px 5px black inset;
    border-radius: 8px;
  }
  .loadout-input-slot-disabled {
    -webkit-text-stroke: 1px rgb(15,15,15);
    background-color: rgba(0,0,0,0.1);
    width: 300px !important;
    border: black 1px solid;
    transition: color 1s, box-shadow 1s;
    color: rgb(15,15,15);
    box-shadow: 0px 0px 1px 1px black inset;
    border-radius: 8px;
  }
  .loadout-input-slot:hover {
    transition: color 1s, box-shadow 1s;
    color: yellow;
    box-shadow: 0px 0px 5px 5px yellow inset;
  }
  .selected-tile {
    border: solid 2px rgb(200,200,0);
    border-radius: 10px;
    box-shadow: 0px 0px 5px 2px rgba(255,255,0,0.6) inset, 0px 0px 12px 10px rgba(255,255,0,0.3) inset, -5px 5px 5px 2px rgba(255,255,255,0.2) inset, 6px -6px 6px 4px rgba(0,0,0,0.2) inset;
  }
</style>