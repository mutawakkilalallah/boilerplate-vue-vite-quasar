<template>
  <div class="q-ma-md">
    <p class="text-h4 text-weight-medium">Data Contact</p>
    <q-separator />
    <div class="row q-my-lg">
      <div class="col-md-3 col-sm-6 q-pr-sm q-mb-sm">
        <q-select
          outlined
          label="Pilih Keterangan"
          v-model="store.params.keterangan"
          :options="store.keteranganOpt"
          emit-value
          map-options
          dense
          options-dense
          option-label="label"
          option-value="value"
          hide-dropdown-icon
          @update:model-value="store.getData"
        />
      </div>
    </div>
    <div class="row items-center">
      <div class="col-md-6 col-sm-12 q-mb-sm">
        <div class="row items-center">
          <div class="col-md-2 col-sm-2">
            <p class="q-mb-none text-caption">
              Total Data <b> {{ store.meta.x_total_data }}</b>
            </p>
          </div>
          <div class="col-md-2 col-sm-2">
            <q-select
              outlined
              v-model="store.params.limit"
              :options="store.limitOpt"
              emit-value
              map-options
              dense
              options-dense
              option-label="label"
              option-value="value"
              hide-dropdown-icon
              @update:model-value="store.getData"
            />
          </div>
        </div>
      </div>
      <div class="col-md-6 col-sm-12 q-mb-sm">
        <div class="row items-center justify-end">
          <div class="col-md-6 col-sm-6 q-pr-sm">
            <q-input
              placeholder="Cari contact .."
              filled
              dense
              v-model="store.params.cari"
              @update:model-value="store.getData"
            >
              <template v-slot:append>
                <q-icon size="xs" name="fas fa-search" /> </template
            ></q-input>
          </div>
          <div class="col-md-6 col-sm-6 q-pr-sm">
            <q-btn
              label="Tambah"
              color="primary"
              icon="fas fa-plus-square"
              @click="store.setOpenAdd"
            />
          </div>
        </div>
      </div>
    </div>
    <q-markup-table class="q-mt-sm" flat>
      <thead>
        <tr>
          <th class="text-center">No</th>
          <th class="text-left">Nama</th>
          <th class="text-left">Keterangan</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(d, i) in store.items"
          :key="i"
          @dblclick="store.setOpenEdit(d)"
        >
          <td class="text-center">
            {{
              i + 1 + (store.meta.x_current_page - 1) * store.meta.x_page_limit
            }}
          </td>
          <td class="text-left">{{ d.nama_lengkap }}</td>
          <td class="text-left">
            <q-chip
              size="sm"
              text-color="white"
              :color="d.keterangan == 'valid' ? 'green' : 'red'"
              :icon="d.keterangan == 'valid' ? 'fas fa-check' : 'fas fa-times'"
              >{{ d.keterangan }}</q-chip
            >
          </td>
        </tr>
      </tbody>
    </q-markup-table>
  </div>
  <div class="q-pa-lg flex flex-center">
    <q-pagination
      v-model="store.params.page"
      :max="store.meta?.x_total_page"
      max-pages="15"
      direction-links
      boundary-links
      icon-first="fas fa-backward-fast"
      icon-last="fas fa-forward-fast"
      icon-prev="fas fa-backward"
      icon-next="fas fa-forward"
      @update:model-value="store.getData"
    />
  </div>
  <q-dialog v-model="store.isOpen">
    <q-card style="width: 600px">
      <q-card-section>
        <div class="text-h6">{{ !store.isEdit ? "Tambah" : "Edit" }} Data</div>
      </q-card-section>

      <q-form @submit.prevent="store.handleSubmit">
        <q-card-section class="q-pt-none">
          <q-input
            class="q-my-sm"
            label="Nama Lengkap"
            outlined
            dense
            v-model="store.form.nama_lengkap"
          />
          <q-select
            class="q-my-sm"
            outlined
            v-model="store.form.keterangan"
            :options="store.keteranganOpt"
            emit-value
            map-options
            dense
            options-dense
            hide-dropdown-icon
            label="Pilih Keterangan"
          />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn label="BATAL" color="grey" v-close-popup />
          <q-btn
            v-if="store.isEdit"
            label="HAPUS"
            color="red"
            @click="store.delete"
          />
          <q-btn label="SIMPAN" type="submit" color="primary" />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { onMounted } from "vue";
import { useContactStore } from "../../store/contact";

const store = useContactStore();

onMounted(() => {
  store.getData();
});
</script>
