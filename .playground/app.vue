<template>
  <div class="grid grid-cols-2 gap-6 font-sans container mx-auto relative">
    <div class="w-full col-span-1 py-10">
      <h2 class="text-xl mb-6 font-bold font-mono">Products</h2>
      <ul>
        <li v-for="product in products" :key="product.id"
          class="border-2 bg-gray-100 rounded py-4 px-6 mb-1 flex justify-between items-center"
          :class="{ 'bg-green-100 border-green-700': useCart.item_in_cart(product.id) }">
          <div class="flex">
            <figure class="h-7 w-7 bg-white">
              <img :src="product.image" class="max-w-7 max-h-7">
            </figure>
            <div class="max-w-[400px] truncate">
              {{ product.title }}
            </div>
          </div>

          <div class="w-[120px] text-right">
            <div class="font-mono text-xs mr-2">
              R$ {{ product.price.toFixed(2) }}
            </div>
            <button @click="useCart.add_item({ id: product.id })"
              class="bg-white rounded-md shadow-md px-2 py-1 text-sm border border-gray-300 hover:border-gray-500 shrink-0">
              Add to cart
            </button>
          </div>
        </li>
      </ul>
    </div>

    <div class="w-full col-span-1 relative">
      <div class="sticky top-0 py-10">
        <h2 class="text-xl mb-6 font-bold font-mono">Cart</h2>
        <ul class="w-full">
          <li v-for="item in cart" :key="item.id"
            class="w-full border-2 bg-gray-100 rounded py-4 px-6 mb-1 flex items-center">
            <div class="flex">
              <div class="w-6 font-mono font-bold"
                @click="useCart.update_quantity({ id: item.id, quantity: item.quantity + 1 })">
                {{ item.quantity }}x
              </div>

              <div class="max-w-[400px] truncate">{{ product(item.id).title }}</div>
            </div>
            <button @click="useCart.remove_item({ id: item.id })"
              class="bg-white p-2 border border-gray-200 hover:border-gray-500 shadow-md rounded-md shrink-0">
              🗑️
            </button>
          </li>

          <li class="w-full border-2 bg-gray-100 rounded py-4 px-6 mt-3 mb-1 flex items-center justify-between">
            <div class="font-mono font-bold">
              Subtotal:
            </div>
            <div class="font-mono">
              R$ {{ useCart.sub_total.toFixed(2) }}
            </div>
          </li>

          <!-- <li class="w-full border-2 bg-gray-100 rounded py-4 px-6 mt-3 mb-1 flex items-center justify-between">
            <div class="font-mono font-bold">
              Desconto Cupom:
            </div>
            <div class="font-mono">
              R$ {{ coupon_discount.toFixed(2) }}
            </div>
          </li> -->

          <li class="w-full border-2 bg-gray-100 rounded py-4 px-6 mb-1 flex items-center justify-between">
            <div class="font-mono font-bold">
              Total:
            </div>
            <div class="font-mono">
              R$ {{ useCart.total.toFixed(2) }}
            </div>
          </li>
        </ul>

        <div class="text-[9px]">
          <pre>{{ JSON.stringify(cookieCart, null, 2) }}</pre>
        </div>
      </div>
    </div>
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
