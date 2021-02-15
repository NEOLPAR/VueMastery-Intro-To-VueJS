Vue.component('productDetails', {
  props: {
    details: {
      type: Array,
      required: true
    }
  }, 
  template: `
  <ul>
    <li v-for="detail in details">{{ detail }}</li>
  </ul>  
  `,

});
Vue.component('product', {
  props: {
    premium: {
      type: Boolean, 
      required: true
    },
    cart: {
      type: Number,
      required: true
    }
  },
  template: `
  <div class="product">

    <div class="product-image">
      <img v-bind:src="image">
    </div>

    <div class="product-info">
      <h1>{{ title }}</h1>
      
      <p>{{ onSale }}</p>

      <p v-if="inStock > 10">In Stock</p>
      <p v-else-if="inStock <= 10 && inStock > 0">Almost sold out!</p>
      <p v-else
        :style="{ textDecoration: !inStock ? 'line-through' : '' }">Out of Stock</p>
      <p v-show="premium">User is premium</p>
      <p>Shipping: {{ shipping }}</p>
      
      <product-details :details="details"></product-details>

      <div v-for="(variant, idx) in variants" 
          :key="variant.variantId"
          class="color-box"
          :style="{ backgroundColor: variant.variantColor }"
          @mouseover="updateProduct(idx)">
      </div>
      
      <ul>
        <li v-for="size in sizes">{{ size }}</li>
      </ul>

      <button v-on:click="addToCart" 
              :disabled="!inStock"
              :class="{ disabledButton: !inStock }">Add to cart</button>
      <button @click="removeFromCart"
            :disabled="cart === 0"
            :class="{ disabledButton: cart === 0 }">Remove from cart</button>
    </div>
    
  </div>
  `,
  data() {
    return {
      brand: 'Vue Mastery',
      product: 'Socks',
      selectedVariant: 0,
      details: ['80% Cotton', '20% Polyester', 'Gender-neutral'],
      variants:[
        {
          variantId: 2234,
          variantColor: 'green',
          variantImage: './assets/vmSocks-green-onWhite.jpg',
          variantQuantity: 5,
          onSale: true
        },
        {
          variantId: 2235,
          variantColor: 'blue',
          variantImage: './assets/vmSocks-blue-onWhite.jpg',
          variantQuantity: 0,
          onSale: false
        }
      ],
      sizes: [5, 6, 7, 8, 9]
    };
  },
  methods: {
    removeFromCart: function() {
      this.$emit('remove-from-cart', this.variants[this.selectedVariant].variantId);
    },
    addToCart: function () {
      this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId);
    },
    updateProduct: function(idx) {
      this.selectedVariant = idx;
    }
  },
  computed: {
    title() {
      return this.brand + ' ' + this.product;
    },
    image() {
      return this.variants[this.selectedVariant].variantImage;
    },
    inStock() {
      return this.variants[this.selectedVariant].variantQuantity;
    },
    onSale() {
      let isOnSale = this.variants[this.selectedVariant].onSale;

      return this.brand + ' ' + this.product + (isOnSale ? ' On Sale': '');
    },
    shipping() {
      if (this.premium)
        return "Free";

      return 2.99;
    }
  }  
})

var app = new Vue({
  el: '#app',
  data: {
    premium: false,
    cart: []
  },
  methods: {
    removeFromCart: function(id) {
      var idx = this.cart.indexOf(id);
      if (idx > -1) {
        this.cart.splice(idx, 1);
      }
    },
    addToCart: function (id) {
      this.cart.push(id);
    },
  },
});