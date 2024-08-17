import { defineStore } from 'pinia'
import { useShippingStore } from './shipping'
import { useProductStore } from './product'
// import { useCouponStore } from './coupon'

export const useCartStore = defineStore('cart', () => {
  const shippingStore = useShippingStore()
  const shipping_value = computed(() => shippingStore.shipping_value)

  const productStore = useProductStore()
  const products = computed(() => productStore.products)

  // const couponStore = useCouponStore()
  // const total_discount = computed(() => couponStore.total_discount)

  const { cookie_prefix } = useAppConfig()
  const cookieCart = useCookie(`${cookie_prefix}-cart`)

  // INIT CART
  const cart = ref([])

  // COOKIE FOR PERSIST
  if (cookieCart.value) {
    cart.value = cookieCart.value
  }

  watch(cart, (new_cart) =>
    cookieCart.value = new_cart,
    { deep: true }
  )

  // TOTAL VALUES
  const sub_total = computed(() => {
    return cart.value.reduce((acc, item) => {
      const product = products.value.find((p) => p.id === item.id)
      return acc + (Number(product.price) * item.quantity)
    }, 0)
  })

  const total = computed(() => {
    return Number(sub_total.value)
      + Number(shipping_value.value)
      // - Number(total_discount.value)
  })

  const item_in_cart = computed(() => {
    return (id) => cart.value.find((i) => i.id === id)
  })

  // ACTIONS
  function set_cart(new_cart) {
    cart.value = new_cart
  }

  function add_item({ id }) {
    if (cart.value.some((i) => i.id === id)) {
      const index = cart.value.findIndex((i) => i.id === id)
      cart.value[index].quantity += 1

      return
    } else {
      cart.value = [...cart.value, { id, quantity: 1 }]
    }
  }

  function remove_item({ id }) {
    cart.value = cart.value.filter((item) => item.id !== id)
  }

  function update_item({ id, item }) {
    const index = cart.value.findIndex((item) => item.id === id)
    cart.value[index] = item
  }

  function update_quantity({ id, quantity }) {
    const index = cart.value.findIndex((item) => item.id === id)
    cart.value[index].quantity = quantity
  }

  return {
    cart,
    sub_total,
    total,
    set_cart,
    add_item,
    item_in_cart,
    remove_item,
    update_item,
    update_quantity
  }
})
