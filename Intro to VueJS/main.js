var app = new Vue({
  el: '#app',
  data: {
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
    cart: 0
  },
  methods: {
    removeFromCart: function() {
      this.cart = this.cart > 0 ? this.cart - 1 : 0;
    },
    addToCart: function () {
      this.cart += 1;
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
    }
  }
})