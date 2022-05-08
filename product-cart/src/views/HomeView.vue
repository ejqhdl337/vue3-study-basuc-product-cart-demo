<template>
  <main class="wrapper">
    <h2>Recommended</h2>
    <div class="recommended">
		  <FruitCard v-for="food of inventory.slice(0,3)"
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
