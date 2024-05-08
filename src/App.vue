<template>
  <v-app>
    <v-app-bar
      app
      color="dark-gray"
      class="pl-0 pb-0"
      dark
    >
      <div class="d-flex align-center" style="height: inherit;">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          
          src="images/header-logo.png"
          transition="scale-transition"
          height="100%"
        >
          <span style="font-size: 40px; float: left; font-family: OCR A Std, monospace;">HD2 Loadouts</span>
        </v-img>

        
      </div>
      
      <v-spacer></v-spacer>
      <div v-if="storeFaction && (screenSize == 'lg' || screenSize == 'xl')" class="pl-8 pr-8 d-flex" style="align-self: end;">
        <div 
          v-for="faction in factions" 
          :key="`selected-faction-${faction.id}`" 
          class="pa-0 d-flex justify-center" 
          :value="faction.id" 
          :style="`background-image: url(${faction.tabImage}); background-size: cover; background-position: center; cursor: pointer; width: 300px; ${faction.id == storeFaction.id ? 'border-bottom: 3px dashed rgb(200,200,0)' : ''}`"
          @click="selectedFaction = faction"
        >
          <!--<v-img height="100%" :src="`${faction.tabImage}`" />-->
          <span class="text-h4" style="color: rgb(255,255,0);">{{ faction.name }}</span>
        </div>
      </div>

      <v-spacer></v-spacer>
      <template v-if="screenSize == 'xl'">
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
        <v-btn
          outlined
          color="error"
          @click="resetToDefaults()"
        >
          <span>Reset All Defaults</span>
        </v-btn>
      </template>
      <v-menu
        v-else
        bottom
        right
      >
        <template v-slot:activator="{ on, attrs }">
          <v-app-bar-nav-icon
            style="position: absolute; top: 2px; right: 2px;"
            v-bind="attrs"
            v-on="on" />
        </template>

        <v-list>
          <v-list-item @click="exportStore()">
            <v-list-item-title>Export</v-list-item-title>
          </v-list-item>
          <v-list-item @click="importStore()">
            <v-list-item-title>Import</v-list-item-title>
          </v-list-item>
          <v-list-item @click="resetToDefaults()">
            <v-list-item-title>Reset</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <input 
          ref="uploader" 
          class="d-none" 
          type="file" 
          @change="onFileChanged"
      >
    </v-app-bar>

    <v-main>
      <div v-if="screenSize != 'lg' && screenSize != 'xl'" class="d-flex justify-center mt-1 mb-1">
        <div 
          v-for="faction in factions" 
          :key="`selected-faction-${faction.id}`" 
          class="pa-0 d-flex justify-center" 
          :value="faction.id" 
          :style="`background-image: url(${faction.tabImage}); background-size: cover; background-position: center; cursor: pointer; width: 300px; ${faction.id == storeFaction.id ? 'border-bottom: 3px dashed rgb(200,200,0)' : ''}`"
          @click="selectedFaction = faction"
        >
          <!--<v-img height="100%" :src="`${faction.tabImage}`" />-->
          <span class="text-h4" style="color: rgb(255,255,0);">{{ faction.name }}</span>
        </div>

      </div>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import { mapState } from 'vuex'// import { mapGetters, mapState, mapMutations } from 'vuex';

export default {
  name: 'App',
  created() {
    this.populateDefaults();
  },
  computed: {
    ...mapState({
      primaryWeapons: (state) => state.equipment.primaryWeapons,
      secondaryWeapons: (state) => state.equipment.secondaryWeapons,
      supportWeapons: (state) => state.equipment.supportWeapons,
      backpacks: (state) => state.equipment.backpacks,
      grenades: (state) => state.equipment.grenades,
      loadouts: (state) => state.equipment.loadouts,

      factions: (state) => state.types.factions,
      storeFaction: (state) => state.types.selectedFaction,
      categories: (state) => state.types.categories,
      
      urlPath: (state) => state.settings.urlPath,
    }),
    selectedFaction: {
      get() {
        return this.storeFaction

      },
      set(faction) {
        this.$store.dispatch('types/setSelectedFaction', faction)

      }
    },
    screenSize () {
      return this.$vuetify.breakpoint.name;
    },
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
      this.$store.dispatch('settings/setUrlPath', '')
      let path = ''
      if (window.location.href.includes('github.io/')) {
        path = window.location.href.split('github.io/')[1]
        if (path.includes('?')) 
          path = path.split('?')[0]
      }
      this.$store.dispatch('settings/setUrlPath', path)
      await Promise.all([
        primaryWeapons = this.fetchJson(`${this.urlPath}defaults/primaryWeapons.json`),
        secondaryWeapons = this.fetchJson(`${this.urlPath}defaults/secondaryWeapons.json`),
        supportWeapons = this.fetchJson(`${this.urlPath}defaults/supportWeapons.json`),
        backpacks = this.fetchJson(`${this.urlPath}defaults/backpacks.json`),
        grenades = this.fetchJson(`${this.urlPath}defaults/grenades.json`),
        factions = this.fetchJson(`${this.urlPath}defaults/factions.json`),
        categories = this.fetchJson(`${this.urlPath}defaults/categories.json`),
      ]).then(results => {
        [primaryWeapons, secondaryWeapons, supportWeapons, backpacks, grenades, factions, categories] = results
      });
      /*console.log(primaryWeapons);
      console.log(secondaryWeapons);
      console.log(supportWeapons);
      console.log(backpacks);
      console.log(grenades);
      console.log(factions);
      console.log(categories);*/
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
    async resetToDefaults() {
      if (!confirm('Are you sure? You are about to delete any changes that you made.')) return
      this.clearStoreData()
      await this.populateDefaults()
      location.reload(true);
    },
    exportStore() {
      const data = {
        source: 'https://dlipchenko.github.io/helldivers-versatile-kit/',
        primaryWeapons: this.primaryWeapons,
        secondaryWeapons: this.secondaryWeapons,
        supportWeapons: this.supportWeapons,
        backpacks: this.backpacks,
        grenades: this.grenades,
        categories: this.categories,
        factions: this.factions,
        loadouts: this.loadouts
      }
      const jsonData = JSON.stringify(data)
      const blobData = new Blob([jsonData], {type: 'text/plain'})
      const e = document.createEvent('MouseEvents'),
      a = document.createElement('a');
      a.download = "hd2-loadout-save.json";
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
          this.$store.dispatch('equipment/setPrimaryWeaponArray', importedData.primaryWeapons ? importedData.primaryWeapons : [])
          this.$store.dispatch('equipment/setSecondaryWeaponArray', importedData.secondaryWeapons ? importedData.secondaryWeapons : [])
          this.$store.dispatch('equipment/setSupportWeaponArray', importedData.supportWeapons ? importedData.supportWeapons : [])
          this.$store.dispatch('equipment/setBackpackArray', importedData.backpacks ? importedData.backpacks : [])
          this.$store.dispatch('equipment/setGrenadeArray', importedData.grenades ? importedData.grenades : [])
          this.$store.dispatch('equipment/replaceLoadouts', importedData.loadouts ? importedData.loadouts : [])
          this.$store.dispatch('types/setCategoryArray', importedData.categories ? importedData.categories : [])
          this.$store.dispatch('types/setFactionArray', importedData.factions ? importedData.factions : [])
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