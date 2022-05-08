<template>
  <main class="wrapper">
    <h1>Products</h1>
    <div class="card-container">
      <FruitCard v-for="food of inventory" 
        :food="food"
        :cart="cart"        
      />
    </div>
  </main>
</template>
<script>
import FruitCard from '@/components/FruitCard.vue'

export default {
  props:['inventory','cart'],
  components:{
    FruitCard
  }
}
</script>