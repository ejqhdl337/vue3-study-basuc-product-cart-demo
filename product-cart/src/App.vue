<template>
  <header class="top-bar spread">
    <nav class="top-bar-nav">
      <router-link to="/" class="top-bar-link">
        <i class="icofont-spoon-and-fork"></i>
        <span>Home</span>
      </router-link>
      <router-link to="/products" class="top-bar-link">
        <span>Products</span>
      </router-link>
      <router-link to="/past-orders" class="top-bar-link">
        <span>Past Orders</span>
      </router-link>

      <a @click="toggleSidebar" class="top-bar-cart-link">
        <i class="icofont-cart-alt icofont-1x"></i>
        <span>Cart ({{cartCount}})</span>
      </a>
    </nav>
  </header>
  <router-view :inventory="inventory" :cart="cart"/>

  <Sidebar v-if="sidebarVisible" 
		:toggle="toggleSidebar" 
		:inventory="inventory"
    :cart="cart"
    :rmFromCart="removeItem"
    :checkoutCart="checkoutCart"
  />
</template>
<script>

import Sidebar from '@/components/Sidebar.vue'
import food from './food.json'

export default {
  data () {
    return {
      inventory:food,
			cart:{},
      orders:{},
			sidebarVisible:false,
    }
  },
  methods: {
    toggleSidebar(){
      this.sidebarVisible = !this.sidebarVisible
    },
    removeItem(foodId){
      delete this.cart[foodId]
    },
    checkoutCart(){
      this.orders = this.cart
      this.cart = {}
    }
  },
  computed:{
    cartCount(){
      return Object.keys(this.cart).length
    }
  },
  components:{
    Sidebar
  }
}
</script>
