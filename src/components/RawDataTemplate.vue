<template>
  <v-container>
    <v-row class="text-center pb-2" style="border-bottom: dashed gray 1px;">
      <v-col cols="12" class="text-h5 pb-0">
        Factions
      </v-col>
      <v-col cols="3" v-for="faction in factions" :key="`faction-raw-${faction.id}`" style="border-radius: 5px; border: 1px solid black">
        {{ faction }}
      </v-col>
    </v-row>
    <v-row class="text-center pb-2" style="border-bottom: dotted darkgray 3px;">
      <v-col cols="12" class="text-h5 pb-0">
        Categories
      </v-col>
      <v-col cols="3" v-for="category in categories" :key="`category-raw-${category.id}`" style="border-radius: 5px; border: 1px solid black">
        {{ category }}
      </v-col>
    </v-row>
    <v-row class="text-center pb-2" style="border-bottom: dashed gray 1px;">
      <v-col cols="12" class="text-h5 pb-0">
        Primary Weapons
      </v-col>
      <v-col cols="3" v-for="primaryWeapon in primaryWeapons" :key="`primary-weapon-raw-${primaryWeapon.id}`" style="border-radius: 5px; border: 1px solid black">
        {{ primaryWeapon }}
      </v-col>
    </v-row>
    <v-row class="text-center pb-2" style="border-bottom: dashed gray 1px;">
      <v-col cols="12" class="text-h5 pb-0">
        Secondary Weapons
      </v-col>
      <v-col cols="3" v-for="secondaryWeapon in secondaryWeapons" :key="`secondary-weapon-raw-${secondaryWeapon.id}`" style="border-radius: 5px; border: 1px solid black">
        {{ secondaryWeapon }}
      </v-col>
    </v-row>
    <v-row class="text-center pb-2" style="border-bottom: dashed gray 1px;">
      <v-col cols="12" class="text-h5 pb-0">
        Support Weapons
      </v-col>
      <v-col cols="3" v-for="supportWeapon in supportWeapons" :key="`support-weapon-raw-${supportWeapon.id}`" style="border-radius: 5px; border: 1px solid black">
        {{ supportWeapon }}
      </v-col>
    </v-row>
    <v-row class="text-center pb-2" style="border-bottom: dashed gray 1px;">
      <v-col cols="12" class="text-h5 pb-0">
        Backpacks
      </v-col>
      <v-col cols="3" v-for="backpack in backpacks" :key="`backpack-raw-${backpack.id}`" style="border-radius: 5px; border: 1px solid black">
        {{ backpack }}
      </v-col>
    </v-row>
    <v-row class="text-center pb-2" style="border-bottom: dashed gray 1px;">
      <v-col cols="12" class="text-h5 pb-0">
        Grenades
      </v-col>
      <v-col cols="3" v-for="grenade in grenades" :key="`grenade-raw-${grenade.id}`" style="border-radius: 5px; border: 1px solid black">
        {{ grenade }}
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import { mapState } from 'vuex'// import { mapGetters, mapState, mapMutations } from 'vuex';
  export default {
    name: 'RawDataTemplate',

    data: () => ({
    }),
    computed: {
      ...mapState({
        primaryWeapons: (state) => state.equipment.primaryWeapons,
        secondaryWeapons: (state) => state.equipment.secondaryWeapons,
        supportWeapons: (state) => state.equipment.supportWeapons,
        backpacks: (state) => state.equipment.backpacks,
        grenades: (state) => state.equipment.grenades,

        factions: (state) => state.types.factions,
        categories: (state) => state.types.categories,
      }),
    },
  }
</script>
