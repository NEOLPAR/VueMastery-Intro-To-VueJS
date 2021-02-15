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
        variantColor: 'green'
      },
      {
        variantId: 2235,
        variantColor: 'blue'
      }
    ],
    sizes: [5, 6, 7, 8, 9]
  }
})