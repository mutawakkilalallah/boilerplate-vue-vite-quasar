<template>
  <q-layout view="lHh lpR fFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar class="text-white">
        <q-btn dense flat icon="fas fa-bars" @click="toggleLeftDrawer" />
        <q-toolbar-title> </q-toolbar-title>
        <q-btn
          flat
          dense
          icon="fas fa-person"
          :label="store.user.nama_lengkap"
        />
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered>
      <!-- <div class="q-pa-md" style="max-width: 250px"> -->
      <div class="q-pa-sm">
        <p class="text-center q-mb-none text-h5 text-weight-bold text-primary">
          BOILERPLATE APP
        </p>
        <p class="text-center q-mb-none text-caption">
          Made with Vite, Vue and Quasar
        </p>
      </div>
      <q-list class="text-primary">
        <q-item
          to="/"
          clickable
          v-ripple
          :active="path === 'dashboard'"
          active-class="my-menu-link"
        >
          <q-item-section avatar>
            <q-icon name="fas fa-chart-line" />
          </q-item-section>

          <q-item-section>Dashboard</q-item-section>
        </q-item>

        <q-item
          to="/contact"
          clickable
          v-ripple
          :active="path === 'contact'"
          active-class="my-menu-link"
        >
          <q-item-section avatar>
            <q-icon name="fas fa-address-book" />
          </q-item-section>

          <q-item-section>Contact</q-item-section>
        </q-item>

        <q-separator spaced />
        <q-item-label header>PROFILE</q-item-label>

        <q-item clickable v-ripple @click="store.logout">
          <q-item-section avatar>
            <q-icon name="fas fa-power-off" />
          </q-item-section>

          <q-item-section>Logout</q-item-section>
        </q-item>
      </q-list>
      <!-- </div> -->
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { computed, ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useAuthStore } from "../store/auth";
const store = useAuthStore();

const route = useRoute();
const path = computed(() => {
  return route.name;
});
const leftDrawerOpen = ref(false);

const toggleLeftDrawer = () => {
  {
    leftDrawerOpen.value = !leftDrawerOpen.value;
  }
};
</script>

<style lang="sass">
.my-menu-link
  color: white
  background: #1976D2
</style>
