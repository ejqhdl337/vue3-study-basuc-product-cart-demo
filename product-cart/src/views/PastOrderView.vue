<template>
    <main class="wrapper">
        <h1>Past Orders</h1>
        <table class="product-table">
            <thead>
            <tr>
                <td><span class="sr-only">Product Image</span></td>
                <td>Product</td>
                <td>Price</td>
                <td>Quantity</td>
                <td>Total</td>
                <td><span class="sr-only">Actions</span></td>
            </tr>
            </thead>
            <tbody>
            <tr v-if="!orders.length">
                <td colspan="6" class="center">
                    <h1>No Past Orders</h1>
                </td>
            </tr>
            <tr v-for="order of orders">
                <td><i :class="getIcon(order.icon)"/></td>
                <td>{{order.name}}</td>
                <td>${{order.price}}</td>
                <td>{{order.quantity}}</td>
                <td>${{order.price * order.quantity}}</td>
                <td><button @click="addToCart(order.foodId,order.quantity)" class="btn btn-dark">Add</button></td>
            </tr>
            </tbody>
        </table>
    </main>
</template>
<script>
export default {
    props: ['inventory','cart','orders'],
    methods: {
        getIcon(icon){
            return "icofont-" + icon + " icofont-4x"
        },
        addToCart(id, quantity) {
            if(this.cart[id] === undefined) {
                this.cart[id] = 0
            }
            this.cart[id] += quantity
        }
    }
}
</script>