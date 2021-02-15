var app = new Vue({
  el: '#app',
  data: {
    product: 'Socks',
    image: './assets/vmSocks-green-onWhite.jpg',
    inventory: 0,
    onSale: true,
    details: ['80% Cotton', '20% Polyester', 'Gender-neutral'],
    variants:[
      {
        variantId: 2234,
        variantColor: 'green',
        variantImage: './assets/vmSocks-green-onWhite.jpg'
      },
      {
        variantId: 2235,
        variantColor: 'blue',
        variantImage: './assets/vmSocks-blue-onWhite.jpg'
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
    updateProduct: function(newVariantImage) {
      this.image = newVariantImage;
    }
  }
})