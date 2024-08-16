import { defineStore } from 'pinia'

export const useShippingStore = defineStore('shipping', () => {
  const shipping_options = ref([])
  const shipping_selected = ref(0)

  const shipping_value = computed(() => {
    return shipping_selected.value
  })

  return {
    shipping_options,
    shipping_selected,
    shipping_value
  }
})
