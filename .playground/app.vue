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
          @click="useCart.remove_item(item.id)"
        >
          {{ item.quantity }}x {{ product(item.id).title }}
        </li>
      </ul>

      <pre>{{ JSON.stringify(cart, null, 2) }}</pre>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from '~~/stores/cart'
import { useProductStore } from '~~/stores/product'

// cart
const useCart = useCartStore()
const cart = computed(() => useCart.cart)

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
