<template>
    <aside class="cart-container">
        <div class="cart">
            <h1 class="cart-title spread">
            <span>
                Cart
                <i class="icofont-cart-alt icofont-1x"></i>
            </span>
            <button @click="toggle" class="cart-close">&times;</button>
            </h1>

            <div class="cart-body">
            <table class="cart-table">
                <thead>
                <tr>
                    <th><span class="sr-only">Product Image</span></th>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Qty</th>
                    <th>Total</th>
                    <th><span class="sr-only">Actions</span></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(quantity, foodId, i) in cart" :key="i">
				  <td><i :class="getIcon(foodId)"></i></td>
				  <td>{{ getPrice(foodId) }}</td>
				  <td>{{ getName(foodId) }}</td>
				  <td class="center">{{ quantity}}</td>
				  <td>{{ (getPrice(foodId) * quantity).toFixed(2) }}</td>
				  <td class="center">
					<button @click="rmFromCart(foodId)" class="btn btn-light cart-remove">
					  &times;
					</button>
				  </td>
				</tr>
                </tbody>
            </table>

            <p v-if="!Object.keys(cart).length" class="center"><em>No items in cart</em></p>
            <div class="spread">
                <span><strong>Total:</strong>{{totalPrice()}}</span>
                <button @click="checkoutCart" class="btn btn-light">Checkout</button>
            </div>
            </div>
        </div>
    </aside>
</template>
<script>
export default {
    props:['toggle','inventory','cart','orders','rmFromCart','checkoutCart'],
    methods:{
        getPrice(id) {
            return this.inventory[id-1].price.USD
        },
        getIcon(id) {
            return "icofont-" + this.inventory[id-1].icon + " icofont-3x"
        },
        getName(id) {
            return this.inventory[id-1].name
        },
        totalPrice() {
            return (Object.entries(this.cart).reduce((pv,cv)=>pv+(cv[1]*this.getPrice(cv[0])),0)).toFixed(2)
        },
        checkoutCart(){
            for(const id in this.cart){
                this.orders.push({
                    foodId:id,
                    price:this.getPrice(id),
                    icon:this.inventory[id-1].icon,
                    name:this.getName(id),
                    quantity:this.cart[id],
                })
            }
            this.checkoutCart()
        }
    },
}
</script>