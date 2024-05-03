<template>
  <v-app>
    <v-app-bar
      app
      color="dark-gray"
      class="pl-0 pb-0"
      dark
    >
      <div class="d-flex align-center" style="height: inherit; min-width: 700px;">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          
          src="images/header-logo.png"
          transition="scale-transition"
          height="100%"
          width="350px"
        />

        <span style="font-size: 36px; font-family: OCR A Std, monospace;">HD2 Kit Assembler</span>
      </div>

      <v-spacer></v-spacer>
      <div v-if="storeFaction" class="pl-8 pr-8 d-flex" style="align-self: end;">
        <div 
          v-for="faction in factions" 
          :key="`selected-faction-${faction.id}`" 
          class="pa-0" 
          :value="faction.id" 
          :style="`cursor: pointer; width: 300px; ${faction.id == storeFaction.id ? 'border-bottom: 3px dashed rgb(200,200,0)' : ''}`"
          @click="selectedFaction = faction"
          >
          <v-img height="100%" :src="`${faction.tabImage}`"></v-img>
        </div>
      </div>

      <v-spacer></v-spacer>

      <v-btn
        class="mr-2"
        outlined
        color="success"
        @click="exportStore()"
      >
        <span>Export</span>
      </v-btn>
      <v-btn
        class="mr-2"
        outlined
        color="primary"
        @click="importStore()"
      >
        <span>Import</span>
      </v-btn>
      <input 
          ref="uploader" 
          class="d-none" 
          type="file" 
          @change="onFileChanged"
      >
      <v-btn
        outlined
        color="error"
        @click="resetToDefaults()"
      >
        <span>Reset All Defaults</span>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import { mapState } from 'vuex'// import { mapGetters, mapState, mapMutations } from 'vuex';

export default {
  name: 'App',
  created() {
    this.$vuetify.theme.dark = true;
    this.populateDefaults();
  },
  computed: {
    ...mapState({
      primaryWeapons: (state) => state.equipment.primaryWeapons,
      secondaryWeapons: (state) => state.equipment.secondaryWeapons,
      supportWeapons: (state) => state.equipment.supportWeapons,
      backpacks: (state) => state.equipment.backpacks,
      grenades: (state) => state.equipment.grenades,

      factions: (state) => state.types.factions,
      storeFaction: (state) => state.types.selectedFaction,
      categories: (state) => state.types.categories,
    }),
    selectedFaction: {
      get() {
        return this.storeFaction

      },
      set(faction) {
        this.$store.dispatch('types/setSelectedFaction', faction)

      }
    }
  },

  data: () => ({
    isSelecting: false,
    //
  }),
  methods: {
    async populateDefaults() {
      let primaryWeapons = null;
      let secondaryWeapons = null;
      let supportWeapons = null;
      let backpacks = null;
      let grenades = null;
      let factions = null;
      let categories = null;
      console.log(window.location.href);
      let path = ''
      if (window.location.href.includes('/')) {
        path = window.location.href.split('/')[1]
        if (path.includes('?')) path = path.split('?')[0]
        path += '/'
      }
      await Promise.all([
        primaryWeapons = this.fetchJson(`${path}defaults/primaryWeapons.json`),
        secondaryWeapons = this.fetchJson(`${path}defaults/secondaryWeapons.json`),
        supportWeapons = this.fetchJson(`${path}defaults/supportWeapons.json`),
        backpacks = this.fetchJson(`${path}defaults/backpacks.json`),
        grenades = this.fetchJson(`${path}defaults/grenades.json`),
        factions = this.fetchJson(`${path}defaults/factions.json`),
        categories = this.fetchJson(`${path}defaults/categories.json`),
      ]).then(results => {
        [primaryWeapons, secondaryWeapons, supportWeapons, backpacks, grenades, factions, categories] = results
      });

      this.updateStore('types', 'Category', this.categories, categories);
      this.updateStore('types', 'Faction', this.factions, factions);
      this.updateStore('equipment', 'PrimaryWeapon', this.primaryWeapons, primaryWeapons);
      this.updateStore('equipment', 'SecondaryWeapon', this.secondaryWeapons, secondaryWeapons);
      this.updateStore('equipment', 'SupportWeapon', this.supportWeapons, supportWeapons);
      this.updateStore('equipment', 'Backpack', this.backpacks, backpacks);
      this.updateStore('equipment', 'Grenade', this.grenades, grenades);
      if (this.factions.length && !this.storeFaction) this.$store.dispatch('types/setSelectedFaction', this.factions[0])
    },
    updateStore(module, arrayName, storeArray, importingArray) {
      if (!storeArray || !storeArray.length) {
        // store items are empty, just import all of the items from json file
        this.$store.dispatch(`${module}/set${arrayName}Array`, importingArray.map(x => {  return { ...x, modified: false, default: true } })) 
      } else {
        // identify the json items that aren't already in the store item array and add them
        const addItems = importingArray
          .filter(importingItem => !storeArray.some(storeItem => storeItem.id == importingItem.id))
          .map(x => {  return { ...x, modified: false, default: true } })
        this.$store.dispatch(`${module}/set${arrayName}Array`, storeArray.concat(addItems))

        // identify the json items that are in the store and unmodified, update them with contents 
        const updateItems = importingArray
          .filter(jsonItem => storeArray.some(storeItem => storeItem.id == jsonItem.id && !storeItem.modified))
          .map(x => {  return { ...x, modified: false, default: true } })
        updateItems.forEach(updateItem => {
          const index = storeArray.findIndex(storeItem => storeItem.id == updateItem.id)
          if (index > -1)
            this.$store.dispatch(`${module}/splice${arrayName}Array`, { data: { ...updateItem, modified: false, default: true }, delete: 1, index: index })
        });
      }

    },
    async fetchJson(fileName) {
      const response = await fetch(`/${fileName}`);
      return await response.json(); 
    },
    clearStoreData () {
      this.$store.dispatch('types/clearData')
      this.$store.dispatch('equipment/clearData')
    },
    resetToDefaults() {
      if (!confirm('Are you sure? You are about to delete any changes that you made.')) return
      this.clearStoreData()
      this.populateDefaults()
    },
    exportStore() {
      const data = {
        primaryWeapons: this.primaryWeapons,
        secondaryWeapons: this.secondaryWeapon,
        supportWeapons: this.supportWeapons,
        backpacks: this.backpacks,
        grenades: this.grenades,
        categories: this.categories,
        factions: this.factions
      }
      const jsonData = JSON.stringify(data)
      const blobData = new Blob([jsonData], {type: 'text/plain'})
      const e = document.createEvent('MouseEvents'),
      a = document.createElement('a');
      a.download = "test.json";
      a.href = window.URL.createObjectURL(blobData);
      a.dataset.downloadurl = ['text/json', a.download, a.href].join(':');
      e.initEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
      a.dispatchEvent(e);
    },
    importStore() {
        this.isSelecting = true;

        // After obtaining the focus when closing the FilePicker, return the button state to normal
        window.addEventListener('focus', () => {
            this.isSelecting = false
        }, { once: true });
        
        // Trigger click on the FileInput
        this.$refs.uploader.click();
    },
    async onFileChanged(e) {
        let reader = new FileReader();
        reader.onload = e => {
          const importedData = JSON.parse(e.target.result);
          this.clearStoreData()
          this.$store.dispatch('equipment/setPrimaryWeaponArray', importedData.primaryWeapons)
          this.$store.dispatch('equipment/setSecondaryWeaponArray', importedData.secondaryWeapons)
          this.$store.dispatch('equipment/setSupportWeaponArray', importedData.supportWeapons)
          this.$store.dispatch('equipment/setBackpackArray', importedData.backpacks)
          this.$store.dispatch('equipment/setGrenadeArray', importedData.grenades)
          this.$store.dispatch('types/setCategoryArray', importedData.categories)
          this.$store.dispatch('types/setFactionArray', importedData.factions)
        };
        reader.readAsText(e.target.files[0])
        // Do whatever you need with the file, liek reading it with FileReader
    },
  }
};
</script>
<style>
  .v-toolbar__content {
    padding-left: 0px;
  }
  .v-application {
    font-family: OCR A Std, monospace !important;
  }
  .title {
    font-family: OCR A Std, monospace !important;
  }
  .v-tabs.yellow-underline div div div div.v-tabs-slider-wrapper {
    color: rgb(200,200,0);
  }
  
</style>