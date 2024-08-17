<template>
  <h1>Playground</h1>
  <div class="flex">
    <div>
      <h2>Products</h2>
      <ul>
        <li v-for="product in products" :key="product.id">
          {{ product.title }} - {{ product.price }}
          <button @click="useCart.add_item({ id: product.id })">Add to cart</button>
        </li>
      </ul>
    </div>

    <div>
      <h2>Cart</h2>
      <ul>
        <li v-for="item in cart" :key="item.id"
          @dblclick="useCart.remove_item({ id: item.id })"
          @click="useCart.update_quantity({ id: item.id, quantity: item.quantity + 1 })">
          {{ item.quantity }}x {{ product(item.id).title }}
        </li>
      </ul>

      <p><strong>Subtotal: </strong> {{ useCart.sub_total.toFixed(2) }}</p>
      <p><strong>Desconto Cupom: </strong> {{ coupon_discount() }}</p>
      <p><strong>Total: </strong> {{ useCart.total.toFixed(2) }}</p>
    </div>
  </div>

  <div>
    <h1>Cookie</h1>
    <pre>{{ JSON.stringify(cookieCart, null, 2) }}</pre>
  </div>
</template>

<script setup>
import { useCartStore } from '~~/stores/cart'
import { useProductStore } from '~~/stores/product'

// cart
const useCart = useCartStore()
const cart = computed(() => useCart.cart)

const { cookie_prefix } = useAppConfig()
const cookieCart = useCookie(`${cookie_prefix}-cart`)

// coupon
const useCoupon = useCouponStore()
const coupon_discount = computed(() => useCoupon.total_discount)

// products
const useProducts = useProductStore()
await useAsyncData('products', () => useProducts.fetch_products({ to_state: true }))

const products = computed(() => useProducts.products)

function product(id) {
  return products.value.find(p => p.id === id)
}

</script>

<style>
.flex {
  width: 100%;
  display: flex;
  gap: 1rem;
}
</style>
