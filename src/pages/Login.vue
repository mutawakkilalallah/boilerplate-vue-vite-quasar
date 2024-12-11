<template>
  <div class="shadow-2 q-mx-auto" style="max-width: 600px; margin-top: 300px">
    <div class="q-pa-sm">
      <p class="text-center q-mb-none text-h5 text-weight-bold text-primary">
        BOILERPLATE APP
      </p>
      <p class="text-center q-mb-none text-caption">
        Made with Vite, Vue and Quasar
      </p>
      <div class="q-ma-md">
        <q-form @submit.prevent="store.login">
          <q-input
            dense
            outlined
            class="q-my-md"
            label="Username"
            autofocus
            v-model="store.form.username"
          />
          <q-input
            dense
            outlined
            class="q-my-md"
            label="Password"
            v-model="store.form.password"
            type="password"
          />
          <q-btn
            class="full-width"
            color="primary"
            label="Login"
            type="submit"
          />
        </q-form>
      </div>
      <p class="text-center q-mb-none text-caption">Developed By :</p>
      <p class="text-center q-mb-none text-caption text-primary">
        Mutawakkil Alallah
      </p>
      <p class="text-center q-mb-none text-caption">
        2024 &copy; All Right Reserved
      </p>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from "../store/auth";
const store = useAuthStore();
</script>
