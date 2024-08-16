import { defineStore } from 'pinia'

export const useCouponStore = defineStore('coupon', () => {
  const user_coupons = ref([])
  const coupons = ref([])

  function applied_coupon() {
    const available_coupons = user_coupons.value.reduce((acc, coupon) => {
      const coupon_data = coupons.value.find((c) => c.code === coupon.code)
      if (coupon_data) {
        acc.push(coupon_data)
      }
      return acc
    }, [])

    return available_coupons
  }

  function total_discount() {
    return applied_coupon().reduce((acc, coupon) => acc + coupon.discount, 0)
  }

  return {
    user_coupons,
    coupons,
    applied_coupon,
    total_discount
  }
})
