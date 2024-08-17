import { defineStore } from 'pinia'

export const useProductStore = defineStore('product', () => {
  const { endpoints } = useAppConfig()
  const products = ref([])

  function add_product(product) {
    if (products.value.some((p) => p.id === product.id)) {
      return
    }
    products.value.push(product)
  }

  function set_products(new_products) {
    products.value = new_products
  }

  async function fetch_products({ to_state, id, ids, category_id }) {
    try {
      const data = await $fetch(endpoints.products
        + (id ? `/${id}` : '')
        + (ids ? `?ids=${ids.join(',')}` : '')
        + (category_id ? `?category_id=${category_id}` : '')
      )

      if (to_state)
        set_products(data)

      return data

    } catch (err) {
      console.error(err)
      return []
    }
  }

  return {
    products,
    add_product,
    set_products,
    fetch_products
  }
})
