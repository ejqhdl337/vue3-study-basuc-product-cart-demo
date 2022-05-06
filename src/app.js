 let app = Vue.createApp({
        data() {
          return {
			veges:[
				{
					name:'Carrot',
					type:'Vegetable',
					inventory:0,
					quantity:0,
					price:4.82,
					icon:'carrot'
				},
				{
					name:'Pineapples',
					type:'Fruit',
					inventory:0,
					quantity:0,
					price:1.62,
					icon:'pineapple'
				},
				{
					name:'Cherries',
					type:'Fruit',
					inventory:0,
					quantity:0,
					price:1.04,
					icon:'cherry'
				}
			],
			orders:[]  
			,
			sidebarVisible:false,
          }
        },
      methods: {
			  toggleSidebar(){
				  this.sidebarVisible = !this.sidebarVisible
			  }
      },
		computed:{
			cartCount(){
				return this.veges.reduce((pv,cv)=>cv.quantity>0 ? pv+1:pv,0)
			}
		}
      })
	  
	  app.component('fruitcard',{
		  template:`<div class="card">
            <div class="card-title">
              {{vege.name}}
            </div>
            <div class="card-body">
              <i :class="icon"></i>
              <form>
                <div class="row">
                  <div class="cell">
                    <label>Type:</label>
                  </div>
                  <div class="cell">
                    <em>{{vege.type}}</em>
                  </div>
                </div>
                <div class="row">
                  <div class="cell">
                    <label>Price:</label>
                  </div>
                  <div class="cell">
                    {{vege.price}}
                  </div>
                </div>
                <div class="row">
                  <div class="cell">
                    <label>Quantity:</label>
                  </div>
                  <div class="cell">
                    <input @click="cleanPlace" @change="checkValue" v-model.number="vege.inventory" type="number"/>
                  </div>
                </div>
              </form>
            </div>
            <div class="card-footer">
              <button @click="addToCart" class="btn btn-light">
                Add to cart
              </button>
            </div>
          </div>`,
		  props:['vege'],
		  data(){
			  return {
				  icon : "icofont-10x icofont-" + this.vege.icon
			  }
		  },
		  methods : {
			 addToCart() {
				if(typeof this.vege.inventory == "string")
					this.vege.inventory = 0
				if(this.vege.inventory > 0){
            		this.vege.quantity += this.vege.inventory
			  	}
        },
			  cleanPlace(){
          if(this.vege.inventory == 0)
			  	  this.vege.inventory = ""
			  },
			  checkValue(){
		  		this.vege.inventory = (this.vege.inventory < 0) ? 0:this.vege.inventory
	  	  },
		  }
	  })
	app.component('cartproduct',{
		template:`
			<template v-if="cartVisible">
				<tr>
				  <td><i :class=icon></i></td>
				  <td>{{ vege.name}}</td>
				  <td>{{ vege.price}}</td>
				  <td class="center">{{ vege.quantity}}</td>
				  <td>{{ vegetotal }}</td>
				  <td class="center">
					<button @click="rmFromCart" class="btn btn-light cart-remove">
					  &times;
					</button>
				  </td>
				</tr>
	  		</template>
		`,
		props:['vege'],
		computed:{
			vegetotal(){
				return (this.vege.price * this.vege.quantity).toFixed(2)
			},
			cartVisible(){
				return this.vege.quantity > 0
			}
		},
		data(){
			return {
				icon : "icofont-" + this.vege.icon + " icofont-3x",
			}
		},
		methods:{
			rmFromCart(){
				this.vege.quantity = 0
			}
		}
	})
	  app.component('sidebar',{
		  props:['toggle','vegeside'],
		  computed:{
		  	totalPrice() {
		  		return (this.vegeside.reduce((pv,cv)=>pv+(cv.quantity*cv.price),0)).toFixed(2)
	  		},
		  },
		  methods:{
			  checkoutCart(){
				  this.vegeside.forEach((v)=>v.quantity=0)
			  }
		  },
		  template: `<aside class="cart-container">
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
								<cartproduct v-for="vegetable in vegeside"
									:vege="vegetable"
								/>
							  </tbody>
							</table>

							<p v-if="totalPrice==0" class="center"><em>No items in cart</em></p>
							<div class="spread">
							  <span><strong>Total:</strong>{{totalPrice}}</span>
							  <button @click="checkoutCart" class="btn btn-light">Checkout</button>
							</div>
						  </div>
						</div>
					 </aside>`,
	  })
      app.mount('#app')