<template>
  <v-container>
    <v-row class="text-center pb-2">
      <v-col cols="12" class="text-h5">
        Primary Weapons
      </v-col>
      <v-col cols="3" v-for="primaryWeapon in primaryWeapons" :key="`primary-weapon-${primaryWeapon.id}`">
        <primary-weapon-tile :primaryWeapon="primaryWeapon" />
      </v-col>
    </v-row>
    <v-row class="text-center pb-2">
      <v-col cols="12" class="text-h5">
        Secondary Weapons
      </v-col>
      <v-col cols="3" v-for="secondaryWeapon in secondaryWeapons" :key="`secondary-weapon-${secondaryWeapon.id}`">
        <secondary-weapon-tile :secondaryWeapon="secondaryWeapon" />
      </v-col>
    </v-row>
    <v-row class="text-center pb-2">
      <v-col cols="12" class="text-h5">
        Support Weapons
      </v-col>
      <v-col cols="3" v-for="supportWeapon in supportWeapons" :key="`support-weapon-${supportWeapon.id}`">
        <support-weapon-tile :supportWeapon="supportWeapon" />
      </v-col>
    </v-row>
    <v-row class="text-center pb-2" style="border-bottom: dashed gray 1px;">
      <v-col cols="12" class="text-h5">
        Backpacks
      </v-col>
      <v-col cols="3" v-for="backpack in backpacks" :key="`backpack-${backpack.id}`" style="border-radius: 5px; border: 1px solid darkgrey">
        <backpack-tile :backpack="backpack" />
      </v-col>
    </v-row>
    <v-row class="text-center pb-2" style="border-bottom: dashed gray 1px;">
      <v-col cols="12" class="text-h5">
        Grenades
      </v-col>
      <v-col cols="3" v-for="grenade in grenades" :key="`grenade-${grenade.id}`" style="border-radius: 5px; border: 1px solid darkgrey">
        <grenade-tile :grenade="grenade" />
      </v-col>
    </v-row>
  </v-container>
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
</style>