Vue.config.devtools = true;

Vue.component('productReview', {
  template: `
  <form class="review-form" @submit.prevent="onSubmit">
    <p>
      <label for="name">Name:</label>
      <input type="text" id="name" v-model="name">
    </p>

    <p>
      <label for="review">Review:</label>
      <textarea id="review" v-model="review"></textarea>
    </p>

    <p>
      <label for="rating">Rating:</label>
      <select id="rating" v-model.number="rating">
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
        <option>5</option>
      </select>
    </p>

    <p>
      <b>Would you recommend this product?</b>
      <input type="radio" id="recommended"" v-model="recommend" value="true">
      <label for="recommended">Yes</label>
      <input type="radio" id="not-recommended" v-model="recommend" value="false">
      <label for="not-recommended">No</label>
    </p>

    <p v-if="errors.length">
      <b>Please correct the following error(s):</b>
      <ul>
        <li v-for="error in errors">{{ error }}</li>
      </ul>
    </p>

    <p>
      <input type="submit" value="Submit">
    </p>    
  </form>
  `,
  data() {
    return {
      name: null,
      review: null, 
      rating: null,
      recommend: null,
      errors: []
    }
  },
  methods: {
    onSubmit() {
      this.errors = [];

      if (this.name && this.review && this.rating && this.recommend) {
        let productReview = {
          name: this.name, 
          review: this.review, 
          rating: this.rating,
          recommend: this.recommend === 'true'
        };
  
        this.$emit('review-submitted', productReview);
  
        this.name = null;
        this.review = null;
        this.rating = null;
        this.recommend = null;
      } else {
        if (!this.name) this.errors.push("Name required.");
        if (!this.review) this.errors.push("Review required.");
        if (!this.rating) this.errors.push("Rating required.");
        if (!this.recommend) this.errors.push("Recommend required.");
      }
    }
  }
});
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
    <product-review @review-submitted="addReview"></product-review>
    <div>
      <h2>Reviews</h2>
      <p v-if="!reviews.length">There are no reviews yet.</p>
      <ul>
        <li v-for="review in reviews">
          <p>{{ review.name }}</p>
          <p>Rating: {{ review.rating }}</p>
          <p>{{ review.review }}</p>
          <p>Recommended? {{ review.recommend ? "Yes" : "No" }}</p>
        </li>
      </ul>
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
      sizes: [5, 6, 7, 8, 9],
      reviews: []
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
    },
    addReview(newProductReview) {
      this.reviews.push(newProductReview);
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