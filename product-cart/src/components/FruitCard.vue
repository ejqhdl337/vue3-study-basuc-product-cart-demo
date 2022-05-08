<template>
    <div class="card">
        <div class="card-title">
            {{food.name}}
        </div>
        <div class="card-body">
            <i :class="icon"></i>
            <form>
            <div class="row">
                <div class="cell">
                <label>Type:</label>
                </div>
                <div class="cell">
                <em>{{food.type}}</em>
                </div>
            </div>
            <div class="row">
                <div class="cell">
                <label>Price:</label>
                </div>
                <div class="cell">
                {{food.price.USD}}
                </div>
            </div>
            <div class="row">
                <div class="cell">
                <label>Quantity:</label>
                </div>
                <div class="cell">
                <input @click="cleanPlace" @change="checkValue" v-model.number="food.quantity" type="number"/>
                </div>
            </div>
            </form>
        </div>
        <div class="card-footer">
            <button @click="addToCart" class="btn btn-light">
            Add to cart
            </button>
        </div>
    </div>
</template>
<script>
export default {
    props:['food','cart'],
    data(){
        return {
            icon : "icofont-10x icofont-" + this.food.icon
        }
    },
    methods : {
        addToCart() {
            if(this.cart[this.food.id] === undefined) {
                this.cart[this.food.id] = 0
            }
            if(typeof this.food.quantity == "string"){
                this.food.quantity = 0
            }
            if(this.food.quantity > 0){
                this.cart[this.food.id] += this.food.quantity
            }
        },
        cleanPlace(){
            if(this.food.quantity == 0)
                this.food.quantity = ""
        },
        checkValue(){
                this.food.quantity = (this.food.quantity < 0) ? 0:this.food.quantity
        },
    },
    mounted() {
        this.food.quantity = this.food.quantity
    },
}
</script>