<script setup>
// Reusable Vuetify confirmation dialog. Generic on purpose — used here
// for deleting a vault, but works for any "are you sure?" action.
//
// Requires Vuetify to be installed and registered as a plugin in your
// app (createVuetify() in main.js) plus an icon set (MDI by default).
// If you don't have Vuetify set up yet:
//   npm install vuetify
// and register it per https://vuetifyjs.com/en/getting-started/installation/

defineProps({
  modelValue: { type: Boolean, default: false },
  title: { type: String, default: 'Are you sure?' },
  message: { type: String, default: 'This action cannot be undone.' },
  confirmText: { type: String, default: 'Delete' },
  cancelText: { type: String, default: 'Cancel' },
  color: { type: String, default: 'error' },
  icon: { type: String, default: 'mdi-trash-can-outline' },
  loading: { type: Boolean, default: false }
})

const emit = defineEmits(['update:modelValue', 'confirm', 'cancel'])

function handleCancel() {
  emit('update:modelValue', false)
  emit('cancel')
}

function handleConfirm() {
  emit('confirm')
}
</script>

<template>
  <v-dialog
    :model-value="modelValue"
    @update:model-value="(val) => emit('update:modelValue', val)"
    max-width="380"
    :persistent="loading"
  >
    <v-card rounded="xl" class="pa-2">
      <v-card-text class="text-center pt-6 pb-2">
        <v-avatar :color="color" variant="tonal" size="56" class="mb-4">
          <v-icon :icon="icon" size="28" />
        </v-avatar>

        <div class="text-h6 font-weight-bold mb-1">{{ title }}</div>
        <div class="text-body-2 text-medium-emphasis">{{ message }}</div>
      </v-card-text>

      <v-card-actions class="px-4 pb-4 pt-2">
        <v-btn
          variant="outlined"
          color="grey-darken-1"
          class="flex-grow-1"
          rounded="lg"
          :disabled="loading"
          @click="handleCancel"
        >
          {{ cancelText }}
        </v-btn>
        <v-btn
          variant="flat"
          :color="color"
          class="flex-grow-1"
          rounded="lg"
          :loading="loading"
          @click="handleConfirm"
        >
          {{ confirmText }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

