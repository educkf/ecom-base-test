import { defineStore } from 'pinia'
import { useShippingStore } from './shipping'
import { useCouponStore } from './coupon'

export const useCartStore = defineStore('cart', () => {
  const shippingStore = useShippingStore()
  const shipping_value = computed(() => shippingStore.shipping_value)

  const couponStore = useCouponStore()
  const total_discount = computed(() => couponStore.total_discount)

  const cart = ref([])

  const sub_total = computed(() => {
    return cart.value.reduce((acc, item) => acc + item.price, 0)
  })

  const total = computed(() => {
    return sub_total.value
      + shipping_value.value
      - total_discount.value
  })

  function set_cart(new_cart) {
    cart.value = new_cart
  }

  function add_item(item) {
    if (cart.value.some((i) => i.id === item.id)) {
      const index = cart.value.findIndex((i) => i.id === item.id)
      cart.value[index].quantity += 1
      return
    } else {
      item.quantity = 1
      cart.value.push(item)
    }
  }

  function remove_item(id) {
    const index = cart.value.findIndex((item) => item.id === id)
    cart.value.splice(index, 1)
  }

  function update_item(id, item) {
    const index = cart.value.findIndex((item) => item.id === id)
    cart.value[index] = item
  }

  function update_quantity(id, quantity) {
    const index = cart.value.findIndex((item) => item.id === id)
    cart.value[index].quantity = quantity
  }

  return {
    cart,
    sub_total,
    total,
    set_cart,
    add_item,
    remove_item,
    update_item,
    update_quantity
  }
})
