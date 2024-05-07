<template>
  <div class="pl-3 pr-3">
    <v-expansion-panels
      v-model="panel"
      multiple
    >
      <v-expansion-panel
        v-for="(section) in sections"
        :key="`section-${section.id}`"
      >
        <v-expansion-panel-header style="color: rgb(200,200,0)">{{ section.name }}</v-expansion-panel-header>
        <v-expansion-panel-content v-if="section.id == 1">
          <v-row class="text-center pb-2 mt-2">
            <v-col cols="12" xl="3" lg="4" md="6" sm="6" xs="12" v-for="primaryWeapon in primaryWeapons" :key="`primary-weapon-${primaryWeapon.id}`">
              <primary-weapon-tile :primaryWeapon="primaryWeapon" />
            </v-col>
          </v-row>
        </v-expansion-panel-content>
        <v-expansion-panel-content v-if="section.id == 2">
          <v-row class="text-center pb-2 mt-2">
            <v-col cols="12" xl="3" lg="4" md="6" sm="6" xs="12" v-for="secondaryWeapon in secondaryWeapons" :key="`secondary-weapon-${secondaryWeapon.id}`">
              <secondary-weapon-tile :secondaryWeapon="secondaryWeapon" />
            </v-col>
          </v-row>
        </v-expansion-panel-content>
        <v-expansion-panel-content v-if="section.id == 3">
          <v-row class="text-center pb-2 mt-2">
            <v-col cols="12" xl="3" lg="4" md="6" sm="6" xs="12" v-for="supportWeapon in supportWeapons" :key="`support-weapon-${supportWeapon.id}`">
              <support-weapon-tile :supportWeapon="supportWeapon" />
            </v-col>
          </v-row>
        </v-expansion-panel-content>
        <v-expansion-panel-content v-if="section.id == 4">
          <v-row class="text-center pb-2 mt-2">
            <v-col cols="12" xl="3" lg="4" md="6" sm="6" xs="12" v-for="backpack in backpacks" :key="`backpack-${backpack.id}`">
              <backpack-tile :backpack="backpack" />
            </v-col>
          </v-row>
        </v-expansion-panel-content>
        <v-expansion-panel-content v-if="section.id == 5">
          <v-row class="text-center pb-2 mt-2">
            <v-col cols="12" xl="3" lg="4" md="6" sm="6" xs="12" v-for="grenade in grenades" :key="`grenade-${grenade.id}`">
              <grenade-tile :grenade="grenade" />
            </v-col>
          </v-row>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>
  import { mapState } from 'vuex'// import { mapGetters, mapState, mapMutations } from 'vuex';
  import PrimaryWeaponTile from '@/components/equipment/PrimaryWeaponTile.vue';
  import SecondaryWeaponTile from '@/components/equipment/SecondaryWeaponTile.vue';
  import SupportWeaponTile from '@/components/equipment/SupportWeaponTile.vue';
  import BackpackTile from '@/components/equipment/BackpackTile.vue';
  import GrenadeTile from '@/components/equipment/GrenadeTile.vue';
  export default {
    name: 'EquipmentManagementTemplate',
    components: {
      PrimaryWeaponTile,
      SecondaryWeaponTile,
      SupportWeaponTile,
      BackpackTile,
      GrenadeTile,
    },
    data: () => ({
      sections: [
        {
          id: 1,
          name: 'Primary Weapons'
        },
        {
          id: 2,
          name: 'Secondary Weapons'
        },
        {
          id: 3,
          name: 'Support Weapons'
        },
        {
          id: 4,
          name: 'Backpacks'
        },
        {
          id: 5,
          name: 'Grenades'
        },
      ]
    }),
    computed: {
      ...mapState({
        primaryWeapons: (state) => state.equipment.primaryWeapons,
        secondaryWeapons: (state) => state.equipment.secondaryWeapons,
        supportWeapons: (state) => state.equipment.supportWeapons,
        backpacks: (state) => state.equipment.backpacks,
        grenades: (state) => state.equipment.grenades,
      }),
    },
  }
</script>
<style>
.v-tab.v-tab--active {
  color: rgb(200,200,0)
}
.v-tabs-slider {
  color: rgb(200,200,0)
}
.v-item-group.v-expansion-panels div.v-expansion-panel button.v-expansion-panel-header div.v-expansion-panel-header__icon i.v-icon {
  color: rgb(200,200,0)
}
</style>